import { Filter } from '@/interface';

export interface UseCoinsFilter {
  page: number;
  limit: number;
  filter: Filter;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setFilter: (filter: Filter) => void;
}
