import { formatAddress } from '@mysten/sui/utils';
import { Button, Div, H3, H4, Hr, Img, P, Span } from '@stylin.js/elements';
import BigNumber from 'bignumber.js';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import { ChevronDownSVG, CopySVG, ExternalSVG } from '@/components/svg';
import Tag from '@/components/tag';
import { ExplorerMode } from '@/constants';
import useCoin from '@/hooks/use-coin';
import { useCoinSupply } from '@/hooks/use-coin-supply';
import { useCoinsAbilities } from '@/hooks/use-coins-abilities';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import useURIStaticParams from '@/hooks/use-uri-static-params';
import { Abilities } from '@/interface';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { commaSeparatedNumber } from '@/utils';

import CoinModalLoading from '../coin-modal-loading';
import CoinModalNotFound from '../coin-modal-not-found';

const Motion = motion(Div);

const CoinDetails: FC = () => {
  const params = useURIStaticParams();
  const [show, setShow] = useState(false);
  const getExplorerUrl = useGetExplorerUrl();
  const [imageError, setImageError] = useState(false);
  const { coin, loading } = useCoin(params?.get('coin') ?? undefined);

  const { totalSupply } = useCoinSupply(coin?.type);
  const { abilities } = useCoinsAbilities({
    burnCap: coin?.burnCap,
    mintCap: coin?.mintCap,
    metadataCap: coin?.metadataCap,
  });

  if (loading) return <CoinModalLoading />;

  if (!coin) return <CoinModalNotFound />;

  const openCoinExplorer = () =>
    window.open(
      getExplorerUrl(coin.type, ExplorerMode.Coin),
      '_blank',
      'noreferrer'
    );

  const handleCopy = (information: string) => {
    window.navigator.clipboard.writeText(information);
    toast.success('Copied!');
  };

  return (
    <Div
      gap="1rem"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Div
        gap="0.5rem"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Img
          width="3.75rem"
          alt={coin.name}
          height="3.75rem"
          objectFit="cover"
          borderRadius="50%"
          onError={() => setImageError(true)}
          src={imageError ? '/default-image.webp' : coin.iconUrl}
        />
        <H3
          maxWidth="25ch"
          overflow="hidden"
          textAlign="center"
          textOverflow="ellipsis"
        >
          {coin.name} <Span color="#9B9CA1">({coin.symbol})</Span>
        </H3>
        <Div display="flex" gap="0.5rem">
          {(coin.canBurn || abilities?.[Abilities.Burn]) && (
            <Tag hexColor="#FF562C">Burn</Tag>
          )}
          {abilities?.[Abilities.Mint] && <Tag hexColor="#95CB34">Mint</Tag>}
          {abilities?.[Abilities.Edit] && <Tag hexColor="#D0D0D0">Edit</Tag>}
        </Div>
      </Div>
      <Div display="flex" flexDirection="column" gap="1rem">
        <H4>Details</H4>
        <Div
          p="1rem"
          bg="#1A1A1A"
          gap="0.5rem"
          display="flex"
          borderRadius="0.75rem"
          flexDirection="column"
        >
          <Div display="flex" justifyContent="space-between">
            <P color="#FFFFFFA3">Name</P>
            <P
              color="#F5B722"
              maxWidth="25ch"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {coin.name}
            </P>
          </Div>
          <Div borderTop="1px solid #242424" />
          <Div display="flex" justifyContent="space-between">
            <P color="#FFFFFFA3">Symbol</P>
            <P
              color="#F5B722"
              maxWidth="12ch"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {coin.symbol}
            </P>
          </Div>
        </Div>
        <H4>Supply</H4>
        <Div
          p="1rem"
          bg="#1A1A1A"
          gap="0.5rem"
          display="flex"
          borderRadius="0.75rem"
          flexDirection="column"
        >
          <Div display="flex" justifyContent="space-between">
            <P color="#FFFFFFA3">Decimals</P>
            <P color="#F5B722">{coin.decimals}</P>
          </Div>
          <Div borderTop="1px solid #242424" />
          <Div display="flex" justifyContent="space-between">
            <P color="#FFFFFFA3">Supply</P>
            <P color="#F5B722">
              {totalSupply
                ? commaSeparatedNumber(
                    FixedPointMath.toNumber(totalSupply, coin.decimals)
                  )
                : '--'}
            </P>
          </Div>
          {coin.maximumSupply && (
            <>
              <Div borderTop="1px solid #242424" />
              <Div display="flex" justifyContent="space-between">
                <P color="#FFFFFFA3">Max Supply</P>
                <P color="#F5B722">
                  {commaSeparatedNumber(
                    FixedPointMath.toNumber(
                      BigNumber(coin.maximumSupply),
                      coin.decimals
                    )
                  )}
                </P>
              </Div>
            </>
          )}
        </Div>
        <H4>Description</H4>
        <Div p="1rem" bg="#1A1A1A" borderRadius="0.75rem">
          {coin.description}
        </Div>
        <Button
          all="unset"
          py="1rem"
          gap="1rem"
          my="0.5rem"
          bg="#1A1A1A"
          display="flex"
          cursor="pointer"
          alignItems="center"
          borderRadius="0.5rem"
          justifyContent="center"
          border="1px solid #7C7C7C"
          onClick={() => setShow(!show)}
          nHover={{ borderColor: '#F5B72266' }}
        >
          {show ? 'Hide' : 'Advanced'}
          <Motion animate={{ rotate: show ? '180deg' : '0deg' }}>
            <ChevronDownSVG
              maxWidth="0.75rem"
              maxHeight="0.75rem"
              width="100%"
            />
          </Motion>
        </Button>
        <AnimatePresence>
          {show ? (
            <Motion
              layout
              p="1rem"
              bg="#1A1A1A"
              gap="0.5rem"
              display="flex"
              overflow="hidden"
              borderRadius="0.75rem"
              flexDirection="column"
              transition={{ duration: 0.3 }}
              exit={{ scaleY: 0, height: 0 }}
              animate={{
                scaleY: [0, 1],
                height: 'auto',
                transformOrigin: 'top left',
              }}
            >
              <Div display="flex" justifyContent="space-between">
                <P color="#FFFFFFA3">Type</P>
                <P
                  gap="0.5rem"
                  display="flex"
                  color="#F5B722"
                  cursor="pointer"
                  alignItems="center"
                >
                  <Link
                    target="_blank"
                    href={getExplorerUrl(coin.type, ExplorerMode.Coin)}
                  >
                    <Span nHover={{ textDecoration: 'underline' }}>
                      {formatAddress(coin.type)}
                    </Span>
                  </Link>
                  <Span onClick={() => handleCopy(coin.type)}>
                    <CopySVG maxWidth="1rem" maxHeight="1rem" width="100%" />
                  </Span>
                </P>
              </Div>
              <Hr border="none" borderTop="1px solid #242424" />
              <Div display="flex" justifyContent="space-between">
                <P color="#FFFFFFA3">Creator</P>
                <P
                  gap="0.5rem"
                  display="flex"
                  color="#F5B722"
                  cursor="pointer"
                  alignItems="center"
                >
                  <Link
                    target="_blank"
                    href={getExplorerUrl(coin.createdBy, ExplorerMode.Account)}
                  >
                    <Span nHover={{ textDecoration: 'underline' }}>
                      {formatAddress(coin.createdBy)}
                    </Span>
                  </Link>
                  <Span onClick={() => handleCopy(coin.createdBy)}>
                    <CopySVG maxWidth="1rem" maxHeight="1rem" width="100%" />
                  </Span>
                </P>
              </Div>
              <Hr border="none" borderTop="1px solid #242424" />
              <Div display="flex" justifyContent="space-between">
                <P color="#FFFFFFA3">Treasury Cap</P>
                <P
                  gap="0.5rem"
                  display="flex"
                  color="#F5B722"
                  cursor="pointer"
                  alignItems="center"
                >
                  <Link
                    target="_blank"
                    href={getExplorerUrl(coin.treasuryCap, ExplorerMode.Object)}
                  >
                    <Span nHover={{ textDecoration: 'underline' }}>
                      {formatAddress(coin.treasuryCap)}
                    </Span>
                  </Link>
                  <Span onClick={() => handleCopy(coin.treasuryCap)}>
                    <CopySVG maxWidth="1rem" maxHeight="1rem" width="100%" />
                  </Span>
                </P>
              </Div>
              <Hr border="none" borderTop="1px solid #242424" />
              <Div display="flex" justifyContent="space-between">
                <P color="#FFFFFFA3">Coin Metadata</P>
                <P
                  gap="0.5rem"
                  display="flex"
                  color="#F5B722"
                  cursor="pointer"
                  alignItems="center"
                >
                  <Link
                    target="_blank"
                    href={getExplorerUrl(
                      coin.metadataObjectId,
                      ExplorerMode.Object
                    )}
                  >
                    <Span nHover={{ textDecoration: 'underline' }}>
                      {formatAddress(coin.metadataObjectId)}
                    </Span>
                  </Link>
                  <Span onClick={() => handleCopy(coin.metadataObjectId)}>
                    <CopySVG maxWidth="1rem" maxHeight="1rem" width="100%" />
                  </Span>
                </P>
              </Div>
              <Hr border="none" borderTop="1px solid #242424" />
              <Div display="flex" justifyContent="space-between">
                <P color="#FFFFFFA3">IPX Standard Treasury</P>
                <P
                  gap="0.5rem"
                  display="flex"
                  color="#F5B722"
                  cursor="pointer"
                  alignItems="center"
                >
                  <Link
                    target="_blank"
                    href={getExplorerUrl(
                      coin.ipxTreasuryCap,
                      ExplorerMode.Object
                    )}
                  >
                    <Span nHover={{ textDecoration: 'underline' }}>
                      {formatAddress(coin.ipxTreasuryCap)}
                    </Span>
                  </Link>
                  <Span onClick={() => handleCopy(coin.ipxTreasuryCap)}>
                    <CopySVG maxWidth="1rem" maxHeight="1rem" width="100%" />
                  </Span>
                </P>
              </Div>
              {(coin.canBurn || abilities?.[Abilities.Burn]) && (
                <>
                  <Hr border="none" borderTop="1px solid #242424" />
                  <Div display="flex" justifyContent="space-between">
                    <P color="#FFFFFFA3">
                      {coin.canBurn ? 'Who can burn' : 'Burn Cap Owner'}
                    </P>
                    <P
                      gap="0.5rem"
                      display="flex"
                      color="#F5B722"
                      cursor="pointer"
                      alignItems="center"
                    >
                      {coin.canBurn ? (
                        'Everyone'
                      ) : abilities?.[Abilities.Burn] ? (
                        <>
                          <Link
                            target="_blank"
                            href={getExplorerUrl(
                              abilities[Abilities.Burn],
                              ExplorerMode.Account
                            )}
                          >
                            <Span nHover={{ textDecoration: 'underline' }}>
                              {formatAddress(abilities[Abilities.Burn])}
                            </Span>
                          </Link>
                          <Span
                            onClick={() =>
                              handleCopy(
                                abilities[Abilities.Burn] as unknown as string
                              )
                            }
                          >
                            <CopySVG
                              width="100%"
                              maxWidth="1rem"
                              maxHeight="1rem"
                            />
                          </Span>
                        </>
                      ) : null}
                    </P>
                  </Div>
                </>
              )}
              {abilities?.[Abilities.Mint] && (
                <>
                  <Hr border="none" borderTop="1px solid #242424" />
                  <Div display="flex" justifyContent="space-between">
                    <P color="#FFFFFFA3">Mint Cap Owner</P>
                    <P
                      gap="0.5rem"
                      display="flex"
                      color="#F5B722"
                      cursor="pointer"
                      alignItems="center"
                    >
                      <Link
                        target="_blank"
                        href={getExplorerUrl(
                          abilities[Abilities.Mint],
                          ExplorerMode.Account
                        )}
                      >
                        <Span nHover={{ textDecoration: 'underline' }}>
                          {formatAddress(abilities[Abilities.Mint])}
                        </Span>
                      </Link>
                      <Span
                        onClick={() =>
                          handleCopy(
                            abilities[Abilities.Mint] as unknown as string
                          )
                        }
                      >
                        <CopySVG
                          width="100%"
                          maxWidth="1rem"
                          maxHeight="1rem"
                        />
                      </Span>
                    </P>
                  </Div>
                </>
              )}
              {abilities?.[Abilities.Edit] && (
                <>
                  <Hr border="none" borderTop="1px solid #242424" />
                  <Div display="flex" justifyContent="space-between">
                    <P color="#FFFFFFA3">Edit Cap Owner</P>
                    <P
                      gap="0.5rem"
                      display="flex"
                      color="#F5B722"
                      cursor="pointer"
                      alignItems="center"
                    >
                      <Link
                        target="_blank"
                        href={getExplorerUrl(
                          abilities[Abilities.Edit],
                          ExplorerMode.Account
                        )}
                      >
                        <Span nHover={{ textDecoration: 'underline' }}>
                          {formatAddress(abilities[Abilities.Edit])}
                        </Span>
                      </Link>
                      <Span
                        onClick={() =>
                          handleCopy(
                            abilities[Abilities.Edit] as unknown as string
                          )
                        }
                      >
                        <CopySVG
                          width="100%"
                          maxWidth="1rem"
                          maxHeight="1rem"
                        />
                      </Span>
                    </P>
                  </Div>
                </>
              )}
            </Motion>
          ) : null}
        </AnimatePresence>
      </Div>
      <Button
        all="unset"
        p="1.125rem"
        gap="0.5rem"
        bg="#F5B722"
        display="flex"
        color="#000000"
        cursor="pointer"
        alignItems="center"
        whiteSpace="nowrap"
        borderRadius="0.75rem"
        justifyContent="center"
        onClick={openCoinExplorer}
      >
        Open on Explorer{' '}
        <ExternalSVG maxWidth="0.75rem" maxHeight="0.75rem" width="100%" />
      </Button>
    </Div>
  );
};

export default CoinDetails;
