import { Button } from '@stylin.js/elements';
import { FC, PropsWithChildren } from 'react';

import { TimesSVG } from '@/components/svg';

import { CoinFiltersTagProps } from './coin-filters.types';

const CoinFiltersTag: FC<PropsWithChildren<CoinFiltersTagProps>> = ({
  active,
  onClick,
  children,
}) => (
  <Button
    all="unset"
    gap="0.25rem"
    display="flex"
    cursor="pointer"
    onClick={onClick}
    alignItems="center"
    borderRadius="1.25rem"
    border="1px solid #F5B722"
    color={active ? '#242424' : '#F5B722'}
    bg={active ? '#F5B722' : 'transparent'}
    py={['0.25rem', '0.25rem', '0.375rem']}
    px={['0.375rem', '0.375rem', '0.5rem']}
  >
    {children}
    {active && <TimesSVG width="100%" maxWidth="1rem" maxHeight="1rem" />}
  </Button>
);

export default CoinFiltersTag;
