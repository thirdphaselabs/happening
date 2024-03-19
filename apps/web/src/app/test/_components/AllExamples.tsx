"use client";

import { api } from "~/trpc/provider";
import { Event } from "~/trpc/types";

export function AllExamples({ initialExamples }: { initialExamples: Event[] }) {
  const { data: examples } = api.event.all.useQuery(undefined, { initialData: initialExamples });

  return (
    <>
      {examples.map((d) => (
        <div key={d.id}>{d.title}</div>
      ))}
    </>
  );
}
