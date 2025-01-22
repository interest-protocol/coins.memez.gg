import { FC } from 'react';

import { SVGProps } from './svg.types';

const Caution: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 20 17"
    fill="none"
    {...props}
  >
    <path
      d="M2.47012 16.9997H17.5301C19.0701 16.9997 20.0301 15.3297 19.2601 13.9997L11.7301 0.989688C10.9601 -0.340312 9.04012 -0.340312 8.27012 0.989688L0.740121 13.9997C-0.0298788 15.3297 0.930121 16.9997 2.47012 16.9997ZM10.0001 9.99966C9.45012 9.99966 9.00012 9.54966 9.00012 8.99966V6.99966C9.00012 6.44966 9.45012 5.99969 10.0001 5.99969C10.5501 5.99969 11.0001 6.44966 11.0001 6.99966V8.99966C11.0001 9.54966 10.5501 9.99966 10.0001 9.99966ZM11.0001 13.9997H9.00012V11.9997H11.0001V13.9997Z"
      fill="currentColor"
    />
  </svg>
);

export default Caution;
