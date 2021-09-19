export default (url) => {
  const urlParts = /^(?:\w+\:\/\/)?([^\/]+)([^\?]*)\??(.*)$/.exec(url);

  return urlParts[1];
};
