import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const TRAX_ACCESS_TOKEN = "TRAX_ACCESS_TOKEN";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // override the default cookie option, signing out user
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(TRAX_ACCESS_TOKEN, null, {
      maxAge: -1,
      path: "/",
    })
  );
  res.redirect("/Signin");
};
