import { Button } from "@plaventi/ui";
import { Select } from "@radix-ui/themes";
import { time } from "console";
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

export function TimeSelect() {
  const timeIntervals = generateTimeIntervals();
  const [isOpen, setIsOpen] = React.useState(false);
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();

  const nearestTime = timeIntervals.find((time) => {
    const [hour, minute] = time.split(":").map(Number);
    return hour > currentHour || (hour === currentHour && minute > currentMinute);
  });

  return (
    <Select.Root open={isOpen} onOpenChange={(val) => setIsOpen(val)} defaultValue={nearestTime ?? "00:00"}>
      <Select.Trigger variant="soft" color="gray" className="w-[82px]" />
      <Select.Content>
        {timeIntervals.map((time) => (
          <Select.Item value={time}>{time}</Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

<Select.Root defaultValue="apple">
  <Select.Trigger />
  <Select.Content>
    <Select.Group>
      <Select.Label>Fruits</Select.Label>
      <Select.Item value="orange">Orange</Select.Item>
      <Select.Item value="apple">Apple</Select.Item>
      <Select.Item value="grape" disabled>
        Grape
      </Select.Item>
    </Select.Group>
    <Select.Separator />
    <Select.Group>
      <Select.Label>Vegetables</Select.Label>
      <Select.Item value="carrot">Carrot</Select.Item>
      <Select.Item value="potato">Potato</Select.Item>
    </Select.Group>
  </Select.Content>
</Select.Root>;
