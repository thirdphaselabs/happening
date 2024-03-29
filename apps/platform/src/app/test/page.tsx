"use client";
import { Flex } from "@radix-ui/themes";
import {
  TextFieldInput,
  TextFieldRoot,
  TextFieldLabel,
  TextFieldError,
  TextFieldLabelContainer,
} from "@plaventi/ui";

export default async function Home() {
  return (
    <div>
      <Flex className="w-[400px]">
        <TextFieldRoot>
          <TextFieldLabelContainer>
            <TextFieldLabel>Password</TextFieldLabel>
            <TextFieldError>Password is required</TextFieldError>
          </TextFieldLabelContainer>
          <TextFieldInput
            size="3"
            placeholder="Choose a strong password"
            name="password"
            type="password"
            required
          />
        </TextFieldRoot>
      </Flex>
    </div>
  );
}
