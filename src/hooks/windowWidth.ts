import { useState, useEffect } from 'react';

const useWindoWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 1200;
  });

  useEffect(() => {
    function handleWindowResizeTimeout() {
      setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 500);
    }

    window.addEventListener('resize', handleWindowResizeTimeout);
    return () => {
      window.removeEventListener('resize', handleWindowResizeTimeout);
    };
  }, []);
  return windowWidth;
};

export default useWindoWidth;
