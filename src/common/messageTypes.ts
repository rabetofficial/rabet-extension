export interface ConnectMessageDetail {
  host: string;
  href: string;
  title: string;
  screenX: number;
  screenY: number;
  outerWidth: number;
}

export interface ConnectMessageType {
  detail: ConnectMessageDetail;
}

export interface LoginMessageType {
  id: string;
  type: 'RABET_EXTENSION_LOGIN';
  values: { password: string };
  destination: string;
  detail: {
    host: string;
    title: string;
  };
}

export interface LoginToSignMessageType {
  id: string;
  values: { password: string };
  type: 'RABET_EXTENSION_LOGIN_TO_SIGN';
  destination: string;
  detail: {
    host: string;
    title: string;
  };
  xdr: {
    xdr: string;
    network: string;
  };
}

export interface ContactRequestResponseMessageType {
  type: 'RABET_EXTENSION_CONTACT_REQUEST_RESPONSE';
  id: string;
  result: 'reject' | 'confirm';
  detail: {
    host: string;
    title: string;
  };
  activeAcconut: {
    name: string;
    publicKey: string;
  };
}

export interface SignMessageDetail {
  xdr: string;
  network: string;
  host: string;
  title: string;
  screenX: number;
  screenY: number;
  outerWidth: number;
}

export interface SignMessageType {
  detail: SignMessageDetail;
}

export interface SignXdrResponseType {
  type: 'RABET_EXTENSION_SIGN_XDR_RESPONSE';
  id: string;
  result: 'close' | 'confirm' | 'reject';
  // if result is confirm or reject =>
  detail: {
    host: string;
    title: string;
  };
  xdr: {
    xdr: string;
    network: string;
  };
}

export interface DisconnectType {
  detail: {
    host: string;
    href: string;
  };
}
