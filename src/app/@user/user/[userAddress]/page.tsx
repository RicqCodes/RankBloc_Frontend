import React from "react";
import UserProfilePage from "@/pages/private/profile";
import customRequest from "@/utils/baseHandlers/customRequest";
import getUser from "@/requests/user/getUser";

export default async function UserPage() {
  const user = await getUser();
  const res = await customRequest(`user-relationships/${user?.data.user._id}`);
  return (
    <>
      <UserProfilePage initialData={res} />
    </>
  );
}
