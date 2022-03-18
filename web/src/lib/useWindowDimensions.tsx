import { useState, useEffect } from 'react';

function getWindowDimensions() {
  if (typeof window === 'undefined') {
    return {
      width: 0,
      height: 0,
      screenSize: null,
      isSmall: null,
    };
  }
  const { innerWidth: width, innerHeight: height } = window;

  let screenSize;
  if (width < 450) {
    screenSize = 'small';
  } else if (width < 675) {
    screenSize = 'medium';
  } else {
    screenSize = 'large';
  }
  const isSmall = screenSize === 'small';

  return {
    width,
    height,
    screenSize,
    isSmall,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
