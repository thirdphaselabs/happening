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
    <Card className="relative min-w-[350px] p-5">
      <Flex direction="column" gap="5">
        <Flex align="center" justify="between">
          <Text size="3" weight="medium">
            {title}
          </Text>
          <IconButton variant="ghost" size="2" color="gray">
            <DotsVerticalIcon />
          </IconButton>
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
          <Flex position="absolute" bottom="-1px" right="-1px" align="center">
            <svg width="131" height="66" viewBox="0 0 131 66" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask
                id="mask0_15240_57451"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="1"
                y="1"
                width="129"
                height="64">
                <rect
                  width="128"
                  height="64"
                  transform="translate(1.3335 1)"
                  fill="url(#paint0_linear_15240_57451)"
                />
              </mask>
              <g mask="url(#mask0_15240_57451)">
                <path
                  opacity="0.2"
                  d="M5.93956 57.2759L1.3335 65H129.333V1L127.515 12.0345H125.091C124.445 13.8736 123.103 17.5517 122.909 17.5517C122.715 17.5517 121.455 19.7586 120.849 20.8621L115.637 24.1724L112.606 28.5862L107.758 24.1724L105.212 20.8621L101.576 28.5862H97.8183L94.6668 20.8621C93.4547 19.7586 90.982 17.5517 90.788 17.5517C90.5941 17.5517 89.0103 15.3448 88.2426 14.2414H86.3032L81.6971 17.5517L77.6971 20.8621L75.879 28.5862L70.4244 31.8966L67.6365 35.2069L64.485 40.7241L61.4547 47.9655H60.1214L56.485 48.6552L52.9699 40.7241L49.9396 35.2069H48.1214L44.9699 31.8966L40.485 35.2069H36.2426L32.0002 40.7241L27.7577 47.3448L24.6062 53.9655L21.2123 57.2759L16.6062 53.9655L12.9699 57.2759L9.33349 60.5862L5.93956 57.2759Z"
                  fill="#079455"
                />
              </g>
              <path
                d="M1.3335 65L5.93956 57.2759L9.33349 60.5862L12.9699 57.2759L16.6062 53.9655L21.2123 57.2759L24.6062 53.9655L27.7577 47.3448L32.0002 40.7241L36.2426 35.2069H40.485L44.9699 31.8966L48.1214 35.2069H49.9396L52.9699 40.7241L56.485 48.6552L60.1214 47.9655H61.4547L64.485 40.7241L67.6365 35.2069L70.4244 31.8966L75.879 28.5862L77.6971 20.8621L81.6971 17.5517L86.3032 14.2414H88.2426C89.0103 15.3448 90.5941 17.5517 90.788 17.5517C90.982 17.5517 93.4547 19.7586 94.6668 20.8621L97.8183 28.5862H101.576L105.212 20.8621L107.758 24.1724L112.606 28.5862L115.637 24.1724L120.849 20.8621C121.455 19.7586 122.715 17.5517 122.909 17.5517C123.103 17.5517 124.445 13.8736 125.091 12.0345H127.515L129.333 1"
                stroke="#17B26A"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <g opacity="0.2">
                <rect x="76.3335" y="5" width="20" height="20" rx="10" stroke="#17B26A" stroke-width="2" />
              </g>
              <rect x="81.3335" y="10" width="10" height="10" rx="5" fill="white" />
              <rect x="81.3335" y="10" width="10" height="10" rx="5" stroke="#17B26A" stroke-width="2" />
              <defs>
                <linearGradient
                  id="paint0_linear_15240_57451"
                  x1="64"
                  y1="0"
                  x2="64"
                  y2="64"
                  gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="1" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
