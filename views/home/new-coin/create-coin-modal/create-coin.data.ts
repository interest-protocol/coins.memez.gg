import { Step } from './create-coin.types';

export const STEPS = [Step.Details, Step.Supply, Step.Features];

export const STEP_DISPLAY = {
  [Step.Details]: 'Details',
  [Step.Supply]: 'Supply',
  [Step.Features]: 'Features',
};

export const NEXT_BUTTON_TEXT = {
  [Step.Details]: 'Next',
  [Step.Supply]: 'Next',
  [Step.Features]: 'Preview',
};

export const NEXT_STEP = {
  [Step.Details]: Step.Supply,
  [Step.Supply]: Step.Features,
  [Step.Features]: Step.Preview,
};
