import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import {
  BarChart,
  Bell,
  Calendar,
  CreditCard,
  Shield,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: <BarChart className="h-5 w-5 text-primary" />,
    title: "Subscription Analytics",
    description:
      "Get detailed insights into your spending patterns and subscription usage.",
  },
  {
    icon: <Bell className="h-5 w-5 text-primary" />,
    title: "Payment Reminders",
    description:
      "Never miss a payment with automated reminders before subscription renewals.",
  },
  {
    icon: <Calendar className="h-5 w-5 text-primary" />,
    title: "Billing Calendar",
    description:
      "View all your upcoming payments in a convenient calendar interface.",
  },
  {
    icon: <CreditCard className="h-5 w-5 text-primary" />,
    title: "Secure Payments",
    description:
      "Industry-standard security for all your payment information and transactions.",
  },
  {
    icon: <Shield className="h-5 w-5 text-primary" />,
    title: "Account Protection",
    description:
      "Advanced security features to keep your subscription data safe and private.",
  },
  {
    icon: <Zap className="h-5 w-5 text-primary" />,
    title: "One-Click Cancellation",
    description:
      "Easily cancel any subscription with a single click when you need to.",
  },
];

const faqs = [
  {
    question: "How does the subscription tracking work?",
    answer:
      "Our platform automatically connects to your accounts and tracks all your active subscriptions, providing you with a comprehensive dashboard of your recurring payments.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Yes, we use bank-level encryption and security measures to ensure your payment information is always protected. We never store your full credit card details on our servers.",
  },
  {
    question: "Can I cancel my subscriptions through your platform?",
    answer:
      "Yes, for many services you can cancel directly through our platform with just one click. For others, we provide detailed instructions on how to cancel.",
  },
  {
    question:
      "What happens if I want to cancel my Subscription Manager account?",
    answer:
      "You can cancel your account at any time from your account settings. After cancellation, your data will be securely deleted from our systems.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Powerful Subscription Management Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to take control of your subscriptions in one
              place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background p-5 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded-full w-fit mb-3">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Ready to take control of your subscriptions?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Join thousands of users who are saving money and managing their
              subscriptions more effectively.
            </p>
            <Link href="/sign-up">
              <Button size="lg">Get Started for Free</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our subscription management
              platform.
            </p>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-border">
            {faqs.map((faq, index) => (
              <div key={index} className="py-5">
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
