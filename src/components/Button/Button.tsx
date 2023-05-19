import { forwardRef, type ComponentProps, type ReactNode } from "react";
import classNames from "classnames";

type ButtonSizes = "sm" | "md" | "lg";
type ButtonVariants = "primary" | "secondary";

interface ButtonTheme {
  base: string;
  fullSized: string;
  variants: Record<ButtonVariants, string>;
  disabled: string;
  size: Record<ButtonSizes, string>;
}

const theme: ButtonTheme = {
  base: "group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg",
  fullSized: "w-full",
  // TODO: add colors/variants
  variants: {
    primary:
      "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 disabled:hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:disabled:hover:bg-blue-600",
    secondary:
      "text-gray-400 bg-transparent border border-gray-400 dark:border-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 disabled:hover:bg-transparent dark:hover:bg-gray-700 dark:focus:ring-gray-700",
  },
  disabled: "cursor-not-allowed opacity-50",
  size: {
    sm: "text-sm px-4 py-2",
    md: "text-base px-5 py-2.5",
    lg: "text-base px-6 py-3",
  },
};

export interface ButtonProps
  extends Omit<ComponentProps<"button">, "color" | "ref"> {
  fullSized?: boolean;
  href?: string;
  target?: string;
  label?: ReactNode;
  size?: ButtonSizes;
  variant?: ButtonVariants;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled = false,
      fullSized = false,
      size = "md",
      variant = "primary",
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
        theme.variants[variant],
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
