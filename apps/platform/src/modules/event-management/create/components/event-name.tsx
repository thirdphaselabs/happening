"use client";

import { TextArea } from "@radix-ui/themes";
import { useRef } from "react";
import { useTextareaAutoHeight } from "~/app/_hooks/useAutoReszieTextArea";
import { useEventBuilderContext } from "../context/event-builder.context";

export function EventName() {
  const { eventDetails, setEventDetails } = useEventBuilderContext();
  const ref = useRef<HTMLTextAreaElement>(null);
  useTextareaAutoHeight({ ref });

  return (
    <TextArea
      ref={ref}
      autoFocus
      placeholder="Event Name"
      variant="surface"
      size="2"
      rows={1}
      value={eventDetails?.name}
      id="create-event-name"
      className="text text-wrap rounded-none border-none bg-transparent px-0 text-[40px] font-bold tracking-tight outline-none"
      onChange={(e) => {
        setEventDetails({ name: e.target.value });
      }}
      style={{ boxShadow: "none", textIndent: 0, height: "fit-content" }}
    />
  );
}
