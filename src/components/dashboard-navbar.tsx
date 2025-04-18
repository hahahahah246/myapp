import Link from "next/link";
import { Button } from "@/components/ui/button";
import UserProfile from "@/components/user-profile";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function DashboardNavbar() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="font-semibold text-xl">
            Subscription Manager
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/subscription"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Subscription
            </Link>
            <Link
              href="/dashboard/profile"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Profile
            </Link>
            <Link
              href="/dashboard/settings"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Settings
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <UserProfile />
        </div>
      </div>
    </header>
  );
}
