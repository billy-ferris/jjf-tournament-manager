import type { FC, ReactNode } from "react";
import { Navigation } from "~/components/Layout/Navigation";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navigation />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
        {children}
      </main>
    </div>
  );
};
