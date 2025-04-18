import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createServerActionClient } from "@/app/actions";

export const createClient = async () => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        getAll() {
          return cookieStore.getAll().map(({ name, value }) => ({
            name,
            value,
          }));
        },
        set() {
          // This is intentionally a no-op as we can't set cookies outside of a Server Action
          // Use createServerActionClient() for operations that need to set cookies
        },
        remove() {
          // This is intentionally a no-op as we can't remove cookies outside of a Server Action
          // Use createServerActionClient() for operations that need to remove cookies
        },
      },
    },
  );
};
