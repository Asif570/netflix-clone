import { useRouter } from "next/router";
import React from "react";

import { BsFillPlayFill } from "react-icons/bs";
const PlayButton = ({ movieId }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/watch/${movieId}`);
      }}
      className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition cursor-pointer"
    >
      <BsFillPlayFill size={25} />
      Play
    </div>
  );
};

export default PlayButton;
