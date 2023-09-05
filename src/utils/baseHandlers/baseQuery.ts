import axios from "axios";

export const baseQuery = async (
  url: string,
  data?: any,
  method: string = "GET"
) => {
  return await axios(url, {
    method,
    data: data ? data : undefined,
  }).then((res) => res.data);
};
