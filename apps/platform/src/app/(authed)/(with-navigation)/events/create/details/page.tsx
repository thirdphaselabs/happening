"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextFieldInput, TextFieldLabel, TextFieldLabelContainer, TextFieldRoot } from "@plaventi/ui";
import { UploadIcon } from "@radix-ui/react-icons";
import { Card, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { useEventBuilderContext } from "~/modules/events/builder/context/event-builder.context";

export default function EventBuilderPage() {
  const { eventDetails, setEventDetails } = useEventBuilderContext();
  const formRef = useRef<HTMLFormElement>(null);

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
        <Heading size="4">Create Event</Heading>
        <Text size="2" color="gray">
          Add the basic details for this event.
        </Text>
      </Flex>
      <form className="w-full" onSubmit={handleSubmit} ref={formRef}>
        <Flex direction="column" gap="5" maxWidth="550px">
          <TextFieldRoot>
            <TextFieldLabelContainer>
              <TextFieldLabel>Event title</TextFieldLabel>
            </TextFieldLabelContainer>
            <TextFieldInput
              size="2"
              placeholder="Enter your event title"
              name="title"
              type="text"
              required
              value={eventDetails?.name}
              handleChange={(val) => {
                setEventDetails({ name: val });
              }}
            />
          </TextFieldRoot>
          <TextFieldRoot>
            <TextFieldLabelContainer>
              <TextFieldLabel>Event description</TextFieldLabel>
            </TextFieldLabelContainer>
            <TextFieldInput
              value={eventDetails?.description}
              handleChange={(val) => {
                setEventDetails({ description: val });
              }}
              size="2"
              placeholder="Enter your event description"
              name="description"
              type="text"
              required
            />
          </TextFieldRoot>
          <TextFieldRoot>
            <TextFieldLabelContainer>
              <TextFieldLabel>Cover image</TextFieldLabel>
            </TextFieldLabelContainer>
            <Card className="flex flex-col items-center gap-4 border-dashed py-6">
              <UploadIcon width={16} height={16} />

              <Flex direction="column" gap="1" align="center">
                <Heading size="2">Upload event cover image</Heading>
                <Text as="p" size="2" color="gray" className="hidden sm:block">
                  Drag and drop your image here or click to find your file.
                </Text>
              </Flex>
              <Button size="2" variant="soft">
                Upload image
              </Button>
            </Card>
          </TextFieldRoot>
        </Flex>
      </form>
    </>
  );
}
