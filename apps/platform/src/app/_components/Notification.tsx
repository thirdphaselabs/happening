import { CheckCircledIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";

export function NotificationCallout({ type, message }: { type: "success" | "error"; message: string }) {
  return (
    <Callout.Root
      color={type === "success" ? "green" : "red"}
      className="z-10 w-full"
      style={{
        backgroundColor: type === "success" ? "var(--green-3)" : "var(--red-3)",
      }}>
      <Callout.Icon>{type === "success" ? <CheckCircledIcon /> : <ExclamationTriangleIcon />}</Callout.Icon>
      <Callout.Text>{message}</Callout.Text>
    </Callout.Root>
  );
}
