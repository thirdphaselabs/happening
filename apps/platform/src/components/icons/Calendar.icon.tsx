import { Flex, Text } from "@radix-ui/themes";

export function CalendarIcon({ date }: { date: Date }) {
  const month = date.toLocaleString("default", { month: "short" }).toUpperCase();
  const day = date.getDate();
  return (
    <Flex
      className="border-grayA3 h-[44px] w-[44px] justify-center overflow-hidden rounded-lg border-[1px] border-solid"
      direction="column">
      <Flex className="bg-grayA3 w-full justify-center ">
        <Text className="text-grayA9 text-[10px]" weight="medium">
          {month}
        </Text>
      </Flex>
      <Flex width="100%" justify="center" className="flex-grow">
        <Text weight="medium" className="text-[18px] tracking-tight">
          {day}
        </Text>
      </Flex>
    </Flex>
  );
}
