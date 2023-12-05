import Prisma from "../../lib/Prisma";
import serverAuth from "../../lib/serverAuth";
const hundler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    await serverAuth(req);
    const movies = await Prisma.movie.findMany();

    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};
export default hundler;
