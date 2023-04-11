import { type FC } from "react";
import { Dropdown, Navbar } from "flowbite-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

import { useTheme } from "~/lib/theme";

export const Navigation: FC = () => {
  const { data: sessionData, status } = useSession();
  const isLoading = status === "loading";

  return (
    <Navbar
      fluid={true}
      theme={{
        base: "absolute w-full bg-white px-5 py-5 dark:bg-gray-900",
      }}
    >
      <Navbar.Brand href="/">
        <Image
          src="https://flowbite.com/docs/images/logo.svg"
          alt="Flowbite Logo"
          width={32}
          height={32}
        />
      </Navbar.Brand>
      <div className="flex items-center gap-x-4 md:order-2">
        {sessionData?.user && !isLoading && (
          <>
            {/* TODO: Add placeholder as fallback */}
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Image
                  alt="User settings"
                  className="rounded-full"
                  referrerPolicy="no-referrer"
                  src={sessionData.user.image || ""}
                  height={32}
                  width={32}
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
        <ThemeToggle />
      </div>
    </Navbar>
  );
};

const ThemeToggle: FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme && setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="flex justify-center rounded-full border border-transparent p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-100 focus:outline-none active:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 dark:focus:bg-gray-800"
    >
      {theme === "dark" ? (
        <SunIcon className="w-5" />
      ) : (
        <MoonIcon className="w-5" />
      )}
    </button>
  );
};
