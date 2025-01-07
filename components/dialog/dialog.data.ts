import { FC } from 'react';

import { CheckSVG, ExclamationCircleSVG, WarningSVG } from '@/components/svg';

import { SVGProps } from '../svg/svg.types';

export const COLOR_MAP: Record<string, string> = {
  warning: '#D87706',
  info: '#F5B722',
  success: '#baf6cf',
  error: '#ff562c',
};

export const STATUS_ICON: Record<string, FC<SVGProps>> = {
  error: WarningSVG,
  warning: ExclamationCircleSVG,
  info: ExclamationCircleSVG,
  success: CheckSVG,
};
