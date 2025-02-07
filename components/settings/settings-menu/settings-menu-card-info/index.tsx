import { Div, P } from '@stylin.js/elements';
import { AnimatePresence, motion } from 'motion/react';
import { FC } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { ChevronRightSVG } from '@/components/svg';
import {
  CARD_MODE_DISPLAY,
  CARD_MODE_STORAGE_KEY,
  CARD_MODES,
  CardMode,
} from '@/constants';

import { SettingsMenusProps } from '../settings-menu.types';
import SettingsMenuItem from '../settings-menu-item';

const Motion = motion.create(Div);

const SettingsMenuCardInfo: FC<SettingsMenusProps> = ({ show, toggleShow }) => {
  const [cardMode, setCardMode] = useLocalStorage<CardMode>(
    CARD_MODE_STORAGE_KEY,
    CardMode.Description
  );

  return (
    <Motion>
      <Div
        px="1rem"
        py="0.5rem"
        display="flex"
        cursor="pointer"
        alignItems="center"
        onClick={toggleShow}
        justifyContent="space-between"
      >
        <P>Card Display</P>
        <Motion animate={{ rotate: show ? '90deg' : '0deg' }}>
          <ChevronRightSVG
            width="100%"
            maxWidth="1.25rem"
            maxHeight="1.25rem"
          />
        </Motion>
      </Div>
      <AnimatePresence>
        {show && (
          <Motion
            ml="1.5rem"
            style={{ originY: 0 }}
            exit={{ scaleY: 0, height: 0, opacity: 0 }}
            animate={{
              scaleY: [0, 1],
              height: [0, 'auto'],
              opacity: [0, 1, 1],
            }}
          >
            {CARD_MODES.map((mode, index) => (
              <SettingsMenuItem
                key={mode}
                name={mode}
                withBorder={!!index}
                selected={mode === cardMode}
                title={CARD_MODE_DISPLAY[mode]}
                onSelect={() => setCardMode(mode)}
              />
            ))}
          </Motion>
        )}
      </AnimatePresence>
    </Motion>
  );
};

export default SettingsMenuCardInfo;
