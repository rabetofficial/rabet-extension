const validateMemo = (memo) => {
  if (memo.length > 28) {
    return false;
  }

  return true;
};

export default validateMemo;
