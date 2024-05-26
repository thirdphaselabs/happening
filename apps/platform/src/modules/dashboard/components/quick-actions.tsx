import { ArrowTopRightIcon, AvatarIcon, BarChartIcon, CalendarIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button, Card, Flex, Grid, Heading, Link, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import { ReactNode } from "react";

const quickActions = [
  {
    title: "Create Event",
    icon: <PlusIcon height="20" width="20" />,
    href: "/events/new",
  },
  {
    title: "View Analytics",
    icon: <BarChartIcon height="20" width="20" />,
    href: "/analytics",
  },
  {
    title: "View Events",
    icon: <CalendarIcon height="20" width="20" />,
    href: "/events",
  },
  {
    title: "Manage Team",
    icon: <AvatarIcon height="20" width="20" />,
    href: "/team",
  },
];
export function QuickActions() {
  return (
    <Flex direction="column" gap="6">
      <Heading size="6">Quick Actions</Heading>
      <Grid
        columns={{
          initial: "1",
          xs: "2",
        }}
        gap="6">
        {quickActions.map((a, i) => (
          <QuickAction key={a.href} index={i} {...a} />
        ))}
      </Grid>
    </Flex>
  );
}

function QuickAction({
  title,
  icon,
  href,
  index,
}: {
  index: number;
  title: string;
  icon: ReactNode;
  href: string;
}) {
  const isIndexOdd = index % 2 === 0;
  return (
    <Flex className="hover:bg-skyA3 relative rounded-xl bg-transparent bg-white p-5">
      <NextLink href={href}>
        <Flex direction="column" gap="3" className="min-h-[130px]">
          {icon}
          <Heading size="3" color="gray" highContrast>
            {title}
          </Heading>
          <Text size="2" color="gray" className="max-w-[280px]">
            Manage your team members and organisation settings.
          </Text>
        </Flex>
        <Button variant="ghost" size="2" color="gray">
          Go now
          <ArrowTopRightIcon />
        </Button>
      </NextLink>
      <Flex className="absolute bottom-0 right-0">{isIndexOdd ? <BlueGraphic /> : <YellowGraphic />}</Flex>
    </Flex>
  );
}

function BlueGraphic() {
  return (
    <svg width="195" height="148" viewBox="0 0 195 148" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask
        id="mask0_142_2287"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="195"
        height="148">
        <rect
          x="195"
          y="148"
          width="195"
          height="148"
          rx="10"
          transform="rotate(180 195 148)"
          fill="url(#paint0_linear_142_2287)"
        />
      </mask>
      <g mask="url(#mask0_142_2287)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M60.8354 255.158C46.2836 279.043 60.2096 310.097 87.7241 315.118L424.58 376.584C440.814 379.546 457.195 372.2 465.781 358.107L621.03 103.284L336.775 47.357C256.652 31.5928 175.195 67.4494 132.709 137.186L60.8354 255.158ZM650.502 54.9095L347.036 -4.79709C245.061 -24.8607 141.39 20.775 87.3158 109.531L15.4423 227.503C-18.5119 283.235 13.9821 355.694 78.1826 367.408L415.038 428.875C452.918 435.786 491.14 418.646 511.174 385.763L676.609 114.219L979.1 173.734L989.361 121.58L706.081 65.8448L824.726 -128.897L779.333 -156.552L650.502 54.9095Z"
          stroke="url(#paint1_linear_142_2287)"
          stroke-dasharray="3 3"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_142_2287"
          x1="292.5"
          y1="148"
          x2="159.193"
          y2="317.276"
          gradientUnits="userSpaceOnUse">
          <stop stop-color="#40B4CB" />
          <stop offset="1" stop-color="#40B4CB" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_142_2287"
          x1="215.681"
          y1="247"
          x2="215.681"
          y2="-91.6827"
          gradientUnits="userSpaceOnUse">
          <stop stop-color="#21BCE2" />
          <stop offset="1" stop-color="#21BCE2" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function YellowGraphic() {
  return (
    <svg width="195" height="148" viewBox="0 0 195 148" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask
        id="mask0_142_2293"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="195"
        height="148">
        <rect
          x="195"
          y="148"
          width="195"
          height="148"
          rx="10"
          transform="rotate(180 195 148)"
          fill="url(#paint0_linear_142_2293)"
        />
      </mask>
      <g mask="url(#mask0_142_2293)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M60.8354 255.158C46.2836 279.043 60.2096 310.097 87.7241 315.118L424.58 376.584C440.814 379.546 457.195 372.2 465.781 358.107L621.03 103.284L336.775 47.357C256.652 31.5928 175.195 67.4494 132.709 137.186L60.8354 255.158ZM650.502 54.9095L347.036 -4.79709C245.061 -24.8607 141.39 20.775 87.3158 109.531L15.4423 227.503C-18.5119 283.235 13.9821 355.694 78.1826 367.408L415.038 428.875C452.918 435.786 491.14 418.646 511.174 385.763L676.609 114.219L979.1 173.734L989.361 121.58L706.081 65.8448L824.726 -128.897L779.333 -156.552L650.502 54.9095Z"
          stroke="url(#paint1_linear_142_2293)"
          stroke-dasharray="3 3"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_142_2293"
          x1="292.5"
          y1="148"
          x2="159.193"
          y2="317.276"
          gradientUnits="userSpaceOnUse">
          <stop stop-color="#40B4CB" />
          <stop offset="1" stop-color="#40B4CB" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_142_2293"
          x1="215.681"
          y1="254"
          x2="215.681"
          y2="-91.6827"
          gradientUnits="userSpaceOnUse">
          <stop stop-color="#FBB03B" />
          <stop offset="1" stop-color="#FBB03B" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
