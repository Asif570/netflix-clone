"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { FaPen, FaFile } from "react-icons/fa";

const Profile = () => {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.status !== "authenticated") {
      router.push("/auth");
    }
  }, [session?.status]);
  const { currentUser } = useCurrentUser();
  const [userName, setUserName] = useState(null);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setnewPassword] = useState(null);
  const [isEditMood, setEditMood] = useState(false);
  const Icon = isEditMood ? FaFile : FaPen;

  return (
    <div className="w-full mx-auto px-4 my-16 max-w-md flex flex-col gap-4 items-center justify-center">
      <div className="w-full flex items-center  justify-between">
        <div className="h-16 w-16 md:h-24 md:w-24 rounded-full overflow-clip border-2 border-neutral-300">
          <img
            src={currentUser?.image || "images/Netflix-avatar.png"}
            className="h-full w-full"
            alt="logo"
          />
        </div>
        <div>
          <Icon onClick={() => setEditMood(!isEditMood)} />
        </div>
      </div>
      <div className="w-full">
        <label htmlFor="username" className="text-white mb-1">
          User Name
        </label>
        <input
          onChange={(e) => setUserName(e.target.value)}
          name="username"
          id="username"
          className="h-8 rounded-md border-neutral-300 outline-none text-white text-lg font-semibold"
          type="text"
          value={userName || currentUser?.username || "User"}
          disabled={true}
        />
      </div>
      <hr className="bg-white" />
      <div className="flex flex-col gap-4">
        <h2>Change Password</h2>
        <div className="w-full">
          <label htmlFor="oldPassword" className="text-white mb-1">
            Old Password
          </label>
          <input
            onChange={(e) => setOldPassword(e.target.value)}
            name="oldPassword"
            id="oldPassword"
            className="h-8 rounded-md border-neutral-300 outline-none text-white text-lg font-semibold"
            type="text"
            placeholder="Old Password"
          />
        </div>
        <div className="w-full">
          <label htmlFor="newPassword" className="text-white mb-1">
            New Password
          </label>
          <input
            onChange={(e) => setnewPassword(e.target.value)}
            name="newPassword"
            id="newPassword"
            className="h-8 rounded-md border-neutral-300 outline-none text-white text-lg font-semibold"
            type="text"
            placeholder="New Password"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
