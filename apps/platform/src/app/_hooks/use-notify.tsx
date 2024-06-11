import { toast } from "sonner";
import { NotificationCallout, NotificationCalloutProps } from "~/app/_components/Notification";

export function useNotify() {
  return (props: NotificationCalloutProps) => {
    toast.custom(() => <NotificationCallout {...props} />);
  };
}
