import { TextField as BaseTextFieldInput, Flex, Text, TextField } from "@radix-ui/themes";
import { ReactNode } from "react";
import { cn } from "../utils/helpers";

type TextInputProps = {
  children: ReactNode;
  className?: string;
};

export function TextFieldRoot({ children, className }: TextInputProps) {
  return <label className={cn("flex w-full flex-col", className)}>{children}</label>;
}

export function TextFieldLabelContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Flex justify="between" width="100%" gap="1" mb="1" align="center" className={className}>
      {children}
    </Flex>
  );
}

export function TextFieldLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Text
      as="div"
      size="2"
      weight="medium"
      mb="1"
      color="gray"
      className={cn("flex items-center justify-between", className)}>
      {children}
    </Text>
  );
}

export function TextFieldError({ children, isVisible = false }: { children: ReactNode; isVisible: boolean }) {
  return (
    <Text
      size="1"
      color="red"
      className={cn("mt-1 flex items-center gap-1", {
        "invisible h-[16px]": !isVisible,
      })}>
      {children}
    </Text>
  );
}

export function TextFieldInput({
  handleChange,
  ...props
}: TextField.RootProps & { handleChange?: (val: string | undefined) => void }) {
  return (
    <BaseTextFieldInput.Root
      {...props}
      onChange={(e) => {
        if (!handleChange) {
          return props.onChange?.(e);
        }
        const val = e.currentTarget.value;
        if (val === "") {
          handleChange?.(undefined);
          return;
        }
        handleChange?.(val);
      }}
    />
  );
}

export function TextFieldSlot({ children }: { children: ReactNode }) {
  return <TextField.Slot>{children}</TextField.Slot>;
}
