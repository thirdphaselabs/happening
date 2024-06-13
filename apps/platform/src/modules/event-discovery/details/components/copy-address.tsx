"use client";

import { CopyIcon } from "@radix-ui/react-icons";
import { Tooltip, IconButton } from "@radix-ui/themes";
import { useNotify } from "~/app/_hooks/use-notify";
import { PlaventiEvent } from "~/trpc/types";

export function CopyAddress({ event }: { event: PlaventiEvent }) {
  const notify = useNotify();
  return (
    <Tooltip content="Copy address">
      <IconButton
        variant="ghost"
        color="gray"
        mx="2"
        size="2"
        onClick={() => {
          navigator.clipboard.writeText(event.location.formattedAddress);
          notify({ message: "Address copied to clipboard", type: "success" });
        }}>
        <CopyIcon />
      </IconButton>
    </Tooltip>
  );
}
