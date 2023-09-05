import customRequest from "@/utils/baseHandlers/customRequest";

export const getUser = async () => {
  try {
    const response = await customRequest(`users/getUser`, "GET");
    console.log("response ", response);
    return response;
  } catch (error) {
    // Handle the error
    throw error;
  }
};

// export const

export default getUser;
