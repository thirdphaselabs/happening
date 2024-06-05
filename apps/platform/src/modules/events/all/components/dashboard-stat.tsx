import { ArrowTopRightIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { Badge, Card, Flex, Heading, IconButton, Text } from "@radix-ui/themes";

export function DashboardStat({
  title,
  value,
  percentageDifference,
  total,
}: {
  title: string;
  value: string;
  percentageDifference: string;
  total: string;
}) {
  return (
    <Flex className="relative flex-grow rounded-xl px-5">
      <Flex direction="column" gap="4">
        <Flex align="center" justify="between">
          <Text size="3" weight="medium" color="gray">
            {title}
          </Text>
        </Flex>
        <Flex direction="column" gap="3">
          <Flex align="center" width="100%" gap="3">
            <Heading size="8" style={{ fontWeight: "600" }}>
              {value}
            </Heading>
          </Flex>
          <Text size="2" weight="medium" color="gray" className="flex items-center">
            <Text color="green" className="mr-1 flex items-center gap-1">
              <ArrowTopRightIcon height="18" width="18" /> {percentageDifference}%
            </Text>{" "}
            vs last month
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
