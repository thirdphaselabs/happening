import { DotsVerticalIcon, ImageIcon } from "@radix-ui/react-icons";
import { Badge, BadgeProps, Button, DropdownMenu, Flex, Heading, IconButton } from "@radix-ui/themes";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface CardRootProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const CardRoot: React.FC<CardRootProps> = ({ children, onClick }) => (
  <Flex direction="column" gap="3" onClick={onClick} className="min-h-[250px] w-full flex-grow">
    {children}
  </Flex>
);

interface CardImageProps {
  src: string | null;
  alt?: string;
  hasNoPadding?: boolean;
}

const CardImage: React.FC<CardImageProps> = ({ src, alt, hasNoPadding = false }) => {
  const padding = 6;

  return (
    <Flex
      className={clsx(
        `border-grayA3 bg-grayA2 hover:bg-skyA3 relative h-full min-h-[250px] w-full items-center justify-center overflow-hidden rounded-md  border-[1px] border-solid transition-all`,
      )}
      style={{
        padding: hasNoPadding ? 0 : `${padding}px`,
      }}>
      {src ? (
        <Image src={src} alt={alt ?? "Image"} layout="fill" objectFit="cover" />
      ) : (
        <IconButton size="4" variant="soft">
          <ImageIcon height="18" width="18" />
        </IconButton>
      )}
    </Flex>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children }) => (
  <Heading size="4" color="gray" className="flex w-full items-center justify-between">
    {children}
  </Heading>
);

interface CardActionsProps {
  children?: React.ReactNode;
  identifier: string | null;
}

const CardActions: React.FC<CardActionsProps> = ({ children, identifier }) => {
  const router = useRouter();
  return (
    <Flex gap="3">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost" color="gray">
            <DotsVerticalIcon />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item shortcut="⌘ E" onClick={() => router.push(`/events/details/${identifier}`)}>
            Edit
          </DropdownMenu.Item>
          <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
          <DropdownMenu.Separator />

          <DropdownMenu.Item>Share</DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
              <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

              <DropdownMenu.Separator />
              <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator />
          <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
            Archive
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      {children}
    </Flex>
  );
};

type CardBadgeProps = {
  children: React.ReactNode;
};

const CardBadge: React.FC<CardBadgeProps> = ({ children }) => <Flex>{children}</Flex>;

// Card Component with subcomponents
export const Card = {
  Root: CardRoot,
  Image: CardImage,
  Header: CardHeader,
  Actions: CardActions,
  Badge: CardBadge,
};
