import { type GetServerSidePropsContext, type NextPage } from "next";
import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import { z } from "zod";

import { getServerAuthSession } from "~/server/auth";
import { ControlledInput, Form } from "~/components/Form";
import { useRouter } from "next/router";

export interface PickupDetailsData {
  data: {
    displayName: string;
  };
}

const schema = z.object({
  displayName: z
    .string({ required_error: "A name is required." })
    .min(1, "A name is required."),
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
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container-sm flex min-w-[380px] flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center gap-2">
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={() => void signOut()}
            >
              Sign out
            </button>
          </div>
          <Form<PickupDetailsData["data"], typeof schema>
            id="oboarding-form"
            onSubmit={(values) => {
              console.log({ values });
              void router.push("/");
            }}
            options={{
              defaultValues: {
                displayName: "",
              },
              values: {
                displayName: sessionData?.user?.name || "",
              },
            }}
            className="w-full"
            schema={schema}
          >
            {({ control }) => (
              <div className="grid grid-flow-row auto-rows-max gap-y-4 py-6">
                <ControlledInput
                  type="text"
                  label="Display name"
                  controllerProps={{ name: "displayName", control }}
                  disabled
                />
                <button
                  type="submit"
                  form="oboarding-form"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Submit
                </button>
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
