import { TextField as BaseTextFieldInput, Flex, Text, TextField } from "@radix-ui/themes";
import { ReactNode } from "react";

type TextInputProps = {
  children: ReactNode;
};

export function TextFieldRoot({ children }: TextInputProps) {
  return <label className="w-full">{children}</label>;
}

export function TextFieldLabelContainer({ children }: { children: ReactNode }) {
  return (
    <Flex justify="between" width="100%" gap="1" mb="1">
      {children}
    </Flex>
  );
}

export function TextFieldLabel({ children }: { children: ReactNode }) {
  return (
    <Text as="div" size="2" weight="medium" mb="1" color="gray" className="flex justify-between items-center">
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

export function TextFieldInput(props: TextField.RootProps) {
  return <BaseTextFieldInput.Root {...props} />;
}
