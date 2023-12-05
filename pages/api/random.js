import prisma from "../../lib/Prisma";
import ServerAuth from "../../lib/serverAuth";
const hundelar = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    await ServerAuth(req);
    const movieCount = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);
    const randomMovies = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex,
    });
    return res.status(200).json(randomMovies[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export default hundelar;
