import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/server";
import { checkoutSessionAction } from "@/app/actions";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const priceId = searchParams.get("priceId");
    const plan = searchParams.get("plan");

    if (!priceId && !plan) {
      return NextResponse.json(
        { error: "Price ID or plan is required" },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // If we have a priceId, use it directly
    if (priceId) {
      const result = await checkoutSessionAction({
        productPriceId: priceId,
        successUrl: `${request.nextUrl.origin}/success`,
        customerEmail: user.email || undefined,
        metadata: { userId: user.id },
      });

      if (result?.url) {
        return NextResponse.redirect(result.url);
      }
    }
    // Otherwise use the plan name to get the price ID from the API
    else if (plan) {
      // Get plans from the API
      const { data: plans } = await supabase.functions.invoke(
        "supabase-functions-get-plans",
      );

      // Find the matching plan
      const matchingPlan = plans?.items?.find(
        (item: any) => item.name.toLowerCase() === plan.toLowerCase(),
      );

      if (
        !matchingPlan ||
        !matchingPlan.prices ||
        !matchingPlan.prices[0]?.id
      ) {
        return NextResponse.json(
          { error: "Plan not found or has no price" },
          { status: 404 },
        );
      }

      const result = await checkoutSessionAction({
        productPriceId: matchingPlan.prices[0].id,
        successUrl: `${request.nextUrl.origin}/success`,
        customerEmail: user.email || undefined,
        metadata: { userId: user.id },
      });

      if (result?.url) {
        return NextResponse.redirect(result.url);
      }
    }

    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
