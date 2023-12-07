import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import React from "react";

const AccountMenu = ({ visible }) => {
  const { currentUser } = useCurrentUser();
  if (!visible) return null;
  return (
    <div className=" bg-black w-56 absolute top-14 py-5 right-0 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img
            src={currentUser?.image || "/images/Netflix-avatar.png"}
            alt="avarta"
            className="w-8 rounded-md"
          />
          <p className="text-white text-sm group-hover/item:underline">
            {currentUser?.username || "user"}
          </p>
        </div>
        <hr className="bg-gray-500 border-0 h-px my-4" />
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white text-sm hover:underline"
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
