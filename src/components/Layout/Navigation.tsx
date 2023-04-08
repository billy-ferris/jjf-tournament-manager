import { type FC } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { MoonIcon } from "@heroicons/react/24/solid";

export const Navigation: FC = () => {
  const { data: sessionData, status } = useSession();
  const isLoading = status === "loading";

  return (
    <Navbar
      fluid={true}
      theme={{
        base: "absolute w-full bg-white px-5 py-6 dark:bg-gray-900",
      }}
    >
      <Navbar.Brand href="/">
        <Image
          src="https://flowbite.com/docs/images/logo.svg"
          alt="Flowbite Logo"
          width="32"
          height="32"
        />
      </Navbar.Brand>
      <div className="flex items-center gap-x-4 md:order-2">
        <button>
          <MoonIcon className="w-6 text-gray-400" />
        </button>
        {sessionData?.user && !isLoading && (
          <>
            {/* TODO: Add placeholder as fallback */}
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Avatar
                  alt="User settings"
                  img={sessionData.user.image || ""}
                  rounded={true}
                  size={"sm"}
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{sessionData.user.name}</span>
                <span className="block truncate text-sm font-medium">
                  {sessionData.user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={() => void signOut()}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </>
        )}
      </div>
    </Navbar>
  );
};
