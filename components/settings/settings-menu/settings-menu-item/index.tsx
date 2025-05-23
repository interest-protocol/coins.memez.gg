import { Div, Span } from '@stylin.js/elements';
import { memo } from 'react';

import { ToggleButton } from '@/components/toggle';

import { SettingsMenuItemProps } from './settings-menu-item.types';

const SettingsMenuItem = memo<SettingsMenuItemProps>(
  ({ name, title, selected, onSelect, withBorder }) => (
    <Div
      mx="1rem"
      py="0.5rem"
      display="flex"
      onClick={() => onSelect()}
      justifyContent="space-between"
      {...(withBorder && { borderTop: '1px solid #242424' })}
    >
      <Span>{title}</Span>
      <ToggleButton name={name} defaultValue={selected} />
    </Div>
  )
);

SettingsMenuItem.displayName = SettingsMenuItem.name;

export default SettingsMenuItem;
