import { auth } from "@clerk/nextjs";
import { SignIn } from "./_components/sign-in";
import { redirect } from "next/navigation";

export default function Page() {
  const { userId } = auth();

  if (userId) {
    redirect("/");
  }

  return <SignIn />;
}
