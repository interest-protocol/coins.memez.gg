import { A, Div, Footer as HtmlFooter, Nav } from '@stylin.js/elements';
import { FC } from 'react';
import unikey from 'unikey';

import { InterestProtocolSVG } from '@/components/svg';

import { SOCIAL_ITEMS } from './footer.data';
import FooterSocialItem from './footer-social-item';

const Footer: FC = () => (
  <HtmlFooter bg="#00000033" backdropFilter="blur(40px)" p={['1.5rem', '2rem']}>
    <Div
      mx="auto"
      display="flex"
      maxWidth="79.75rem"
      alignItems="center"
      justifyContent="space-between"
    >
      <A
        target="_blank"
        rel="noreferrer"
        href="https://interestprotocol.com"
        nHover={{ transform: 'scale(1.05)' }}
        transition="transform 300ms ease-in-out"
      >
        <InterestProtocolSVG
          maxWidth="2.5rem"
          maxHeight="2.5rem"
          width="100%"
        />
      </A>
      <Nav display="flex" gap="0.75rem">
        {SOCIAL_ITEMS.map((props) => (
          <FooterSocialItem key={unikey()} {...props} />
        ))}
      </Nav>
    </Div>
  </HtmlFooter>
);

export default Footer;
