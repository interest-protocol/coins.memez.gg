import { Div, P } from '@stylin.js/elements';
import { motion } from 'framer-motion';
import { FC } from 'react';
import unikey from 'unikey';

import { TabsProps } from './tabs.types';

const TabText = motion(P);
const Motion = motion(Div);

const Tabs: FC<TabsProps> = ({ selected, items, onSelect }) => (
  <Div
    bg="#1A1A1A"
    display="grid"
    fontWeight="600"
    textAlign="center"
    position="relative"
    borderRadius="0.75rem"
    border="0.375rem solid #1A1A1A"
    gridTemplateColumns={`repeat(${items.length}, 1fr)`}
  >
    <Motion
      bg="#F5B722"
      height="100%"
      position="absolute"
      borderRadius="0.5rem"
      width={`${100 / items.length}%`}
      animate={{ x: `${selected * 100}%`, y: 0 }}
      transition={{ ease: 'anticipate' }}
    />
    {items.map((item, index) => (
      <TabText
        py="0.75rem"
        key={unikey()}
        cursor="pointer"
        position="relative"
        textTransform="uppercase"
        onClick={() => onSelect(index)}
        color={index === selected ? '#000' : '#F5B722'}
      >
        {item}
      </TabText>
    ))}
  </Div>
);

export default Tabs;
