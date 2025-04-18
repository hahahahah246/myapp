import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="bg-background border-b border-border/40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              SubManager
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/#features"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/#faq"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              FAQ
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/sign-in">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
