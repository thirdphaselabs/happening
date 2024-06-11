"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Separator,
  TextFieldInput,
  TextFieldLabel,
  TextFieldLabelContainer,
  TextFieldRoot,
  TextFieldSlot,
  TicketIcon,
} from "@plaventi/ui";
import {
  Cross2Icon,
  DotsVerticalIcon,
  LockClosedIcon,
  Pencil1Icon,
  Pencil2Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Badge, Flex, SegmentedControl, Switch, Text, TextArea } from "@radix-ui/themes";
import { ReactNode, useEffect, useMemo, useState } from "react";
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

function buildStartingValues(args: { ticketType: TicketType | null; method: "add" | "edit" }): TicketType {
  if (args.method === "edit" && args.ticketType) {
    return args.ticketType;
  }

  return {
    id: Math.random().toString(),
    name: undefined,
    description: undefined,
    price: null,
    requiresApproval: false,
    salesStart: undefined,
    salesEnd: undefined,
    ticketCapacity: null,
    lastUpdated: new Date(),
  };
}

export function TicketTypeDialog({
  ticketType: initialData,
  trigger,
  method,
  isOpen: initialIsOpen = false,
  setIsOpen: initialSetIsOpen,
}: {
  isOpen?: boolean;
  setIsOpen?: (val: boolean) => void;
  trigger: ReactNode;
  ticketType: TicketType | null;
  method: "add" | "edit";
}) {
  const ticketType = useMemo(
    () => buildStartingValues({ ticketType: initialData, method }),
    [initialData, method],
  );
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [showDescription, setShowDescription] = useState(ticketType.description ? true : false);
  const [showRestrictions, setShowRestrictions] = useState(false);
  const [showSalesStartDate, setShowSalesStartDate] = useState(false);
  const [showSalesEndDate, setShowSalesEndDate] = useState(false);
  const [requiresApproval, setRequiresApproval] = useState(false);

  const { editTicketType, createTicketType, tickets } = useEventBuilderContext();

  const [paymentType, setPaymentType] = useState<"free" | "paid">(ticketType.price ? "paid" : "free");

  useEffect(() => {
    setShowDescription(ticketType.description ? true : false);
    setPaymentType(ticketType.price ? "paid" : "free");
  }, [ticketType]);

  useEffect(() => {
    setIsOpen(initialIsOpen);
  }, [initialIsOpen]);

  const schema = z
    .object({
      name: z.string(),
      description: z.string().optional(),
      price: z.coerce.number().optional(),
      requiresApproval: z.boolean(),
      salesStartDate: z.date().optional(),
      startTime: z.string().optional(),
      salesEndDate: z.date().optional(),
      endTime: z.string().optional(),
      totalTickets: z.coerce.number().optional(),
    })
    .refine((data) => {
      console.log({ paymentType, price: data.price });
      if (paymentType === "free") return true;

      if (paymentType === "paid" && data.price && data.price <= 0) {
        return false;
      }
      return true;
    });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: ticketType.name,
      price: ticketType.price ?? undefined,
      description: ticketType.description ?? undefined,
      requiresApproval: false,
    },
  });

  // console.log({ formErrors: form.formState.errors });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    console.log("values", values);
    setError(null);

    const updatedTicketType: TicketType = {
      id: ticketType.id,
      name: values.name,
      description: values.description,
      price: paymentType === "paid" ? values.price ?? null : null,
      requiresApproval: values.requiresApproval,
      salesStart: values.salesStartDate,
      startTime: values.startTime,
      salesEnd: values.salesEndDate,
      endTime: values.endTime,
      ticketCapacity: values.totalTickets ?? null,
      lastUpdated: new Date(),
    };

    if (method === "add") {
      createTicketType({
        ticketType: updatedTicketType,
      });
    } else {
      editTicketType({
        ticketType: updatedTicketType,
      });
    }

    setIsOpen(false);
    initialSetIsOpen?.(false);
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
        setIsOpen(val);
        initialSetIsOpen?.(val);
      }}
      open={isOpen}>
      {trigger !== null && <Dialog.Trigger>{trigger}</Dialog.Trigger>}

      <Dialog.Container className="transition-height max-w-[350px] duration-500 ease-in-out">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog.Content className="px-5 py-4">
              <Flex gap="4" direction="column">
                <Flex
                  className="h-[44px] w-[44px] items-center justify-center rounded-lg p-2"
                  style={{
                    backgroundColor: "var(--gray-a3)",
                  }}>
                  <TicketIcon />
                </Flex>
                <Dialog.Title className="mb-4">{method === "edit" ? "Edit" : "Add"} Ticket Type</Dialog.Title>
              </Flex>
              <Flex direction="column" gap="4" maxWidth="550px">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <TextFieldRoot>
                          <TextFieldLabelContainer>
                            <TextFieldLabel>Ticket Name</TextFieldLabel>
                            <FormMessage />
                          </TextFieldLabelContainer>
                          <FormControl>
                            <TextFieldInput size="3" {...field} value={field.value} />
                          </FormControl>
                        </TextFieldRoot>
                      </FormItem>
                    );
                  }}
                />

                <Flex width="100%">
                  {!showDescription ? (
                    <Button
                      variant="ghost"
                      size="2"
                      color="gray"
                      onClick={() => {
                        setShowDescription(!showDescription);
                      }}>
                      <PlusIcon />
                      Add Ticket Description
                    </Button>
                  ) : (
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <TextFieldRoot>
                              <TextFieldLabelContainer>
                                <TextFieldLabel>Description</TextFieldLabel>
                                <FormMessage />
                              </TextFieldLabelContainer>
                              <FormControl>
                                <TextArea
                                  size="3"
                                  placeholder="Exclusively for friends & family"
                                  {...field}
                                  value={field.value}
                                />
                              </FormControl>
                            </TextFieldRoot>
                          </FormItem>
                        );
                      }}
                    />
                  )}
                </Flex>

                <Flex direction="column" width="100%" gap="2">
                  <Flex width="100%">
                    <SegmentedControl.Root
                      className="w-full"
                      value={paymentType}
                      onValueChange={(val) => {
                        if (val === "free") {
                          setPaymentType("free");
                        } else {
                          setPaymentType("paid");
                        }
                      }}>
                      <SegmentedControl.Item value="free">Free</SegmentedControl.Item>
                      <SegmentedControl.Item value="paid">Paid</SegmentedControl.Item>
                    </SegmentedControl.Root>
                  </Flex>

                  {paymentType === "paid" && (
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <TextFieldRoot>
                              <TextFieldLabelContainer>
                                <TextFieldLabel>Price</TextFieldLabel>
                                <FormMessage />
                              </TextFieldLabelContainer>
                              <FormControl>
                                <TextFieldInput type="number" size="3" {...field} value={field.value}>
                                  <TextFieldSlot>
                                    <Flex align="center">
                                      <Text color="gray">$ USD</Text>
                                    </Flex>
                                  </TextFieldSlot>
                                </TextFieldInput>
                              </FormControl>
                            </TextFieldRoot>
                          </FormItem>
                        );
                      }}
                    />
                  )}
                </Flex>
                <Flex direction="column" gap="1">
                  <Flex gap="2" justify="between">
                    <TextFieldLabel className="text-[16px] text-black">Requires Approval</TextFieldLabel>
                    <Switch
                      size="2"
                      highContrast
                      checked={requiresApproval}
                      onCheckedChange={(val) => {
                        form.setValue("requiresApproval", val);
                        setRequiresApproval(val);
                      }}
                    />
                  </Flex>
                  <Text size="2" color="gray">
                    {requiresApproval ? "Tickets allocated on approval." : "Anyone can buy tickets."}
                  </Text>
                </Flex>

                <Flex width="100%">
                  {!showRestrictions ? (
                    <Button
                      variant="ghost"
                      type="button"
                      size="2"
                      color="gray"
                      onClick={() => {
                        setShowRestrictions(true);
                      }}>
                      <LockClosedIcon />
                      Restrict Dates / Capacity
                    </Button>
                  ) : (
                    <Flex direction="column" width="100%">
                      <Flex direction="column" width="100%" gap="1" mb="4">
                        <Flex justify="between">
                          <TextFieldLabel className="text-[16px] text-black">Sales Start Date</TextFieldLabel>
                          <Switch
                            highContrast
                            size="2"
                            checked={showSalesStartDate}
                            onCheckedChange={(val) => {
                              setShowSalesStartDate(val);
                            }}
                          />
                        </Flex>
                        {showSalesStartDate && (
                          <Flex width="100%" gap="1">
                            <FormField
                              control={form.control}
                              name="salesStartDate"
                              render={({ field }) => {
                                return (
                                  <FormItem className="w-full">
                                    <FormControl>
                                      <DateSelect
                                        date="start"
                                        defaultValue={field.value}
                                        onSelect={(val) => {
                                          field.onChange(val);
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />

                            <FormField
                              control={form.control}
                              name="startTime"
                              render={({ field }) => {
                                return (
                                  <FormItem className="w-fit">
                                    <FormControl>
                                      <TimeSelect
                                        date="start"
                                        defaultValue={field.value}
                                        onSelect={(val) => {
                                          field.onChange(val);
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                          </Flex>
                        )}
                      </Flex>
                      <Flex direction="column" width="100%" gap="1" mb={"4"}>
                        <Flex gap="2" justify="between">
                          <TextFieldLabel className="text-[16px] text-black">Sales End Date</TextFieldLabel>
                          <Switch
                            size="2"
                            highContrast
                            checked={showSalesEndDate}
                            onCheckedChange={(val) => {
                              setShowSalesEndDate(val);
                            }}
                          />
                        </Flex>
                        {showSalesEndDate && (
                          <Flex width="100%" gap="1">
                            <FormField
                              control={form.control}
                              name="salesEndDate"
                              render={({ field }) => {
                                return (
                                  <FormItem className="w-full">
                                    <FormControl>
                                      <DateSelect
                                        date="end"
                                        defaultValue={field.value}
                                        onSelect={(val) => {
                                          field.onChange(val);
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />

                            <FormField
                              control={form.control}
                              name="endTime"
                              render={({ field }) => {
                                return (
                                  <FormItem className="w-fit">
                                    <FormControl>
                                      <TimeSelect
                                        date="end"
                                        defaultValue={field.value}
                                        onSelect={(val) => {
                                          field.onChange(val);
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                          </Flex>
                        )}
                      </Flex>
                      <FormField
                        control={form.control}
                        name="totalTickets"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <Flex gap="2" justify="between">
                                <TextFieldLabel className="text-[16px] text-black">
                                  Total Tickets
                                </TextFieldLabel>
                                <TextFieldInput
                                  size="3"
                                  placeholder="∞"
                                  className="max-w-[100px] pr-3 text-right"
                                  {...field}
                                  value={field.value}
                                />
                              </Flex>
                            </FormItem>
                          );
                        }}
                      />
                    </Flex>
                  )}
                </Flex>

                <Button size="3" type="submit" highContrast mt="2">
                  {method === "edit" ? "Update" : "Create"} Ticket Type
                </Button>
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
