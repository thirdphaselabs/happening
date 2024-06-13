import { TextFieldRoot, TextFieldLabelContainer, TextFieldLabel } from "@plaventi/ui";
import { Button, Flex, TextField, Dialog, Text } from "@radix-ui/themes";
import { ReactNode } from "react";
import { useUpdateEvent } from "../hooks/use-update-event";
import { PlaventiEvent } from "~/trpc/types";

export function EditEventDialog({ trigger, event }: { event: PlaventiEvent; trigger: ReactNode }) {
  const { updateEvent, isLoading, error } = useUpdateEvent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    await updateEvent({
      identifier: event.identifier,
      title,
      description,
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit event details</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your event.
        </Dialog.Description>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <TextFieldRoot>
              <TextFieldLabelContainer>
                <TextFieldLabel>Event title</TextFieldLabel>
              </TextFieldLabelContainer>
              <TextField.Root
                placeholder="Enter your event title"
                defaultValue={event.title}
                name="title"
                type="text"
                required
              />
            </TextFieldRoot>
            <TextFieldRoot>
              <TextFieldLabelContainer>
                <TextFieldLabel>Event description</TextFieldLabel>
              </TextFieldLabelContainer>
              <TextField.Root
                defaultValue={event.description}
                placeholder="Enter your event description"
                name="description"
                type="text"
                required
              />
            </TextFieldRoot>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button type="submit">Save</Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
