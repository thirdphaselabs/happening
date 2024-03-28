import { Button, Container, Flex, Heading, Separator, Text, TextFieldInput } from "@radix-ui/themes";
import Image from "next/image";
import hero from "~/assets/event.avif";
import logo from "~/assets/logo.png";
import { FaXTwitter, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa6";
import Link from "next/link";
import { JoinWaitlist } from "./_components/JoinWailist";

export default function Page() {
  return (
    <Flex
      className="h-screen-max"
      position="relative"
      direction="column"
      style={{
        backgroundColor: "#111315",
      }}>
      <HeroImagery />
      <Flex position="absolute" top="0" width="100%">
        <Container position="relative" width="100%" px="4">
          <Flex direction="column" height="100%" justify="between">
            <Flex className="h-[30px] w-[108px]" position="relative" my="4">
              <Image src={logo} layout="fill" objectFit="contain" alt="Plaventi logo" />
            </Flex>
          </Flex>
        </Container>
      </Flex>

      <Flex direction="column" gap="6" className="z-20 h-screen" justify="center" align="center" width="100%">
        <Flex direction="column" gap="3" className="max-w-[900px] text-center" align="center" p="4">
          <Text weight="medium" size="3" color="gray">
            Be the first to know when we launch
          </Text>
          <Heading
            size={{
              initial: "8",
              md: "9",
            }}
            className="md:text-[42px] lg:text-[55px]">
            Events Re-imagined: Plan, Manage, Sell & Discover
          </Heading>
        </Flex>
        <JoinWaitlist />
      </Flex>
      <Flex
        position="absolute"
        bottom="0"
        width="100%"
        py={{
          initial: "2",
          md: "5",
        }}
        className="z-20">
        <Container px="4">
          <Flex
            width="100%"
            gap={{
              initial: "5",
              md: "0",
            }}
            justify={{
              initial: "center",
              md: "between",
            }}
            align={{
              initial: "center",
              md: "start",
            }}
            direction={{
              initial: "column-reverse",
              md: "row",
            }}>
            <Flex>
              <Text size="2" className="text-gray-400">
                © {new Date().getFullYear()} PLAVENTI, Inc. All rights reserved.
              </Text>
            </Flex>
            <Flex gap="5">
              <Link href="https://twitter.com/plaventi_app">
                <FaXTwitter size="24" />
              </Link>
              <Link href="https://instagram.com/plaventi">
                <FaInstagram size="24" />
              </Link>
              <Link href="https://www.linkedin.com/company/plaventi/">
                <FaLinkedin size="24" />
              </Link>
              <Link href="https://www.tiktok.com/@plaventi">
                <FaTiktok size="24" />
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Flex>
    </Flex>
  );
}

function HeroImagery() {
  return (
    <>
      <Flex className="pointer-events-none" position="absolute" top="0">
        <Flex className="h-screen-max w-screen opacity-[0.3] md:h-[100vh] lg:opacity-[0.4]" position="relative">
          <Image src={hero} layout="fill" alt="Nightclub event scene" objectFit="cover" />
        </Flex>
      </Flex>
      <Flex
        position="absolute"
        bottom="0"
        className="pointer-events-none z-10 h-[60vh] w-screen bg-[#030303] md:h-[40vh]"
        style={{
          filter: "blur(140px)",
        }}></Flex>

    </>
  );
}
