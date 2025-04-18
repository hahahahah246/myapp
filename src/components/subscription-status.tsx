import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, Calendar, CheckCircle, AlertCircle } from "lucide-react";

export function SubscriptionStatus({ subscription }: { subscription: any }) {
  if (!subscription) {
    return (
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            No Active Subscription
          </CardTitle>
          <CardDescription>
            You don't have an active subscription plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              Visit our pricing page to subscribe to a plan and access premium
              features.
            </p>
            <Badge variant="outline" className="w-fit">
              Inactive
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Format dates
  const startDate = new Date(subscription.current_period_start);
  const endDate = new Date(subscription.current_period_end);
  const formattedStartDate = startDate.toLocaleDateString();
  const formattedEndDate = endDate.toLocaleDateString();

  // Format amount
  const amount = subscription.amount / 100;
  const currency = subscription.currency?.toUpperCase() || "USD";

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          Active Subscription
        </CardTitle>
        <CardDescription>
          Your subscription is currently active.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {amount} {currency} / {subscription.interval || "month"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Current period: {formattedStartDate} - {formattedEndDate}
            </span>
          </div>

          <Badge
            variant="outline"
            className="bg-green-500/10 text-green-500 border-green-500/20"
          >
            {subscription.status}
          </Badge>

          {subscription.cancel_at_period_end && (
            <Badge
              variant="outline"
              className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
            >
              Cancels at period end
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
