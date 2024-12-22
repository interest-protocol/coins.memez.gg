export enum Step {
  Details,
  Supply,
  Features,
  Preview,
}

export const STEPS: ReadonlyArray<Step.Details | Step.Supply | Step.Features> =
  [Step.Details, Step.Supply, Step.Features];

export interface ICreateCoin {
  step: Step;
  name: string;
  symbol: string;
  supply: number;
  decimals: number;
  imageUrl: string;
  description: string;
  showPreview: boolean;
}
