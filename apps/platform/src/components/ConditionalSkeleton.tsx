import { ReactNode } from "react";
import { Skeleton } from "@radix-ui/themes";
import { cn } from "@plaventi/ui/src/utils/helpers";

export function ConditionalSkeleton({
  loading,
  children,
  className,
}: {
  loading: boolean;
  children: ReactNode;
  className?: string;
}): JSX.Element {
  return loading ? <Skeleton className={cn("w-fit", className)}>{children}</Skeleton> : <>{children}</>;
}
