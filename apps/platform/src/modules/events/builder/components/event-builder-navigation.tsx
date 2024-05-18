"use client";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Container, Flex, Separator, Spinner } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEventBuilderContext } from "../context/event-builder.context";
import Link from "next/link";

export function EventBuilderNavigation() {
  const { stage, isLoading, setIsLoading, nextStage } = useEventBuilderContext();
  const router = useRouter();

  return (
    <Flex position="fixed" bottom="0" width="100%" className="h-[90px]">
      <Separator className="absolute top-0 w-full" />
      <Flex height="100%" width="100%">
        <Container size="3" height="100%" px={{ initial: "4", md: "0" }}>
          <Flex height="100%" width="100%" justify="between" align="center">
            <Button size="3" color="gray" variant="soft" disabled={!stage.previous}>
              Back
            </Button>
            <Link href={`/event-builder/${stage.next}`} prefetch>
              <Button
                size="3"
                disabled={!stage.next || !stage.isCurrentStageComplete || isLoading}
                onClick={() => {
                  nextStage();
                }}>
                Continue
                <Spinner loading={isLoading}>
                  <ArrowRightIcon />
                </Spinner>
              </Button>
            </Link>
          </Flex>
        </Container>
      </Flex>
    </Flex>
  );
}
