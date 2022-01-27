const controlNumberInput = (e) => {
  const charCode = (typeof e.which === 'undefined') ? e.keyCode : e.which;
  const charStr = String.fromCharCode(charCode);
  if (!charStr.match(/^[0-9]*\.?[0-9]*$/)) e.preventDefault();
};

export default controlNumberInput;
