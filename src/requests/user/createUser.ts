import customRequest from "@/utils/baseHandlers/customRequest";

const createUser = async (address: string) => {
  try {
    const response = await customRequest("users", "POST", {
      address,
    });
    console.log(response);
    return response;
  } catch (error) {
    // Handle the error
    throw error;
  }
};

export default createUser;
