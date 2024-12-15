import { FC } from 'react';

import { SVGProps } from './svg.types';

const CirclePlus: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <path
      d="M8.99935 17.3332C13.6017 17.3332 17.3327 13.6022 17.3327 8.99984C17.3327 4.39746 13.6017 0.666504 8.99935 0.666504C4.39698 0.666504 0.666016 4.39746 0.666016 8.99984C0.666016 13.6022 4.39698 17.3332 8.99935 17.3332Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 5.66663V12.3333"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.66602 9H12.3327"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CirclePlus;
