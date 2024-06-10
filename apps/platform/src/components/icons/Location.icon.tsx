import { Flex } from "@radix-ui/themes";
import { RiMapPin2Line } from "@remixicon/react";

export function LocationIcon() {
  return (
    <Flex
      className="border-grayA3 h-[44px] w-[44px] justify-center overflow-hidden rounded-lg border-[1px] border-solid"
      direction="column">
      <Flex width="100%" height="100%" align="center" justify="center" className="flex-grow">
        <RiMapPin2Line xHeight="16" color="var(--gray-a8)" />
      </Flex>
    </Flex>
  );
}
