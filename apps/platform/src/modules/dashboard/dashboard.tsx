import { User } from "@clerk/nextjs/dist/types/server";
import {
  Flex,
  Heading,
  Button,
  ChevronDownIcon,
  Grid,
  Avatar,
  Box,
  Checkbox,
  Text,
  Popover,
  TextArea,
} from "@radix-ui/themes";
import { RecentEvents } from "~/app/_components/RecentEvents";
import { DashboardStat } from "../events/all/components/dashboard-stat";
import { Separator } from "@plaventi/ui";
import { QuickActions } from "./components/quick-actions";
import Link from "next/link";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

const stats = [
  {
    title: "Total events",
    value: "87",
    percentageDifference: "11",
    total: "100",
  },
  {
    title: "Total attendees",
    value: "13,328",
    percentageDifference: "18",
    total: "100",
  },
  {
    title: "Total revenue",
    value: "$59,623",
    percentageDifference: "33",
    total: "100",
  },
];

export function Dashboard({ user }: { user: User }) {
  return (
    <Flex direction="column" gap="6">
      <Flex className="w-full" justify="between" align="center">
        <Heading>Welcome, {user.firstName}</Heading>
        <Flex gap="4">
          <Button color="gray" variant="soft">
            Actions
            <ChevronDownIcon />
          </Button>
          <Link href="/event-builder">
            <Button className="hidden md:flex">Create event</Button>
          </Link>
        </Flex>
      </Flex>
      <Popover.Root>
        <Popover.Trigger>
          <Button variant="soft">
            <ChatBubbleIcon width="16" height="16" />
            Comment
          </Button>
        </Popover.Trigger>
        <Popover.Content width="360px" side="bottom">
          <Flex gap="3">
            <Avatar
              size="2"
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
              fallback="A"
              radius="full"
            />
            <Box flexGrow="1">
              <TextArea placeholder="Write a comment…" style={{ height: 80 }} />
              <Flex gap="3" mt="3" justify="between">
                <Flex align="center" gap="2" asChild>
                  <Text as="label" size="2">
                    <Checkbox />
                    <Text>Send to group</Text>
                  </Text>
                </Flex>

                <Popover.Close>
                  <Button size="1">Comment</Button>
                </Popover.Close>
              </Flex>
            </Box>
          </Flex>
        </Popover.Content>
      </Popover.Root>
      <Separator orientation="horizontal" />
      <Grid
        columns={{
          initial: "1",
          md: "2",
          lg: "3",
        }}
        gap="6"
        className="w-full md:w-fit">
        {stats.map((stat) => (
          <DashboardStat key={stat.title} {...stat} />
        ))}
      </Grid>
      <Separator orientation="horizontal" />

      <RecentEvents />
      <Separator orientation="horizontal" />

      <QuickActions />
    </Flex>
  );
}
