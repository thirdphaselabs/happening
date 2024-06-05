import { Button } from "@plaventi/ui";
import Link from "next/link";

export default async function LogIn() {
  const loginUrl = await (await fetch("http://localhost:3002/api/auth")).json();

  if (!loginUrl) {
    return <p>error</p>;
  }

  return (
    <div>
      <h1>Log In</h1>
      <Link href={loginUrl}>
        <Button>Log in</Button>
      </Link>
    </div>
  );
}
