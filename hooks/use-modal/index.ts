import { DivProps } from '@stylin.js/elements';
import { ReactNode } from 'react';
import { create } from 'zustand';

type MotionProps = Omit<
  DivProps,
  'transition' | 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
>;

interface UseModal {
  content: ReactNode;
  onClose?: () => void;
  allowClose?: boolean;
  handleClose: () => void;
  overlayProps?: MotionProps;
  containerProps?: MotionProps;
  setContent: (
    content: ReactNode,
    options?: {
      onClose?: () => void;
      allowClose?: boolean;
      overlayProps?: DivProps;
      containerProps?: DivProps;
    }
  ) => void;
}

export const useModal = create<UseModal>((set) => ({
  content: null,
  allowClose: true,
  onClose: undefined,
  overlayProps: undefined,
  containerProps: undefined,
  setContent: (content, options) => set({ content, ...options }),
  handleClose: () => set({ content: null, overlayProps: undefined }),
}));
