import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import { RadioProps } from './radio.types';

const Radio: FC<RadioProps> = ({ active, onChange }) => (
  <Div
    p="0.125rem"
    width="1rem"
    height="1rem"
    borderRadius="50%"
    border="2px solid"
    onClick={() => onChange?.(!active)}
    bg={active ? '#F5B722' : undefined}
    borderColor={active ? '#F5B722' : '#7C7C7C'}
  >
    {active && (
      <Div bg="white" borderRadius="50%" width="0.5rem" height="0.5rem" />
    )}
  </Div>
);

export default Radio;
