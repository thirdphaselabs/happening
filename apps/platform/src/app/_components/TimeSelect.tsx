import { Button } from "@plaventi/ui";
import { Select } from "@radix-ui/themes";
import { time } from "console";
import React from "react";
import { useEventBuilderContext } from "~/modules/events/create/context/event-builder.context";

const generateTimeIntervals = () => {
  const intervals = [];
  let hour = 0;
  let minute = 0;

  while (hour < 24) {
    let time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    intervals.push(time);
    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour += 1;
    }
  }
  return intervals;
};

export function TimeSelect({ date }: { date: "start" | "end" }) {
  const timeIntervals = generateTimeIntervals();
  const [isOpen, setIsOpen] = React.useState(false);
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();

  const nearestTime = timeIntervals.find((time) => {
    const [hour, minute] = time.split(":").map(Number);
    return hour > currentHour || (hour === currentHour && minute > currentMinute);
  });

  const { setDateAndTime } = useEventBuilderContext();

  return (
    <Select.Root
      open={isOpen}
      onOpenChange={(val) => setIsOpen(val)}
      defaultValue={nearestTime ?? "00:00"}
      onValueChange={(val) => {
        if (date === "start") {
          setDateAndTime({ startTime: val });
        } else {
          setDateAndTime({ endTime: val });
        }
      }}>
      <Select.Trigger variant="soft" color="gray" className="w-[82px]" />
      <Select.Content>
        {timeIntervals.map((time) => (
          <Select.Item value={time}>{time}</Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
