import React from "react";
import { isEmpty } from "lodash";
import MovieCard from "../components/MovieCard";
const MovieList = ({ data, title }) => {
  if (isEmpty(data)) return null;
  return (
    <div className=" px-4 md:px-22 mt-4 space-y-8">
      <div className="">
        <p className="text-white text-md md:text-xl lg:text-2xl mb-4 font-semibold">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {data?.map((item, i) => {
            return <MovieCard key={i} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
