import { Separator as Base, SeparatorProps } from "@radix-ui/themes";
import clsx from "clsx";

export function Separator(props: { fit?: boolean } & SeparatorProps) {
  return (
    <Base
      {...props}
      className={clsx(`bg-grayA3 ${props.className}`, {
        "w-full": !props.fit && props.orientation === "horizontal",
        "h-full": !props.fit && props.orientation === "vertical",
      })}
    />
  );
}
