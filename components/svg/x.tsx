import { FC } from 'react';

import { SVGProps } from './svg.types';

const X: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 20 19"
    fill="none"
    {...props}
  >
    <path
      d="M0.048762 -6.10352e-05L7.77054 10.3247L0 18.7191H1.74884L8.55193 11.3697L14.0486 18.7191H20L11.8438 7.81364L19.0765 -6.10352e-05H17.3277L11.0624 6.76866L6.00012 -6.10352e-05H0.048762Z"
      fill="currentColor"
    />
  </svg>
);

export default X;
