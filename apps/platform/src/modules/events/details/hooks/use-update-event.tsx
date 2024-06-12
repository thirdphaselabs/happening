import { toast } from "sonner";
import { NotificationCallout } from "~/app/_components/Notification";
import { api } from "~/trpc/provider";
import { RouterInput } from "~/trpc/types";

type UpdateEventDTO = RouterInput["event"]["update"];

export function useUpdateEvent() {
  const utils = api.useUtils();
  const invalidate = (identifier: string) => utils.event.byIdentifier.invalidate({ identifier });

  const { mutateAsync, isLoading, error } = api.event.update.useMutation({
    onMutate: (values) => {
      const existing = utils.event.byIdentifier.getData({ identifier: values.identifier });
      if (!existing) return;
      utils.event.byIdentifier.setData({ identifier: values.identifier }, { ...existing, ...values });
    },
    onSuccess: ({ identifier }) => {
      invalidate(identifier);
    },
    onError: (error, { identifier }) => {
      toast.custom((id) => <NotificationCallout message={error.message} type="error" />);
      invalidate(identifier);
    },
  });

  const updateEvent = async (input: UpdateEventDTO) => {
    return mutateAsync(input);
  };

  return {
    updateEvent,
    isLoading,
    error,
  };
}
