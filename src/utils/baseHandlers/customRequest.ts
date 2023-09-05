import { cookies } from "next/dist/client/components/headers";
import { env } from "../env";

// Create a custom fetch function with headers
const customRequest = async (
  url: string,
  method: string = "GET",
  body?: any
): Promise<any> => {
  const fetchUrl = `${env("apiUrl")}${url}`;
  const options: any = {
    method: method.toUpperCase(),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      origin: env("appOrigin"),
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  // Merge custom headers with existing headers
  if (method.toUpperCase() === "GET") {
    options.headers = {
      ...options.headers,
      "x-signed-message": cookies().get("userSignature")?.value,
      "x-nonce": cookies().get("nonce")?.value,
    };
  }

  console.log(fetchUrl);
  // Perform the fetch with merged headers
  const response = await fetch(fetchUrl, options);
  console.log("finished fetching");
  console.log(response.ok);
  // Handle the response as needed
  if (!response.ok) {
    // const error = new Error(`Request failed with status: ${response.status}`);
    // throw error;
  }

  const data = await response.json();
  console.log("data", data);
  return data;
};

export default customRequest;
