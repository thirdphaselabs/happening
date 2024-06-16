import { z } from "zod";
import { createTRPCRouter } from "../../trpc/context";
import { publicProcedure } from "../../trpc/procedures/publicProcedure";
import { TicketSalesService } from "./ticket-sales.service";
import { workOsProcedure } from "../../trpc/procedures";

const ticketSalesService = new TicketSalesService();

export const ticketSalesRouter = createTRPCRouter({
  createPaymentIntent: workOsProcedure
    .input(
      z.object({
        eventId: z.string(),
        ticketTypeId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const paymentIntent = await ticketSalesService.createPaymentIntent(ctx.session, input);

      return paymentIntent;
    }),
});
