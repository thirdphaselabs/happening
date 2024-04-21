"use client";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Flex, Heading, IconButton } from "@radix-ui/themes";
import { toast } from "sonner";
import { NotificationCallout } from "./Notification";
import { Card } from "@plaventi/ui";
import Image from "next/image";
import createEvent from "~/assets/create-event.svg";
import blackCoffee from "~/assets/black-coffee.png";
import food from "~/assets/food.png";
import { useRouter } from "next/navigation";

export function RecentEvents() {
  const router = useRouter();
  return (
    <Flex direction="column" gap="6">
      <Heading size="5">Recent Events</Heading>
      <Flex gap="6">
        <Card.Root
          onClick={() => {
            toast.custom((id) => (
              <NotificationCallout toastId={id} message="Creating events coming soon!" type="info" />
            ));
          }}>
          <Card.Image src={createEvent} alt="Create Event" hasNoPadding />
          <Card.Header>Create Event</Card.Header>
          <Card.Badge>Upcoming</Card.Badge>
        </Card.Root>
        <Card.Root
          onClick={() => {
            toast.custom((id) => (
              <NotificationCallout
                toastId={id}
                message="Event has been published"
                type="success"
                action={{
                  text: "View event",
                  action: () => {
                    router.push("/events");
                  },
                }}
              />
            ));
          }}>
          <Card.Image src={blackCoffee.src} alt="Create Event" />
          <Card.Header>
            Black Coffee | Hi Ibiza{" "}
            <Card.Actions>
              <IconButton variant="ghost" color="gray">
                <DotsVerticalIcon />
              </IconButton>
            </Card.Actions>
          </Card.Header>

          <Card.Badge color="green">Published</Card.Badge>
        </Card.Root>
        <Card.Root>
          <Card.Image src={food.src} alt="Create Event" />
          <Card.Header>
            FoodieLand Night w/ Mark Stuart{" "}
            <Card.Actions>
              <IconButton variant="ghost" color="gray">
                <DotsVerticalIcon />
              </IconButton>
            </Card.Actions>
          </Card.Header>
          <Card.Badge color="yellow">Draft</Card.Badge>
        </Card.Root>
      </Flex>
    </Flex>
  );
}
