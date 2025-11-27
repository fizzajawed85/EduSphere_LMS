// stripeService.js
/**
 * Do NOT call Stripe from client for creating PaymentIntents. Create a backend
 * endpoint that uses secret key and returns client_secret.
 *
 * This is a client helper that expects a backend endpoint at /api/create-payment-intent.
 */

export async function createPaymentIntent(amount, currency = "usd") {
  const resp = await fetch("/api/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, currency }),
  });
  if (!resp.ok) throw new Error("Backend payment intent failed");
  return resp.json(); // { client_secret, ... }
}
