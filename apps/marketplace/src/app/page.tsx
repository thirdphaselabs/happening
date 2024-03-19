import { Button, Container, Flex, Heading, Separator, Text, TextFieldInput } from "@radix-ui/themes";
import Image from "next/image";
import hero from "~/assets/event.avif";
import logo from "~/assets/logo.svg";
import { FaXTwitter, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa6";
import Link from "next/link";
import { JoinWaitlist } from "./_components/JoinWailist";

export default function Page() {
  return (
    <Flex
      className="h-screen"
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
          <Separator size="1" className="w-full" />
        </Container>
      </Flex>

      <Flex direction="column" gap="6" className="z-20 h-screen" justify="center" align="center" width="100%">
        <Flex direction="column" gap="3" className="max-w-[900px] text-center" align="center">
          <Text weight="medium" size="3" color="gray">
            Be the first to know when we launch
          </Text>
          <Heading
            size={{
              initial: "8",
              md: "9",
            }}
            className="md:text-[42px] lg:text-[55px]">
            The all-in-one event planning, management, and ticketing platform
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
              <Link href="https://twitter.com">
                <FaXTwitter size="24" />
              </Link>
              <Link href="https://instagram.com">
                <FaInstagram size="24" />
              </Link>
              <Link href="https://linkedin.com">
                <FaLinkedin size="24" />
              </Link>
              <Link href="https://tiktok.com">
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
        <Flex
          className="h-screen w-screen md:h-[80vh]"
          position="relative"
          style={{
            opacity: 0.6,
          }}>
          <Image src={hero} layout="fill" alt="Nightclub event scene" objectFit="cover" />
        </Flex>
      </Flex>
      <Flex
        position="absolute"
        bottom="0"
        className="pointer-events-none h-[85vh] w-screen bg-black md:h-[55vh]"
        style={{
          filter: "blur(200px)",
        }}></Flex>
    </>
  );
}
