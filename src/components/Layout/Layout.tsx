import type { FC, ReactNode } from "react";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
        {children}
      </main>
    </>
  );
};
