import { validateRoute } from "src/lib/auth";
import prisma from "src/lib/prisma";

export default validateRoute(async (req: any, res: any, user: any) => {
  const playlists = await prisma.playlist.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      name: "asc",
    },
  });

  res.json(playlists);
});
