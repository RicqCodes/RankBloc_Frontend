import { baseQuery } from "@/utils/baseHandlers/baseQuery";
import useSWR from "swr";

export const useQuery = (url: string, fallbackData?: any, ...props: any) => {
  const initialData = {
    data: fallbackData,
  };

  const { data, isLoading, error, mutate } = useSWR(url, baseQuery, {
    fallbackData: initialData,
    ...props,
  });

  return {
    data: data?.data,
    isLoading,
    error: error?.response?.data?.errors,
    mutate,
  };
};
