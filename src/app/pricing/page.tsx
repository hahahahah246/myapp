import Navbar from "@/components/navbar";
import PricingPlans from "@/components/pricing-plans";
import { SubscriptionRequired } from "@/components/subscription-required";
import { createClient } from "../../../supabase/server";

export default async function Pricing() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your needs
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <SubscriptionRequired />
          <PricingPlans />
        </div>
      </div>
    </div>
  );
}
