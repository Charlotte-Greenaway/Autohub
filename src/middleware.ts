import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  // Skip for static files like CSS, JS, images, etc.
  if (
    request.nextUrl.pathname.startsWith("/_next/static/") ||
    request.nextUrl.pathname.includes("api")
  ) {
    return NextResponse.next();
  }

  //check to see if organisation is set up
  //if not redirect to organisation set up
  //if it is then redirect to login
  //if user has logged in false then redirect to set new password screen
  //if they have allow access
  try {
    const response: any = await fetch(
      `${request.nextUrl.origin}/api/checkOrgTable`
    );
    const exists = await response.json();
    if (exists.exists) {
      if (request.nextUrl.pathname == "/organisation-signup") {
        const originalUrl = request.nextUrl.origin;
        return NextResponse.redirect(new URL("/", originalUrl)); 
      } else {
        const token: any = cookies().get("sessionToken");
        const email: any = cookies().get("email");
        if (token && email) {
          const apiUrl = `${request.nextUrl.origin}/api/verifyToken`;
          const apiResponse = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token.value,
              email: email.value,
            }),
          });

          const data = await apiResponse.json();
          if (data.status !== 200 && request.nextUrl.pathname !== "/log-in") {
            const originalUrl = request.nextUrl.origin;
            return NextResponse.redirect(new URL("/log-in", originalUrl));
          } else if (
            data.status === 200 &&
            request.nextUrl.pathname == "/log-in"
          ) {
            const originalUrl = request.nextUrl.origin;
            return NextResponse.redirect(new URL("/", originalUrl));
          } else {
            return NextResponse.next();
          }
        } else if (request.nextUrl.pathname !== "/log-in") {
          const originalUrl = request.nextUrl.origin;
          return NextResponse.redirect(new URL("/log-in", originalUrl));
        } else {
          return NextResponse.next();
        }
      }
    } else if (
      !response.exists &&
      request.nextUrl.pathname !== "/organisation-signup"
    ) {
      const originalUrl = request.nextUrl.origin;
      return NextResponse.redirect(
        new URL("/organisation-signup", originalUrl)
      );
    }
  } catch (error) {
    console.log(error);
  }

  return NextResponse.next();
}
