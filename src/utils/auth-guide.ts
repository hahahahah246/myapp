/**
 * Auth and Payment Protection Guide
 *
 * This file contains examples of how to protect routes and features with authentication
 * and payment requirements.
 */

// 1. Protecting a route with authentication
// Use the SubscriptionCheck component to wrap any component that requires authentication
// Example:
// ```tsx
// import { SubscriptionCheck } from '@/components/subscription-check';
//
// export default function ProtectedPage() {
//   return (
//     <SubscriptionCheck>
//       <YourComponent />
//     </SubscriptionCheck>
//   );
// }
// ```

// 2. Checking subscription in server component
// ```tsx
// import { createClient } from '../../../supabase/server';
// import { redirect } from 'next/navigation';
//
// export default async function ProtectedServerComponent() {
//   const supabase = await createClient();
//   const { data: { user } } = await supabase.auth.getUser();
//
//   if (!user) {
//     return redirect('/sign-in');
//   }
//
//   // Check subscription
//   const { data: subscription } = await supabase
//     .from("subscriptions")
//     .select("*")
//     .eq("user_id", user.id)
//     .eq("status", "active")
//     .maybeSingle();
//
//   if (!subscription) {
//     return redirect('/pricing');
//   }
//
//   return <YourProtectedContent />;
// }
// ```

// 3. Client-side subscription check
// ```tsx
// "use client";
//
// import { useEffect, useState } from 'react';
// import { createClient } from '../../supabase/client';
// import { useRouter } from 'next/navigation';
//
// export default function ClientProtectedComponent() {
//   const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
//   const router = useRouter();
//   const supabase = createClient();
//
//   useEffect(() => {
//     const checkSubscription = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//
//       if (!user) {
//         router.push('/sign-in');
//         return;
//       }
//
//       const { data: subscription } = await supabase
//         .from("subscriptions")
//         .select("*")
//         .eq("user_id", user.id)
//         .eq("status", "active")
//         .maybeSingle();
//
//       if (!subscription) {
//         router.push('/pricing');
//         return;
//       }
//
//       setIsSubscribed(true);
//     };
//
//     checkSubscription();
//   }, [router, supabase]);
//
//   if (isSubscribed === null) {
//     return <div>Loading...</div>;
//   }
//
//   return <YourProtectedContent />;
// }
// ```

// 4. Using middleware for route protection
// The middleware.ts file already contains route protection logic.
// It redirects unauthenticated users from /dashboard to /sign-in

// 5. Creating checkout session for payment
// ```tsx
// import { checkoutSessionAction } from '@/app/actions';
//
// // In your component
// const handleSubscribe = async () => {
//   const result = await checkoutSessionAction({
//     productPriceId: 'your-price-id',
//     successUrl: `${window.location.origin}/success`,
//     customerEmail: user?.email,
//     metadata: { user_id: user?.id }
//   });
//
//   if (result?.url) {
//     window.location.href = result.url;
//   }
// };
// ```
