"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  TextFieldError,
  TextFieldInput,
  TextFieldLabel,
  TextFieldLabelContainer,
  TextFieldRoot,
  TextFieldSlot,
} from "@plaventi/ui";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Flex, Popover, Button as RButton, Text } from "@radix-ui/themes";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";
import { z } from "zod";
import { Calendar } from "~/components/ui/calendar";
import { Dialog } from "~/components/ui/dialog";
import { FormControl, FormField, FormItem, FormMessage, FormProvider } from "~/components/ui/form";
import { useEventBuilderContext } from "../context/event-builder.context";

export function AddPaidTicketGroupDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { addTicketGroup } = useEventBuilderContext();

  const schema = z.object({
    name: z.string({ required_error: "Name is required" }).min(1, "Name is required"),
    description: z.string().optional(),
    price: z.coerce.number({
      invalid_type_error: "Price must be a valid number",
      required_error: "Price is required",
    }),
    availableQuantity: z.coerce.number({
      invalid_type_error: "Available quantity must be a valid number",
      required_error: "Available Available is required",
    }),
    salesStart: z.date({
      invalid_type_error: "Sales start must be a date",
      required_error: "Sales start is required",
    }),
    salesEnd: z.date({
      invalid_type_error: "Sales start must be a date",
      required_error: "Sales end is required",
    }),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    addTicketGroup({
      category: "paid",
      group: {
        id: Math.random().toString(),
        name: values.name,
        description: values.description,
        price: values.price,
        availableQuantity: values.availableQuantity,
        salesStart: values.salesStart,
        salesEnd: values.salesEnd,
      },
    });
    setIsOpen(false);
    form.reset();
  };

  const formErrors = form.formState.errors;
  const formValues = form.getValues();

  console.log("formErrors", formErrors);
  console.log("formValues", formValues);

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
        <Button onClick={() => setIsOpen}>Add details</Button>
      </Dialog.Trigger>

      <Dialog.Container>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog.Header isSubmitButtonDisabled={false} />
            <Dialog.Content>
              <Dialog.Title>Add paid ticket group</Dialog.Title>
              <Flex direction="column" gap="4" maxWidth="550px">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <TextFieldRoot>
                        <TextFieldLabelContainer>
                          <TextFieldLabel>Name</TextFieldLabel>
                          <FormMessage />
                        </TextFieldLabelContainer>
                        <FormControl>
                          <TextFieldInput
                            size="2"
                            placeholder="Enter the name of the ticket group"
                            {...field}
                          />
                        </FormControl>
                      </TextFieldRoot>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <TextFieldRoot>
                        <TextFieldLabelContainer>
                          <TextFieldLabel className="items-center gap-1">
                            Description
                            <Text size="1" className="text-grayA9">
                              (optional)
                            </Text>
                          </TextFieldLabel>
                          <FormMessage />
                        </TextFieldLabelContainer>
                        <FormControl>
                          <TextFieldInput
                            size="2"
                            placeholder="Enter a description for the ticket group"
                            {...field}
                          />
                        </FormControl>
                      </TextFieldRoot>
                    </FormItem>
                  )}
                />
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
                          <TextFieldInput
                            size="2"
                            placeholder="Enter a description for the ticket group"
                            {...field}>
                            <TextFieldSlot>
                              <PiCurrencyDollarSimpleBold />
                            </TextFieldSlot>
                          </TextFieldInput>
                        </FormControl>
                      </TextFieldRoot>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="availableQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <TextFieldRoot>
                        <TextFieldLabelContainer>
                          <TextFieldLabel>Available quantity</TextFieldLabel>
                          <FormMessage />
                        </TextFieldLabelContainer>
                        <FormControl>
                          <TextFieldInput
                            size="2"
                            placeholder="Set how many of these tickets are available"
                            {...field}
                            type="number"
                          />
                        </FormControl>
                      </TextFieldRoot>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salesStart"
                  render={({ field }) => (
                    <FormItem>
                      <TextFieldRoot>
                        <TextFieldLabelContainer>
                          <TextFieldLabel>Sales start</TextFieldLabel>
                          <FormMessage />
                        </TextFieldLabelContainer>

                        <Popover.Root open={startDateOpen} onOpenChange={(val) => setStartDateOpen(val)}>
                          <Popover.Trigger>
                            <RButton variant="surface" size="2" color="gray" className="w-full justify-start">
                              <CalendarIcon width={16} height={16} />
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <Text className="text-gray10 text-sm font-[400]">DD/MM/YYYY</Text>
                              )}
                            </RButton>
                          </Popover.Trigger>
                          <Popover.Content side="top" align="start" className="w-max min-w-max p-0">
                            <Calendar
                              mode="single"
                              selected={undefined}
                              onSelect={(val) => {
                                field.onChange(val);
                                setStartDateOpen(false);
                              }}
                              className="w-max"
                            />
                          </Popover.Content>
                        </Popover.Root>
                      </TextFieldRoot>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salesEnd"
                  render={({ field }) => (
                    <TextFieldRoot>
                      <TextFieldLabelContainer>
                        <TextFieldLabel>Sales start</TextFieldLabel>
                      </TextFieldLabelContainer>

                      <Popover.Root open={endDateOpen} onOpenChange={(val) => setEndDateOpen(val)}>
                        <Popover.Trigger>
                          <RButton variant="surface" size="2" color="gray" className="w-full justify-start">
                            <CalendarIcon width={16} height={16} />
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <Text className="text-gray10 text-sm font-[400]">DD/MM/YYYY</Text>
                            )}
                          </RButton>
                        </Popover.Trigger>
                        <Popover.Content side="top" align="start" className="w-max min-w-max p-0">
                          <Calendar
                            mode="single"
                            selected={undefined}
                            onSelect={(val) => {
                              field.onChange(val);
                              setEndDateOpen(false);
                            }}
                            className="w-max"
                          />
                        </Popover.Content>
                      </Popover.Root>
                    </TextFieldRoot>
                  )}
                />
              </Flex>
            </Dialog.Content>
          </form>
        </FormProvider>
      </Dialog.Container>
    </Dialog.Root>
  );
}
