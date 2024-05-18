import { TextField as BaseTextFieldInput, Flex, Text, TextField } from "@radix-ui/themes";
import { ReactNode } from "react";
import { cn } from "../utils/helpers";

type TextInputProps = {
  children: ReactNode;
};

export function TextFieldRoot({ children }: TextInputProps) {
  return <label className="w-full">{children}</label>;
}

export function TextFieldLabelContainer({ children }: { children: ReactNode }) {
  return (
    <Flex justify="between" width="100%" gap="1" mb="1" align="center">
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

export function TextFieldError({ children }: { children: ReactNode }) {
  return (
    <Text size="1" color="red" className="flex items-center gap-1">
      {children}
    </Text>
  );
}

export function TextFieldInput({
  handleChange,
  ...props
}: Omit<TextField.RootProps, "onChange"> & { handleChange: (val: string | undefined) => void }) {
  return (
    <BaseTextFieldInput.Root
      {...props}
      onChange={(e) => {
        const val = e.currentTarget.value;
        if (val === "") {
          handleChange(undefined);
          return;
        }
        handleChange(val);
      }}
    />
  );
}
