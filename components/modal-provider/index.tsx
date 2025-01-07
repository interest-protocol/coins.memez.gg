import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import { Toaster } from 'react-hot-toast';

import useEventListener from '@/hooks/use-event-listener';
import { useModal } from '@/hooks/use-modal';

const ModalProvider: FC = () => {
  const {
    content,
    onClose,
    allowClose,
    handleClose,
    overlayProps,
    containerProps,
  } = useModal();

  const onHandleClose = () => {
    if (!allowClose) return;

    handleClose();
    onClose?.();
  };

  useEventListener(
    'keydown',
    (e) => {
      if (e && (e as KeyboardEvent).key === 'Escape') onHandleClose();
    },
    true
  );

  if (!content) return null;

  return (
    <Div
      inset="0"
      bg="#0007"
      width="100vw"
      height="100vh"
      display="flex"
      zIndex="999999"
      position="fixed"
      alignItems="center"
      justifyContent="center"
      onClick={onHandleClose}
      backdropFilter="blur(10px)"
      {...overlayProps}
    >
      <Toaster />
      <Div
        maxWidth="95vw"
        maxHeight="95vh"
        {...containerProps}
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </Div>
    </Div>
  );
};

export default ModalProvider;
