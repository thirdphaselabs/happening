import { ArrowTopRightIcon, BackpackIcon, GridIcon, HomeIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { NavigationItem, Route } from "~/types/types";

export const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    icon: HomeIcon,
    route: Route.Dashboard,
  },
  {
    title: "Events",
    icon: BackpackIcon,
    route: Route.Events,
  },
  {
    title: "Tickets",
    icon: ArrowTopRightIcon,
    route: Route.Tickets,
  },
  {
    title: "Messages",
    icon: GridIcon,
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
