import { EventDTO } from "../dto/event.dto";
import { PlaventiEvent } from "../event.model";

export function toEventDTO(event: PlaventiEvent): EventDTO {
  return {
    identifier: event.identifier,
    title: event.title,
    status: event.status,
    description: event.description,
    coverImageUrl: event.coverImageUrl,
    isApprovalRequired: event.isApprovalRequired,
    guestList: {
      isVisible: event.guestList.isVisible,
      requiresApproval: event.isApprovalRequired,
      attendees: event.guestList.attendees.map((gli) => ({
        isApproved: gli.isApproved,
        profile: {
          firstName: gli.profile.firstName,
          lastName: gli.profile.lastName,
          profilePictureUrl: "",
        },
      })),
    },
    location: event.location,
    ticketing: event.ticketing,
    timing: event.timing,
  };
}
