import { Separator, TicketIcon } from "@plaventi/ui";
import { Button, ChevronDownIcon, Flex, Grid, Heading, IconButton } from "@radix-ui/themes";
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
    value: "3",
    percentageDifference: "11",
    lastWeek: "1",
    total: "100",
    icon: CalendarIcon,
  },
  {
    title: "Tickets",
    value: "234",
    percentageDifference: "11",
    lastWeek: "123",
    total: "100",
    icon: TicketIcon,
  },
  {
    title: "Attendees",
    value: "13,328",
    percentageDifference: "18",
    lastWeek: "6,241",
    total: "100",
    icon: PersonIcon,
  },
  {
    title: "Revenue",
    value: "$59,623",
    percentageDifference: "33",
    lastWeek: "$12,312",
    total: "100",
    icon: PiCurrencyDollar,
  },
];

const zeroStats: Array<Stat> = [
  {
    title: "Events",
    value: "0",
    percentageDifference: "0",
    lastWeek: "0",
    total: "0",
    icon: CalendarIcon,
  },
  {
    title: "Tickets",
    value: "0",
    percentageDifference: "0",
    lastWeek: "0",
    total: "0",
    icon: TicketIcon,
  },
  {
    title: "Attendees",
    value: "0",
    percentageDifference: "0",
    lastWeek: "0",
    total: "0",
    icon: PersonIcon,
  },
  {
    title: "Revenue",
    value: "$0",
    percentageDifference: "0",
    lastWeek: "0",
    total: "0",
    icon: PiCurrencyDollar,
  },
];

export function Dashboard({ user }: { user: Session["user"] }) {
  return (
    <Flex direction="column" gap="6" pb="6" mt="6" px={{ initial: "4", md: "0" }}>
      <Flex className="w-full" justify="between" align="center">
        <Heading weight="bold" size="8" className="text-nowrap">
          Welcome, {user.firstName}
        </Heading>
        <Flex gap="4">
          <Link href="/events">
            <Button color="gray" variant="soft" className="hidden md:flex">
              <ArrowTopRightIcon />
              View your events
            </Button>
            <IconButton variant="soft" color="gray" className="md:hidden">
              <ArrowTopRightIcon />
            </IconButton>
          </Link>
        </Flex>
      </Flex>

      <Grid columns={{ initial: "3", md: "4" }} gap="4" gapY="6" className="mt-4 w-full">
        {zeroStats.map((stat) => (
          <DashboardStat key={stat.title} {...stat} />
        ))}
      </Grid>
      <Separator orientation="horizontal" />

      <UpcomingEvents />
      <Separator orientation="horizontal" />

      <EventPageViews />
    </Flex>
  );
}
