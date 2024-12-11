import { E_GENERATED_ID, E_GENERATED_ID_RES } from '../../common/messageEvents';

interface IIntervalMessage {
  detail: any;
  page: string;
  generatedId: string;
  type?: string;
  destination?: string;
  activeAcconut?: {
    name?: string;
    publicKey: string;
  };
  xdr?: {
    xdr: string;
    network: string;
  };
}

const sendInterval = (tabId: number, msg: IIntervalMessage) => {
  const message = {
    type: E_GENERATED_ID,
    ...msg,
  };

  const p = setInterval(() => {
    chrome.tabs.sendMessage(tabId, message, (res) => {
      if (res && res.type === E_GENERATED_ID_RES) {
        clearInterval(p);
      }
    });
  }, 100);
};

export default sendInterval;
