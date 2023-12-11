"use client";
import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useRouter } from "next/navigation";
const Profile = () => {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.status !== "authenticated") {
      router.push("/auth");
    }
  }, [session?.status]);
  const { currentUser } = useCurrentUser();
  return (
    <div className="w-full mx-4 my-16 max-w-md flex flex-col gap-4 items-center justify-center">
      <div className="w-full flex items-start justify-center">
        <div className="h-16 w-16 md:h-24 md:w-24 rounded-full overflow-clip border-2 border-neutral-300">
          <img
            src={currentUser?.image || "images/Netflix-avatar.png"}
            className="h-full w-full"
            alt="logo"
          />
        </div>
      </div>
      <div className="w-full">
        <input
          className="h-6 rounded-md border-neutral-300 outline-none text-white text-lg font-semibold"
          type="text"
          value={currentUser?.username || ""}
          disabled={true}
        />
      </div>
    </div>
  );
};

export default Profile;
