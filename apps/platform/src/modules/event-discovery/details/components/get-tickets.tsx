"use client";

import { cn } from "@plaventi/ui/src/utils/helpers";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Flex, Heading, Text, Button } from "@radix-ui/themes";
import { useState } from "react";
import { PlaventiEvent } from "~/trpc/types";

export function GetTickets({ event }: { event: PlaventiEvent }) {
  const [selectedTicketType, setSelectedTicketType] = useState(event.ticketing.types[0]);

  return (
    <Flex direction="column" width="100%" className="mb-5 gap-3 rounded-xl bg-white/50 p-[2px] pb-4">
      <Flex className="bg-gray3/50 w-full gap-3 rounded-xl rounded-b-none px-3 py-2">
        <Heading size="2">Get Tickets</Heading>
      </Flex>
      <Flex direction="column" gap="3" px="3">
        <Text size="2" color="gray">
          Welcome! Please select your desired ticket type.
        </Text>
        {event.ticketing.types.map((type, i) => {
          const isSelected = selectedTicketType.id === type.id;
          return (
            <Flex
              onClick={() => setSelectedTicketType(type)}
              key={type.id}
              className={cn(
                "bg-gray3/50 w-full cursor-pointer gap-3 rounded-lg border-[2px] border-solid border-transparent p-3",
                {
                  " border-gray6 bg-white": isSelected,
                  "bg-gray3/100": !isSelected,
                },
              )}
              justify="between">
              <Flex align="center" gap="3">
                <Flex className={cn({ invisible: !isSelected })}>
                  <CheckCircledIcon />
                </Flex>
                <Flex direction="column" className="flex-grow">
                  <Heading size="3">{type.name}</Heading>
                  <Text size="2" color="gray">
                    {type.description}
                  </Text>
                </Flex>
              </Flex>
              <Flex gap="2">
                <Text size="3" weight="medium">
                  {type.price ? (
                    <>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                      }).format(+type.price)}
                    </>
                  ) : (
                    "Free"
                  )}
                </Text>
              </Flex>
            </Flex>
          );
        })}
        <Button className="w-full" size="3">
          Get Ticket
        </Button>
      </Flex>
    </Flex>
  );
}
