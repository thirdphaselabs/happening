import { auth } from "@clerk/nextjs";
import { SignUpForm } from "./_components/sign-up";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = auth();

  if (userId) {
    redirect("/");
  }

  return <SignUpForm />;
}
