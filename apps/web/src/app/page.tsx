"use client";

import { Button, Header } from "ui";
import { api } from "../trpc/provider";
import Link from "next/link";
import { AllExamples } from "./test/_components/AllExamples";

export default function Page(): JSX.Element {
  const { data, error } = api.event.all.useQuery();

  if (error || !data) {
    return <div>Error</div>;
  }

  return (
    <>
      <Header text="Docs" />
      <AllExamples initialExamples={data} />
      <p className="text-red-900">its a reload</p>
      <Button>Yes</Button>
      <Link href="/test">About</Link>
    </>
  );
}
