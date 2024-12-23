import { Div } from '@stylin.js/elements';
import { FC, useEffect } from 'react';

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

  useEffect(() => {
    if (content) window.document.body.style.overflowY = 'hidden';
    () => (window.document.body.style.overflowY = 'auto');
  }, [content]);

  if (!content) return null;

  const onHandleClose = () => {
    if (!allowClose) return;

    handleClose();
    onClose?.();
  };

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
      {...overlayProps}
    >
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
