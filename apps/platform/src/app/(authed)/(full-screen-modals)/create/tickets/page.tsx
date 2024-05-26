"use client";

import {
  Button,
  Separator,
  TextFieldInput,
  TextFieldLabel,
  TextFieldLabelContainer,
  TextFieldRoot,
} from "@plaventi/ui";
import { InfoCircledIcon, MinusIcon, PlusIcon, UploadIcon } from "@radix-ui/react-icons";
import {
  Callout,
  Card,
  Flex,
  Heading,
  IconButton,
  SegmentedControl,
  Text,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { useState } from "react";
import { AddFreeTicketGroupDialog } from "~/modules/events/builder/components/add-free-ticket-group-dialog";
import { AddPaidTicketGroupDialog } from "~/modules/events/builder/components/add-paid-ticket-group-dialog";
import { TicketGroupDropdown } from "~/modules/events/builder/components/ticket-group-dropdown";
import { useEventBuilderContext } from "~/modules/events/builder/context/event-builder.context";

export default function EventBuilderTicketsPage() {
  const { tickets, updateNumberOfTicketGroups } = useEventBuilderContext();

  const [category, setCategory] = useState<"paid" | "free">("paid");

  const numberOfTicketsEditing =
    category === "paid" ? tickets?.numberOfPaidTicketsEditing ?? 1 : tickets?.numberOfFreeTicketsEditing ?? 1;

  return (
    <>
      <Flex direction="column">
        <Heading size="4">Tickets</Heading>
        <Text size="2" color="gray">
          Define how ticketing will work for your event.
        </Text>
      </Flex>
      <Flex direction="column" gap="5" maxWidth="550px">
        <Flex>
          <SegmentedControl.Root
            value={category}
            onValueChange={(val) => (val === "paid" ? setCategory("paid") : setCategory("free"))}>
            <SegmentedControl.Item value="paid">Paid</SegmentedControl.Item>
            <SegmentedControl.Item value="free">Free</SegmentedControl.Item>
          </SegmentedControl.Root>
        </Flex>
        <TextFieldRoot>
          <TextFieldLabelContainer>
            <TextFieldLabel>Number of {category} ticket groups</TextFieldLabel>
          </TextFieldLabelContainer>
          <TextField.Root value={numberOfTicketsEditing} placeholder="Number of paid ticket groups" size="2">
            <TextField.Slot></TextField.Slot>
            <TextField.Slot>
              <IconButton
                variant="outline"
                size="1"
                type="button"
                color="gray"
                disabled={numberOfTicketsEditing === 0 || numberOfTicketsEditing === tickets?.paid?.length}
                onClick={() => {
                  updateNumberOfTicketGroups({
                    category,
                    quantity: Math.max(0, numberOfTicketsEditing - 1),
                  });
                }}>
                <MinusIcon />
              </IconButton>
              <Tooltip
                content={numberOfTicketsEditing === 5 ? "Maximum ticket groups reached" : "Add ticket group"}>
                <IconButton
                  variant="outline"
                  type="button"
                  size="1"
                  color="gray"
                  disabled={numberOfTicketsEditing === 5}
                  onClick={() => {
                    updateNumberOfTicketGroups({
                      category,
                      quantity: Math.min(5, numberOfTicketsEditing + 1),
                    });
                  }}>
                  <PlusIcon />
                </IconButton>
              </Tooltip>
            </TextField.Slot>
          </TextField.Root>
        </TextFieldRoot>

        <Callout.Root color="gray">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            A ticket groups represent tickets that are grouped together that share the same attributes. e.g.
            General Admission, VIP.
          </Callout.Text>
        </Callout.Root>

        <Flex direction="column" mt="6" gap="6" width="100%">
          <Heading size="3">{category === "paid" ? "Paid" : "Free"} Ticket groups</Heading>
          <Flex direction="column" gap="4">
            {Array.from({ length: numberOfTicketsEditing }).map((_, index) => {
              const ticketGroup = category === "paid" ? tickets?.paid?.[index] : tickets?.free?.[index];
              if (ticketGroup) {
                return (
                  <Flex direction="column" gap="4">
                    <Flex direction="row" justify="between" width="100%" align="center">
                      <Flex direction="column" gap="1">
                        <Heading size="2">{ticketGroup.name}</Heading>
                        <Text color="gray" size="1">
                          {ticketGroup.availableQuantity} tickets,{" "}
                          {"price" in ticketGroup ? <>${ticketGroup.price}</> : "Free"}
                        </Text>
                      </Flex>
                      <Flex align="center" gap="4">
                        <TicketGroupDropdown ticketGroup={ticketGroup} />
                        {/* <Button variant="ghost" color="red" size="2">
                          Remove
                        </Button>
                        <Button variant="outline" color="gray" size="2">
                          Edit
                        </Button> */}
                      </Flex>
                    </Flex>
                    <Separator orientation="horizontal" className="w-full" />
                  </Flex>
                );
              }
              return (
                <Flex direction="column" gap="4">
                  <Flex direction="row" justify="between" width="100%" align="center">
                    <Heading size="2">Ticket Group #{index + 1}</Heading>
                    <Flex align="center" gap="4">
                      <Button
                        variant="ghost"
                        color="gray"
                        size="1"
                        onClick={() => {
                          updateNumberOfTicketGroups({
                            category,
                            quantity: numberOfTicketsEditing - 1,
                          });
                        }}>
                        Remove
                      </Button>
                      {category === "paid" ? <AddPaidTicketGroupDialog /> : <AddFreeTicketGroupDialog />}
                    </Flex>
                  </Flex>
                  <Separator orientation="horizontal" className="w-full" />
                </Flex>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
