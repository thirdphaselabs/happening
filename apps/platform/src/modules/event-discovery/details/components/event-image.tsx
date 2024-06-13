import { Flex, AspectRatio } from "@radix-ui/themes";
import Image from "next/image";
import { PlaventiEvent } from "~/trpc/types";

export function EventImage({ event }: { event: PlaventiEvent }) {
  return (
    <Flex className="h-[330px] w-[330px]">
      <AspectRatio ratio={1 / 1}>
        <Image src={event.imageUrl} alt="Event" layout="fill" objectFit="cover" className="rounded-xl" />
      </AspectRatio>
    </Flex>
  );
}
