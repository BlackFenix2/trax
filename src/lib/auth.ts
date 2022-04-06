import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateRoute = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (token) {
      let user;
      try {
        const { id } = jwt.verify(token, "hello") as {
          id: number;
        };
        user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
          throw new Error("User not found");
        }
      } catch (e) {
        res.status(401).json({ error: "Invalid token" });
      }
      return handler(req, res, user);
    }
  };
};

export const validateToken = (token: string) => {
  const user = jwt.verify(token, "hello");
  return user;
};
