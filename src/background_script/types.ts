import { IOption } from "popup/reducers/options";
import { IAccount } from "popup/reducers/accounts2";

export type ISend = (data: any) => any;
export type ISendCollection = Record<string, ISend>;
export type ISendResponse = (func: (msg: string) => any) => ISend;

export type ActionState = {
  options: IOption;
  needsLogin: boolean;
  accounts: IAccount[];
  connectedWebsites: string[];
  activeAccount: IAccount | null;
}
