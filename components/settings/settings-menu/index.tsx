import { Div, Hr } from '@stylin.js/elements';
import { motion } from 'motion/react';
import { FC, useState } from 'react';

import SettingsMenuExplorer from './settings-menu-explorer';
import SettingsMenuRPC from './settings-menu-rpc';

const Motion = motion.create(Div);

const SettingsMenu: FC = () => {
  const [menu, setMenu] = useState<'explorer' | 'rpc' | null>(null);

  return (
    <Motion
      p="1rem"
      gap="2rem"
      mt="2.5rem"
      bg="#3C3C3C80"
      display="flex"
      overflow="hidden"
      position="absolute"
      exit={{ scaleY: 0 }}
      style={{ originY: 0 }}
      borderRadius="1.125rem"
      backdropFilter="blur(30px)"
      animate={{ scaleY: [0, 1] }}
    >
      <Motion bg="#1A1A1A" py="0.5rem" borderRadius="0.75rem" width="20rem">
        <SettingsMenuExplorer
          show={menu === 'explorer'}
          toggleShow={() => setMenu(menu === 'explorer' ? null : 'explorer')}
        />
        <Hr border="none" borderBottom="1px solid #242424" />
        <SettingsMenuRPC
          show={menu === 'rpc'}
          toggleShow={() => setMenu(menu === 'rpc' ? null : 'rpc')}
        />
      </Motion>
    </Motion>
  );
};

export default SettingsMenu;
