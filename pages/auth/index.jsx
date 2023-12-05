"use client";
import React, { useCallback, useEffect, useState } from "react";
import Inpute from "../../components/Inpute";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
const index = () => {
  ////////////////////////
  const [veriant, setVeraint] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  //////////////////////////////////////////
  const router = useRouter();
  //////////////////////////////
  const session = useSession();
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/profile");
    }
  }, [session?.status, router]);
  //   /////////////////////////////////
  const veriantHundler = useCallback(() => {
    if (veriant === "login") setVeraint("register");
    else setVeraint("login");
  }, [veriant]);

  const register = useCallback(async () => {
    await axios.post("/api/register", {
      username,
      email,
      password,
    });
    login();
  }, [username, email, password]);
  // /////////////////////////
  const login = useCallback(async () => {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  }, [email, password, veriant]);
  // ////////////////////////

  const hundler = useCallback(() => {
    if (veriant === "login") {
      login();
    } else {
      register();
    }
  }, [veriant, email, password, username]);
  // /////////////////
  return (
    <div className="relative min-h-screen w-full h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="bg-black lg:bg-opacity-75 h-full min-h-screen">
        {/* /////////////////////////////////////////////// */}
        <nav className="px-12 py-5">
          <img src="images/logo.png" alt="logo" className="h-12" />
        </nav>
        {/* /////////////////////////////////////////// */}
        <div className="flex justify-center">
          <div className="flex mt-8 text-white max-w-md lg:w-2/5  bg-black rounded-md px-6 py-12 flex-col gap-4 self-center">
            {/* /////////////////////////////////////////////// */}
            <h2 className="font-semibold text-4xl">
              {veriant === "login" ? "Login" : "Register"}
            </h2>
            {/* /////////////////////////////////////////////////////// */}
            {veriant === "register" && (
              <Inpute
                label={"User Name"}
                id={"username"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            )}
            {/* //////////////////////////////////////// */}
            <Inpute
              label={"Email"}
              id={"email"}
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />{" "}
            <Inpute
              label={"Password"}
              id={"password"}
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            {/* /////////////////////////////////////// */}
            <button
              onClick={hundler}
              className="flex items-center justify-center bg-green-500 hover:bg-green-700 cursor-pointer h-12 rounded-md"
            >
              {veriant === "login" ? "log in" : "sing up"}
            </button>
            {/* ////////////////////////////////////////////// */}
            <div className="flex flex-row gap-4 justify-center">
              <div
                className="w-14 h-14 cursor-pointer flex items-center justify-center rounded-full bg-green-600 hover:bg-green-700"
                onClick={() => {
                  signIn("google", { callbackUrl: "/profile" });
                }}
              >
                <FcGoogle size={32} />
              </div>
              <div
                className="w-14 h-14 cursor-pointer flex items-center justify-center rounded-full bg-green-600 hover:bg-green-700"
                onClick={() => {
                  signIn("github", { callbackUrl: "/profile" });
                }}
              >
                <FaGithub size={32} />
              </div>
            </div>
            {/* ///////////////////////////////////////////// */}
            <p className="mt-6 text-sm">
              {veriant === "login"
                ? "Dont have an account ?"
                : "Already have an account ?"}{" "}
              <span
                onClick={veriantHundler}
                className="text-green-600 cursor-pointer hover:underline"
              >
                {veriant === "login" ? "register" : "login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
