import { Separator as Base, SeparatorProps } from "@radix-ui/themes";
import clsx from "clsx";

export function Separator(props: { fit?: boolean } & SeparatorProps) {
  return (
    <Base
      {...props}
      className={clsx("bg-grayA4", {
        "w-full": !props.fit && props.orientation === "horizontal",
        "h-full": !props.fit && props.orientation === "vertical",
      })}
    />
  );
}
