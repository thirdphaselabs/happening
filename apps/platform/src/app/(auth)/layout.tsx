import { Card, Flex, Heading, Link, Separator, Text, Theme } from "@radix-ui/themes";
import Image from "next/image";
import { IoCheckmark } from "react-icons/io5";
import authBg from "~/assets/auth-bg.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();

  return (
    <Theme appearance="light" panelBackground="translucent">
      <Flex align="center" className="h-screen-max overflow-hidden" position="relative" width="100%">
        <Flex direction="column" className="z-10 w-full" justify="center" align="center" height="100%">
          <Card className="w-fit min-w-[487px] p-8">{children}</Card>
        </Flex>
        <Flex className="pointer-events-none absolute top-0 right-[-200px] h-screen-max w-full">
          <Image src={authBg} layout="fill" objectFit="cover" alt="Auth background" />
        </Flex>
      </Flex>
    </Theme>
  );
}

function Check() {
  return (
    <Flex
      p="1"
      position="relative"
      className="mr-2 mt-[2px]  rounded-sm"
      style={{
        backgroundColor: "var(--jade-4)",
      }}>
      {/* <Text color={baseAccessColor}> */}
      <IoCheckmark size="14" />
      {/* </Text> */}
    </Flex>
  );
}
