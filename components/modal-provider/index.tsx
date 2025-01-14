import { Div } from '@stylin.js/elements';
import { AnimatePresence, motion } from 'motion/react';
import { FC } from 'react';
import { Toaster } from 'react-hot-toast';

import useEventListener from '@/hooks/use-event-listener';
import { useModal } from '@/hooks/use-modal';

const Motion = motion.create(Div);

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

  return (
    <AnimatePresence>
      {content ? (
        <Motion
          inset="0"
          bg="#0007"
          width="100vw"
          height="100vh"
          display="flex"
          zIndex="999999"
          position="fixed"
          alignItems="center"
          exit={{ opacity: 0 }}
          justifyContent="center"
          onClick={onHandleClose}
          backdropFilter="blur(10px)"
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
          pb="env(safe-area-inset-bottom)"
          {...overlayProps}
        >
          <Toaster />
          <Motion
            maxWidth="95vw"
            maxHeight="95vh"
            transition={{ duration: 0.5, delay: 0.2 }}
            animate={{
              y: ['200vh', '0vh'],
              scale: [0.5, 1],
            }}
            {...containerProps}
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </Motion>
        </Motion>
      ) : null}
    </AnimatePresence>
  );
};

export default ModalProvider;
