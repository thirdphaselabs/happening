import { CalendarIcon } from "@radix-ui/react-icons";
import { Button, Popover, Text } from "@radix-ui/themes";
import { format, formatDate } from "date-fns";
import { useState } from "react";
import { Calendar } from "~/components/ui/calendar";
import { useEventBuilderContext } from "../context/event-builder.context";
import { TextFieldInput } from "@plaventi/ui";

export function DateSelect({ date }: { date: "start" | "end" }) {
  const [endDateOpen, setEndDateOpen] = useState(false);
  const { setDateAndTime, dateAndTime } = useEventBuilderContext();

  const dateValue = date === "start" ? dateAndTime?.startDate : dateAndTime?.endDate;

  return (
    <Popover.Root open={endDateOpen} onOpenChange={(val) => setEndDateOpen(val)}>
      <Popover.Trigger>
        <Button
          style={{ all: "unset" }}
          variant="surface"
          size="2"
          color="gray"
          className="w-full justify-start">
          <TextFieldInput
            value={dateValue ? formatDate(dateValue, "EEE, d MMM") : formatDate(new Date(), "EEE, d MMM")}
            variant="soft"
            color="gray"
            size="2"
            className="flex-grow text-[16px]"
          />
        </Button>
      </Popover.Trigger>
      <Popover.Content side="top" align="start" className="w-max min-w-max p-0">
        <Calendar
          style={{ accentColor: "#21bce2" }}
          mode="single"
          selected={dateAndTime?.endDate}
          onSelect={(val) => {
            if (date === "start") {
              setDateAndTime({ startDate: val });
            } else {
              setDateAndTime({ endDate: val });
            }
            setEndDateOpen(false);
          }}
          className="max-w-sm"
        />
      </Popover.Content>
    </Popover.Root>
  );
}
