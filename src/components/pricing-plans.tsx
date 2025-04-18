"use client";

import { useEffect, useState } from "react";
import PricingCard from "./pricing-card";
import { createClient } from "../supabase/client";

export default function PricingPlans() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchPlans() {
      try {
        const { data, error } = await supabase.functions.invoke(
          "supabase-functions-get-plans",
        );

        if (error) throw error;

        if (data?.items && Array.isArray(data.items)) {
          // Transform the data to match our PricingTier interface
          const formattedPlans = data.items.map((plan: any) => ({
            id: plan.id,
            name: plan.name,
            price: `$${(plan.prices[0]?.amount / 100).toFixed(2)}`,
            description: plan.description || "Subscription plan",
            features: plan.features || [
              "Basic features",
              "Customer support",
              "Regular updates",
            ],
            buttonText: "Subscribe",
            popular: plan.name.toLowerCase().includes("pro"),
            redirectUrl: `/api/checkout?priceId=${plan.prices[0]?.id}`,
          }));
          setPlans(formattedPlans);
        } else {
          // Fallback plans if API doesn't return expected format
          setPlans([
            {
              id: "basic",
              name: "Basic",
              price: "$9.99",
              description: "Perfect for individuals",
              features: [
                "Basic subscription tracking",
                "Email notifications",
                "Standard support",
              ],
              buttonText: "Get Started",
              redirectUrl: "/api/checkout?plan=basic",
            },
            {
              id: "pro",
              name: "Pro",
              price: "$19.99",
              description: "Ideal for professionals",
              features: [
                "Advanced subscription tracking",
                "Priority support",
                "Detailed analytics",
                "Multiple payment methods",
              ],
              buttonText: "Subscribe",
              popular: true,
              redirectUrl: "/api/checkout?plan=pro",
            },
            {
              id: "enterprise",
              name: "Enterprise",
              price: "$49.99",
              description: "For large organizations",
              features: [
                "Unlimited subscription tracking",
                "24/7 premium support",
                "Advanced analytics",
                "Custom integrations",
                "Team management",
              ],
              buttonText: "Contact Sales",
              redirectUrl: "/api/checkout?plan=enterprise",
            },
          ]);
        }
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Failed to load subscription plans");
        // Set fallback plans
        setPlans([
          {
            id: "basic",
            name: "Basic",
            price: "$9.99",
            description: "Perfect for individuals",
            features: [
              "Basic subscription tracking",
              "Email notifications",
              "Standard support",
            ],
            buttonText: "Get Started",
            redirectUrl: "/api/checkout?plan=basic",
          },
          {
            id: "pro",
            name: "Pro",
            price: "$19.99",
            description: "Ideal for professionals",
            features: [
              "Advanced subscription tracking",
              "Priority support",
              "Detailed analytics",
              "Multiple payment methods",
            ],
            buttonText: "Subscribe",
            popular: true,
            redirectUrl: "/api/checkout?plan=pro",
          },
          {
            id: "enterprise",
            name: "Enterprise",
            price: "$49.99",
            description: "For large organizations",
            features: [
              "Unlimited subscription tracking",
              "24/7 premium support",
              "Advanced analytics",
              "Custom integrations",
              "Team management",
            ],
            buttonText: "Contact Sales",
            redirectUrl: "/api/checkout?plan=enterprise",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchPlans();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {plans.map((plan) => (
        <PricingCard key={plan.id} tier={plan} />
      ))}
    </div>
  );
}
