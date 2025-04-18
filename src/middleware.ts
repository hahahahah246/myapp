import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return req.cookies.getAll().map(({ name, value }) => ({
              name,
              value,
            }));
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              res.cookies.set(name, value, options);
            });
          },
        },
      },
    );

    // Refresh session if expired - required for Server Components
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    // Protected routes - require authentication
    if (req.nextUrl.pathname.startsWith("/dashboard") && !session) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // Check subscription for dashboard access
    if (req.nextUrl.pathname === "/dashboard" && session) {
      // Get user subscription status
      const { data: subscription } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("status", "active")
        .maybeSingle();

      // Redirect to pricing if no active subscription
      if (!subscription && req.nextUrl.pathname === "/dashboard") {
        return NextResponse.redirect(
          new URL("/pricing?message=subscription-required", req.url),
        );
      }
    }

    return res;
  } catch (e) {
    return res;
  }
}

// Ensure the middleware is only called for relevant paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - api/polar/webhook (webhook endpoints)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api/polar/webhook).*)",
  ],
};
