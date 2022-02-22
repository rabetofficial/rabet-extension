const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default timeout;
