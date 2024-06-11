import { TicketIcon } from "@plaventi/ui";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading } from "@radix-ui/themes";
import { EditTicketTypeDialog } from "./edit-ticket-type.dialog";
import { useEventBuilderContext } from "../context/event-builder.context";

export function Tickets() {
  const { tickets } = useEventBuilderContext();
  return (
    <Flex gap="2" className="bg-skyA2 rounded-xl rounded-b-none px-3 py-2" width="100%" align="center">
      <Flex align="start" className="mt-1">
        <TicketIcon height="16" width="16" color="gray" />
      </Flex>
      <Flex align="center" justify="between" width="100%">
        <Heading size="3" className="flex items-center gap-1 " color="gray" weight="medium">
          Tickets
        </Heading>
        <Flex align="center" gap="4">
          {tickets?.ticketTypes.map((ticket) => (
            <EditTicketTypeDialog key={ticket.lastUpdated.getDate()} ticketType={ticket} />
          ))}

          <Button variant="ghost" size="3" color="gray">
            Add <PlusIcon />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
