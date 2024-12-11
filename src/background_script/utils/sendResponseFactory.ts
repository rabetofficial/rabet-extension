import { ISendResponse } from 'background_script/types';

const sendResponse: ISendResponse = (func: (msg: any) => any) => (data: any) =>
  func(JSON.stringify(data));

export default sendResponse;
