export interface SettingsMenuItemProps {
  name: string;
  title: string;
  selected: boolean;
  withBorder: boolean;
  onSelect: () => void;
}
