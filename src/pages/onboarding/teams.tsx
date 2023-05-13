import { type GetServerSidePropsContext, type NextPage } from "next";
import { type ComponentProps, type FC, useState } from "react";
import { z } from "zod";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { getServerAuthSession } from "~/server/auth";
import { Form, TextInput } from "~/components/Form";
import { ControlledRadioGroup } from "~/components/Form/ControlledRadioGroup";
import { Button } from "~/components/Button";
import { api } from "~/utils/api";

interface TeamOnboardingData {
  data: {
    userId: string;
    teamId: string;
  };
}

const schema = z.object({
  userId: z.string(),
  teamId: z.string(),
});

// const teams = [
//   {
//     id: "50c600c6-b522-485e-92be-be41f13e682d",
//     value: "Not Ya Daughta's Football Team",
//     name: "Not Ya Daughta's Football Team",
//     captain: "Jon Castagna",
//   },
// ];

const TeamOnboarding: NextPage = () => {
  const { data: session } = useSession();
  const { data: teams, isLoading } = api.teams.getAll.useQuery();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  const ctx = api.useContext();

  const filteredTeams = teams?.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // TODO: extract to feature api directory
  const { mutateAsync, isLoading: isSubmitting } = api.users.update.useMutation(
    {
      // TODO: update user session object
      onSuccess: () => void ctx.users.getOne.invalidate(),
      // TODO: handle errors - Custom notification store? Toast?
      onError: (error) => console.error(error),
    }
  );

  if (session) {
    return (
      <>
        <Head>
          <title>Find your team</title>
          <meta name="description" content="Team Onboarding" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container-sm flex min-w-[380px] flex-col gap-6 px-4 pb-24 pt-12">
          <div className="text-center">
            <h1 className="pb-2 text-xl font-medium leading-tight text-gray-900 dark:text-white">
              Great! Time to get started.
            </h1>
            <p className="text-base font-normal text-gray-700 dark:text-gray-300">
              Create a new team or request to join an existing, consectetur adip
              iscing elit, sed do tempor.
            </p>
          </div>
          <TextInput
            type="search"
            onChange={(evt) => setSearchQuery(evt.target.value)}
            icon={MagnifyingGlassIcon}
            placeholder="Search"
            disabled={!teams?.length && !isLoading}
          />
          {!filteredTeams?.length && !isLoading ? (
            <>
              <p className="text-center text-base font-normal text-gray-700 dark:text-gray-300">
                <span className="block pb-2 font-medium leading-tight text-gray-900 dark:text-white">
                  No teams
                </span>
                Create a new team or request to join an existing, consectetur
                adip iscing elit, sed do tempor.
              </p>
              <Button>Create a new team</Button>
            </>
          ) : (
            <Form<TeamOnboardingData["data"], typeof schema>
              className="w-full"
              id="team-onboarding-form"
              onSubmit={async (values) => {
                console.log("team-onboarding-form", { values });
                await mutateAsync({
                  id: values.userId,
                  teamId: values.teamId,
                });
                void router.push("/");
              }}
              options={{
                defaultValues: {
                  teamId: "",
                },
                values: {
                  userId: session.user.id,
                  teamId: "",
                },
              }}
              schema={schema}
            >
              {({ control }) => (
                <>
                  {/* TODO: Add renderInput prop for custom radio components for types benefit */}
                  <ControlledRadioGroup
                    controllerProps={{ name: "teamId", control }}
                    label="Choose a team"
                    options={filteredTeams || []}
                  />
                </>
              )}
            </Form>
          )}
        </div>
        <BottomNavigation isSubmitting={isSubmitting} />
      </>
    );
  }
  // should never reach here with SSR
  return <p>Access Denied</p>;
};

export default TeamOnboarding;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

const BottomNavigation: FC<{ isSubmitting: boolean }> = ({ isSubmitting }) => {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 flex w-full justify-between gap-2 border-t border-white bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
      <Button
        className="flex-1"
        disabled={isSubmitting}
        onClick={() => void router.push("/")}
        variant="secondary"
      >
        Skip
      </Button>
      <Button disabled={isSubmitting} form="team-onboarding-form" type="submit">
        Send request and continue
      </Button>
    </div>
  );
};

// TODO: Extract to an icons directory
const MagnifyingGlassIcon: FC<ComponentProps<"svg">> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
      clipRule="evenodd"
    />
  </svg>
);
