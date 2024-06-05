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
  } as EventDTO;
}
