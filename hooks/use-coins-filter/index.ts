import { create } from 'zustand';

import { UseCoinsFilter } from './use-coins-filter.types';

export const useCoinsFilter = create<UseCoinsFilter>((set) => ({
  page: 1,
  limit: 1,
  filter: {
    burnable: false,
    mintable: false,
    editable: false,
  },
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
  setFilter: (filter) =>
    set(({ filter: coinsFilter }) => ({
      filter: { ...coinsFilter, ...filter },
    })),
}));
