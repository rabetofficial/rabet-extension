import React, { useState, useEffect } from 'react';

const useDetectSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (size.width > 300 && size.width < 400) {
    return 'extension';
  }

  return 'desktop';
};

export default useDetectSize;
