import { JoinWaitlist } from "./use-cases/join-waitlist";
import { WaitlistPersistance } from "./waitlist.persistance";

export class WaitlistService {
  private eventPersistance: WaitlistPersistance;
  private joinWaitlist: JoinWaitlist;

  constructor(persistance?: WaitlistPersistance) {
    if (!persistance) {
      this.eventPersistance = new WaitlistPersistance();
    } else {
      this.eventPersistance = persistance;
    }

    this.joinWaitlist = new JoinWaitlist(this.eventPersistance);
  }

  async join(args: { email: string }) {
    await this.joinWaitlist.execute(args);
  }
}
