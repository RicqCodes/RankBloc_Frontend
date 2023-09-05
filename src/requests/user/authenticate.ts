import customRequest from "@/utils/baseHandlers/customRequest";

const AuthenticateUser = async (address: string, signature: string) => {
  try {
    const response = await customRequest("users", "POST", {
      address,
      signature,
    });
    console.log(response);
    return response;
  } catch (error) {
    // Handle the error
    throw error;
  }
};

export default AuthenticateUser;
