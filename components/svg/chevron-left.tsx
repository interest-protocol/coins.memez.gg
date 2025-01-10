import { FC } from 'react';

import { SVGProps } from './svg.types';

const ChevronLeft: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.4714 3.52876C10.7318 3.78911 10.7318 4.21122 10.4714 4.47157L6.94285 8.00016L10.4714 11.5288C10.7318 11.7891 10.7318 12.2112 10.4714 12.4716C10.2111 12.7319 9.78899 12.7319 9.52864 12.4716L5.52864 8.47157C5.26829 8.21122 5.26829 7.78911 5.52864 7.52876L9.52864 3.52876C9.78899 3.26841 10.2111 3.26841 10.4714 3.52876Z"
      fill="currentColor"
      fillOpacity="0.64"
    />
  </svg>
);

export default ChevronLeft;
