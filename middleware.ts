import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/:path*"],
  debug: true
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
