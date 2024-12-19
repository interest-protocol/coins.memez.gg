export interface CreateCoinFieldProps {
  name: string;
  label: string;
  limit?: string;
  support?: string;
  supportColor?: string;
  placeholder: string;
  kind: 'text' | 'numeric';
}
