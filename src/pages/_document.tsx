import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function Document() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    if (
      localStorage.theme !== "light" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  }, []);

  return (
    <Html lang="en" className={theme === "dark" ? "dark" : "light"}>
      <Head>
        <Script src="/theme.js" strategy="beforeInteractive" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
