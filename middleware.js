// export { default } from "next-auth/middleware";
// export const config = { matcher: ["/dashboard/:path*"] };

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/api/user/:path*", "/api/admin/:path*"],
};

export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl.pathname;
    const userRoles = req?.nextauth?.token?.user?.role;

    if (
      url?.includes("/dashboard/admin") &&
      (!userRoles || !userRoles?.includes("admin"))
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      //   authorized: ({ token }) => !!token, // require user to be logged in
      authorized: ({ token }) => {
        if (!token) {
          return false;
        }
        return true;
      }, // require user to be logged in
    },
  }
);
