"use client";

import { cn } from "@plaventi/ui/src/utils/helpers";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Flex, Heading, Text, Button, Avatar, Link } from "@radix-ui/themes";
import { useState } from "react";
import { PlaventiEvent } from "~/trpc/types";
import { BuyTickets } from "./buy-tickets";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { api } from "~/trpc/provider";
import { useSearchParams } from "next/navigation";
import { useOptionalUser, useUser } from "~/modules/auth/user.context";
import { buildOrganizationFallbackInitials, timeUntil } from "~/lib/utils";
import { UserAvatar } from "~/components/user-avatar";
import { RiCalendar2Line, RiShareForward2Line, RiShareForwardLine, RiTimer2Line } from "@remixicon/react";

export function GetTickets({ event }: { event: PlaventiEvent }) {
  const [selectedTicketType, setSelectedTicketType] = useState(event.ticketing.types[0]);
  const [isBuyTicketsOpen, setIsBuyTicketsOpen] = useState(false);
  const { user, profile, attending } = useUser();

  const searchParams = useSearchParams();
  const redirectStatus = searchParams.get("redirect_status");

  console.log({ attending });

  if (redirectStatus === "succeeded" || attending.map((a) => a.eventId).includes(event.id)) {
    return (
      <Flex direction="column" width="100%" className="mb-5 gap-4 rounded-xl bg-white/50 px-5 py-4 pb-4">
        <Flex direction="column" gap="2">
          <UserAvatar user={user} size="2" />
          <Flex direction="column">
            <Heading size="5">You're In</Heading>
            <Text size="3" color="gray">
              A confirmation email has been sent to
            </Text>
            <Text size="3" color="gray" weight="medium">
              {user.email}
            </Text>
          </Flex>
        </Flex>
        <Flex className="w-full items-center gap-3 rounded-xl bg-[#00698016] px-3 py-2" justify="between">
          <Flex align="center" gap="3">
            <RiTimer2Line size="18" color="gray" />
            <Text size="3" color="gray" weight="medium">
              Event starting in
            </Text>
          </Flex>
          <Flex>
            <Text size="3" color="sky" weight="bold">
              {timeUntil(event.timing.startDate)}
            </Text>
          </Flex>
        </Flex>
        <Flex width="100%" justify="between">
          <Button variant="soft" size="2" color="gray">
            <RiCalendar2Line size="18" color="gray" />
            Add to calendar
          </Button>
          <Button variant="soft" size="2" color="gray">
            <RiShareForwardLine size="18" color="gray" />
            Invite friends
          </Button>
        </Flex>
        <Flex>
          <Text size="2" color="gray" className="text-grayA9">
            No longer able to attend?{" "}
            <Link size="2" href="#" color="gray" className="text-grayA9">
              Cancel your registration.
            </Link>
          </Text>
        </Flex>
      </Flex>
    );
  }

  return (
    <>
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
          <Button className="w-full" size="3" onClick={() => setIsBuyTicketsOpen(true)}>
            Get Ticket
          </Button>
        </Flex>
      </Flex>

      <BuyTickets
        ticketType={selectedTicketType}
        event={event}
        isOpen={isBuyTicketsOpen}
        setIsOpen={setIsBuyTicketsOpen}
      />
    </>
  );
}
