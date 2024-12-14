import { A } from '@stylin.js/elements';
import { FC } from 'react';

import { FooterSocialItemProps } from './footer.types';

const FooterSocialItem: FC<FooterSocialItemProps> = ({ Icon, name, link }) => (
  <A
    href={link}
    title={name}
    display="flex"
    width="2.5rem"
    height="2.5rem"
    target="_blank"
    rel="noreferrer"
    borderRadius="50%"
    alignItems="center"
    justifyContent="center"
    border="1px solid #fff"
    nHover={{ transform: 'scale(1.05)' }}
    transition="transform 300ms ease-in-out"
  >
    <Icon maxWidth="1.25rem" maxHeight="1.25rem" width="100%" />
  </A>
);

export default FooterSocialItem;
