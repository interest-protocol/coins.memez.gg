import { FC } from 'react';

import { SVGProps } from './svg.types';

const Filter: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 22 22"
    fill="none"
    {...props}
  >
    <path
      d="M19.25 3.1228H2.75V6.5186L8.9375 12.8312V18.8766L13.0625 17.2644V12.8312L19.25 6.5186V3.1228Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      stroke="currentColor"
    />
  </svg>
);

export default Filter;
