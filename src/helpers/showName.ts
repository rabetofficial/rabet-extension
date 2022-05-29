const showName = (name: string) => {
  if (name.length > 20) {
    return `${name.slice(0, 10)}...`;
  }

  return name;
};

export default showName;
