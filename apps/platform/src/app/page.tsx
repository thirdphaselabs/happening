import { currentUser } from "@clerk/nextjs";
import { Flex, Heading } from "@radix-ui/themes";
import { SignIn } from "./_components/SignIn";
import { SignOut } from "./_components/SignOut";

export default async function Page() {
  const user = await currentUser();

  return (
    <Flex className="h-screen w-full items-center justify-center " position="relative" direction="column">
      <Heading>Welcome to Plaventi {user?.emailAddresses[0].emailAddress}</Heading>
      {user ? <SignOut /> : <SignIn />}
    </Flex>
  );
}
