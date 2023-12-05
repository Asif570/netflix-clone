import { hash } from "bcryptjs";
import Prisma from "../../lib/Prisma";
const register = async (req, res) => {
  const { username, email, password } = req.body;
  // //////////////////////////////////////////////
  if (!username || !password || !email) {
    res.status(401).json({ message: "Invaled credentials" });
  }
  //   //////////////////////////////////////////////////////////
  const alreadyExist = await Prisma.user.findUnique({
    where: { email: email },
  });
  if (alreadyExist) {
    res.status(401).json({ message: "IEmail already exsist" });
  }
  //   //////////////////////////
  try {
    const hashedPassword = await hash(password, 10);
    const user = await Prisma.user.create({
      data: {
        email,
        hashedPassword,
        username,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export default register;
