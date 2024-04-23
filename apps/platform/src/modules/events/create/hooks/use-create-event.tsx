import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { NotificationCallout } from "~/app/_components/Notification";
import { api } from "~/trpc/provider";
import { RouterInput } from "~/trpc/types";

type CreateEventDTO = RouterInput["event"]["create"];

export function useCreateEvent() {
  const router = useRouter();
  const { mutateAsync, isLoading, error } = api.event.create.useMutation({
    onSuccess: ({ identifier }) => {
      router.push(`/events/details/${identifier}`);
      toast.custom((id) => (
        <NotificationCallout toastId={id} message="Event has been created" type="success" />
      ));
    },
  });

  const createEvent = async (input: CreateEventDTO) => {
    return mutateAsync(input);
  };

  return {
    createEvent,
    isLoading,
    error,
  };
}
