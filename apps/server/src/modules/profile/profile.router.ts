import { createTRPCRouter } from "../../trpc/context";
import { workOsProcedure } from "../../trpc/procedures/workOsProcedure";
import { ProfileService } from "./profile.service";

const profileService = new ProfileService();

export const profileRouter = createTRPCRouter({
  attending: workOsProcedure.query(async ({ ctx }) => {
    const attending = await profileService.getAttending(ctx.session);
    return attending;
  }),
});
