import {
  createContext,
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
  useState,
} from "react";

export type Theme = "dark" | "light";

export type ThemeContextProps = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

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
