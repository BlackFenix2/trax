import { validateRoute } from "src/lib/auth";
import prisma from "src/lib/prisma";

export default validateRoute(async (req, res, user: any) => {
  const playlistCount = await prisma.playlist.count({
    where: {
      userId: user.id,
    },
  });

  res.json({ ...user, playlistCount });
});
