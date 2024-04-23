import { User } from "@clerk/nextjs/dist/types/server";
import { Flex, Heading, Button, ChevronDownIcon, Grid } from "@radix-ui/themes";
import { RecentEvents } from "~/app/_components/RecentEvents";
import { DashboardStat } from "../events/all/components/dashboard-stat";
import { Separator } from "@plaventi/ui";
import { QuickActions } from "./components/quick-actions";

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
          <Button className="hidden md:flex">Create event</Button>
        </Flex>
      </Flex>
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
