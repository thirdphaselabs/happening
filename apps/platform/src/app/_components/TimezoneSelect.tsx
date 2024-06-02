import React, { ReactNode, useEffect, useState } from "react";
import moment from "moment-timezone";
import { Avatar, Box, Checkbox, Flex, Popover, ScrollArea, Select, Text, TextArea } from "@radix-ui/themes";
import { ChatBubbleIcon, GlobeIcon } from "@radix-ui/react-icons";
import { Button, TextFieldInput } from "@plaventi/ui";

export function TimezoneSelect() {
  const getTimeZoneOffset = (tz: string) => {
    const offset = moment.tz(tz).utcOffset();
    const absOffset = Math.abs(offset);
    const hours = Math.floor(absOffset / 60);
    const minutes = absOffset % 60;
    const sign = offset >= 0 ? "+" : "-";
    return `GMT${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  const getTimeZoneName = (tz: string) => {
    return tz.replace("_", " ");
  };

  const tzNames = moment.tz.names();
  const tzData = tzNames.map((tz) => {
    const offset = getTimeZoneOffset(tz);
    const name = getTimeZoneName(tz);
    return { tz, offset, name };
  });

  console.log(tzData);
  const [selectedTz, setSelectedTz] = useState(tzData[0].tz);

  const [search, setSearch] = useState<string | null>(null);

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    // <Select.Root
    //   open={isOpen}
    //   onOpenChange={(val) => setIsOpen(val)}
    //   onValueChange={(val) => {
    //     console.log(val);
    //     setSelectedTz(val);
    //   }}>
    //   <Select.Trigger
    //     style={{ all: "unset" }}
    //     className="select-trigger-no-icon "
    //     onClick={() => setIsOpen(!isOpen)}>
    //     <Flex className="hover:bg-skyA2 w-[130px] overflow-hidden rounded-xl">
    //       <Flex
    //         direction="column"
    //         className="bg-skyA2 hover:bg-grayA4 rounded-xl px-[10px] py-2"
    //         justify="center"
    //         gap="1">
    //         <GlobeIcon color="gray" className="!flex" />
    //         <Flex direction="column">
    //           <Text size="2" color="gray" weight="medium" className="w-[100px] text-ellipsis overflow-hidden whitespace-nowrap">
    //             {getTimeZoneName(selectedTz)}
    //           </Text>
    //           <Text size="1" color="gray">
    //             {getTimeZoneOffset(selectedTz)}
    //           </Text>
    //         </Flex>
    //       </Flex>
    //     </Flex>
    //   </Select.Trigger>
    //   {/* <Select.Trigger variant="soft" color="gray" className="w-[82px]" /> */}
    //   <Select.Content>
    //     {tzData.map(({ tz, offset, name }) => (
    //       <Select.Item value={tz} className="w-full">
    //         <Flex justify="between" gap="4" width="100%">
    //           <Text>{name}</Text>
    //           <Text color="gray">{offset}</Text>
    //         </Flex>
    //       </Select.Item>
    //     ))}
    //   </Select.Content>
    // </Select.Root>
    <Popover.Root open={isOpen} onOpenChange={(val) => setIsOpen(val)}>
      <Popover.Trigger>
        <Flex className="hover:bg-skyA2 w-[150px] overflow-hidden rounded-xl" onClick={() => setIsOpen(true)}>
          <Flex
            direction="column"
            className="bg-skyA2 hover:bg-grayA4 w-full rounded-xl px-[10px] py-2"
            justify="center"
            gap="1">
            <GlobeIcon color="gray" className="!flex" />
            <Flex direction="column">
              <Text
                size="2"
                color="gray"
                weight="medium"
                className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
                {getTimeZoneName(selectedTz)}
              </Text>
              <Text size="1" color="gray">
                {getTimeZoneOffset(selectedTz)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Popover.Trigger>
      <Popover.Content width="360px" className="relative px-2 py-1">
        <Flex direction="column" className="" gap="1">
          <TextFieldInput
            placeholder="Search timezone"
            variant="soft"
            color="gray"
            size="2"
            className="w-full"
            value={search ?? ""}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ScrollArea type="always" scrollbars="vertical" style={{ height: 400 }}>
            <Flex direction="column" pr="2">
              {tzData
                .filter((tz) => {
                  if (!search) return true;
                  return tz.name.toLowerCase().includes(search.toLowerCase());
                })
                .map(({ tz, offset, name }) => (
                  <Button
                    color="gray"
                    variant="surface"
                    className="hover:bg-skyA3 w-full justify-between gap-4 shadow-none"
                    onClick={() => {
                      setSelectedTz(tz);
                      setIsOpen(false);
                      setSearch(null);
                    }}>
                    <Text size="2">{name}</Text>
                    <Text size="2" color="gray">
                      {offset}
                    </Text>
                  </Button>
                ))}
            </Flex>
          </ScrollArea>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
