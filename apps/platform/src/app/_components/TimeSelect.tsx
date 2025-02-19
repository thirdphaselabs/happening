import { cn } from "@plaventi/ui/src/utils/helpers";
import { Select } from "@radix-ui/themes";
import React from "react";

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

export function TimeSelect({
  date,
  size = "3",
  variant = "surface",
  defaultValue,
  onSelect,
}: {
  variant?: "soft" | "surface";
  size?: "2" | "3";
  defaultValue?: string;
  date: "start" | "end";
  onSelect: (val: string) => void;
}) {
  const timeIntervals = generateTimeIntervals();
  const [isOpen, setIsOpen] = React.useState(false);
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();

  const nearestTime = timeIntervals.find((time) => {
    const [hour, minute] = time.split(":").map(Number);
    return hour > currentHour || (hour === currentHour && minute > currentMinute);
  });

  console.log({ nearestTime, timeIntervals });

  return (
    <Select.Root
      size={size}
      open={isOpen}
      onOpenChange={(val) => setIsOpen(val)}
      defaultValue={defaultValue ?? nearestTime ?? "00:00"}
      onValueChange={onSelect}>
      <Select.Trigger
        variant={variant}
        color="gray"
        className={cn("text-[16px]", {
          "w-[110px]": size === "3",
          "w-[90px]": size === "2",
        })}
      />
      <Select.Content>
        {timeIntervals.map((time) => (
          <Select.Item value={time}>{time}</Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
