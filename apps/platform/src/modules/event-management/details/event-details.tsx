"use client";

import { Button, Separator } from "@plaventi/ui";
import { ArrowTopRightIcon, GlobeIcon, Pencil1Icon } from "@radix-ui/react-icons";
import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Inset,
  Link,
  SegmentedControl,
  Tabs,
  Tooltip,
  Text,
} from "@radix-ui/themes";
import { api } from "~/trpc/provider";
import { EditEventDialog } from "./components/edit-event-dialog";
import Image from "next/image";
import blackCoffee from "~/assets/black-coffee.png";

export function EventDetails({ identifier }: { identifier: string }) {
  const { data: event, isLoading, error } = api.event.byIdentifier.useQuery({ identifier });

  if (isLoading) {
    return null;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Flex direction="column" gap="6" mt="6" className="w-full">
      Ovew
    </Flex>
  );
}
