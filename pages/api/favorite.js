import { without } from "lodash";
import Prisma from "../../lib/Prisma";

export default async function hundler(req, res) {
  try {
    // const { currentUser } = await serverAuth(req);
    const { movieId, currentUser } = req.body;

    const existingMovie = Prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      throw new Error("Invalid MovieId");
    }
    // Update
    if (req.method === "POST") {
      const user = await Prisma.user.update({
        where: {
          email: currentUser?.email,
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });
      return res.status(200).json(user);
    }
    // Delete

    if (req.method === "DELETE") {
      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);
      const updatedUser = await Prisma.user.update({
        where: {
          email: currentUser.email,
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });
      return res.status(200).json(updatedUser);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
