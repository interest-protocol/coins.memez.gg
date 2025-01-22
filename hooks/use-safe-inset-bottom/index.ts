import { useState } from 'react';

import useEventListener from '../use-event-listener';

export const useSafeInsetBottom = () => {
  const [safeInsetBottom, setSafeInsetBottom] = useState(0);

  const bottomInset = () =>
    setSafeInsetBottom(
      window.visualViewport
        ? window.visualViewport.height - window.innerHeight
        : 0
    );

  useEventListener('resize', bottomInset, true);
  useEventListener('load', bottomInset, true);

  return safeInsetBottom;
};
