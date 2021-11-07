export default (func) => (data) => func(JSON.stringify(data));
