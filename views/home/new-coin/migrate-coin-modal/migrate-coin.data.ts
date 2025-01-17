import { Step } from './migrate-coin.types';

export const STEPS = [Step.Select, Step.Features];

export const STEP_DISPLAY = {
  [Step.Select]: 'Select',
  [Step.Features]: 'Features',
};

export const NEXT_BUTTON_TEXT = {
  [Step.Select]: 'Next',
  [Step.Features]: 'Preview',
};

export const NEXT_STEP = {
  [Step.Select]: Step.Features,
  [Step.Features]: Step.Preview,
};
