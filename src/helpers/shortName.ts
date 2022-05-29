export default (name: string): string => {
  const nameSplitter = name.split(' ');

  const first = nameSplitter[0].charAt(0);
  let second = '';

  if (nameSplitter[1]) {
    second = nameSplitter[1].charAt(0) || '';
  }

  return first + second;
};
