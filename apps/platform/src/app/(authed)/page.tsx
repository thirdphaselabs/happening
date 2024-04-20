import { currentUser } from "@clerk/nextjs";
import { Avatar, Box, Flex, Heading, HoverCard, Link, Text } from "@radix-ui/themes";
import CompanySection from "../_components/sidebar/CompanySection";
import { UserDropdown } from "../_components/sidebar/user-dropdown/UserDropdown";

export default async function Page() {
  const user = await currentUser();

  return (
    <Flex direction="column">
      <Heading>Welcome, {user?.firstName}</Heading>
    </Flex>
  );
}
