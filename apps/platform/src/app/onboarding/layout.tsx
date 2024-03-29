import { Flex, Heading, Link, Separator, Text, Theme } from "@radix-ui/themes";
import Image from "next/image";
import logo from "~/assets/logo.png";
import { OnboardingHeader } from "./_components/OnboardingHeader";
import { Stepper } from "./_components/stepper";

export default function Layout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Flex width="100%" className="h-screen-max" justify="center">
        <Theme appearance="dark" hasBackground={false} className="bg-skyDark1 h-full w-[30%]">
          <Flex direction="column" gap="5" className="h-full justify-between px-12 pb-10">
            <Flex className="h-[80px] items-center">
              <Flex>
                <Image src={logo} alt="Plaventi" height="40" />
              </Flex>
            </Flex>

            <Flex direction="column" gap="6">
              <Heading>Setup your Plaventi account</Heading>
              <Stepper />
            </Flex>
            <Flex width="100%" gap="3" justify="center">
              <Link size="1">Terms of Service</Link>
              <Link size="1">Privacy Policy</Link>
            </Flex>
          </Flex>
        </Theme>
        <Separator orientation="vertical" className="h-full" />
        <Flex direction="column" className="h-full w-[70%] items-center justify-between bg-white pb-10">
          <OnboardingHeader />

          {children}
          <Flex>
            <Text size="1" color="gray">
            Founded by event organisers, for event organisers. © {currentYear} Plaventi.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
