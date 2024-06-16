// <reference types="stripe-event-types" />
import { Router } from "express";

const paymentsController = Router();
import express from "express";

import Stripe from "stripe";
import { environment } from "../../environment";
import { assertError, isString } from "../../helpers/utils";
import {
  TicketSalesService,
  ticketPurchasePaymentIntentMetadataSchema,
} from "../ticket-sales/ticket-sales.service";

const stripe = new Stripe(environment.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

const endpointSecret = "whsec_2mOTuCdwBWZu39WTasI7tdGFwa2VOOrw";

const ticketSalesService = new TicketSalesService();

paymentsController.post("/", express.raw({ type: "application/json" }), async (request, response) => {
  const signature = request.headers["stripe-signature"];

  if (!signature || !isString(signature)) {
    console.log(`⚠️  Webhook signature missing.`);
    return response.sendStatus(400);
  }

  try {
    const event = await stripe.webhooks.constructEventAsync(request.body, signature, endpointSecret);
    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent} was successful!`);
        const parsedMetadata = ticketPurchasePaymentIntentMetadataSchema.parse(paymentIntent.metadata);
        await ticketSalesService.handleSuccessfulTicketPayment({
          eventId: parsedMetadata.eventId,
          ticketTypeId: parsedMetadata.ticketTypeId,
          paymentIntentId: paymentIntent.id,
          stripeCustomerId: paymentIntent.customer as string,
        });

        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case "payment_intent.processing":
        const paymentIntentProcessing = event.data.object;
        console.log(`PaymentIntent for ${paymentIntentProcessing.amount} is processing!`);
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      case "payment_intent.payment_failed":
        const paymentIntentFailed = event.data.object;
        console.log(`PaymentIntent for ${paymentIntentFailed} failed!`);
        // Then define and call a method to handle the payment intent failure.
        // handlePaymentIntentFailed(paymentIntent);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    return response.sendStatus(200);
  } catch (err) {
    assertError(err);
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return response.sendStatus(400);
  }
});

export { paymentsController };
