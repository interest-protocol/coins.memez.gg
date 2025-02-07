export const CARD_MODE_STORAGE_KEY = 'coins-memez-card-mode';

export enum CardMode {
  Description = 'description',
  Supply = 'supply',
}

export const CARD_MODES = [CardMode.Description, CardMode.Supply];

export const CARD_MODE_DISPLAY = {
  [CardMode.Description]: 'Description',
  [CardMode.Supply]: 'Supply',
};
