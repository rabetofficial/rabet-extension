export default (text, size) => {
  return `${text.slice(0, size)}...${text.slice(-size)}`;
}
