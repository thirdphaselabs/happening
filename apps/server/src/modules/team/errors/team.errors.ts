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
