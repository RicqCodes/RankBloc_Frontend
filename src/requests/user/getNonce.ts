import customRequest from "@/utils/baseHandlers/customRequest";
import getUser from "./getUser";
import axios from "axios";
import { useQuery } from "wagmi";
import { baseQuery } from "@/utils/baseHandlers/baseQuery";
import { env } from "@/utils/env";
const getNonce = async (address: string) => {
  try {
    const response = await baseQuery(
      `${env("apiUrl")}/users/getNonce?publicAddress=${address}`
    );
    console.log("response ", response);
    return response.data;
  } catch (error) {
    // Handle the error
    throw error;
  }
};

// const getNonce = async (address: string) => {
//   try {
//     const response = await axios.get(
//       `http://localhost:8000/api/v1/users/getNonce?publicAddress=${address}`
//     );
//     console.log("response ", response);
//     return response;
//   } catch (error) {
//     // Handle the error
//     throw error;
//   }
// };

export default getNonce;
