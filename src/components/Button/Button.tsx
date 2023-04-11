import { forwardRef, type ComponentProps, type ReactNode } from "react";
import classNames from "classnames";

type ButtonSizes = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonTheme {
  base: string;
  fullSized: string;
  colors: Record<"default", string>;
  disabled: string;
  size: Record<ButtonSizes, string>;
}

const theme: ButtonTheme = {
  base: "group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg",
  fullSized: "w-full",
  // TODO: add colors/variants
  colors: {
    default:
      "text-white bg-blue-700 border border-transparent hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 disabled:hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:disabled:hover:bg-blue-600",
  },
  disabled: "cursor-not-allowed opacity-50",
  size: {
    xs: "text-xs px-2 py-1",
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
    xl: "text-base px-6 py-3",
  },
};

export interface ButtonProps
  extends Omit<ComponentProps<"button">, "color" | "ref"> {
  fullSized?: boolean;
  href?: string;
  target?: string;
  label?: ReactNode;
  size?: ButtonSizes;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled = false,
      fullSized = false,
      size = "md",
      ...props
    },
    ref
  ) => (
    <button
      disabled={disabled}
      aria-disabled={disabled}
      className={classNames(
        disabled && theme.disabled,
        fullSized && theme.fullSized,
        theme.size[size],
        theme.base,
        theme.colors.default,
        className
      )}
      ref={ref as never}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";
