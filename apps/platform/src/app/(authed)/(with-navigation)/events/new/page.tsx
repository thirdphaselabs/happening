"use client";

import { Button, TextFieldLabel, TextFieldLabelContainer, TextFieldRoot } from "@plaventi/ui";
import { Flex, Heading, TextField } from "@radix-ui/themes";
import { useCreateEvent } from "~/modules/events/create/hooks/use-create-event";
import { api } from "~/trpc/provider";

export default function CreateEventPage() {
  const { createEvent, isLoading, error } = useCreateEvent();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    await createEvent({
      title,
      description,
    });
  };

  return (
    <Flex direction="column" gap="5">
      <Heading>Create Event</Heading>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="5" maxWidth="550px">
          <TextFieldRoot>
            <TextFieldLabelContainer>
              <TextFieldLabel>Event title</TextFieldLabel>
            </TextFieldLabelContainer>
            <TextField.Root size="3" placeholder="Enter your event title" name="title" type="text" required />
          </TextFieldRoot>
          <TextFieldRoot>
            <TextFieldLabelContainer>
              <TextFieldLabel>Event description</TextFieldLabel>
            </TextFieldLabelContainer>
            <TextField.Root
              size="3"
              placeholder="Enter your event description"
              name="description"
              type="text"
              required
            />
          </TextFieldRoot>
          <Button>Create event</Button>
        </Flex>
      </form>
    </Flex>
  );
}
