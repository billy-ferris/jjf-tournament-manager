import { type FC, type ReactNode, useEffect } from "react";

import { Navigation } from "./Navigation";
import { useTheme } from "~/lib/theme";
import { classNames } from "~/utils/classNames";

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
    <div className={classNames(theme === "dark" ? "dark" : "", "js-theme")}>
      <Navigation />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
        {children}
      </main>
    </div>
  );
};
