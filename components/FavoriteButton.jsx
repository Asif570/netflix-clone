import React, { useCallback, useMemo } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import useFavorite from "../hooks/usefavorite";
import axios from "axios";
const FavoriteButton = ({ movieId }) => {
  const { currentUser } = useCurrentUser();

  const { mutate } = useFavorite();
  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorite = useCallback(async () => {
    let response;
    if (isFavorite) {
      response = await axios.delete("/api/favorite", {
        data: { movieId, currentUser },
      });
    } else {
      response = await axios.post("/api/favorite", { movieId, currentUser });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate(updatedFavoriteIds);
    mutate();
  }, [currentUser, movieId, isFavorite, mutate]);
  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;
  return (
    <div
      onClick={toggleFavorite}
      className="cursor-pointer border group/item w-6 h-6 lg:w-10 lg:h-10 border-white rounded-full flex items-center justify-center transition hover:border-netural-300"
    >
      <Icon size={25} className="text-white" />
    </div>
  );
};

export default FavoriteButton;
