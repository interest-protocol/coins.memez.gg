import { DivProps } from '@stylin.js/elements';
import { ReactNode } from 'react';
import { create } from 'zustand';

interface UseModal {
  content: ReactNode;
  onClose?: () => void;
  allowClose?: boolean;
  overlayProps?: DivProps;
  handleClose: () => void;
  setContent: (
    content: ReactNode,
    options?: {
      onClose?: () => void;
      allowClose?: boolean;
      overlayProps?: DivProps;
    }
  ) => void;
}

export const useModal = create<UseModal>((set) => ({
  content: null,
  allowClose: false,
  onClose: undefined,
  overlayProps: undefined,
  setContent: (content, options) => set({ content, ...options }),
  handleClose: () => set({ content: null, overlayProps: undefined }),
}));
