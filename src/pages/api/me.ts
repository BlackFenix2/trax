import { validateRoute } from "src/lib/auth";
import prisma from "src/lib/prisma";

export default validateRoute(async (req: any, res: any, user: any) => {
  const playlistCount = await prisma.playlist.count({
    where: {
      userId: user.id,
    },
  });

  res.json({ ...user, playlistCount });
});
