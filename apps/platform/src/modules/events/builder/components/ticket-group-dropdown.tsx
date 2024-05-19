import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { DropdownMenu, IconButton } from "@radix-ui/themes";
import { useEventBuilderContext } from "../context/event-builder.context";
import { FreeTicketGroup, PaidTicketGroup } from "../context/types/types";

export function TicketGroupDropdown({ ticketGroup }: { ticketGroup: PaidTicketGroup | FreeTicketGroup }) {
  const { removeTicketGroup } = useEventBuilderContext();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="outline" color="gray">
          <DotsVerticalIcon />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Edit</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          color="red"
          onClick={() => {
            removeTicketGroup({ category: "paid", id: ticketGroup.id });
          }}>
          Remove
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
