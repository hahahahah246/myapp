"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ManageSubscription({
  redirectUrl,
}: {
  redirectUrl: string;
}) {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        toast.info("Redirecting to subscription management...");
        router.push(redirectUrl);
      }}
    >
      Manage Subscription
    </Button>
  );
}
