"use client";

import { TextFieldInput, TextFieldLabel, TextFieldLabelContainer, TextFieldRoot } from "@plaventi/ui";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { useEventBuilderContext } from "~/modules/events/create/context/event-builder.context";

export default function EventBuilderTicketsPage() {
  const { locationDetails, setLocationDetails } = useEventBuilderContext();

  return (
    <>
      <Flex direction="column">
        <Heading size="4">Location</Heading>
        <Text size="2" color="gray">
          Help people find where your event is taking place.
        </Text>
      </Flex>
      <Flex direction="column" gap="5" maxWidth="550px">
        <TextFieldRoot>
          <TextFieldLabelContainer>
            <TextFieldLabel>Venue</TextFieldLabel>
          </TextFieldLabelContainer>
          <TextFieldInput
            size="2"
            placeholder="Enter the venue for your event"
            name="title"
            type="text"
            required
            value={locationDetails?.venue}
            handleChange={(val) => {
              setLocationDetails({ venue: val });
            }}
          />
        </TextFieldRoot>
        <TextFieldRoot>
          <TextFieldLabelContainer>
            <TextFieldLabel>Address</TextFieldLabel>
          </TextFieldLabelContainer>
          <TextFieldInput
            size="2"
            placeholder="Enter the full address of your event"
            name="title"
            type="text"
            required
            value={locationDetails?.address}
            handleChange={(val) => {
              setLocationDetails({ address: val });
            }}
          />
        </TextFieldRoot>
      </Flex>
    </>
  );
}
