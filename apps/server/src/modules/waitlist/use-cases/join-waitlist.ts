import { WaitlistPersistance } from "../waitlist.persistance";

export class JoinWaitlist {
  constructor(private waitlistPersistance: WaitlistPersistance) {}

  async execute(args: { email: string }) {
    const existing = await this.waitlistPersistance.getByEmail(args);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    if (existing) {
      throw new AlreadyOnWaitlistError();
    }
    await this.waitlistPersistance.join(args);
  }
}

export class AlreadyOnWaitlistError extends Error {
  constructor() {
    super("You have already joined the waitlist");
    this.name = "AlreadyOnWaitlistError";
  }
}
