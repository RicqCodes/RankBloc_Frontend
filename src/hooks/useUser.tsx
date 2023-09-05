"use client";

import { useContext } from "react";

import { AuthContext } from "@/_providers/AuthProvider";
import { useQuery } from "./useQuery";
import { env } from "@/utils/env";

export const useUser = () => {
  const fallbackData = useContext(AuthContext);

  const { data, isLoading, error, mutate } = useQuery(
    `${env("apiUrl")}users/getUser`,
    fallbackData
  );

  return {
    user: data,
    isAuth: data && true,
    isLoading,
    error,
    mutate,
  };
};
