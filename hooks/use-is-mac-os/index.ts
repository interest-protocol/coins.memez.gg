import { useEffect, useState } from 'react';

export const useIsMacOS = () => {
  const [isMacOS, setIsMacOS] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setIsMacOS((window.navigator as any)?.platform.includes('Mac'));
  }, []);

  return isMacOS;
};
