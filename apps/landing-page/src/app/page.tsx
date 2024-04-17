import { Container, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaTiktok, FaXTwitter } from "react-icons/fa6";
import hero from "~/assets/event.avif";
import logo from "~/assets/logo.png";
import YellowGraphic from "~/app/_components/yellow-graphic.svg";
import blueGraphic from "~/app/_components/blue-graphic.svg";
import { Features } from "./_components/Features";
import { Button } from "@plaventi/ui";

export default function Page() {
  return (
    <Flex
      className="h-screen-max relative mx-auto max-w-[1800px] items-center"
      position="relative"
      direction="column">
      <Image
        src={YellowGraphic}
        height={731}
        className="pointer-events-none absolute left-[-900px] top-[-200px] opacity-[95%]  2xl:left-[-50%px] 2xl:top-[-200px]"
        alt="Yellow graphic"
      />
      <Image
        src={blueGraphic}
        height={821}
        className="pointer-events-none absolute right-[-850px] top-[-300px] opacity-[95%] xl:right-[-1000px] 2xl:right-[-60%] 2xl:top-[-330px]"
        alt="Yellow graphic"
      />
      <Flex
        position="fixed"
        top="0"
        width="100%"
        direction="column"
        className="bg-brand-navy px-4 opacity-[98%]">
        <Container position="relative" width="100%">
          <Flex
            direction="column"
            height="100%"
            justify="between"
            className="bg-brand-navy px-4 opacity-[98%] ">
            <Flex align="center" height="100%" justify="between">
              <Flex className="h-[30px] w-[108px]" position="relative" my="4">
                <Image src={logo} layout="fill" objectFit="contain" alt="Plaventi logo" />
              </Flex>
              <Flex gap="6">
                <Button variant="ghost" color="gray" highContrast>
                  Discover
                </Button>
                <Button variant="ghost" color="gray" highContrast>
                  Create Events
                </Button>
                <Button variant="ghost" color="gray" highContrast>
                  Help Centre
                </Button>
              </Flex>
            </Flex>
            <Separator className="w-full opacity-[98%] " />
          </Flex>
          <Flex
            direction="column"
            height="100%"
            justify="between"
            className="bg-brand-navy px-4 opacity-[98%] ">
            <Flex gap="6" height="100%" align="start" justify="start" py="4">
              <Button variant="ghost" color="gray" highContrast>
                Home
              </Button>
              <Button variant="ghost" color="gray" highContrast>
                Features
              </Button>
              <Button variant="ghost" color="gray" highContrast>
                Pricing
              </Button>
              <Button variant="ghost" color="gray" highContrast>
                Company
              </Button>
              <Button variant="ghost" color="gray" highContrast>
                Blog
              </Button>
            </Flex>
            <Separator className="w-full" />
          </Flex>
        </Container>
      </Flex>

      <Flex direction="column" gap="6" className="z-20 mt-[150px]" align="center" width="100%">
        <Flex direction="column" gap="4" className=" text-center" align="center" px="4" py="9">
          <Heading
            size={{
              initial: "8",
              md: "8",
            }}
            className="md:text-[40px]">
            Empowering Event Organizers
          </Heading>
          <Text className="max-w-[694px]" size="3">
            The all-in-one ticketing and discovery platform trusted by millions of organizers and attendees
            worldwide. Whether you're planning the next big event or searching for your next unforgettable
            experience, Plaventi has you covered.
          </Text>
          <Button size="3">Get Started</Button>
        </Flex>
      </Flex>
      <Features />
    </Flex>
  );
}
