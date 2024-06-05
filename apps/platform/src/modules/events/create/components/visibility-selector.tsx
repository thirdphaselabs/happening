import { cn } from "@plaventi/ui/src/utils/helpers";
import { CaretDownIcon, CheckCircledIcon, GlobeIcon, IdCardIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading, Popover, Text } from "@radix-ui/themes";
import { useState } from "react";

export function VisibilitySelector() {
  const [isOpen, setIsOpen] = useState(false);

  const [selected, setSelected] = useState<"public" | "private">("public");

  return (
    <Popover.Root open={isOpen} onOpenChange={(val) => setIsOpen(val)}>
      <Popover.Trigger>
        <Button
          variant="soft"
          color="gray"
          size="2"
          onClick={() => setIsOpen(true)}
          className="duration-400 transition-all">
          {selected === "public" ? (
            <>
              <GlobeIcon />
              Public
            </>
          ) : (
            <>
              <IdCardIcon />
              Private
            </>
          )}
          <CaretDownIcon />
        </Button>
      </Popover.Trigger>
      <Popover.Content width="290px" align="end" className="relative px-2 py-1">
        <Flex direction="column" className="" gap="1">
          <Button
            color="gray"
            variant="surface"
            className="hover:bg-grayA3 h-fit w-full gap-4 px-2 py-2 shadow-none"
            onClick={() => {
              setSelected("public");
              setIsOpen(false);
            }}>
            <Flex direction="column" align="start" gap="1">
              <Heading size="2" color="gray" highContrast className="flex items-center gap-2">
                <GlobeIcon />
                Public
              </Heading>
              <Text size="2" align="left" color="gray" weight="regular">
                Show on the public discovery page.
              </Text>
            </Flex>
            <CheckCircledIcon
              height="18"
              width="18"
              className={cn({
                invisible: selected !== "public",
              })}
            />
          </Button>
          <Button
            color="gray"
            variant="surface"
            className="hover:bg-grayA3 h-fit w-full gap-4 px-2 py-2 shadow-none"
            onClick={() => {
              setSelected("private");
              setIsOpen(false);
            }}>
            <Flex direction="column" align="start" gap="1">
              <Heading size="2" color="gray" highContrast className="flex items-center gap-2">
                <IdCardIcon />
                Private
              </Heading>
              <Text size="2" align="left" color="gray" weight="regular">
                Unlisted. Only people with the link can view & register.
              </Text>
            </Flex>
            <Flex>
              <CheckCircledIcon
                height="18"
                width="18"
                className={cn({
                  invisible: selected !== "private",
                })}
              />
            </Flex>
          </Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
