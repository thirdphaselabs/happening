import { Badge, BadgeProps, Flex, Heading } from "@radix-ui/themes";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface CardRootProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const CardRoot: React.FC<CardRootProps> = ({ children, onClick }) => (
  <Flex direction="column" gap="3" onClick={onClick}>
    {children}
  </Flex>
);

interface CardImageProps {
  src: string;
  alt: string;
  hasNoPadding?: boolean;
}

const CardImage: React.FC<CardImageProps> = ({ src, alt, hasNoPadding = false }) => {
  const cardHeight = 188;
  const cardWidth = 342;
  const padding = 6;
  const imageHeight = cardHeight - padding * 2;
  const imageWidth = cardWidth - padding * 2;
  return (
    <Flex
      className={clsx(
        `border-grayA3 bg-grayA2 hover:bg-skyA3 relative rounded-md border-[1px] border-solid transition-all`,
      )}
      style={{
        height: `${cardHeight}px`,
        width: `${cardWidth}px`,
        padding: hasNoPadding ? 0 : `${padding}px`,
      }}>
      <Flex
        className="relative overflow-hidden rounded-sm"
        style={{
          height: hasNoPadding ? cardHeight : `${imageHeight}px`,
          width: hasNoPadding ? cardWidth : `${imageWidth}px`,
        }}>
        <Image src={src} alt={alt} layout="fill" />
      </Flex>
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
  children: React.ReactNode;
}

const CardActions: React.FC<CardActionsProps> = ({ children }) => <Flex gap="3">{children}</Flex>;

type CardBadgeProps = {
  children: React.ReactNode;
} & BadgeProps;

const CardBadge: React.FC<CardBadgeProps> = ({ children, ...rest }) => (
  <Flex>
    <Badge {...rest}>{children}</Badge>
  </Flex>
);

// Card Component with subcomponents
export const Card = {
  Root: CardRoot,
  Image: CardImage,
  Header: CardHeader,
  Actions: CardActions,
  Badge: CardBadge,
};
