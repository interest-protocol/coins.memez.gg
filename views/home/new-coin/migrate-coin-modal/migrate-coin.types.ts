export enum Step {
  Select,
  Features,
  Preview,
}

export const STEPS: ReadonlyArray<Step.Select | Step.Features> = [
  Step.Select,
  Step.Features,
];

export interface IMigrateCoin {
  step: Step;
  name: string;
  type: string;
  symbol: string;
  supply: number;
  decimals: number;
  imageUrl: string;
  maxSupply: number;
  treasuryId: string;
  description: string;
  showPreview: boolean;
  features: {
    canBurn: boolean;
    burnable: boolean;
    editable: boolean;
    mintable: boolean;
  };
}
