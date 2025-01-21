import { FC } from 'react';

import { SVGProps } from './svg.types';

const Info: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.00008 1.29175C13.2567 1.29175 16.7084 4.74258 16.7084 9.00008C16.7084 13.2567 13.2567 16.7084 9.00008 16.7084C4.74258 16.7084 1.29175 13.2567 1.29175 9.00008C1.29175 4.74258 4.74258 1.29175 9.00008 1.29175Z"
      stroke="currentColor"
      strokeOpacity="0.6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.99601 5.83679V9.51929"
      stroke="currentColor"
      strokeOpacity="0.6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.99587 12.1634H9.00421"
      stroke="currentColor"
      strokeOpacity="0.6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Info;
