import { useCurrentAccount } from '@mysten/dapp-kit';
import { Button, Div, Span } from '@stylin.js/elements';
import { not } from 'ramda';
import { FC, useState } from 'react';

import { GearSVG, TimesSVG } from '@/components/svg';
import Tag from '@/components/tag';
import { Abilities } from '@/interface';
import { isSameAddress } from '@/utils';

import { CoinDetailsCapabilitiesProps } from '../coin-details.types';
import { useDestroyCap } from './coin-details-capabilities.hooks';

const CoinDetailsCapabilities: FC<CoinDetailsCapabilitiesProps> = ({
  caps,
  canBurn,
  abilities,
}) => {
  const destroyCap = useDestroyCap();
  const currentAccount = useCurrentAccount();
  const [managing, setManaging] = useState(false);

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

  return (
    <Div display="flex" gap="0.5rem">
      {(canBurn || abilities?.[Abilities.Burn]) && (
        <Tag
          hexColor="#FF562C"
          onClick={
            managing && hasBurnCap
              ? () => destroyCap(caps.burnCap!, Abilities.Burn)
              : undefined
          }
        >
          Burn
          {managing && hasBurnCap && (
            <TimesSVG width="100%" maxWidth="0.825rem" maxHeight="0.825rem" />
          )}
        </Tag>
      )}
      {abilities?.[Abilities.Mint] && (
        <Tag
          hexColor="#95CB34"
          onClick={
            managing && hasMintCap
              ? () => destroyCap(caps.mintCap!, Abilities.Mint)
              : undefined
          }
        >
          Mint
          {managing && hasMintCap && (
            <TimesSVG width="100%" maxWidth="0.825rem" maxHeight="0.825rem" />
          )}
        </Tag>
      )}
      {abilities?.[Abilities.Edit] && (
        <Tag
          hexColor="#D0D0D0"
          onClick={
            managing && hasEditCap
              ? () => destroyCap(caps.metadataCap!, Abilities.Edit)
              : undefined
          }
        >
          Edit
          {managing && hasEditCap && (
            <TimesSVG width="100%" maxWidth="0.825rem" maxHeight="0.825rem" />
          )}
        </Tag>
      )}
      {hasAdminCap && (
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
              <TimesSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
            ) : (
              <GearSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
            )}
          </Span>
        </Button>
      )}
    </Div>
  );
};

export default CoinDetailsCapabilities;
