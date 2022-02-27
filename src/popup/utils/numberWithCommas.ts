const numberWithCommas = (n: string | number) => {
  let num = n;

  if (typeof n === 'string') {
    num = parseFloat(n);
  }

  const parts = num.toString().split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parts.join('.');
};

export default numberWithCommas;
