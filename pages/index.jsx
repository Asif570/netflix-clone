"use client";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Bilboard from "../components/Bilboard";
import MovieList from "../components/MovieList";
import useMovieList from "../hooks/useMovieList";
import usefavorite from "../hooks/usefavorite";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import InfoModal from "../components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";
const Home = () => {
  const session = useSession();
  const router = useRouter();
  const { isOpen, closeModal } = useInfoModal();
  useEffect(() => {
    if (session?.status !== "loading" && session?.status !== "authenticated") {
      router.push("/auth");
    }
  }, [session?.status, router]);
  const { data: Movies } = useMovieList();
  const { favoriteMovies } = usefavorite();
  return (
    <div>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Bilboard />
      <div className="pb-4">
        <MovieList title={"Tranding Now"} data={Movies} />
        <MovieList title={"My Movies"} data={favoriteMovies} />
      </div>
    </div>
  );
};

export default Home;
