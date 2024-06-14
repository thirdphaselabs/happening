import { CalendarIcon, Crosshair1Icon, GridIcon } from "@radix-ui/react-icons";
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
    title: "Discovery",
    icon: Crosshair1Icon,
    route: Route.Discovery,
  },
  // {
  //   title: "Analytics",
  //   icon: BarChartIcon,
  //   route: Route.Analytics,
  // },
  // {
  //   title: "Messages",
  //   icon: ChatBubbleIcon,
  //   route: Route.Messages,
  // },
];

export default function useNavigation() {
  const pathname = usePathname();

  const activeRoute =
    pathname === Route.Dashboard
      ? navigationItems.find((r) => r.route === Route.Dashboard)
      : navigationItems
          .filter((t) => t.route !== Route.Dashboard)
          .find((tab) => pathname.startsWith(tab.route.valueOf()));

  return { navigationItems, activeRoute };
}
