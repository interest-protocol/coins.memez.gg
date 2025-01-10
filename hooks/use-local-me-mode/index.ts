import { useLocalStorage } from 'usehooks-ts';

import { ME_MODE_STORAGE_KEY } from './use-local-me-mode.data';

export const useLocalMeMode = () =>
  useLocalStorage<boolean>(ME_MODE_STORAGE_KEY, false);
