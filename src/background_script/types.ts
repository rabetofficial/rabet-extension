export type ISend = (data: any) => any;
export type ISendCollection = Record<string, ISend>;
export type ISendResponse = (func: (msg: string) => any) => ISend;
