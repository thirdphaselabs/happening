import { Separator, TicketIcon } from "@plaventi/ui";
import {
  ButtonIcon,
  CaretDownIcon,
  CheckCircledIcon,
  DotsHorizontalIcon,
  GlobeIcon,
  IdCardIcon,
  LockOpen1Icon,
  Pencil1Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Button, DropdownMenu, Flex, Heading, Popover, Text, Tooltip } from "@radix-ui/themes";
import { TicketTypeDialog } from "./ticket-type.dialog";
import { useEventBuilderContext } from "../context/event-builder.context";
import { TicketType } from "../context/types/types";
import { useState } from "react";
import { t } from "@plaventi/server/src/trpc/context";
import { RiCheckDoubleLine, RiLockLine, RiLockStarLine } from "@remixicon/react";

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
          {tickets && tickets.ticketTypes && <TicketTypeDropdown ticketTypes={tickets.ticketTypes} />}

          <TicketTypeDialog
            method="add"
            ticketType={null}
            trigger={
              <Button variant="ghost" size="3" color="gray">
                Add <PlusIcon />
              </Button>
            }
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

function TicketTypeDropdown({ ticketTypes }: { ticketTypes: TicketType[] }) {
  const [selectedTicketType, setSelectedTicketType] = useState<TicketType | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Popover.Root open={isPopoverOpen} onOpenChange={(val) => setIsPopoverOpen(val)}>
        <Popover.Trigger>
          <Button
            variant="soft"
            color="gray"
            size="2"
            onClick={() => setIsPopoverOpen(true)}
            className="duration-400 transition-all">
            {ticketTypes.length} Ticket Type{ticketTypes.length > 1 ? "s" : ""}
            <CaretDownIcon />
          </Button>
        </Popover.Trigger>
        <Popover.Content width="350px" align="end" className="relative px-0 py-0">
          <Flex direction="column">
            {ticketTypes.map((ticketType) => (
              <>
                <Button
                  key={ticketType.id}
                  color="gray"
                  variant="surface"
                  className="hover:bg-grayA3 m-0 h-fit w-full justify-start gap-4 rounded-none px-4 py-3 shadow-none"
                  onClick={() => {
                    setSelectedTicketType(ticketType);
                    setIsDialogOpen(true);
                  }}>
                  <Flex width="100%" align="center" justify="between" gap="1">
                    <Flex gap="2">
                      <Flex>
                        {ticketType.requiresApproval ? (
                          <Flex className="relative">
                            <Tooltip content="Approval required" className="z-[1000]">
                              <RiLockLine size={18} color="#162124" />
                            </Tooltip>
                          </Flex>
                        ) : (
                          <Tooltip content="Approval not required">
                            <RiCheckDoubleLine size={18} color="#162124" />
                          </Tooltip>
                        )}
                      </Flex>
                      <Flex direction="column" gap="1" align="start">
                        <Heading
                          size="2"
                          color="gray"
                          align="left"
                          highContrast
                          className="flex items-center gap-2 text-left">
                          {ticketType.name}
                          {/* <Pencil1Icon color="gray" /> */}
                        </Heading>
                        {ticketType.description && (
                          <Text
                            size="2"
                            align="left"
                            color="gray"
                            weight="regular"
                            className="max-w-[200px] truncate">
                            {ticketType.description}
                          </Text>
                        )}
                      </Flex>
                    </Flex>
                    <Flex direction="column" align="end">
                      <Text size="2">{ticketType.price ? `$${ticketType.price}` : "Free"}</Text>
                      <Text size="2" className="text-grayA8 text-nowrap">
                        {ticketType.ticketCapacity ? `${ticketType.ticketCapacity} capacity` : "No limit"}
                      </Text>
                    </Flex>
                  </Flex>
                </Button>
                <Separator orientation="horizontal" className="m-0 w-full p-0" />
              </>
            ))}
          </Flex>
        </Popover.Content>
      </Popover.Root>
      {selectedTicketType && (
        <TicketTypeDialog
          method="edit"
          ticketType={selectedTicketType}
          trigger={null}
          isOpen={isDialogOpen}
          setIsOpen={(val) => {
            setSelectedTicketType(null);
            setIsDialogOpen(val);
          }}
        />
      )}
    </>
  );
}
