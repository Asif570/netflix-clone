import { getSession } from "next-auth/react";
import prisma from "./Prisma";
const ServerAuth = async (req) => {
  const session = await getSession({ req });
  if (!session?.user?.email) {
    throw new Error("Not signed in !");
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });
  return { currentUser };
};
export default ServerAuth;
