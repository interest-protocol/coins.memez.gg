import { FC } from 'react';

import { SVGProps } from './svg.types';

const Times: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 19 18"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.46967 3.96967C4.76256 3.67678 5.23744 3.67678 5.53033 3.96967L9.5 7.93934L13.4697 3.96967C13.7626 3.67678 14.2374 3.67678 14.5303 3.96967C14.8232 4.26256 14.8232 4.73744 14.5303 5.03033L10.5607 9L14.5303 12.9697C14.8232 13.2626 14.8232 13.7374 14.5303 14.0303C14.2374 14.3232 13.7626 14.3232 13.4697 14.0303L9.5 10.0607L5.53033 14.0303C5.23744 14.3232 4.76256 14.3232 4.46967 14.0303C4.17678 13.7374 4.17678 13.2626 4.46967 12.9697L8.43934 9L4.46967 5.03033C4.17678 4.73744 4.17678 4.26256 4.46967 3.96967Z"
      fill="currentColor"
    />
  </svg>
);

export default Times;
