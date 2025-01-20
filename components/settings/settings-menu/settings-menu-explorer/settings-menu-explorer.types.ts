export interface SettingsMenuExplorerItemProps {
  name: string;
  title: string;
  selected: boolean;
  withBorder: boolean;
  onSelect: () => void;
}
