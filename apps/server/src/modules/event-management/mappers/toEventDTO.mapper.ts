import { EventDTO } from "../dto/event.dto";
import { PlaventiEvent } from "../event.model";

export function toEventDTO(event: PlaventiEvent): EventDTO {
  return {
    identifier: event.identifier,
    title: event.title,
    status: event.status,
    description: event.description,
    imageUrl: event.imageUrl,
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
    location: {
      name: event.location.name,
      formattedAddress: event.location.formattedAddress,
      placeId: event.location.googlePlaceId,
      coordinates: {
        lat: event.location.latitude,
        lng: event.location.longitude,
      },
    },
    ticketing: {
      types: event.ticketing.types.map((ticket) => ({
        id: ticket.id,
        name: ticket.name,
        description: ticket.description,
        price: ticket.price,
        availableQuantity: ticket.availableQuantity,
        salesStart: ticket.salesStart,
        salesEnd: ticket.salesEnd,
      })),
    },
    timing: event.timing,
  };
}
