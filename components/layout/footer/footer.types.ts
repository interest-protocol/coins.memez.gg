import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export interface FooterSocialItemProps {
  link: string;
  name: string;
  Icon: FC<SVGProps>;
}
