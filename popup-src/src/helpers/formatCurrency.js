export default (number) => {
  if (isNaN(number)) {
    return 0;
  }

  if (number === 0 || number < 0) {
    return number;
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
