import { IconProps } from "@radix-ui/themes";
import React from "react";

export enum Route {
  Dashboard = "/",
  Organization = "/organization",
  Events = "/events",
  Tickets = "/tickets",
  Messages = "/messages",
}

export type NavigationItem = {
  title: string;
  icon: React.FC<IconProps>;
  route: Route;
};
