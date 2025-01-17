import { Button, Div, DivElementProps } from '@stylin.js/elements';
import { AnimatePresence } from 'motion/react';
import { not } from 'ramda';
import { FC, useState } from 'react';

import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';

import { MenuSVG } from '../svg';
import SettingsMenu from './settings-menu';

const Settings: FC = () => {
  const [show, setShow] = useState(false);

  const menuRef = useClickOutsideListenerRef<DivElementProps>(() =>
    setShow(false)
  );

  return (
    <Div
      ref={menuRef}
      display="flex"
      position="relative"
      alignItems="flex-end"
      flexDirection="column"
    >
      <Button
        all="unset"
        cursor="pointer"
        onClick={() => setShow(not)}
        nHover={{ color: '#F5B722' }}
      >
        <MenuSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
      </Button>
      <AnimatePresence>{show && <SettingsMenu />}</AnimatePresence>
    </Div>
  );
};

export default Settings;
