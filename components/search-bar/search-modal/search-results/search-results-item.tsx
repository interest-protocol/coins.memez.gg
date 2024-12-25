import { Article, Div, H4, Img, P } from '@stylin.js/elements';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import unikey from 'unikey';

import { useModal } from '@/hooks/use-modal';
import { SearchingCoin } from '@/hooks/use-search-coins/use-search-coins.types';
import { Abilities } from '@/interface';
import { updateURL } from '@/utils';
import CoinModal from '@/views/home/coin-modal';

const SearchResultsItem: FC<SearchingCoin> = ({
  name,
  type,
  symbol,
  iconUrl,
}) => {
  const { pathname } = useRouter();
  const { setContent } = useModal();
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    updateURL(`${pathname}?coin=${type}&mode=${Abilities.Details}`);

    setContent(<CoinModal />, {
      allowClose: true,
      onClose: () => updateURL(pathname),
    });
  };

  return (
    <Article
      py="0.25rem"
      px="0.5rem"
      gap="0.5rem"
      key={unikey()}
      display="flex"
      cursor="pointer"
      alignItems="center"
      onClick={handleClick}
      borderRadius="0.25rem"
      nHover={{ bg: '#9B9CA122' }}
    >
      <Img
        alt={name}
        width="2rem"
        height="2rem"
        objectFit="cover"
        borderRadius="0.25rem"
        onError={() => setImageError(true)}
        src={imageError ? '/default-image.webp' : iconUrl}
      />
      <Div color="#9B9CA1">
        <H4 fontWeight="400">{name}</H4>
        <P>{symbol}</P>
      </Div>
    </Article>
  );
};

export default SearchResultsItem;
