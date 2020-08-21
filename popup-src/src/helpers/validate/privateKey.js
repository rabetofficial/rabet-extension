export default (privateKey) => {
  if (!privateKey) {
    return false;
  }

  if (privateKey.length !== 56) {
    return false;
  }

  if (privateKey.charAt(0) !== 'S') {
    return false;
  }

  return true;
}
