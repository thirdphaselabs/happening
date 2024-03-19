"use client";

import { Flex, TextField } from "@radix-ui/themes";
import { useRef } from "react";
import { Button } from "ui";
import { api } from "~/trpc/provider";

export function NewExample() {
  const utils = api.useUtils();
  const ref = useRef<HTMLFormElement>(null);
  const { mutateAsync } = api.event.create.useMutation();

  return (
    <form
      ref={ref}
      onSubmit={async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const example = formData.get("example") as string | null;

        if (!example) return;

        await mutateAsync({ title: example });

        await utils.event.all.invalidate();

        if (ref.current) {
          ref.current.reset();
        }
      }}>
      <Flex>
        <TextField.Input name="example"></TextField.Input>
        <Button type="submit">Add</Button>
      </Flex>
    </form>
  );
}
