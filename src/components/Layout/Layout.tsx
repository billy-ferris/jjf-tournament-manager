import { type FC, type ReactNode, useEffect } from "react";

import { Navigation } from "./Navigation";
import { useTheme } from "~/lib/theme";
import classNames from "classnames";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (
      localStorage.theme !== "light" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      localStorage.setItem("theme", "dark");
      setTheme && setTheme("dark");
    } else {
      localStorage.setItem("theme", "light");
      setTheme && setTheme("light");
    }
  }, [setTheme]);

  return (
    <div className={classNames(theme === "dark" && "dark", "js-theme")}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
        <Navigation />
        <main className="flex flex-col items-center justify-center">
          {children}
        </main>
      </div>
    </div>
  );
};
