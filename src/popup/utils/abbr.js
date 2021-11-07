export default (name) => {
  const arr = name.toUpperCase().split(' ');

  if (arr.length === 1) {
    return `${arr[0].charAt(0)}`;
  }

  return `${arr[0].charAt(0)}${arr[1].charAt(0)}`;
};
