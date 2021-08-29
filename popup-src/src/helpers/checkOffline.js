const checkOffline = () => {
  const { onLine } = navigator;

  return onLine;
};

export default checkOffline;
