import { Card, Flex, Theme } from "@radix-ui/themes";
import { IoCheckmark } from "react-icons/io5";

export default function Layout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();

  return (
    <Theme appearance="light" panelBackground="translucent">
      <Flex className="h-screen-max overflow-hidden" position="relative" width="100%">
        <Flex direction="column" className="z-10 w-full" align="center" height="100%" mt="180px">
          <Card className="w-[487px] p-8">{children}</Card>
        </Flex>
        {/* <Flex className="h-screen-max pointer-events-none absolute right-[-200px] top-0 w-full">
          <Image src={authBg} layout="fill" objectFit="cover" alt="Auth background" />
        </Flex> */}
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
