export default (n) => {
  let number = n;

  if (typeof n === 'number') {
    number = n.toString();
  }

  if (isNaN(number)) {
    return 0;
  }

  if (n > 0 && n < 1) {
    return n;
  }

  if (number === 0 || number < 0 || parseFloat(number) === 0) {
    return 0;
  }

  const [qableAshar, ashar] = number.toString().split('.');

  const integer = qableAshar || '0';

  switch (qableAshar.length) {
    case 0:
      return Number.parseFloat(`${integer}.${ashar.slice(0, 7)}`, 10);
    case 1:
      return Number.parseFloat(`${integer}.${ashar.slice(0, 6)}`, 10);
    case 2:
      return Number.parseFloat(`${integer}.${ashar.slice(0, 5)}`, 10);
    case 3:
      return Number.parseFloat(`${integer}.${ashar.slice(0, 4)}`, 10);
    case 4:
      return Number.parseFloat(`${integer}.${ashar.slice(0, 3)}`, 10);
    case 5:
      return Number.parseFloat(`${integer}.${ashar.slice(0, 2)}`, 10);
    default:
      return Number.parseFloat(`${integer}`, 10);
  }
};
