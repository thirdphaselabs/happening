"use client";

import { Separator, TextFieldLabel, TextFieldLabelContainer, TextFieldRoot } from "@plaventi/ui";
import { AspectRatio, Avatar, Container, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import { buildOrganizationFallbackInitials } from "~/lib/utils";
import { useOptionalUser } from "~/modules/auth/user.context";
import { PlaventiEvent } from "~/trpc/types";
import { FullScreenDialog as Dialog } from "../../../../components/ui/full-screen-dialog/full-screen-dialog";

import { loadStripe } from "@stripe/stripe-js";
import { formatDate } from "date-fns";
import { PaymentForm } from "./payment-form";

export function BuyTickets({
  event,
  ticketType,
  isOpen,
  setIsOpen,
}: {
  event: PlaventiEvent;
  ticketType: PlaventiEvent["ticketing"]["types"][0];
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const user = useOptionalUser();

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(val) => {
        setIsOpen(val);
      }}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="fixed z-[9999999999] p-0">
          <Flex className="h-full w-full">
            <Container size="2" className="align-center h-screen w-full justify-center">
              <Flex className="align-center h-full w-full justify-center" gap="6">
                <Flex className="w-3/5" direction="column" gap="6">
                  <Flex direction="column" gap="4" className="relative w-full">
                    <Heading size="5">Your Information</Heading>
                    {user?.user && (
                      <Flex gap="3">
                        <Avatar
                          src={user.user.profilePictureUrl ?? undefined}
                          size="3"
                          radius="full"
                          fallback={buildOrganizationFallbackInitials({
                            name: `${user.user.firstName} ${user.user.lastName}`,
                          })}
                          alt={user.user.firstName ?? "User avatar"}
                        />
                        <Flex direction="column">
                          <Heading size="4">
                            {user.user.firstName} {user.user.lastName}
                          </Heading>
                          <Text size="2" color="gray">
                            {user.user.email}
                          </Text>
                        </Flex>
                      </Flex>
                    )}
                    <Flex>
                      <TextFieldRoot>
                        <TextFieldLabelContainer>
                          <TextFieldLabel>Mobile Number</TextFieldLabel>
                        </TextFieldLabelContainer>
                        <TextField.Root
                          variant="soft"
                          color="gray"
                          size="3"
                          placeholder="+44 123 456 7890"
                          name="email"
                          type="email"
                          required
                        />
                      </TextFieldRoot>
                    </Flex>
                  </Flex>
                  <PaymentForm
                    eventId={event.id}
                    eventIdentifier={event.identifier}
                    ticketTypeId={ticketType.id}
                  />
                </Flex>
                <Flex className="w-2/5">
                  <Flex
                    direction="column"
                    gap="4"
                    className="border-grayA5 h-fit w-full rounded-xl border-[1px] border-solid py-4">
                    <Flex gap="4" className="w-full px-4">
                      <Flex className="h-[60px] w-[60px] min-w-[60px]">
                        <AspectRatio ratio={1 / 1}>
                          <Image
                            src={event.imageUrl}
                            alt="Event"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        </AspectRatio>
                      </Flex>
                      <Flex direction="column" gap="1">
                        <Heading size="3" className="leading-tight tracking-tight">
                          {event.title}
                        </Heading>
                        <Text size="2" color="gray">
                          {formatDate(new Date(event.timing.startDate), "MMM d, yyyy")}{" "}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex direction="column" className="px-4">
                      <Heading size="3">Tickets</Heading>
                      <Flex justify="between" width="100%">
                        <Text size="3" color="gray">
                          1x {ticketType.name}
                        </Text>
                        <Text size="3" color="gray">
                          {ticketType.price
                            ? new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 2,
                              }).format(ticketType.price)
                            : "Free"}
                        </Text>
                      </Flex>
                    </Flex>
                    <Separator orientation="horizontal" className="w-full" />
                    <Flex direction="column" className="px-4">
                      <Flex justify="between" align="baseline" width="100%">
                        <Text size="3" color="gray">
                          Total
                        </Text>
                        <Text size="6" weight="medium" className="tracking-tight">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                          }).format(ticketType.price ?? 0)}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Container>
          </Flex>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
