import { prisma } from "@plaventi/database";
import { environment } from "../../environment";
import { SessionWithOrg } from "../../types/types";
import Stripe from "stripe";

export class PaymentAccountPersistence {
  async createAccount(session: SessionWithOrg, args: { stripeAccountId: string }) {
    return await prisma.paymentAccount.create({
      data: {
        stripeAccountId: args.stripeAccountId,
        team: {
          connect: {
            id: session.team.id,
          },
        },
      },
    });
  }

  async getCustomer({ profileId, stripeAccountId }: { profileId: string; stripeAccountId: string }) {
    const paymentAccountCustomer = await prisma.paymentAccountCustomer.findFirst({
      where: {
        paymentAccount: {
          stripeAccountId,
        },
        profileId,
      },
    });

    if (!paymentAccountCustomer) {
      return null;
    }

    return paymentAccountCustomer;
  }

  async createCustomer({
    profileId,
    stripeAccountId,
    stripeCustomerId,
  }: {
    profileId: string;
    stripeAccountId: string;
    stripeCustomerId: string;
  }) {
    return await prisma.paymentAccountCustomer.create({
      data: {
        profile: {
          connect: {
            id: profileId,
          },
        },
        paymentAccount: {
          connect: {
            stripeAccountId,
          },
        },
        stripeCustomerId,
      },
    });
  }
}
