import { cn } from "@plaventi/ui/src/utils/helpers";
import { Button, Flex, Heading, Skeleton } from "@radix-ui/themes";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { FormEvent, memo, useState } from "react";
import { api } from "~/trpc/provider";
import { PlaventiEvent } from "~/trpc/types";
import { environment } from "~/utils/env";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51MzHzlAZ9Vfg7QSfkFmhU5V9rje45T7NbK3IljvjsKwAHLDKcvWmLNgx1zaN2CDemFTr97EKAOuYLA0uBWXHaNsM00ay4OFgvo",
);

const { appUrl } = environment;

function PaymentFormInner({ eventIdentifer }: { eventIdentifer: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${appUrl}/event/${eventIdentifer}`,
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message ?? "An error occurred");
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <Flex direction="column" gap="4" className="relative w-full">
      <form onSubmit={handleSubmit}>
        <Heading size="5">Payment</Heading>

        <Flex direction="column" gap="3" width="100%">
          <Skeleton loading={isLoading} className="w-full">
            <Flex className={cn("min-h-[223px] w-full rounded-lg")} width="100%">
              <Flex
                className={cn("h-full w-full", {
                  hidden: isLoading,
                })}>
                <PaymentElement onReady={() => setIsLoading(false)} className="w-full" />
              </Flex>
            </Flex>
          </Skeleton>

          <Button size="3" type="submit">
            Pay With Card
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}

function PaymentFormContainer({
  eventId,
  eventIdentifier,
  ticketTypeId,
}: {
  eventId: string;
  eventIdentifier: string;
  ticketTypeId: string;
}) {
  // ensure called only once
  const {
    data: paymentIntent,
    isLoading,
    isError,
  } = api.ticketSales.createPaymentIntent.useQuery({
    eventId,
    ticketTypeId,
  });

  if (isLoading) {
    return <Skeleton loading={true} />;
  }

  if (isError || !paymentIntent.client_secret) {
    return <div>Failed to load payment method</div>;
  }

  const options: StripeElementsOptions = {
    clientSecret: paymentIntent.client_secret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentFormInner eventIdentifer={eventIdentifier} />
    </Elements>
  );
}

// memo this component to avoid re-rendering on parent re-renders
export const PaymentForm = memo(PaymentFormContainer);
