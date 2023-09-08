import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export const config = {
  matcher: [
    // "/",
    "/user/:path*",
    "/search",
    "/blog/:path*",
    "/categories",
    "/write",
    "/settings/:path*",
  ],
};

const middleware = async (req: NextRequest, res: NextResponse) => {
  const token = req.cookies.get("token")?.value;
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);

  try {
    const { payload, protectedHeader } = await jose.jwtVerify(token!, secret);
    console.log("payload", payload);
    console.log("protected header", protectedHeader);
  } catch (err: any) {
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.delete("token");
    response.cookies.delete("userSignature");
    response.cookies.delete("nonce");
    if (typeof window !== "undefined") window.location.reload();
    return response;
  }
};

export default middleware;
