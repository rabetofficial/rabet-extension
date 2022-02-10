export default (url: string): string => {
  const urlParts = /^(?:\w+\:\/\/)?([^\/]+)([^\?]*)\??(.*)$/.exec(
    url,
  );

  return urlParts[1];
};
