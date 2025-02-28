import { formatAddress } from '@mysten/sui/utils';
import { Article, Button, Div, H3, Img, P } from '@stylin.js/elements';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, MouseEventHandler, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useReadLocalStorage } from 'usehooks-ts';

import { CopySVG } from '@/components/svg';
import Tag from '@/components/tag';
import { CARD_MODE_STORAGE_KEY, CardMode, ExplorerMode } from '@/constants';
import { useCoinBalance } from '@/hooks/use-coin-balance';
import { useCoinSupply } from '@/hooks/use-coin-supply';
import { useCoinsAbilities } from '@/hooks/use-coins-abilities';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { useModal } from '@/hooks/use-modal';
import { useWhitelistedCoins } from '@/hooks/use-whitelisted';
import { Abilities, Coin, CoinModalMode } from '@/interface';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { commaSeparatedNumber, isNumeric } from '@/utils';
import { updateURL } from '@/utils/url';

import CoinModal from '../coin-modal';

const CoinCard: FC<Coin> = ({
  name,
  type,
  iconUrl,
  burnCap,
  mintCap,
  canBurn,
  decimals,
  description,
  metadataCap,
}) => {
  const { pathname } = useRouter();
  const { setContent } = useModal();
  const { balance } = useCoinBalance(type);
  const getExplorerUrl = useGetExplorerUrl();
  const { totalSupply } = useCoinSupply(type);
  const [isImageError, setIsImageError] = useState(false);
  const { abilities, isLoading: loading } = useCoinsAbilities({
    burnCap,
    mintCap,
    metadataCap,
  });
  const { data: whitelisted } = useWhitelistedCoins();

  const cardMode =
    useReadLocalStorage(CARD_MODE_STORAGE_KEY) ?? CardMode.Description;

  const handleCopy =
    (information: string): MouseEventHandler<HTMLDivElement> =>
    (e) => {
      e.stopPropagation();

      window.navigator.clipboard.writeText(information);
      toast.success('Copied!');
    };

  const handleClick = () => {
    updateURL(`${pathname}?coin=${type}&mode=${CoinModalMode.Details}`);

    setContent(<CoinModal />, {
      onClose: () => updateURL(pathname),
      containerProps: { maxWidth: ['100vw', '95vw'] },
      overlayProps: { alignItems: ['flex-end', 'center'] },
    });
  };
  return (
    <Article
      p="1.5rem"
      gap="1.5rem"
      bg={`${
        whitelisted?.includes(type)
          ? 'url("card-linear-gradient.svg") center/cover no-repeat'
          : '#161616'
      }`}
      display="flex"
      cursor="pointer"
      flexDirection="column"
      border="1px solid transparent"
      justifyContent="space-between"
      nHover={{ borderColor: '#F5B72280' }}
      borderRadius={['1rem', '1rem', '1.825rem']}
      onClick={handleClick}
    >
      <Toaster />
      <Div display="flex" flexDirection="column" gap="1.5rem">
        <Div
          height="2rem"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Div display="flex" gap="0.5rem" mx="-0.25rem">
            {(canBurn || abilities?.[Abilities.Burn] || loading) && (
              <Tag hexColor="#FF562C" loading={canBurn ? false : loading}>
                Burn
              </Tag>
            )}
            {(abilities?.[Abilities.Mint] || loading) && (
              <Tag hexColor="#95CB34" loading={loading}>
                Mint
              </Tag>
            )}
            {(abilities?.[Abilities.Edit] || loading) && (
              <Tag hexColor="#D0D0D0" loading={loading}>
                Edit
              </Tag>
            )}
          </Div>
        </Div>
        <Div
          gap="0.5rem"
          display="flex"
          textAlign="center"
          alignItems="center"
          flexDirection="column"
        >
          <Img
            alt={name}
            width="4rem"
            height="4rem"
            objectFit="cover"
            borderRadius="0.5rem"
            onError={() => setIsImageError(true)}
            src={isImageError ? '/default-image.webp' : iconUrl}
          />
          <H3 fontSize="1.25rem">{name}</H3>
          <Div
            gap="0.25rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Link
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              href={getExplorerUrl(type, ExplorerMode.Coin)}
            >
              <P
                color="#9B9CA1"
                nHover={{ color: '#F5B722', textDecoration: 'underline' }}
              >
                {formatAddress(type)}
              </P>
            </Link>
            <Div
              display="flex"
              color="#9B9CA1"
              alignItems="center"
              onClick={handleCopy(type)}
              nHover={{ color: '#F5B722 ' }}
            >
              <CopySVG maxWidth="1rem" maxHeight="1rem" width="100%" />
            </Div>
          </Div>
        </Div>
      </Div>
      <Div gap="1.5rem" display="flex" flexDirection="column">
        {cardMode === CardMode.Description ? (
          <Div
            px="0.5rem"
            py="0.5rem"
            bg="#1A1A1A"
            height="5.8rem"
            borderRadius="0.75rem"
            border="1px solid #242424"
          >
            <P color="#FFFFFFA3" overflowY="auto" height="100%" px="0.5rem">
              {description}
            </P>
          </Div>
        ) : (
          <Div
            p="1rem"
            bg="#1A1A1A"
            gap="0.5rem"
            display="flex"
            borderRadius="0.75rem"
            flexDirection="column"
            border="1px solid #242424"
          >
            <Div display="flex" justifyContent="space-between">
              <P color="#FFFFFFA3">Supply</P>
              <P color="#F5B722" textAlign="right">
                {totalSupply
                  ? commaSeparatedNumber(
                      FixedPointMath.toNumber(totalSupply, decimals)
                    )
                  : '--'}
              </P>
            </Div>
            <Div borderTop="1px solid #242424" />
            <Div display="flex" justifyContent="space-between">
              <P color="#FFFFFFA3">My Balance</P>
              <P color="#F5B722" textAlign="right">
                {totalSupply &&
                isNumeric(totalSupply) &&
                balance &&
                isNumeric(balance)
                  ? `${FixedPointMath.toNumber(
                      balance
                        .times(100)
                        .div(totalSupply.isZero() ? 1 : totalSupply)
                        .decimalPlaces(2),
                      0
                    )}%`
                  : '--'}
              </P>
            </Div>
          </Div>
        )}
        <Button
          all="unset"
          p="1rem"
          bg="#F5B722"
          px="1.25rem"
          color="#000000"
          textAlign="center"
          borderRadius="1rem"
        >
          See more
        </Button>
      </Div>
    </Article>
  );
};

export default CoinCard;
