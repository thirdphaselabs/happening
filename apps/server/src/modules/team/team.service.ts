import { prisma } from "@plaventi/database";
import { PlaventiSession } from "../auth/auth.controller";

import { DomainDataState, Organization, WorkOS } from "@workos-inc/node";

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export class HasAlreadyCreatedTeamError extends Error {
  constructor() {
    super("User has already created a team");
  }
}

export class FailedToCreateWorkOSOrganizationError extends Error {
  constructor() {
    super("Failed to create WorkOS organization");
  }
}

export class FailedToCreateWorkOSOrganizationMembershipError extends Error {
  constructor() {
    super("Failed to create WorkOS organization membership");
  }
}

export class FailedToCreateTeamError extends Error {
  constructor() {
    super("Failed to create team");
  }
}

export class TeamService {
  async getTeam(teamId: string) {}

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
