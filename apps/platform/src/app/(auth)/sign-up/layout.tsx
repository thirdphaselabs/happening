import { Flex, Heading, Link, Separator, Text, Theme } from "@radix-ui/themes";
import { IoCheckmark } from "react-icons/io5";
import { baseAccessColor } from "~/styles/theme";

export default function Layout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();

  return (
    <Theme appearance="dark">
      <Flex align="center" className="h-screen-max overflow-hidden" position="relative" width="100%">
        <Flex
          direction="column"
          className="w-full lg:w-[50%] bg-skyDark1"
          justify="between"
          height="100%"
          >
          <div /> {/* Spacer */}
          {children}
          <Flex pb="5">
            <Text size="2" weight="light" color="gray" mx="auto" className="w-full max-w-[280px] text-center">
              By creating an account you agree to our{" "}
              <Link color={baseAccessColor} underline="hover">
                Terms Of Service{" "}
              </Link>{" "}
              and{" "}
              <Link color={baseAccessColor} underline="hover">
                Privacy Policy
              </Link>
              .
            </Text>
          </Flex>
        </Flex>
        <Separator orientation="vertical" style={{ height: "100%" }} />
        <Theme appearance="light"  className="flex flex-col h-screen w-[50%] lg:flex">
          <Flex width="100%" justify="end" p="6">
            <Text size="2">
              Want to learn more?{" "}
              <Link color={baseAccessColor} underline="hover">
                Schedule a demo
              </Link>
            </Text>
          </Flex>
          <Flex direction="column" justify="center" align="center" className="h-full w-full" gap="5">
            <Heading size="6">Plan & manage your events & ticketing.</Heading>
            <Flex direction="column" align="start" gap="4" className="max-w-[400px]">
              <Text color="gray" className="flex items-start gap-2">
                <Check />
                Create events with ease using our event builder & templates
              </Text>
              <Text color="gray" className="flex items-start gap-2">
                <Check />
                Manage all of your event guest lists & ticketing
              </Text>
              <Text color="gray" className="flex items-start gap-2">
                <Check />
                Collaborate with your whole team and assign roles & permissions
                </Text>
              <Text color="gray" className="flex items-center gap-2">
                <Check />
                No credit card required
              </Text>
            </Flex>
          </Flex>
          <Flex justify="center" width="100%" pb="5">
            <Text size="2" color="gray">
              Founded by event organisers, for event organisers. © {currentYear} Plaventi.
            </Text>
          </Flex>
        </Theme>
      </Flex>
    </Theme>
  );
}

function Check() {
  return (
    <Flex
      p="1"
      position="relative"
      className="mr-2 mt-[2px] bg-sky4  rounded-sm"
      >
      {/* <Text color={baseAccessColor}> */}
      <IoCheckmark size="14" />
      {/* </Text> */}
    </Flex>
  );
}
