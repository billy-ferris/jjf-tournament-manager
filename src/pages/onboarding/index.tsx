import { useState } from "react";
import { type GetServerSidePropsContext, type NextPage } from "next";
import { z } from "zod";
import { useRouter } from "next/router";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { getServerAuthSession } from "~/server/auth";
import {
  ControlledSelectInput,
  ControlledTextInput,
  Form,
} from "~/components/Form";
import { phoneRegExp } from "~/utils/phoneRegExp";
import { Button } from "~/components/Button";
import { Avatar } from "~/components/Avatar";
import { api } from "~/utils/api";
import { ToggleSwitch } from "~/components/ToggleSwitch/ToggleSwitch";

interface UserOnboardingData {
  data: z.infer<typeof schema>;
}

const schema = z
  .object({
    id: z.string().uuid(),
    name: z
      .string({ required_error: "A name is required." })
      .min(1, "A name is required."),
    email: z
      .string()
      .min(1, "An email is required.")
      .email("The provided email is invalid."),
    phone: z
      .string()
      .min(1, "A phone number is required.")
      .regex(phoneRegExp, "The provided phone number is invalid."),
  })
  .and(
    z
      .object({
        teamId: z
          .string({ required_error: "A team is required." })
          .uuid("A team is required."),
      })
      .or(
        z.object({
          teamName: z
            .string({ required_error: "A team is required." })
            .min(1, "A team is required."),
        })
      )
  );

const Onboarding: NextPage = () => {
  const { data: session } = useSession();
  const { data: teams } = api.teams.getAll.useQuery();
  const router = useRouter();
  const ctx = api.useContext();
  const [isExistingTeamChecked, setIsExistingTeamChecked] = useState(false);

  // TODO: extract to feature api directory
  const { mutateAsync } = api.users.update.useMutation({
    // TODO: update user session object
    onSuccess: () => {
      void ctx.teams.getAll.invalidate();
      void ctx.users.invalidate();
    },
    // TODO: handle errors - Custom notification store? Toast?
    onError: (error) => console.error(error),
  });

  const handleSubmit = async (values: UserOnboardingData["data"]) => {
    console.log("user-onboarding-form", { values });
    await mutateAsync({
      ...values,
      isOnboarded: true,
    });
    void router.push("/");
  };

  if (session) {
    return (
      <>
        <Head>
          <title>Onboarding</title>
          <meta name="description" content="Onboarding" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container-sm flex min-w-[380px] flex-col justify-center gap-6 px-4 py-16">
          <Avatar img={session.user.image || undefined} size="lg" />
          <div className="text-center">
            <h1 className="pb-2 text-xl font-medium leading-tight text-gray-900 dark:text-white">
              Thanks for joining!
            </h1>
            <p className="text-base font-normal text-gray-700 dark:text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do
              eiusmod tempor.
            </p>
          </div>
          <Form<UserOnboardingData["data"], typeof schema>
            className="w-full"
            id="user-onboarding-form"
            onSubmit={handleSubmit}
            options={{
              values: {
                id: session.user.id,
                name: session.user.name || "",
                email: session.user.email || "",
                phone: "",
                teamName: "",
                teamId: "",
              },
            }}
            schema={schema}
          >
            {({ control, resetField }) => (
              <div className="grid grid-flow-row auto-rows-max gap-y-6">
                <ControlledTextInput
                  controllerProps={{ name: "name", control }}
                  disabled
                  label="Display name"
                  type="text"
                />
                <ControlledTextInput
                  controllerProps={{ name: "email", control }}
                  disabled
                  label="Email"
                  type="email"
                />
                <ControlledTextInput
                  controllerProps={{ name: "phone", control }}
                  helperText="Something about needing to contact. See our Privacy Policy."
                  label="Phone"
                  placeholder="(123) 456-7890"
                  type="text"
                />
                <ToggleSwitch
                  checked={isExistingTeamChecked}
                  label="Join existing team"
                  onChange={() => {
                    resetField(isExistingTeamChecked ? "teamName" : "teamId");
                    void setIsExistingTeamChecked(!isExistingTeamChecked);
                  }}
                />
                {isExistingTeamChecked ? (
                  // TODO: autocomplete select or sort alphabetically?
                  <ControlledSelectInput
                    controllerProps={{
                      name: "teamId",
                      control,
                      defaultValue: "",
                    }}
                    label="Team"
                    options={
                      teams?.map((team) => ({
                        label: team.name,
                        value: team.id,
                      })) || []
                    }
                    placeholder="Select your team"
                  />
                ) : (
                  <ControlledTextInput
                    controllerProps={{ name: "teamName", control }}
                    helperText="Make sure your team has not already been created before making a new team."
                    label="Team name"
                    placeholder="Enter a team name"
                    type="text"
                  />
                )}
                <Button type="submit" fullSized>
                  Looks good, continue!
                </Button>
              </div>
            )}
          </Form>
        </div>
      </>
    );
  }
  // should never reach here with SSR
  return <p>Access Denied</p>;
};

export default Onboarding;

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
