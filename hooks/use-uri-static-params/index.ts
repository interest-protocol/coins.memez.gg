import { useEffect, useState } from 'react';

const useURIStaticParams = () => {
  const [params, setParams] = useState<URLSearchParams>();

  useEffect(() => {
    setParams(new URLSearchParams(window.location.href.split('?')[1]));
  }, []);

  return params;
};

export default useURIStaticParams;
