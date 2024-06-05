"use client";

import { redirect } from "next/navigation";
import { useEventBuilderContext } from "~/modules/events/create/context/event-builder.context";

export default function EventBuilderPageRoot() {
  const {
    stage: { current },
  } = useEventBuilderContext();

  redirect(`/events/create/${current}`);
}
