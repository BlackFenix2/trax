import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "src/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();

  const { email, password } = req.body;

  let user;

  try {
    user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: bcrypt.hashSync(password, salt),
      },
    });
  } catch (e) {
    console.error("Error in the hole: ", e);
    res.status(401).json({ error: "Email already in use" });
  }
  const token = jwt.sign(
    { email: user?.email, id: user?.id, time: Date.now() },
    "hello",
    { expiresIn: "8h" }
  );
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("hi", token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );
  res.json(user);
};
