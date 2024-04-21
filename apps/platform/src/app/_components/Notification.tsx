import { Button } from "@plaventi/ui";
import {
  CheckCircledIcon,
  Cross1Icon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";
import { toast } from "sonner";

export function NotificationCallout({
  type,
  message,
  toastId,
  dismissable = false,
  action,
}: {
  type: "success" | "error" | "info";
  message: string;
  toastId: string | number;
  dismissable?: boolean;
  action?: { text: string; action: () => void };
}) {
  const { backgroundColor, color } = getColours(type);
  return (
    <Callout.Root
      color={color}
      variant="soft"
      className="z-10 flex h-[45px] w-full items-center justify-between"
      style={{
        backgroundColor,
      }}>
      <Callout.Icon>
        <Icon type={type} />
      </Callout.Icon>
      <Callout.Text>{message}</Callout.Text>
      {action && (
        <Button
          size="1"
          className="ml-2"
          onClick={() => {
            action.action();
            toast.dismiss(toastId);
          }}>
          {action.text}
        </Button>
      )}
      {dismissable && (
        <Cross1Icon
          className="cursor-pointer"
          height="14"
          width="12"
          onClick={() => {
            toast.dismiss(toastId);
          }}
        />
      )}
    </Callout.Root>
  );
}

function getColours(type: "success" | "error" | "info") {
  switch (type) {
    case "success":
      return {
        backgroundColor: "var(--green-3)",
        color: "green",
      } as const;
    case "error":
      return {
        backgroundColor: "var(--red-3)",
        color: "red",
      } as const;
    default:
      return {
        backgroundColor: "var(--blue-3)",
        color: "sky",
      } as const;
  }
}

function Icon({ type }: { type: "success" | "error" | "info" }) {
  switch (type) {
    case "success":
      return <CheckCircledIcon />;
    case "error":
      return <ExclamationTriangleIcon />;
    default:
      return <InfoCircledIcon />;
  }
}
