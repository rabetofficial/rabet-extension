const serialize = (obj) => {
  const qs = Object
    .entries(obj)
    .map((x) => `${x[0]}=${x[1]}`);

  return qs.join('&');
};

export default serialize;
