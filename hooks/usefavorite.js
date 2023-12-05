import useSWR from "swr";
import fetcher from "../lib/fetcher";

const useFavorite = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/favorites", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    favoriteMovies: data,
    error,
    isLoading,
    mutate,
  };
};

export default useFavorite;
