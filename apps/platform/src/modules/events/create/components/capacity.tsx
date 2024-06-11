import { TicketIcon } from "@plaventi/ui";
import { BarChartIcon, Pencil2Icon, PlusIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading } from "@radix-ui/themes";
import { EditTicketTypeDialog } from "./edit-ticket-type.dialog";
import { useEventBuilderContext } from "../context/event-builder.context";
import { EditCapacityDialog } from "./edit-capacity.dialog";

export function Capacity() {
  const { additionalInformation } = useEventBuilderContext();
  return (
    <Flex gap="2" className="bg-skyA2 rounded-xl  rounded-t-none px-3 py-2" width="100%">
      <Flex align="start" className="mt-1">
        <BarChartIcon height="16" width="16" color="gray" />
      </Flex>
      <Flex justify="between" width="100%">
        <Heading size="3" className="flex items-center gap-1 " color="gray" weight="medium">
          Capacity
        </Heading>
        <EditCapacityDialog />
      </Flex>
    </Flex>
  );
}
