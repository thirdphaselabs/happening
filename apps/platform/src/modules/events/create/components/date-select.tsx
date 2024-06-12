import { TextFieldInput } from "@plaventi/ui";
import { Popover } from "@radix-ui/themes";
import { formatDate } from "date-fns";
import { useState } from "react";
import { Calendar } from "~/components/ui/calendar";

export function DateSelect({
  date,
  variant = "surface",
  defaultValue,
  size = "3",
  onSelect,
}: {
  variant?: "surface" | "soft";
  defaultValue?: Date;
  size?: "2" | "3";
  date: "start" | "end";
  onSelect: (val: Date | undefined) => void;
}) {
  const [endDateOpen, setEndDateOpen] = useState(false);

  return (
    <Popover.Root open={endDateOpen} onOpenChange={(val) => setEndDateOpen(val)}>
      <Popover.Trigger>
        <button
          style={{ all: "unset", flexGrow: 1, display: "flex", width: "100%" }}
          className="flex w-full flex-grow justify-start">
          <TextFieldInput
            size={size}
            value={
              defaultValue ? formatDate(defaultValue, "EEE, d MMM") : formatDate(new Date(), "EEE, d MMM")
            }
            variant={variant}
            color="gray"
            className="flex-grow text-[16px]"
          />
        </button>
      </Popover.Trigger>
      <Popover.Content side="top" align="start" className="w-max min-w-max p-0">
        <Calendar
          style={{ accentColor: "#21bce2" }}
          mode="single"
          selected={defaultValue}
          onSelect={(val) => onSelect(val)}
          className="max-w-sm"
        />
      </Popover.Content>
    </Popover.Root>
  );
}
