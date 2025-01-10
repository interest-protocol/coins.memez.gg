import { FC } from 'react';
import Countdown from 'react-countdown';

import { useDialog } from '@/hooks/use-dialog';

import { DialogCountdownProps } from './dialog.types';

const DialogCountdown: FC<DialogCountdownProps> = ({ timeout }) => {
  const { handleClose } = useDialog();

  return (
    <Countdown
      onComplete={handleClose}
      date={Date.now() + timeout}
      renderer={({ seconds }) => seconds}
    />
  );
};

export default DialogCountdown;
