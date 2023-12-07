"use client";
import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Profile = () => {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.status !== "authenticated") {
      router.push("/auth");
    }
  }, [session?.status]);

  return (
    <div>
      <button
        className="bg-green-500 h-12 w-full text-white"
        onClick={() => signOut({ callbackUrl: "/auth" })}
      >
        singout
      </button>
    </div>
  );
};

export default Profile;
