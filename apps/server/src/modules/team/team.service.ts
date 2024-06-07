import { prisma } from "@plaventi/database";
import { PlaventiSession } from "../auth/auth.controller";
import {
  HasAlreadyCreatedTeamError,
  FailedToCreateTeamError,
  FailedToCreateWorkOSOrganizationError,
  FailedToCreateWorkOSOrganizationMembershipError,
} from "./errors/team.errors";

import { DomainDataState, Organization, WorkOS } from "@workos-inc/node";

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export class TeamService {
  async getTeam(teamId: string) {}

  async sendInviteToTeam(session: PlaventiSession, workosOrganisationId: string, emails: string[]) {
    for (const email of emails) {
      try {
        await workos.userManagement.sendInvitation({
          email,
          organizationId: workosOrganisationId,
          inviterUserId: session.user.id,
          roleSlug: "member",
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  async hasUserCreatedTeam(session: PlaventiSession) {
    const updateCount = await prisma.profile.updateMany({
      where: {
        id: session.profile.id,
        hasCreatedTeam: false,
      },
      data: {
        hasCreatedTeam: true,
      },
    });

    if (updateCount.count === 0) {
      throw new HasAlreadyCreatedTeamError();
    }

    return false;
  }

  async createTeam(
    session: PlaventiSession,
    args: {
      name: string;
      domain: string;
    },
  ) {
    const organisation = await workos.organizations.createOrganization({
      name: args.name,
      domainData: [
        {
          domain: args.domain,
          state: DomainDataState.Pending,
        },
      ],
    });

    await workos.userManagement.createOrganizationMembership({
      organizationId: organisation.id,
      userId: session.user.id,
      roleSlug: "admin",
    });

    return await prisma.team.create({
      data: {
        name: args.name,
        domain: args.domain,
        profiles: {
          connect: {
            id: session.profile.id,
          },
        },
        workosOrganisationId: organisation.id,
      },
    });
  }

  async isDomainAssociatedWithTeam(domain: string) {
    const teamWithDomain = await prisma.team.findFirst({
      where: {
        domain,
      },
    });

    return !!teamWithDomain;
  }
}
