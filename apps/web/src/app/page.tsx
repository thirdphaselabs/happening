"use client";

import { Button, Header } from "ui";
import { api } from "../trpc/provider";
import Link from "next/link";

export default function Page(): JSX.Element {
  const { data } = api.example.hello.useQuery();

  console.log({ data });

  return (
    <>
      <Header text="Docs" />
      yes now {data?.yesnow}
      <p className="text-red-900">its a reload</p>
      <Button>Yes</Button>
      <Link href="/test">About</Link>
    </>
  );
}
