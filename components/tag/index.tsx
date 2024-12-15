import { Div } from '@stylin.js/elements';
import { FC, PropsWithChildren } from 'react';

import { TagProps } from './tag.types';

const Tag: FC<PropsWithChildren<TagProps>> = ({ hexColor, children }) => (
  <Div
    px="1rem"
    py="0.375rem"
    color={hexColor}
    bg={`${hexColor}1A`}
    borderRadius="1.25rem"
    border={`1px solid ${hexColor}`}
  >
    {children}
  </Div>
);

export default Tag;
