import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "API", href: "#" },
  ],
  account: [
    { name: "Sign Up", href: "/sign-up" },
    { name: "Sign In", href: "/sign-in" },
    { name: "My Account", href: "/dashboard" },
    { name: "Reset Password", href: "/forgot-password" },
  ],
  resources: [
    { name: "Documentation", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "Subscription FAQ", href: "#" },
    { name: "Status", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Security", href: "#" },
    { name: "Billing Terms", href: "#" },
  ],
};

const socialLinks = [
  { name: "Twitter", href: "#", icon: <Twitter className="h-5 w-5" /> },
  { name: "LinkedIn", href: "#", icon: <Linkedin className="h-5 w-5" /> },
  { name: "GitHub", href: "#", icon: <Github className="h-5 w-5" /> },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/20 border-t border-border">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <FooterColumn title="Product" links={footerLinks.product} />
          <FooterColumn title="Account" links={footerLinks.account} />
          <FooterColumn title="Resources" links={footerLinks.resources} />
          <FooterColumn title="Legal" links={footerLinks.legal} />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-border">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} Subscription Manager. All rights reserved.
          </div>

          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="sr-only">{link.name}</span>
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-semibold text-foreground mb-3">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
