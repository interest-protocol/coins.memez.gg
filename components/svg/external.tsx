import { FC } from 'react';

import { SVGProps } from './svg.types';

const External: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 13 13"
    fill="none"
    {...props}
  >
    <path
      d="M1.50003 0H12.5V11H10.5V3.41421L1.50003 12.4142L0.0858154 11L9.08582 2H1.50003V0Z"
      fill="currentColor"
    />
  </svg>
);

export default External;
