export default (str) => {
  const el = global.document.createElement('textarea');

  el.value = str;

  global.document.body.appendChild(el);

  el.select();

  global.document.execCommand('copy');
  global.document.body.removeChild(el);
};
