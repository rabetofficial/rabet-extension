export default (number) => {
  let newNum = number;

  if (typeof number === 'string') {
    newNum = parseFloat(number);
  }

  if (newNum < 0) {
    newNum = 0;
  }

  return newNum;
};
