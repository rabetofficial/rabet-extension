export default (name) => {
  if (!name) {
    return false;
  }

  if (name.length > 19) {
    return false;
  }

  return true;
}
