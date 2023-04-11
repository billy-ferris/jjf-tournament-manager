import { createContext, type FC, type ReactNode, useState } from "react";
import { type Theme, type ThemeContextProps } from "./types";

export const ThemeContext = createContext<Partial<ThemeContextProps>>({});

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // TODO: prevent flicker of navigation toggle on page render (when default set to "light")
  const [theme, setTheme] = useState<Theme>("dark");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
