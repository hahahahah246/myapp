import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import DashboardNavbar from "@/components/dashboard-navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Get subscription data
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  // Redirect to pricing if no active subscription
  if (!subscription) {
    return redirect("/pricing?message=subscription-required");
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          <header>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user.user_metadata?.full_name || user.email}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Status</CardTitle>
                <CardDescription>
                  Your current subscription plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  {subscription ? (
                    <span className="text-green-500 font-medium">
                      Active -{" "}
                      {subscription.metadata?.plan_name || "Premium Plan"}
                    </span>
                  ) : (
                    <span className="text-yellow-500 font-medium">
                      No active subscription
                    </span>
                  )}
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/subscription" className="w-full">
                  <Button variant="outline" className="w-full">
                    Manage Subscription
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Name:</span>{" "}
                    {user.user_metadata?.full_name || "Not set"}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/profile" className="w-full">
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
