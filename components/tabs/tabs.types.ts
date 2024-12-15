export interface TabsProps {
  selected: number;
  items: ReadonlyArray<string>;
  onSelect: (index: number) => void;
}
