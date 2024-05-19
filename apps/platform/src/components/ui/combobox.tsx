"use client";

import { Button, Flex, Popover } from "@radix-ui/themes";
import * as React from "react";
// import { Button } from "./button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command";

export function Combobox({
  selectedItems,
  availableItems,
  onSelect,
}: {
  availableItems: { id: string; label: string }[];
  selectedItems: { id: string; label: string }[];
  onSelect: (tags: { id: string; label: string }[]) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const selectedLabels = selectedItems
    .map((t) => availableItems.find((s) => s.id === t.id)?.label)
    .filter((t): t is string => t !== undefined)
    .sort((a, b) => a.localeCompare(b));

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <Button variant="surface" color="gray" className="justify-start">
          {selectedLabels.length > 0 ? selectedLabels.join(", ") : "Add tags"}
          <CaretSortIcon />
        </Button>
      </Popover.Trigger>
      <Popover.Content side="bottom" className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Select tags..." />
          <CommandList>
            <CommandEmpty>No tags found.</CommandEmpty>
            <CommandGroup>
              {availableItems.map((status) => (
                <CommandItem
                  key={status.id}
                  value={status.id}
                  onSelect={(value) => {
                    if (selectedItems.map((si) => si.id).includes(value)) {
                      onSelect(selectedItems.filter((tag) => tag.id !== value));
                      return;
                    }
                    setValue(value);
                    onSelect([...selectedItems, { id: value, label: status.label }]);
                  }}>
                  <Flex gap="1" align="center">
                    {selectedItems.map((si) => si.id).includes(status.id) && <CheckIcon />}
                    {status.label}
                  </Flex>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </Popover.Content>
    </Popover.Root>
  );
}
