import { UserId, OrganizationId } from "../types/types";
import { AuthContextWithOrganisation } from "../trpc/procedures/adminProcedures";

export function authOrg(ctx: AuthContextWithOrganisation) {
  return {
    userId: ctx.userId as UserId,
    organizationId: ctx.organisationId as OrganizationId,
  };
}
