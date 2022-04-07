import { validateRoute } from "src/lib/auth";
import prisma from "src/lib/prisma";

export default validateRoute(async (req: any, res: any) => {
  const playlists = await prisma.playlist.findMany({
    // TODO wait for actual playlist upload to be implemented
    // where: {
    //   userId: user.id,
    // },
    orderBy: {
      name: "asc",
    },
  });

  res.json(playlists);
});
