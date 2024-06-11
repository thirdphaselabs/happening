"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Separator,
  TextFieldInput,
  TextFieldLabel,
  TextFieldLabelContainer,
  TextFieldRoot,
  TextFieldSlot,
  TicketIcon,
} from "@plaventi/ui";
import {
  BarChartIcon,
  Cross2Icon,
  DotsVerticalIcon,
  LockClosedIcon,
  Pencil1Icon,
  Pencil2Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Badge, Button, Flex, SegmentedControl, Switch, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog } from "~/components/ui/dialog";
import { FormControl, FormField, FormItem, FormMessage, FormProvider } from "~/components/ui/form";
import { useEventBuilderContext } from "../context/event-builder.context";
import { TicketType } from "../context/types/types";
import { set } from "date-fns";
import { useNotify } from "~/app/_hooks/use-notify";
import { DateSelect } from "./date-select";
import { TimeSelect } from "~/app/_components/TimeSelect";
import { RiBarChart2Line, RiBarChartLine, RiDonutChartLine } from "@remixicon/react";

export function EditCapacityDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const { editTicketType, additionalInformation, setAdditionalInformation } = useEventBuilderContext();

  const schema = z.object({
    capacity: z.coerce.number(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      capacity: additionalInformation?.capacity ?? undefined,
    },
  });

  // console.log({ formErrors: form.formState.errors });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    console.log("values", values);
    setError(null);

    setAdditionalInformation({
      capacity: values.capacity,
    });

    setIsOpen(false);
    setTimeout(() => {
      setError(null);
    }, 1000);
  };

  return (
    <Dialog.Root
      onOpenChange={(val) => {
        if (!val) {
          setTimeout(() => {
            form.reset();
          }, 1000);
        }
        return setIsOpen(val);
      }}
      open={isOpen}>
      <Dialog.Trigger>
        <Button variant="ghost" color="gray" size="3" onClick={() => setIsOpen(true)}>
          {additionalInformation?.capacity ?? "Unlimited"}
          <Pencil2Icon />
        </Button>
      </Dialog.Trigger>

      <Dialog.Container className="transition-height max-w-[350px] duration-500 ease-in-out">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog.Content className="px-5 py-4">
              <Flex gap="4" direction="column" mb="4">
                <Flex
                  className="h-[44px] w-[44px] items-center justify-center rounded-lg p-2"
                  style={{
                    backgroundColor: "var(--gray-a3)",
                  }}>
                  <RiDonutChartLine />
                </Flex>
                <Dialog.Title className="mb-0">Max Capacity</Dialog.Title>
                <Text size="2" color="gray">
                  Automatically close event registration once the capacity is reached. Only approved guests
                  count towards the total.
                </Text>
              </Flex>
              <Flex direction="column" gap="4" maxWidth="550px">
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <TextFieldRoot>
                          <TextFieldLabelContainer>
                            <TextFieldLabel>Event Capacity</TextFieldLabel>
                            <FormMessage />
                          </TextFieldLabelContainer>
                          <FormControl>
                            <TextFieldInput size="3" type="number" {...field} value={field.value} />
                          </FormControl>
                        </TextFieldRoot>
                      </FormItem>
                    );
                  }}
                />

                <Flex width="100%" gap="2">
                  <Flex className="w-1/2">
                    <Button size="3" type="submit" highContrast mt="2" className="w-full">
                      Set Cap
                    </Button>
                  </Flex>
                  <Flex className="w-1/2">
                    <Button
                      size="3"
                      variant="soft"
                      type="button"
                      onClick={() => {
                        setAdditionalInformation({ capacity: undefined });
                        form.reset();
                        setIsOpen(false);
                      }}
                      color="gray"
                      mt="2"
                      className="w-full">
                      Remove Cap
                    </Button>
                  </Flex>
                </Flex>
                <Text size="2" color="red">
                  {error}
                </Text>
              </Flex>
            </Dialog.Content>
          </form>
        </FormProvider>
      </Dialog.Container>
    </Dialog.Root>
  );
}
