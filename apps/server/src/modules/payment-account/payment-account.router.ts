import { z } from "zod";
import { createTRPCRouter } from "../../trpc/context";
import { workOsWithOrgProcedure } from "../../trpc/procedures/workOsProcedure";
import { PaymentAccountService } from "./payment-account.service";

const paymentAccountService = new PaymentAccountService();

export const paymentAccountRouter = createTRPCRouter({
  createAccount: workOsWithOrgProcedure.mutation(async ({ ctx, input }) => {
    const account = await paymentAccountService.createAccount(ctx.session);

    return account;
  }),
  linkAccount: workOsWithOrgProcedure
    .input(
      z.object({
        account: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const accountLinkUrl = await paymentAccountService.linkAccount(ctx.session, input);

      return accountLinkUrl;
    }),
  getAccount: workOsWithOrgProcedure
    .input(
      z.object({
        accountId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const account = await paymentAccountService.getAccount(ctx.session, input);

      return account;
    }),
});
