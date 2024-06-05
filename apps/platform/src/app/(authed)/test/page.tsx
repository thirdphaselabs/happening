import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";

async function getIronSessionData() {
  const session = await getIronSession(cookies(), {
    password: "mcRI+dvCYeIAUu4DPlzhEkq+6nLFpW6xY0CD20hFWPytKeDtMGqU0XN6d7c/PEMp3dyNB21U5LyBHxcmxak3tA==",
    cookieName: "wos-session",
  });

  return session;
}

export default async function Test() {
  const profile = await getIronSessionData();

  return (
    <Flex direction="column">
      <h1>hello: {JSON.stringify(profile)}</h1>
      <Link href="/new">New</Link>
    </Flex>
  );
}
