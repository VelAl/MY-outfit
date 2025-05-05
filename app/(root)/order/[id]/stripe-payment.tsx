"use client";

import { FormEvent, useState } from "react";
import { useTheme } from "next-themes";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { E_AppThemes } from "@/app-types-ts";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { SERVER_URL } from "@/lib/constants";
import { formatUSDPrice } from "@/lib/utils";

type T_Props = {
  priceInCents: number;
  orderId: string;
  clientSecret: string;
};

const StripePayment = ({ clientSecret, priceInCents, orderId }: T_Props) => {
  const { theme, systemTheme } = useTheme();
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );

  // Stripe Form Component
  const StripeForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("");

    const _submit = async (e: FormEvent) => {
      e.preventDefault();

      if (!stripe || !elements || !email) return;

      setLoading(true);

      stripe
        .confirmPayment({
          elements,
          confirmParams: {
            return_url: `${SERVER_URL}/order/${orderId}/stripe-payment-success`,
          },
        })
        .then(({ error }) => {
          if (
            error?.type === "card_error" ||
            error?.type === "validation_error"
          ) {
            setErrorMsg(error?.message || "Something went wrong...");
          } else if (error) {
            setErrorMsg("Something went wrong...");
          }
        })
        .finally(() => setLoading(false));
    };

    return (
      <form onSubmit={_submit}>
        <div className="text-xl">Stripe Checkout</div>
        {errorMsg && <div className="text-destructive">{errorMsg}</div>}

        <PaymentElement />

        <div>
          <LinkAuthenticationElement
            onChange={(e) => setEmail(e.value.email)}
          />
        </div>

        <Button
          className="w-full mt-4"
          size="lg"
          disabled={!stripe || !elements || loading}
        >
          {loading && <Spinner />}
          {loading
            ? "Purchasing..."
            : `Purchase ${formatUSDPrice(priceInCents / 100)}`}
        </Button>
      </form>
    );
  };

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: clientSecret,
        appearance: {
          theme:
            theme === E_AppThemes.DARK
              ? "night"
              : theme === E_AppThemes.LIGHT || systemTheme === E_AppThemes.LIGHT
              ? "stripe"
              : "night",
        },
      }}
    >
      <StripeForm />
    </Elements>
  );
};
export default StripePayment;
