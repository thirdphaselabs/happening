"use client";

import { TextFieldInput, TextFieldLabel, TextFieldLabelContainer, TextFieldRoot } from "@plaventi/ui";
import { CalendarIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import { Avatar, Box, Button, Checkbox, Flex, Heading, Popover, Text, TextArea } from "@radix-ui/themes";
import { format } from "date-fns";
import { useState } from "react";
import { Calendar } from "~/components/ui/calendar";
import { useEventBuilderContext } from "~/modules/events/builder/context/event-builder.context";
import EventBuilderDateView from "~/modules/events/builder/views/date";

export default function EventBuilderPage() {
  const { dateAndTime, setDateAndTime } = useEventBuilderContext();
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  return (
    <>
      <Flex direction="column">
        <Heading size="4">Date & time</Heading>
        <Text size="2" color="gray">
          Inform attendees when your event starts and finishes.
        </Text>
      </Flex>
      <form className="w-full" onSubmit={() => {}}>
        <Flex direction="column" gap="5" maxWidth="550px">
          <TextFieldRoot>
            <TextFieldLabelContainer>
              <TextFieldLabel>Event start</TextFieldLabel>
            </TextFieldLabelContainer>

            <Popover.Root open={startDateOpen} onOpenChange={(val) => setStartDateOpen(val)}>
              <Popover.Trigger>
                <Button variant="surface" size="2" color="gray" className="w-full justify-start">
                  <CalendarIcon width={16} height={16} />
                  {dateAndTime?.startDate ? (
                    format(dateAndTime.startDate, "dd/MM/yyyy")
                  ) : (
                    <Text className="text-gray10 text-sm font-[400]">DD/MM/YYYY</Text>
                  )}
                </Button>
              </Popover.Trigger>
              <Popover.Content side="top" align="start" className="w-max min-w-max p-0">
                <Calendar
                  mode="single"
                  selected={dateAndTime?.startDate}
                  onSelect={(val) => {
                    setDateAndTime({ startDate: val });
                    setStartDateOpen(false);
                  }}
                  className="w-max"
                />
              </Popover.Content>
            </Popover.Root>
          </TextFieldRoot>
          <TextFieldRoot>
            <TextFieldLabelContainer>
              <TextFieldLabel>Event end</TextFieldLabel>
            </TextFieldLabelContainer>

            <Popover.Root open={endDateOpen} onOpenChange={(val) => setEndDateOpen(val)}>
              <Popover.Trigger>
                <Button variant="surface" size="2" color="gray" className="w-full justify-start">
                  <CalendarIcon width={16} height={16} />
                  {dateAndTime?.endDate ? (
                    format(dateAndTime.endDate, "dd/MM/yyyy")
                  ) : (
                    <Text className="text-gray10 text-sm font-[400]">DD/MM/YYYY</Text>
                  )}
                </Button>
              </Popover.Trigger>
              <Popover.Content side="top" align="start" className="w-max min-w-max p-0">
                <Calendar
                  mode="single"
                  selected={dateAndTime?.endDate}
                  onSelect={(val) => {
                    setDateAndTime({ endDate: val });
                    setEndDateOpen(false);
                  }}
                  className="w-max"
                />
              </Popover.Content>
            </Popover.Root>
          </TextFieldRoot>

          <TextFieldLabelContainer>
            <Flex as="span" gap="3">
              <Checkbox
                size="2"
                className="mt-1"
                onCheckedChange={(val) => {
                  if (val === "indeterminate") return;
                  setDateAndTime({ shouldDisplayStartDate: val });
                }}
              />
              <Flex direction="column" gap="1">
                <TextFieldLabel className="mb-0">Display event start time</TextFieldLabel>
                <Text size="1" color="gray">
                  The event start time will be visible publicly.
                </Text>
              </Flex>
            </Flex>
          </TextFieldLabelContainer>

          <TextFieldLabelContainer>
            <Flex as="span" gap="3">
              <Checkbox
                size="2"
                className="mt-1"
                onCheckedChange={(val) => {
                  if (val === "indeterminate") return;
                  setDateAndTime({ shouldDisplayStartDate: val });
                }}
              />
              <Flex direction="column" gap="1">
                <TextFieldLabel className="mb-0">Display event end time</TextFieldLabel>
                <Text size="1" color="gray">
                  The event end time will be visible publicly.
                </Text>
              </Flex>
            </Flex>
          </TextFieldLabelContainer>
        </Flex>
      </form>
    </>
  );
}
