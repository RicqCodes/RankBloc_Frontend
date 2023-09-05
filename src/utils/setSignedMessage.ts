import { setCookie, getCookie } from "cookies-next";
export const setSignedMessage = (signature: string, nonce: string) => {
  setCookie("userSignature", signature, { secure: true });
  setCookie("nonce", nonce, { secure: true });
};

export const getSignedMessage = (name: string) => {
  return getCookie(name);
};
