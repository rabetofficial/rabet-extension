export default (func) => {
  return (data) => {
    return func(JSON.stringify(data));
  };
};
