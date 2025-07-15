import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/login", "/auth/magic-link"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isPublicRoute) {
    const authToken = request.cookies.get("auth-storage");

    if (authToken) {
      try {
        const authData = JSON.parse(authToken.value);
        if (authData.state?.isAuthenticated && authData.state?.user?.role) {
          const redirectUrl =
            authData.state.user.role === "librarian"
              ? "/dashboard/librarian"
              : "/dashboard/student";
          return NextResponse.redirect(new URL(redirectUrl, request.url));
        }
      } catch (error) {
        console.error("Error parsing auth cookie:", error);
      }
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api") && !pathname.startsWith("/api/auth")) {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization token required" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
