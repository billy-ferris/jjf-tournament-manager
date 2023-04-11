import { type GetServerSidePropsContext, type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useRouter } from "next/router";

import { getServerAuthSession } from "~/server/auth";
import { ControlledInput, Form } from "~/components/Form";
import { phoneRegExp } from "~/utils/phoneRegExp";
import { Button } from "~/components/Button";
import { Avatar } from "~/components/Avatar";

export interface UserOnboardingData {
  data: {
    name: string;
    email: string;
    phone: string;
  };
}

const schema = z.object({
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
});

const Onboarding: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Onboarding</title>
        <meta name="description" content="Onboarding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container-sm flex min-w-[380px] flex-col justify-center gap-6 px-4 py-16">
        <Avatar img={sessionData?.user?.image || undefined} size="lg" />
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
          id="oboarding-form"
          onSubmit={(values) => {
            console.log({ values });
            void router.push("/");
          }}
          options={{
            defaultValues: {
              name: "",
              email: "",
              phone: "",
            },
            values: {
              name: sessionData?.user?.name || "",
              email: sessionData?.user?.email || "",
              phone: "",
            },
          }}
          schema={schema}
        >
          {({ control }) => (
            <div className="grid grid-flow-row auto-rows-max gap-y-6">
              <ControlledInput
                controllerProps={{ name: "name", control }}
                disabled
                label="Display name"
                type="text"
              />
              <ControlledInput
                controllerProps={{ name: "email", control }}
                disabled
                label="Email"
                type="email"
              />
              <ControlledInput
                controllerProps={{ name: "phone", control }}
                helperText="Something about needing to contact. See our Privacy Policy."
                label="Phone"
                placeholder="(123) 456-7890"
                type="text"
              />
              <Button type="submit" fullSized>
                Looks good, continue!
              </Button>
            </div>
          )}
        </Form>
      </div>
    </>
  );
};

export default Onboarding;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
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
}
