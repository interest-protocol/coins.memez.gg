import { Div } from '@stylin.js/elements';
import { motion } from 'motion/react';
import { FC, PropsWithChildren } from 'react';

import { TagProps } from './tag.types';

const Motion = motion.create(Div);

const Tag: FC<PropsWithChildren<TagProps>> = ({
  onClick,
  hexColor,
  children,
}) => (
  <Motion
    gap="0.25rem"
    display="flex"
    color={hexColor}
    onClick={onClick}
    alignItems="center"
    bg={`${hexColor}1A`}
    borderRadius="1.25rem"
    border={`1px solid ${hexColor}`}
    px={['0.75rem', '0.75rem', '1rem']}
    cursor={onClick ? 'pointer' : 'unset'}
    py={['0.25rem', '0.25rem', '0.375rem']}
    {...(!!onClick && {
      whileHover: { scale: 1.05 },
      animate: { rotate: ['1deg', '-1deg'] },
      transition: {
        ease: 'linear',
        duration: 0.25,
        repeat: Infinity,
      },
    })}
  >
    {children}
  </Motion>
);

export default Tag;
