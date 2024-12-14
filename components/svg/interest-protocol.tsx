import { FC } from 'react';

import { SVGProps } from './svg.types';

const InterestProtocol: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 34 28"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.3805 0.666656C12.1956 0.666656 13.6668 2.14361 13.6668 3.96524V7.35818H10.2865C8.47163 7.35818 7.00016 5.88123 7.00016 4.0596V0.666656H10.3805ZM16.9532 7.35818C15.1383 7.35818 13.6668 8.83513 13.6668 10.6568V14.0497H17.0472C18.862 14.0497 20.3335 12.5728 20.3335 10.7511V7.35818H23.7138C25.5287 7.35818 27.0002 5.88123 27.0002 4.0596V0.666656H23.6198C21.805 0.666656 20.3335 2.14361 20.3335 3.96524V7.35818H16.9532ZM17.0472 20.7412C18.862 20.7412 20.3335 22.2182 20.3335 24.0398V27.4328H16.9532C15.1383 27.4328 13.6668 25.9558 13.6668 24.1342V20.7412H17.0472ZM7.00016 14.0497H3.61983C1.80496 14.0497 0.333496 12.5728 0.333496 10.7511V7.35818H3.71383C5.5287 7.35818 7.00016 8.83513 7.00016 10.6568V14.0497ZM7.00016 14.0497V17.4426C7.00016 19.2643 8.47163 20.7412 10.2865 20.7412H13.6668V17.3483C13.6668 15.5267 12.1956 14.0497 10.3805 14.0497H7.00016ZM23.6198 14.0497C21.805 14.0497 20.3335 15.5267 20.3335 17.3483V20.7412H23.7138C25.5287 20.7412 27.0002 19.2643 27.0002 17.4426V14.0497H30.3805C32.1954 14.0497 33.6668 12.5728 33.6668 10.7511V7.35818H30.2865C28.4716 7.35818 27.0002 8.83513 27.0002 10.6568V14.0497H23.6198Z"
      fill="currentColor"
    />
  </svg>
);

export default InterestProtocol;
