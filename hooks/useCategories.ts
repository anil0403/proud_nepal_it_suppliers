import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useCategories = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/category/allCategories", fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export default useCategories;
