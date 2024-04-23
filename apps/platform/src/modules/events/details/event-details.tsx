"use client";

import { Button } from "@plaventi/ui";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Flex, Heading, Inset } from "@radix-ui/themes";
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
    <>
      <Inset>
        <Flex>
          <Image src={blackCoffee} alt="Event Image" width={200} height={200} />
        </Flex>
      </Inset>
      <Flex direction="column">
        <Flex>
          <Heading>Event Details</Heading>

          <EditEventDialog
            event={event}
            trigger={
              <Button>
                <Pencil1Icon /> Edit
              </Button>
            }
          />
        </Flex>
        <p>{event.title}</p>
        <p>{event.description}</p>
      </Flex>
    </>
  );
}
