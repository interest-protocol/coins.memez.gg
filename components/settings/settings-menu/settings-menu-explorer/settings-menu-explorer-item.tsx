import { Div, Span } from '@stylin.js/elements';
import { memo } from 'react';

import { ToggleButton } from '@/components/toggle';

import { SettingsMenuExplorerItemProps } from './settings-menu-explorer.types';

const SettingsMenuExplorerItem = memo<SettingsMenuExplorerItemProps>(
  ({ name, title, selected, onSelect }) => (
    <Div
      mx="1rem"
      py="0.5rem"
      display="flex"
      onClick={() => onSelect()}
      justifyContent="space-between"
      borderTop="1px solid #242424"
    >
      <Span>{title}</Span>
      <ToggleButton name={name} defaultValue={selected} />
    </Div>
  )
);

SettingsMenuExplorerItem.displayName = SettingsMenuExplorerItem.name;

export default SettingsMenuExplorerItem;
