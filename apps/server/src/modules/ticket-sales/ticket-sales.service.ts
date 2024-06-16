import Stripe from "stripe";
import { environment } from "../../environment";
import { TicketSalesPersistence } from "./ticket-sales.persistence";
import { PlaventiSession } from "../auth/auth.controller";
import { z } from "zod";
import { PaymentAccountService } from "../payment-account/payment-account.service";

export const ticketPurchasePaymentIntentMetadataSchema = z.object({
  eventId: z.string(),
  ticketTypeId: z.string(),
});

export type TicketPurchasePaymentIntentMetadata = z.infer<typeof ticketPurchasePaymentIntentMetadataSchema>;

const stripe = new Stripe(environment.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

export class TicketSalesService {
  private readonly ticketSalesPersistence: TicketSalesPersistence;
  private readonly paymentAccountService: PaymentAccountService;

  constructor() {
    this.ticketSalesPersistence = new TicketSalesPersistence();
    this.paymentAccountService = new PaymentAccountService();
  }

  async createPaymentIntent(session: PlaventiSession, args: { eventId: string; ticketTypeId: string }) {
    const { ticketType, stripeAccountId } = await this.ticketSalesPersistence.getTicketTypeDetails(args);

    if (!ticketType.price) {
      throw new Error("Ticket type has no price");
    }

    const metadata: TicketPurchasePaymentIntentMetadata = {
      eventId: args.eventId,
      ticketTypeId: args.ticketTypeId,
    };

    const paymentIntent = await stripe.paymentIntents.create({
      customer: session.profile.stripeCustomerId,
      amount: ticketType.price * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      application_fee_amount: ticketType.price * 0.05 * 100,
      transfer_data: {
        destination: stripeAccountId,
      },
      metadata,
    });

    return paymentIntent;
  }

  async handleSuccessfulTicketPayment({
    eventId,
    ticketTypeId,
    paymentIntentId,
    stripeCustomerId,
  }: {
    eventId: string;
    ticketTypeId: string;
    paymentIntentId: string;
    stripeCustomerId: string;
  }) {
    const ticketPurchase = await this.ticketSalesPersistence.createTicketPurchase({
      eventId,
      ticketTypeId,
      paymentIntentId,
      stripeCustomerId,
    });

    return ticketPurchase;
  }
}
