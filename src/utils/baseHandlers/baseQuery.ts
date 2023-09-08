import axios from "axios";
import { getCookie } from "cookies-next";

export const baseQuery = async (
  url: string,
  data?: any,
  method: string = "GET"
) => {
  const config = {
    method,
    headers: {
      token: getCookie("token"),
      "x-signed-message": getCookie("userSignature"),
      "x-nonce": getCookie("nonce"),
    },
    data: data ? data : undefined,
  };
  return await axios(url, config).then((res) => res.data);
};
