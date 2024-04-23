import { Badge } from "@radix-ui/themes";
import { PlaventiEvent } from "~/trpc/types";

export function EventStatusBadge({ status }: { status: PlaventiEvent["status"] }) {
  switch (status) {
    case "DRAFT":
      return <Badge color="gray">Draft</Badge>;
    case "ACTIVE":
      return <Badge color="green">Published</Badge>;
    case "CANCELLED":
      return <Badge color="red">Archived</Badge>;
    case "PAST":
      return <Badge color="gray">Past</Badge>;
    case "SOLD_OUT":
      return <Badge color="blue">Sold out</Badge>;
  }
}
