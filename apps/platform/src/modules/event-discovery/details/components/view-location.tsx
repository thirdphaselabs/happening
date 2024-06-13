"use client";

import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { PlaventiEvent } from "~/trpc/types";

export function ViewLocation({ event }: { event: PlaventiEvent }) {
  return (
    <IconButton
      variant="ghost"
      color="gray"
      size="2"
      className="mx-0"
      onClick={() => {
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${event.location.name}&query_place_id={event.location.placeId}`,
          "_blank",
        );
      }}>
      <ArrowTopRightIcon />
    </IconButton>
  );
}
