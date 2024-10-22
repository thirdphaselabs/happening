import { Flex, Heading, Separator, Text } from "@radix-ui/themes";
import Image from "next/image";
import { LogoOnly } from "~/assets/logo-new";
import logo from "~/assets/logo-bew.svg";

export function EventsManagerBadge() {
  return (
    <Flex className="rounded-[7px] border-[1px] border-dashed border-gray-200 p-[3px]">
      <Flex className="h-[40px] w-[146px] items-center rounded-[5px] border-[1px] border-gray-200 bg-white">
        <Flex className="px-3 py-2">
          <Flex className="relative h-[23px] w-[23px]">
            {/* <LogoOnly className="h-[43px] w-[43px] text-[#21bce2]" height={43} width={43} /> */}
            <Image src={logo} alt="Plaventi logo" objectFit="fit" layout="fill" />
          </Flex>
        </Flex>
        <Separator orientation="vertical" className="h-[40px] bg-gray-200" />
        <Heading size="2" className="text-nowrap px-3 tracking-tight">
          Happening
        </Heading>
      </Flex>
    </Flex>
  );
}

export function LogoOnlyBadge() {
  return (
    <Flex className="relative h-[24px] w-[18px]">
      <Image src={logo} alt="Plaventi logo" objectFit="fit" layout="fill" />
    </Flex>
  );
}
