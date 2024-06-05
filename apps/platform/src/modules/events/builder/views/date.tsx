"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextFieldInput, TextFieldLabel, TextFieldLabelContainer, TextFieldRoot } from "@plaventi/ui";
import { CalendarIcon, ChatBubbleIcon, UploadIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Flex,
  Heading,
  Popover,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { format } from "date-fns";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { Calendar } from "~/components/ui/calendar";
import { useEventBuilderContext } from "../../create/context/event-builder.context";

export default function EventBuilderDateView() {
  const { dateAndTime, setEventDetails, isLoading, setIsLoading } = useEventBuilderContext();

  const schema = z.object({
    managerId: z.coerce.number(),
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const eventDetails = {
      name: formData.get("title") as string,
      description: formData.get("description") as string,
    };
    setEventDetails(eventDetails);
  };

  return (
    <>
      <Flex direction="column">
        <Heading size="4">Date & time</Heading>
        <Text size="2" color="gray">
          Inform attendees when your event starts and finishes.
        </Text>
      </Flex>
      <form className="w-full" onSubmit={handleSubmit}>
        <Flex direction="column" gap="5" maxWidth="550px">
          <TextFieldRoot>
            <TextFieldLabelContainer>
              <TextFieldLabel>Event start</TextFieldLabel>
            </TextFieldLabelContainer>
            <TextFieldInput
              size="2"
              placeholder="Enter your event title"
              name="title"
              type="text"
              required
              handleChange={(val) => {
                setEventDetails({ name: val });
              }}
            />
          </TextFieldRoot>
          <TextFieldRoot>
            <TextFieldLabelContainer>
              <TextFieldLabel>Event end</TextFieldLabel>
            </TextFieldLabelContainer>
          </TextFieldRoot>

          <Checkbox />
        </Flex>
      </form>
      <Popover.Root>
        <Popover.Trigger>
          <Button variant="soft">
            <ChatBubbleIcon width="16" height="16" />
            Comment
          </Button>
        </Popover.Trigger>
        <Popover.Content width="360px" side="bottom">
          <Flex gap="3">
            <Avatar
              size="2"
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
              fallback="A"
              radius="full"
            />
            <Box flexGrow="1">
              <TextArea placeholder="Write a comment…" style={{ height: 80 }} />
              <Flex gap="3" mt="3" justify="between">
                <Flex align="center" gap="2" asChild>
                  <Text as="label" size="2">
                    <Checkbox />
                    <Text>Send to group</Text>
                  </Text>
                </Flex>

                <Popover.Close>
                  <Button size="1">Comment</Button>
                </Popover.Close>
              </Flex>
            </Box>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </>
  );
}
