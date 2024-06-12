import { Button } from "@plaventi/ui";
import Link from "next/link";

export default async function LogIn() {
  return (
    <div>
      <h1>Log In</h1>
      <Link href="http://localhost:3001/api/auth/login">
        <Button>Log in</Button>
      </Link>
    </div>
  );
}
