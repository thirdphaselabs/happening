import { Flex, Separator, Text } from "@radix-ui/themes";
import Image from "next/image";
import logo from "~/assets/logo-only.png";

export function EventsManagerBadge() {
  return (
    <Flex className="rounded-[7px] border-[1px] border-dashed border-gray-200 p-[3px]">
      <Flex className="h-[40px] w-[179px] items-center rounded-[5px] border-[1px] border-gray-200 bg-white">
        <Flex className="px-3 py-2">
          <Flex className="relative h-[23px] w-[18px]">
            <Image src={logo} alt="Plaventi logo" objectFit="fit" layout="fill" />
          </Flex>
        </Flex>
        <Separator orientation="vertical" className="h-[40px] bg-gray-200" />
        <Text size="2" className="px-3 font-medium">
          Events Manager
        </Text>
      </Flex>
    </Flex>
  );
}
