import { environment } from "../../environment";
import { SessionWithOrg } from "../../types/types";
import Stripe from "stripe";
import { PaymentAccountPersistence } from "./payment-account.persistence";

const stripe = new Stripe(environment.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

const { APP_URL } = environment;

export class PaymentAccountService {
  private readonly paymentAccountPersistence = new PaymentAccountPersistence();

  constructor() {
    this.paymentAccountPersistence = new PaymentAccountPersistence();
  }

  async createAccount(session: SessionWithOrg) {
    const account = await stripe.accounts.create({
      type: "standard",
    });

    await this.paymentAccountPersistence.createAccount(session, {
      stripeAccountId: account.id,
    });

    return account.id;
  }

  async linkAccount(session: SessionWithOrg, { account }: { account: string }) {
    const accountLink = await stripe.accountLinks.create({
      account: account,
      return_url: `${APP_URL}/return/${account}`,
      refresh_url: `${APP_URL}/refresh/${account}`,
      type: "account_onboarding",
    });

    return accountLink.url;
  }

  async getAccount(session: SessionWithOrg, args: { accountId: string }) {
    const account = await stripe.accounts.retrieve(args.accountId);

    return account;
  }

  async getCustomer({ profileId, stripeAccountId }: { profileId: string; stripeAccountId: string }) {
    const customer = await this.paymentAccountPersistence.getCustomer({
      profileId,
      stripeAccountId,
    });

    return customer;
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
    return await this.paymentAccountPersistence.createCustomer({
      profileId,
      stripeAccountId,
      stripeCustomerId,
    });
  }

  async getOrCreateCustomer({
    profileId,
    email,
    stripeAccountId,
  }: {
    profileId: string;
    email: string;
    stripeAccountId: string;
  }) {
    const existingCustomer = await this.getCustomer({ profileId, stripeAccountId });

    if (existingCustomer) {
      return existingCustomer;
    }

    const customer = await stripe.customers.create(
      {
        email,
      },
      {
        stripeAccount: stripeAccountId,
      },
    );

    return await this.createCustomer({ profileId, stripeAccountId, stripeCustomerId: customer.id });
  }
}
