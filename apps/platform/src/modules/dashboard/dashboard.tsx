import { Separator, TicketIcon } from "@plaventi/ui";
import { Button, ChevronDownIcon, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { UpcomingEvents } from "~/app/_components/RecentEvents";
import { QuickActions } from "./components/quick-actions";
import { ArrowTopRightIcon, CalendarIcon, PersonIcon, PlusIcon } from "@radix-ui/react-icons";
import { Session } from "~/trpc/types";
import { lastDayOfWeek } from "date-fns";
import { PiCurrencyDollar } from "react-icons/pi";
import { EventPageViews } from "./components/event-page-views";
import { DashboardStat, Stat } from "../event-management/all/components/dashboard-stat";

const stats: Array<Stat> = [
  {
    title: "Events",
    value: "87",
    percentageDifference: "11",
    lastWeek: "0",
    total: "100",
    icon: CalendarIcon,
  },
  {
    title: "Tickets",
    value: "0",
    percentageDifference: "11",
    lastWeek: "0",
    total: "100",
    icon: TicketIcon,
  },
  {
    title: "Attendees",
    value: "13,328",
    percentageDifference: "18",
    lastWeek: "0",
    total: "100",
    icon: PersonIcon,
  },
  {
    title: "Revenue",
    value: "$59,623",
    percentageDifference: "33",
    lastWeek: "0",
    total: "100",
    icon: PiCurrencyDollar,
  },
];

export function Dashboard({ user }: { user: Session["user"] }) {
  return (
    <Flex direction="column" gap="6" pb="6" mt="6">
      <Flex className="w-full" justify="between" align="center">
        <Heading weight="bold" size="8">
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

      <Flex gap="4" wrap="wrap" className="mt-4 w-full">
        {stats.map((stat) => (
          <DashboardStat key={stat.title} {...stat} />
        ))}
      </Flex>
      <Separator orientation="horizontal" />

      <UpcomingEvents />
      <Separator orientation="horizontal" />

      <EventPageViews />
    </Flex>
  );
}
