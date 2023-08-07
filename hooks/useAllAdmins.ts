import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useAllAdmins = () => {
    const { data, error, isLoading, mutate } = useSWR("/api/admin/allAdmins", fetcher);
    return {
        data,
        error,
        isLoading,
        mutate,
    };
};
export default useAllAdmins;
