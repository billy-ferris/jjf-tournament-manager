import { type Dispatch, type SetStateAction } from "react";

export type Theme = "dark" | "light";

export type ThemeContextProps = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};
