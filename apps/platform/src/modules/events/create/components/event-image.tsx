import { ImageIcon } from "@radix-ui/react-icons";
import { AspectRatio, Flex, IconButton } from "@radix-ui/themes";
import Image from "next/image";
import { useRef } from "react";
import placeholder from "~/assets/invited-placeholder.png";
import { useEventBuilderContext } from "../context/event-builder.context";

export function EventImage() {
  const { eventDetails, setEventDetails } = useEventBuilderContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (!file) return;
    setEventDetails({
      image: file,
    });
  };

  return (
    <>
      <Flex className="h-[330px] w-[330px]">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={eventDetails?.image ? URL.createObjectURL(eventDetails.image) : placeholder}
            alt="Event"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
          <IconButton
            size="3"
            className="absolute bottom-2 right-2 z-10"
            color="gray"
            variant="surface"
            onClick={() => {
              fileInputRef.current?.click();
            }}>
            <ImageIcon height="20" width="20" />
          </IconButton>
        </AspectRatio>
      </Flex>
      <input type="file" style={{ opacity: 0 }} ref={fileInputRef} onChange={handleFileInputChange} />
    </>
  );
}
