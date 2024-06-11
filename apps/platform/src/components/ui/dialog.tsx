import { Separator } from "@plaventi/ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button, Dialog as BaseDialog, Flex, IconButton, Box, Heading } from "@radix-ui/themes";
import { cn } from "~/lib/utils";

function DialogRoot({ children, ...props }: BaseDialog.RootProps) {
  return <BaseDialog.Root {...props}>{children}</BaseDialog.Root>;
}

function DialogTrigger({ children, ...props }: BaseDialog.TriggerProps) {
  return <BaseDialog.Trigger {...props}>{children}</BaseDialog.Trigger>;
}

function DialogContainer({ children, ...props }: BaseDialog.ContentProps) {
  return (
    <BaseDialog.Content {...props} className={cn("dialog-align-top p-0 md:mt-12", props.className, {})}>
      {children}
    </BaseDialog.Content>
  );
}

function DialogContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <Box className={cn("w-full px-5 pb-3 pt-3", className)}>{children}</Box>;
}

function DialogHeader({
  header,
  isSubmitButtonDisabled,
}: {
  header: string;
  isSubmitButtonDisabled: boolean;
}) {
  return (
    <Flex direction="column" gap="3">
      <Flex justify="between" align="center" px="5" pt="3">
        <Dialog.Title mb="0">{header}</Dialog.Title>
        <DialogClose>
          <IconButton color="gray" variant="ghost" size="3" type="button">
            <Cross2Icon />
          </IconButton>
        </DialogClose>
        {/* <Button type="submit" disabled={isSubmitButtonDisabled}>
          Done
        </Button> */}
      </Flex>
      <Separator orientation="horizontal" className="w-full" />
    </Flex>
  );
}

function DialogActions({
  isSubmitButtonDisabled,
  submitText,
}: {
  isSubmitButtonDisabled: boolean;
  submitText?: string;
}) {
  return (
    <Flex justify="end" width="100%">
      <Button type="submit" disabled={isSubmitButtonDisabled} size="2">
        {submitText ?? "Done"}
      </Button>
    </Flex>
  );
}

function DialogTitle({ children, ...props }: BaseDialog.TitleProps) {
  return (
    <Heading size="5" mb="5" {...props}>
      {children}
    </Heading>
  );
}

function DialogClose({ children, ...props }: BaseDialog.CloseProps) {
  return <BaseDialog.Close {...props}>{children}</BaseDialog.Close>;
}

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Container: DialogContainer,
  Content: DialogContent,
  Header: DialogHeader,
  Actions: DialogActions,
  Title: DialogTitle,
  Close: DialogClose,
};
