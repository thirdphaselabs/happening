import { Cross2Icon } from "@radix-ui/react-icons";
import { Button, Dialog as BaseDialog, Flex, IconButton, Box, Heading } from "@radix-ui/themes";

function DialogRoot({ children, ...props }: BaseDialog.RootProps) {
  return <BaseDialog.Root {...props}>{children}</BaseDialog.Root>;
}

function DialogTrigger({ children, ...props }: BaseDialog.TriggerProps) {
  return <BaseDialog.Trigger {...props}>{children}</BaseDialog.Trigger>;
}

function DialogContainer({ children, ...props }: BaseDialog.ContentProps) {
  return (
    <BaseDialog.Content {...props} className="dialog-align-top p-0">
      {children}
    </BaseDialog.Content>
  );
}

function DialogContent({ children }: { children: React.ReactNode }) {
  return <Box className="w-full p-8 pt-6">{children}</Box>;
}

function DialogHeader({ isSubmitButtonDisabled }: { isSubmitButtonDisabled: boolean }) {
  return (
    <Flex justify="between" align="center" px="6" pt="4">
      <DialogClose>
        <IconButton color="gray" variant="ghost" highContrast size="3" type="button">
          <Cross2Icon />
        </IconButton>
      </DialogClose>
      <Button type="submit" disabled={isSubmitButtonDisabled}>
        Done
      </Button>
    </Flex>
  );
}

function DialogTitle({ children, ...props }: BaseDialog.TitleProps) {
  return (
    <Heading {...props} size="5" weight="medium" mb="5">
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
  Title: DialogTitle,
  Close: DialogClose,
};
