import { FC } from 'react';

import { SVGProps } from './svg.types';

const ChevronDown: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 16 10"
    fill="none"
    {...props}
  >
    <path
      d="M15 1.5L8 8.5L1 1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ChevronDown;
