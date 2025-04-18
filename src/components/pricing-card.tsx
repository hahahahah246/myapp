"use client";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
  redirectUrl: string;
}

export default function PricingCard({ tier }: { tier: PricingTier }) {
  const router = useRouter();

  const handleSubscribe = () => {
    toast.info(`Redirecting to ${tier.name} subscription checkout...`);
    router.push(tier.redirectUrl);
  };

  return (
    <Card
      className={`w-full max-w-sm ${tier.popular ? "border-primary shadow-lg" : "border-border"}`}
    >
      <CardHeader>
        {tier.popular && (
          <div className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-full w-fit mb-2">
            Popular
          </div>
        )}
        <CardTitle className="text-xl">{tier.name}</CardTitle>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">{tier.price}</span>
          {tier.price !== "Free" && (
            <span className="text-muted-foreground ml-1">/month</span>
          )}
        </div>
        <CardDescription>{tier.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-2 text-primary"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubscribe}
          className="w-full"
          variant={tier.popular ? "default" : "outline"}
        >
          {tier.buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
