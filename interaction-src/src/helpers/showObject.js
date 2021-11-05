const showObject = (obj) => {
  const arr = Object.entries(obj);

  const str = arr.reduce((store, field) => {
    let value = field[1];

    if (typeof value === 'object') {
      value = showObject(value);
    }

    return `${store}${value}-`;
  }, '');

  return str.slice(0, -1);
};

export default showObject;
