import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useBrands = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/brand/allBrands", fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export default useBrands;
