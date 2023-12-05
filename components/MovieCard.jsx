import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import FavoriteButton from "./FavoriteButton";
const MovieCard = ({ data }) => {
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <img
        className="object-cover transition duration-500 shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full 
        h-[12vw] cursor-pointer"
        src={data.thumbnailUrl}
        alt="thumbnail"
      />
      <div className="opacity-0 absolute top-0 transition duration-200 invisible z-10 w-full sm:visible scale-0 group-hover:scale-110 group-hover:-translate-y-[5vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
        <img
          src={data.thumbnailUrl}
          alt="img"
          className=" cursor-pointer object-cover transition duration sha rounded-t-md w-full h-[12vw]"
        />
        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <div
              className="w-6 h-6 lg:w-10 lg:h-10 cursor-pointer bg-white rounded-full flex items-center justify-center transition hover:bg-neutral-100"
              onClick={() => {}}
            >
              <BsFillPlayFill size={30} />
            </div>
            <div onClick={() => {}}>
              <FavoriteButton movieId={data?.id} />
            </div>
          </div>
          <p className="text-green-500 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
