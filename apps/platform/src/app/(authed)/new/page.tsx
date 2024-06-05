import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { Session } from "~/trpc/types";
import { getUser } from "@workos-inc/authkit-nextjs";

async function getIronSessionData() {
  const session = await getIronSession<Session>(cookies(), {
    password: "mcRI+dvCYeIAUu4DPlzhEkq+6nLFpW6xY0CD20hFWPytKeDtMGqU0XN6d7c/PEMp3dyNB21U5LyBHxcmxak3tA==",
    cookieName: "wos-session",
  });

  return session;
}

export default async function Test() {
  const profile = await getIronSessionData();

  if (!profile.user) {
    return (
      <Flex direction="column">
        <h1>not logged in</h1>
        <Link href="http://localhost:3002/api/auth">log in</Link>
      </Flex>
    );
  }

  return (
    <Flex direction="column">
      <h1>hello: {profile.user.email}</h1>
      <Link href="/test">Test</Link>
      <Link href="http://localhost:3002/api/auth/logout">log out</Link>
    </Flex>
  );
}
