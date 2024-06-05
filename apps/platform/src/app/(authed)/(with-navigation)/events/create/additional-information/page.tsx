"use client";

import { TextFieldInput, TextFieldLabel, TextFieldLabelContainer, TextFieldRoot } from "@plaventi/ui";
import { CalendarIcon, Cross1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Button,
  Flex,
  Heading,
  IconButton,
  Popover,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { format } from "date-fns";
import { useState } from "react";
import { Calendar } from "~/components/ui/calendar";
import { Combobox } from "~/components/ui/combobox";
import { useEventBuilderContext } from "~/modules/events/create/context/event-builder.context";

const availableTags = [
  {
    id: "food",
    label: "Food",
  },
  {
    id: "networking",
    label: "Networking",
  },
  {
    id: "nightlife",
    label: "Nightlife",
  },
  {
    id: "conference",
    label: "Conference",
  },
  {
    id: "canceled",
    label: "Social",
  },
  {
    id: "arts",
    label: "Arts",
  },
  {
    id: "business",
    label: "Business",
  },
];

export default function EventBuilderTicketsPage() {
  const { additionalInformation, setAdditionalInformation } = useEventBuilderContext();
  const [tagSearch, setTagSearch] = useState<string | undefined>(undefined);
  const [tagSearchOpen, setTagSearchOpen] = useState(false);

  return (
    <>
      <Flex direction="column">
        <Heading size="4">Additional information</Heading>
        <Text size="2" color="gray">
          Provide some additional information about your event.
        </Text>
      </Flex>
      <Flex direction="column" gap="5" maxWidth="550px">
        <TextFieldRoot>
          <TextFieldLabelContainer>
            <TextFieldLabel>About this event</TextFieldLabel>
          </TextFieldLabelContainer>
          <TextArea
            rows={10}
            size="2"
            placeholder="Enter the venue for your event"
            name="title"
            required
            onChange={(val) => {
              setAdditionalInformation({ description: val.currentTarget.value });
            }}
          />
        </TextFieldRoot>
        <TextFieldRoot className="gap-1">
          <TextFieldLabelContainer className="mb-0">
            <TextFieldLabel className="mb-0">Tags</TextFieldLabel>
          </TextFieldLabelContainer>
          <Flex mb="1">
            <Text color="gray" size="1" weight="light">
              Add tags to help people find your event.
            </Text>
          </Flex>
          {/* <TextField.Root
            variant="surface"
            size="2"
            placeholder="Add tags"
            color="gray"
            value={tagSearch}
            onChange={(e) => {
              if (e.currentTarget.value === "") {
                setTagSearch(undefined);
              }
              setTagSearch(e.currentTarget.value);
            }}
            className="w-full justify-start">
            <TextField.Slot>
              <MagnifyingGlassIcon className="text-gray10" />
            </TextField.Slot>
          </TextField.Root> */}
          <Combobox
            availableItems={availableTags}
            selectedItems={additionalInformation?.tags ?? []}
            onSelect={(val) => {
              setTagSearchOpen(true);
              setAdditionalInformation({ tags: val });
            }}
          />
        </TextFieldRoot>
        <Flex gap="3" wrap="wrap">
          {additionalInformation?.tags?.map((tag) => (
            <Badge size="3" color="gray" key={tag.id} variant="outline">
              {tag.label}
              <IconButton
                size="1"
                variant="ghost"
                color="gray"
                onClick={() => {
                  setAdditionalInformation({
                    tags: additionalInformation.tags?.filter((t) => t.id !== tag.id),
                  });
                }}>
                <Cross1Icon />
              </IconButton>
            </Badge>
          ))}
        </Flex>
      </Flex>
    </>
  );
}
