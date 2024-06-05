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
import { CalendarIcon, ReaderIcon } from "@radix-ui/react-icons";
import { Flex, Heading, Popover, Button as RButton, Reset, Text, TextArea } from "@radix-ui/themes";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";
import { z } from "zod";
import { Calendar } from "~/components/ui/calendar";
import { Dialog } from "~/components/ui/dialog";
import { FormControl, FormField, FormItem, FormMessage, FormProvider } from "~/components/ui/form";
import { useEventBuilderContext } from "../context/event-builder.context";
import { useTextareaAutoHeight } from "~/app/_hooks/useAutoReszieTextArea";

export function EventDescription() {
  const [isOpen, setIsOpen] = useState(false);
  const { setEventDetails, eventDetails } = useEventBuilderContext();

  const schema = z.object({
    description: z.string({ required_error: "Description is required" }).min(1, "Description is required"),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: eventDetails?.description,
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setEventDetails({ description: values.description });
    setIsOpen(false);
  };

  const formErrors = form.formState.errors;
  const formValues = form.getValues();

  const ref = useRef<HTMLTextAreaElement>(null);
  useTextareaAutoHeight({ ref });

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
        <Button
          variant="soft"
          size="3"
          className="hover:bg-skyA2 h-fit bg-transparent p-0"
          onClick={() => setIsOpen}>
          {" "}
          <Flex gap="2" className="bg-skyA2 hover:bg-grayA3  h-full rounded-xl px-3 py-2" width="100%">
            <Flex align="start" className="mt-1">
              <ReaderIcon height="16" width="16" color="gray" />
            </Flex>
            <Flex direction="column">
              <Heading size="3" className="flex items-center gap-1 " color="gray" weight="medium">
                Add Description
              </Heading>
              {eventDetails?.description && (
                <Text size="2" color="gray" align="left">
                  {eventDetails?.description}
                </Text>
              )}
            </Flex>
          </Flex>
        </Button>
      </Dialog.Trigger>

      <Dialog.Container>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog.Header isSubmitButtonDisabled={false} />
            <Dialog.Content>
              <Dialog.Title>Event Description</Dialog.Title>
              <Flex direction="column" gap="4" maxWidth="550px" className="h-fit">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <TextFieldRoot>
                        <FormControl>
                          <TextArea
                            autoFocus
                            placeholder="Who should come? What is the event for?"
                            variant="surface"
                            size="3"
                            rows={12}
                            id="create-event-description"
                            className="text text-wrap rounded-none border-none bg-transparent px-0 text-[40px] font-bold tracking-tight outline-none"
                            style={{ boxShadow: "none", textIndent: 0, height: "fit-content" }}
                            {...field}
                          />
                        </FormControl>
                      </TextFieldRoot>
                    </FormItem>
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
