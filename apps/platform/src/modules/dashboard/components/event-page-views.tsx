"use client";

import { Flex, Heading, Text } from "@radix-ui/themes";
import { AreaChart } from "@tremor/react";
import { formatDate } from "date-fns";
import { useMemo } from "react";
import { useMyEvents } from "~/modules/event-management/events.context";
import { PlaventiEvent } from "~/trpc/types";

const chartdata = [
  {
    date: "May 30",
    "Manchester Tech Week": 2890,
    Inverters: 2338,
  },
  {
    date: "May 31",
    "Manchester Tech Week": 2756,
    Inverters: 2103,
  },
  {
    date: "Jun 1",
    "Manchester Tech Week": 3322,
    Inverters: 2194,
  },
  {
    date: "Jun 2",
    "Manchester Tech Week": 3470,
    Inverters: 2108,
  },
  {
    date: "Jun 3",
    "Manchester Tech Week": 3475,
    Inverters: 1812,
  },
  {
    date: "Jun 4",
    "Manchester Tech Week": 3129,
    Inverters: 1726,
  },
  {
    date: "Jun 5",
    "Manchester Tech Week": 3490,
    Inverters: 1982,
  },
  {
    date: "Jun 6",
    "Manchester Tech Week": 2903,
    Inverters: 2012,
  },
  {
    date: "Jun 7",
    "Manchester Tech Week": 2643,
    Inverters: 2342,
  },
  {
    date: "Jun 8",
    "Manchester Tech Week": 2837,
    Inverters: 2473,
  },
  {
    date: "Jun 9",
    "Manchester Tech Week": 2954,
    Inverters: 3848,
  },
  {
    date: "Jun 10",
    "Manchester Tech Week": 3239,
    Inverters: 3736,
  },
];

const dataFormatter = (number: number) => `${number.toLocaleString()}`;

export function EventPageViews() {
  const { events } = useMyEvents();
  const buildPreviousWeekDays = () => {
    const today = new Date();
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      days.push(date);
    }
    return days;
  };

  const previousWeekDays = buildPreviousWeekDays()
    .sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime();
    })
    .map((date) => formatDate(date, "MMM d"));

  console.log({ previousWeekDays });

  const buildChartData = (events: PlaventiEvent[]) => {
    let data = [];

    for (const day of previousWeekDays) {
      // compute random page views for each event in this format
      // { ['event-title']: pageViews }
      const eventPageViews = events.map((event) => ({
        title: event.title,
        pageViews: Math.floor(Math.random() * 5000),
      }));

      data.push({
        date: day,
        ...eventPageViews.reduce(
          (acc, { title, pageViews }) => {
            acc[title] = pageViews;
            return acc;
          },
          {} as Record<string, number>,
        ),
      });
    }

    return data;
  };

  const chartData = useMemo(() => buildChartData(events), [events]);

  const eventTitles = events?.map((event) => event.title) ?? [];

  return (
    <Flex direction="column" gap="6" width="100%" py="5">
      <Flex direction="column" gap="2">
        <Heading size="6">Upcoming Event Page Views</Heading>
        <Text size="3" color="gray">
          See recent page views for your upcoming events.
        </Text>
      </Flex>
      <Flex className="hover:border-grayA4 w-full rounded-xl border-[1px] border-solid border-white/50 bg-white/50 p-3 pl-4 transition duration-200 ease-in-out hover:shadow-sm">
        <AreaChart
          className="h-[300px]"
          data={chartData}
          index="date"
          categories={eventTitles}
          colors={["cyan", "yellow"]}
          valueFormatter={dataFormatter}
          yAxisWidth={60}
          onValueChange={(v) => console.log(v)}
        />
      </Flex>
    </Flex>
  );
}
