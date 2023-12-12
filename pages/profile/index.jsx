"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { FaPen, FaFile, FaTimes } from "react-icons/fa";

const Profile = () => {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.status !== "authenticated") {
      router.push("/auth");
    }
  }, [session?.status]);
  const { currentUser } = useCurrentUser();
  const [userName, setUserName] = useState("user");
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setnewPassword] = useState(null);
  const [isEditMood, setEditMood] = useState(false);
  const Icon = isEditMood ? FaTimes : FaPen;

  return (
    <div className="w-full mx-auto p-4 my-16 max-w-md flex flex-col gap-4 items-start justify-center md:border border-neutral-500 rounded-md">
      <div className="w-full flex items-center  justify-between mb-8">
        <div className="h-16 w-16 md:h-24 md:w-24 rounded-full overflow-clip border-2 border-neutral-300 flex item justify-center object-cover">
          <img
            src={currentUser?.image || "images/Netflix-avatar.png"}
            className="h-full w-full"
            alt="logo"
          />
        </div>
        <div
          onClick={() => setEditMood(!isEditMood)}
          className="flex gap-1 flex-col items-center cursor-pointer"
        >
          <Icon className="text-white " size={20} />
          <p className="text-white text-xs">{isEditMood ? "Cancel" : "Edit"}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="username" className="text-white mb-1">
          User Name
        </label>
        <input
          onChange={(e) => setUserName(e.target.value)}
          name="username"
          id="username"
          className="h-8 rounded-md border-neutral-300 outline-none text-black text-sm px-2 w-full"
          type="text"
          value={currentUser?.username || userName}
          disabled={!isEditMood}
        />
      </div>
      <h2
        className="text-white cursor-pointer"
        onClick={() => setEditMood(true)}
      >
        Change Password
      </h2>
      <hr className="border-white border w-full" />
      {isEditMood && (
        <div className="flex flex-col gap-4 w-full mt-4">
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="oldPassword" className="text-white mb-1">
              Old Password
            </label>
            <input
              onChange={(e) => setOldPassword(e.target.value)}
              name="oldPassword"
              id="oldPassword"
              className="h-8 rounded-md border-neutral-300 outline-none text-black text-sm px-2 w-full"
              type="text"
              placeholder="Old Password"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="newPassword" className="text-white mb-1">
              New Password
            </label>
            <input
              onChange={(e) => setnewPassword(e.target.value)}
              name="newPassword"
              id="newPassword"
              className="h-8 rounded-md border-neutral-300 outline-none text-black text-sm px-2 w-full"
              type="text"
              placeholder="New Password"
            />
          </div>
          <button className="h-8 w-20 ml-auto flex flex-row justify-center items-center gap-1 text-white bg-green-600 hover:bg-green-700 cursor-pointer rounded-md ">
            <FaFile /> Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
