import { TicketIcon } from "@plaventi/ui";
import { ArrowTopRightIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { Badge, Card, Flex, Heading, IconButton, IconProps, Text } from "@radix-ui/themes";

export type Stat = {
  title: string;
  value: string;
  lastWeek: string;
  percentageDifference: string;
  total: string;
  icon: React.FC<IconProps>;
};

export function DashboardStat({ title, icon: Icon, value, percentageDifference, lastWeek, total }: Stat) {
  return (
    <Flex className="relative flex-grow rounded-xl">
      <Flex direction="column" gap="2">
        <Flex align="center" gap="1">
          <Icon height="15" width="15" className="text-gray10" />
          <Text size="2" weight="medium" color="gray" className="text-gray10">
            {title}
          </Text>
        </Flex>
        <Flex direction="column" gap="2">
          <Flex align="center" width="100%" gap="3">
            <Heading size="6" style={{ fontWeight: "600" }}>
              {value}
            </Heading>
          </Flex>
          <Text size="2" color="gray" className="flex items-center">
            {lastWeek} last week
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
