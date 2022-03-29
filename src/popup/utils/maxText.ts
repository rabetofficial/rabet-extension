const maxText = (text: string, max: number): string => {
  if (text.length > max) {
    return `${text.slice(0, max)}...`;
  }

  return text;
};

export default maxText;
