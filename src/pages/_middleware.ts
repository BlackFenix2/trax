import { NextRequest, NextResponse } from "next/server";

const signedInPages = ["/", "/playlist", "/library"];
export default async function middleware(
  req: NextRequest,
  res: NextResponse,
  next: Function
) {
  if (
    signedInPages.find((page) => page === req.nextUrl.pathname.toLowerCase())
  ) {
    const token = req.cookies.TRAX_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.redirect("/Signin");
    }
  }
}
