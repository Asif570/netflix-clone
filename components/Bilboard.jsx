import React, { useCallback } from "react";
import useBilboard from "../hooks/useBilboard";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./PlayButton";
import useInfoModal from "@/hooks/useInfoModal";
const Bilboard = () => {
  const { data } = useBilboard();
  const { openModal } = useInfoModal();

  const handleOpenModle = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);
  return (
    <div className="relative h-[57vw] ">
      <video
        autoPlay
        muted
        loop
        className="w-full h-[56.25] object-cover brightness-[60%]"
        src={data?.videoUrl}
        poster={data?.thumbnailUrl}
      ></video>
      <div className="ml-4 absolute top-[20%] md:ml-16 md:top-[30%] ">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl  ">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[50%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?.id} />
          <button
            onClick={handleOpenModle}
            className="rounded-md bg-white text-white bg-opacity-30 py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
          >
            <AiOutlineInfoCircle className="mr-1" /> More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bilboard;
