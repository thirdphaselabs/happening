import { z } from "zod";
import { createTRPCRouter } from "../../trpc/context";
import { workOsProcedure } from "../../trpc/procedures/workOsProcedure";
import { TeamService } from "./team.service";

const teamService = new TeamService();

export const teamRouter = createTRPCRouter({
  isDomainAssociatedWithTeam: workOsProcedure
    .input(z.object({ domain: z.string() }))
    .output(z.object({ isAssociated: z.boolean() }))
    .query(async ({ input }) => {
      const isAssociated = await teamService.isDomainAssociatedWithTeam(input.domain);

      return {
        isAssociated,
      };
    }),
});
