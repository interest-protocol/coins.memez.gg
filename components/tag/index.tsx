import { Div } from '@stylin.js/elements';
import { FC, PropsWithChildren } from 'react';

import { TagProps } from './tag.types';

const Tag: FC<PropsWithChildren<TagProps>> = ({ hexColor, children }) => (
  <Div
    color={hexColor}
    bg={`${hexColor}1A`}
    borderRadius="1.25rem"
    border={`1px solid ${hexColor}`}
    px={['0.75rem', '0.75rem', '1rem']}
    py={['0.25rem', '0.25rem', '0.375rem']}
  >
    {children}
  </Div>
);

export default Tag;
