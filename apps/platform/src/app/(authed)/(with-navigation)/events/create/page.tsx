"use client";

import { AspectRatio, Avatar, Flex, Heading, IconButton, Text, TextArea, TextField } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { useEventBuilderContext } from "~/modules/events/builder/context/event-builder.context";
import Image from "next/image";
import placeholder from "~/assets/invited-placeholder.png";
import { CaretDownIcon, GlobeIcon, ImageIcon } from "@radix-ui/react-icons";
import { Button, Separator } from "@plaventi/ui";
import { useTextareaAutoHeight } from "~/app/_hooks/useAutoReszieTextArea";
import { useRef } from "react";

export default function EventBuilderPageRoot() {
  // const {
  //   stage: { current },
  // } = useEventBuilderContext();

  // redirect(`/events/create/${current}`);
  const ref = useRef<HTMLTextAreaElement>(null);
  useTextareaAutoHeight({ ref });

  return (
    <Flex width="100%" gap="6">
      <Flex direction="column" gap="5">
        <Flex className="h-[330px] w-[330px]">
          <AspectRatio ratio={1 / 1}>
            <Image src={placeholder} alt="Event" layout="fill" objectFit="cover" className="rounded-xl" />
            <IconButton size="3" className="absolute bottom-2 right-2 z-10" color="gray" variant="surface">
              <ImageIcon height="20" width="20" />
            </IconButton>
          </AspectRatio>
        </Flex>
        <Flex direction="column" width="100%" gap="2">
          <Heading size="2" color="gray">
            Hosted By
          </Heading>
          <Separator orientation="horizontal" className="w-full" />
          <Flex align="center" gap="2">
            <Avatar fallback="RJ" size="1" radius="full" />
            <Text size="2" weight="medium">
              Reece Johnson
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex className="flex-grow" direction="column" gap="5">
        <Flex width="100%" justify="between">
          <Button variant="soft" color="gray" size="2">
            <Avatar fallback="95" size="1" radius="full" />
            9-5 Events
            <CaretDownIcon />
          </Button>
          <Button variant="soft" color="gray" size="2">
            <GlobeIcon />
            Public
            <CaretDownIcon />
          </Button>
        </Flex>
        <TextArea
          ref={ref}
          autoFocus
          placeholder="Event Name"
          variant="surface"
          size="3"
          id="create-event-name"
          className="text text-wrap rounded-none border-none bg-transparent px-0 text-[40px] font-bold tracking-tight outline-none"
          style={{ boxShadow: "none", textIndent: 0, height: "fit-content" }}
        />
      </Flex>
    </Flex>
  );
}
