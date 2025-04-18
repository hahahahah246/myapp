"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export function SubscriptionRequired() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (message === "subscription-required") {
      setVisible(true);

      // Remove the message parameter after showing the alert
      const timeout = setTimeout(() => {
        const url = new URL(window.location.href);
        url.searchParams.delete("message");
        router.replace(url.pathname + url.search);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [message, router]);

  if (!visible) return null;

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Subscription Required</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>You need an active subscription to access the dashboard.</p>
        <div className="flex gap-2 mt-2">
          <Button asChild size="sm" variant="outline">
            <Link href="/dashboard/subscription">View Plans</Link>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
