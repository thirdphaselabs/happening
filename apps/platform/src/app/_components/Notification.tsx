import { CheckCircledIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";

export type NotificationCalloutProps = {
  type: "success" | "error" | "info";
  message: string;
};

export function NotificationCallout({ type, message }: NotificationCalloutProps) {
  const { color, backgroundColor } = getNotificationStyles(type);
  return (
    <Callout.Root
      color={color}
      className="z-100 w-full"
      style={{
        backgroundColor,
      }}>
      <Callout.Icon>{type === "success" ? <CheckCircledIcon /> : <ExclamationTriangleIcon />}</Callout.Icon>
      <Callout.Text>{message}</Callout.Text>
    </Callout.Root>
  );
}

function getNotificationStyles(type: "success" | "error" | "info") {
  switch (type) {
    case "success":
      return {
        color: "green",
        backgroundColor: "var(--green-3)",
      } as const;
    case "error":
      return {
        color: "red",
        backgroundColor: "var(--red-3)",
      } as const;
    case "info":
      return {
        color: "blue",
        backgroundColor: "var(--blue-3)",
      } as const;
  }
}
