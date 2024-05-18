"use client";

import { redirect } from "next/navigation";
import { useEventBuilderContext } from "~/modules/events/builder/context/event-builder.context";

export default function EventBuilderPageRoot() {
  const {
    stage: { current },
  } = useEventBuilderContext();

  redirect(`/event-builder/${current}`);
}
