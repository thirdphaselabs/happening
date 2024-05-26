import { User } from "@clerk/nextjs/dist/types/server";
import { Separator } from "@plaventi/ui";
import { Button, ChevronDownIcon, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { UpcomingEvents } from "~/app/_components/RecentEvents";
import { DashboardStat } from "../events/all/components/dashboard-stat";
import { QuickActions } from "./components/quick-actions";
import { ArrowTopRightIcon, PlusIcon } from "@radix-ui/react-icons";

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
    <Flex direction="column" gap="6" pb="6">
      <Flex className="w-full" justify="between" align="center">
        <Heading weight="bold" size="7">
          Welcome, {user.firstName}
        </Heading>
        <Flex gap="4">
          <Link href="/events">
            <Button color="gray" variant="soft">
              <ArrowTopRightIcon />
              View your events
            </Button>
          </Link>
        </Flex>
      </Flex>

      <Separator orientation="horizontal" />
      <Flex gap="4" wrap="wrap" className="w-full">
        {stats.map((stat) => (
          <DashboardStat key={stat.title} {...stat} />
        ))}
      </Flex>
      <Separator orientation="horizontal" />

      <UpcomingEvents />
      <Separator orientation="horizontal" />

      <QuickActions />
    </Flex>
  );
}
