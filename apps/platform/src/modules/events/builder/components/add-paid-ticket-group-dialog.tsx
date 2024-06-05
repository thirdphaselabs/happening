"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Separator,
  TextFieldError,
  TextFieldInput,
  TextFieldLabel,
  TextFieldLabelContainer,
  TextFieldRoot,
  TextFieldSlot,
} from "@plaventi/ui";
import { CalendarIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Flex, Popover, Button as RButton, Text } from "@radix-ui/themes";
import { format, set } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";
import { z } from "zod";
import { Calendar } from "~/components/ui/calendar";
import { Dialog } from "~/components/ui/dialog";
import { FormControl, FormField, FormItem, FormMessage, FormProvider } from "~/components/ui/form";
import { useEventBuilderContext } from "../../create/context/event-builder.context";

export function AddPaidTicketGroupDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { setTicketPrice, tickets } = useEventBuilderContext();

  const schema = z.object({
    price: z.coerce.number({
      invalid_type_error: "Price must be a valid number",
      required_error: "Price is required",
    }),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      price: 0,
    },
  });

  const formErrors = form.formState.errors;
  const formValues = form.getValues();

  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  return (
    <Dialog.Root
      onOpenChange={(val) => {
        if (!val) {
          form.reset();
        }
        return setIsOpen(val);
      }}
      open={isOpen}>
      <Dialog.Trigger>
        <Button variant="ghost" color="gray" size="3">
          {tickets?.type === "paid" ? `US$  ${tickets.price}` : <>Free</>}
          <Pencil2Icon />
        </Button>
      </Dialog.Trigger>

      <Dialog.Container>
        <FormProvider {...form}>
          <form>
            <Dialog.Content>
              <Dialog.Title>Ticket Price</Dialog.Title>
              <Flex direction="column" gap="4" maxWidth="550px">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <TextFieldRoot>
                        <TextFieldLabelContainer>
                          <TextFieldLabel>Price</TextFieldLabel>
                          <FormMessage />
                        </TextFieldLabelContainer>
                        <FormControl>
                          <TextFieldInput type="number" autoFocus size="3" defaultValue={0} {...field}>
                            <TextFieldSlot>
                              <Flex align="center">
                                <Text color="gray">$ USD</Text>
                              </Flex>
                            </TextFieldSlot>
                          </TextFieldInput>
                        </FormControl>
                      </TextFieldRoot>
                    </FormItem>
                  )}
                />
                <Button
                  size="3"
                  type="button"
                  highContrast
                  onClick={() => {
                    setTicketPrice({
                      price: formValues.price,
                      type: "paid",
                    });
                    form.reset();
                    setIsOpen(false);
                  }}>
                  Set Ticket Price
                </Button>
                <Separator orientation={"horizontal"} />
                <Button
                  size="3"
                  variant="soft"
                  color="gray"
                  type="button"
                  onClick={() => {
                    setTicketPrice({
                      price: null,
                      type: "free",
                    });
                    setIsOpen(false);
                  }}>
                  Set Event Free
                </Button>
              </Flex>
            </Dialog.Content>
          </form>
        </FormProvider>
      </Dialog.Container>
    </Dialog.Root>
  );
}
