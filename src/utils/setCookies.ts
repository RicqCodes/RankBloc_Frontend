import { setCookie, getCookie } from "cookies-next";
export const setCookieClient = (name: string, cookieToSave: string) => {
  setCookie(name, cookieToSave, { secure: true });
};

export const getCookieClient = (name: string) => {
  return getCookie(name);
};
