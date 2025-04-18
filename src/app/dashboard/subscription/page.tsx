import DashboardNavbar from "@/components/dashboard-navbar";
import ManageSubscription from "@/components/manage-subscription";
import { SubscriptionStatus } from "@/components/subscription-status";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Receipt, Calendar, AlertCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import { manageSubscriptionAction } from "../../actions";

export default async function SubscriptionPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const result = await manageSubscriptionAction(user?.id);

  // Get subscription data
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          {/* Header Section */}
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Subscription</h1>
              <p className="text-muted-foreground mt-1">
                Manage your subscription plan
              </p>
            </div>
            {result?.url && <ManageSubscription redirectUrl={result?.url!} />}
          </header>

          {/* Subscription Status */}
          <SubscriptionStatus subscription={subscription} />

          {/* Subscription Details */}
          {subscription ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Subscription Details
                </CardTitle>
                <CardDescription>
                  Detailed information about your current subscription
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Plan</p>
                      <p className="text-sm text-muted-foreground">
                        {subscription.metadata?.plan_name || "Premium Plan"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Price</p>
                      <p className="text-sm text-muted-foreground">
                        ${subscription.amount / 100} /{" "}
                        {subscription.interval || "month"}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Billing Period</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(
                          subscription.current_period_start,
                        ).toLocaleDateString()}{" "}
                        -
                        {new Date(
                          subscription.current_period_end,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Next Billing Date</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(
                          subscription.current_period_end,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Payment Method</p>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Credit Card
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Auto Renewal</p>
                      <p className="text-sm text-muted-foreground">
                        {subscription.cancel_at_period_end ? "Off" : "On"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  No Active Subscription
                </CardTitle>
                <CardDescription>
                  You don't have an active subscription plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Visit our pricing page to subscribe to a plan and access
                  premium features.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
