import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useCurrentUser = () => {
  const { data, isLoading } = useSWR("/api/user", fetcher);
  return {
    currentUser: data,
    isLoading,
  };
};
export default useCurrentUser;
