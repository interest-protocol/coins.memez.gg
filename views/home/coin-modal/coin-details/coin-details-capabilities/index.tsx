import { TooltipWrapper } from '@interest-protocol/ui-kit';
import { Button, Div, Img, P, Span } from '@stylin.js/elements';
import { AnimatePresence, motion } from 'motion/react';
import { not } from 'ramda';
import { FC, useMemo, useState } from 'react';

import { GearSVG, LoaderSVG, TimesSVG } from '@/components/svg';
import Tag from '@/components/tag';
import { ExplorerMode } from '@/constants';
import { useDialog } from '@/hooks/use-dialog';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { useModal } from '@/hooks/use-modal';
import { Abilities } from '@/interface';
import { isSameAddress } from '@/utils';

import { CoinDetailsCapabilitiesProps } from '../coin-details.types';
import { useDestroyCap } from './coin-details-capabilities.hooks';
import CapabilityDestroyModal from './coin-details-capability-destroy-modal';

const Motion = motion.create(Div);

const CoinDetailsCapabilities: FC<CoinDetailsCapabilitiesProps> = ({
  caps,
  canBurn,
  abilities,
}) => {
  const destroyCap = useDestroyCap();
  const { setContent, onClose } = useModal();

  const currentAccount = useMemo(
    () => ({
      address:
        '0x1eb7c567d5fcc99140007716d4235e2c72a4b65a7b89197f15fb73c2fb57d3d9',
    }),
    []
  );
  const { dialog, handleClose } = useDialog();
  const getExplorerLink = useGetExplorerUrl();
  const [managing, setManaging] = useState(false);

  const goToTx = (tx: string) =>
    window.open(
      getExplorerLink(tx, ExplorerMode.Transaction),
      '_blank',
      'noreferrer'
    );

  const hasBurnCap =
    abilities?.[Abilities.Burn] &&
    isSameAddress(currentAccount?.address ?? '', abilities[Abilities.Burn]);

  const hasMintCap =
    abilities?.[Abilities.Mint] &&
    isSameAddress(currentAccount?.address ?? '', abilities[Abilities.Mint]);

  const hasEditCap =
    abilities?.[Abilities.Edit] &&
    isSameAddress(currentAccount?.address ?? '', abilities[Abilities.Edit]);

  const hasAdminCap = hasBurnCap || hasMintCap || hasEditCap;

  const handleDestroyCap = (cap: string, ability: Abilities) => () =>
    dialog.promise(destroyCap(cap, ability), {
      success: (txDigest) => ({
        title: 'Feature Destroyed',
        button: {
          label: 'See on explorer',
          onClick: () => goToTx(String(txDigest)),
        },
        message: 'Congratulations! Your feature was successfully destroyed.',
        ghostButton: {
          label: 'Continue browsing',
          onClick: handleClose,
        },
        Icon: (
          <Img
            alt="Success"
            width="7rem"
            height="7rem"
            src="/dialogs/success.png"
          />
        ),
      }),
      loading: () => ({
        Icon: <LoaderSVG />,
        title: 'Destroying...',
        message:
          'Accept the transaction on the your wallet pop up, we will let you know when it is done.',
      }),
      error: (e) => ({
        title: 'Oops! You could not destroy!',
        button: { label: 'Try again', onClick: handleDestroyCap(cap, ability) },
        message:
          e.message ||
          'Try to refresh the page, double-check your inputs, or reconnect your wallet.',
        ghostButton: {
          label: 'Do not want to try again!',
          onClick: handleClose,
        },
        Icon: (
          <Img
            alt="Error"
            width="7rem"
            height="7rem"
            src="/dialogs/error.png"
          />
        ),
      }),
    });

  const onDestroyCap = (cap: string, ability: Abilities) => () =>
    setContent(
      <CapabilityDestroyModal onClick={handleDestroyCap(cap, ability)} />,
      { onClose }
    );

  return (
    <Motion display="flex" alignItems="center" flexDirection="column">
      <Div display="flex" gap="0.5rem">
        {(canBurn || abilities?.[Abilities.Burn]) && (
          <Tag
            hexColor="#FF562C"
            onClick={
              managing && hasBurnCap
                ? onDestroyCap(caps.burnCap!, Abilities.Burn)
                : undefined
            }
          >
            Burn
            {managing && hasBurnCap && (
              <TimesSVG width="100%" maxWidth="1.25rem" maxHeight="1.25rem" />
            )}
          </Tag>
        )}
        {abilities?.[Abilities.Mint] && (
          <Tag
            hexColor="#95CB34"
            onClick={
              managing && hasMintCap
                ? onDestroyCap(caps.mintCap!, Abilities.Mint)
                : undefined
            }
          >
            Mint
            {managing && hasMintCap && (
              <TimesSVG width="100%" maxWidth="1.25rem" maxHeight="1.25rem" />
            )}
          </Tag>
        )}
        {abilities?.[Abilities.Edit] && (
          <Tag
            hexColor="#D0D0D0"
            onClick={
              managing && hasEditCap
                ? onDestroyCap(caps.metadataCap!, Abilities.Edit)
                : undefined
            }
          >
            Edit
            {managing && hasEditCap && (
              <TimesSVG width="100%" maxWidth="1.25rem" maxHeight="1.25rem" />
            )}
          </Tag>
        )}
        {hasAdminCap && (
          <TooltipWrapper
            bg="#111"
            tooltipPosition="top"
            tooltipContent="Revoke"
          >
            <Button
              all="unset"
              px="1rem"
              py="0.5rem"
              bg="#F5B722"
              display="flex"
              color="#000000"
              cursor="pointer"
              alignItems="center"
              borderRadius="1.5rem"
              justifyContent="center"
              onClick={() => setManaging(not)}
            >
              <Span
                display="flex"
                alignItems="center"
                justifyContent="center"
                transformOrigin="center center"
                transition="transform 300ms linear"
                nHover={{ transform: 'rotate(180deg)' }}
              >
                {managing ? (
                  <TimesSVG
                    width="100%"
                    maxWidth="1.25rem"
                    maxHeight="1.25rem"
                  />
                ) : (
                  <GearSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
                )}
              </Span>
            </Button>
          </TooltipWrapper>
        )}
      </Div>
      <AnimatePresence>
        {managing && (
          <Motion
            mt="0.75rem"
            transition={{ ease: 'linear' }}
            exit={{ height: 0, scaleY: 0, opacity: 0 }}
            animate={{ scaleY: [0, 1], height: [0, 'auto'], opacity: [0, 1] }}
          >
            <P
              px="0.5rem"
              py="0.25rem"
              bg="#FF47471A"
              color="#FF4747"
              overflow="hidden"
              border="1px solid"
              borderRadius="0.5rem"
            >
              You are revoking features
            </P>
          </Motion>
        )}
      </AnimatePresence>
    </Motion>
  );
};

export default CoinDetailsCapabilities;
