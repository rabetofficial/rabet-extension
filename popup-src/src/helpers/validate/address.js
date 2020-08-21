export default (address) => {
  if (!address) {
    return false;
  }

  if (address.length !== 56) {
    return false;
  }

  if (address.charAt(0) !== 'G') {
    return false;
  }

  return true;
}
