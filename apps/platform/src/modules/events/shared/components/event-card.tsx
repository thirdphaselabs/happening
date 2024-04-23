import { Card } from "@plaventi/ui";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, Link } from "@radix-ui/themes";
import { PlaventiEvent } from "~/trpc/types";
import { EventStatusBadge } from "./event-status-badge";

export function EventCard({ event }: { event: PlaventiEvent }) {
  return (
    <Flex className="w-full">
      <Link href={`/events/details/${event.identifier}`} className="w-full">
        <Card.Root>
          <Card.Image src={event.coverImageUrl} />
          <Card.Header>
            {event.title}
            <Card.Actions identifier={event.identifier} />
          </Card.Header>

          <Card.Badge>
            <EventStatusBadge status={event.status} />
          </Card.Badge>
        </Card.Root>
      </Link>
    </Flex>
  );
}
