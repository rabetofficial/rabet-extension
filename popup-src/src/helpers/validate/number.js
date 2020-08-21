export default (number) => {
  const toFloat = Number.parseFloat(number, 10);

  if (isNaN(toFloat)) {
    return false;
  }

  return true;
}
