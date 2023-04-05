import { type GetServerSidePropsContext, type NextPage } from "next";
import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import { z } from "zod";

import { api } from "~/utils/api";
import { getServerAuthSession } from "~/server/auth";
import { ControlledInput, Form } from "~/components/Form";

export interface PickupDetailsData {
  data: {
    displayName: string;
  };
}

const schema = z.object({
  pickupName: z
    .string({ required_error: "A name is required." })
    .min(1, "A name is required.")
});

const Onboarding: NextPage = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined,
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <>
      <Head>
        <title>Onboarding</title>
        <meta name="description" content="Onboarding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center gap-2">
            <p className="text-center text-2xl text-white">
              {sessionData && (
                <span>Logged in as {sessionData.user?.name}</span>
              )}
            </p>
            <p className="text-center text-2xl text-white">
              {secretMessage && <span>{secretMessage}</span>}
            </p>
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={() => void signOut()}
            >
              Sign out
            </button>
          </div>
          <Form<PickupDetailsData["data"], typeof schema>
            id="oboarding-form"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onSubmit={(data, e) => {
              e?.preventDefault();
              console.log({ data });
            }}
            options={{
              defaultValues: {
                displayName: ""
              }
            }}
            className="w-full"
            schema={schema}
          >
            {({ control }) => (
              <div className="grid grid-flow-row auto-rows-max gap-y-4 py-6">
                <ControlledInput
                  type="text"
                  label="Display name"
                  placeholder="Jane Doe"
                  controllerProps={{ name: "displayName", control }}
                />
              </div>
            )}
          </Form>
        </div>
      </main>
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
