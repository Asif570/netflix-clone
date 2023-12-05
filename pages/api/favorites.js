import Prisma from "../../lib/Prisma";
import ServerAuth from "../../lib/serverAuth";

export default async function hundler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await ServerAuth(req);

    const favoriteMovies = await Prisma.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });
    return res.status(200).send(favoriteMovies);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
