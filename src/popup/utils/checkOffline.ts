const checkOffline = (): boolean => {
  const { onLine } = navigator;

  return onLine;
};

export default checkOffline;
