import { Button } from "@plaventi/ui";
import { ArrowTopRightIcon, CaretRightIcon, GlobeIcon } from "@radix-ui/react-icons";
import { Avatar, Box, Container, Flex, Heading, IconButton, Link, Tooltip } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { getSession } from "~/app/actions";
import { buildOrganizationFallbackInitials } from "~/lib/utils";
import { serverClient } from "~/trpc/server";
import { PageParams } from "~/trpc/types";
import { isString } from "~/utils/helpers";
import { EventDetailsNav } from "../event-management/details/components/event-details-nav";
import { ManageTeamNav } from "./components/manage-team-nav";
import { TeamManagementContextProvider } from "./context/team-management.context";

export async function TeamManagementLayout({
  children,
  params: { identifier },
}: PageParams<"identifier"> & { children: React.ReactNode }) {
  const session = await getSession({ ensureSignedIn: true });
  if (!identifier || !isString(identifier)) return notFound();
  if (session.profile.team?.identifier !== identifier) return notFound();

  return (
    <TeamManagementContextProvider team={session.profile.team}>
      <Flex direction="column" gap="3" mt="6" mb="6" className="w-full">
        <Container size="2">
          <Flex className="w-full" justify="between" align="center" gap="6">
            <Heading size="8" className="flex items-center gap-3">
              <Tooltip content="This event is public and available in discovery." side="top" align="center">
                <Avatar
                  size="2"
                  src="https://ik.imagekit.io/tplabs/01da8ea2-b85a-4ac9-8b56-049caacd780d_BXcxqdE4u.jpg?updatedAt=1718207085921"
                  fallback={buildOrganizationFallbackInitials({ name: session.profile.team.name })}
                />
              </Tooltip>
              {session.profile.team.name}
            </Heading>
            <Flex>
              <Link href={`/host/${session.profile.team.identifier}`}>
                <Button color="gray" variant="soft" className="text-nowrap no-underline">
                  <ArrowTopRightIcon />
                  Public Host Page
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Container>
        <Flex direction="column" className="w-full" gap="6">
          <ManageTeamNav identifier={identifier} />

          <Container size="2">
            <Box>{children}</Box>
          </Container>
        </Flex>
      </Flex>
    </TeamManagementContextProvider>
  );
}
