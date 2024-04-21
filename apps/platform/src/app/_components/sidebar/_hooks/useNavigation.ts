import { TicketIcon } from "@plaventi/ui";
import {
  ArrowTopRightIcon,
  BackpackIcon,
  BarChartIcon,
  CalendarIcon,
  ChatBubbleIcon,
  GridIcon,
  HomeIcon,
} from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { NavigationItem, Route } from "~/types/types";

export const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    icon: GridIcon,
    route: Route.Dashboard,
  },
  {
    title: "Events",
    icon: CalendarIcon,
    route: Route.Events,
  },
  {
    title: "Tickets",
    icon: TicketIcon,
    route: Route.Tickets,
  },
  {
    title: "Analytics",
    icon: BarChartIcon,
    route: Route.Analytics,
  },
  {
    title: "Messages",
    icon: ChatBubbleIcon,
    route: Route.Messages,
  },
];

export default function useNavigation() {
  const pathname = usePathname();

  const activeRoute =
    navigationItems
      .filter((t) => t.route !== Route.Dashboard)
      .find((tab) => pathname.startsWith(tab.route.valueOf())) ?? navigationItems[0];

  return { navigationItems, activeRoute };
}
