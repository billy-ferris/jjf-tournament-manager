import { type ComponentProps, type FC, forwardRef } from "react";
import classNames from "classnames";

type TextInputSizes = "sm" | "md" | "lg";
type TextInputColors = "default" | "failure";
type TextInputBoolean = {
  on: string;
  off: string;
};

interface TextInputTheme {
  base: string;
  field: {
    base: string;
    icon: {
      base: string;
      svg: string;
    };
    rightIcon: {
      base: string;
      svg: string;
    };
    input: {
      base: string;
      sizes: Record<TextInputSizes, string>;
      colors: Record<TextInputColors, string>;
      withIcon: TextInputBoolean;
      withRightIcon: TextInputBoolean;
    };
  };
}

const theme: TextInputTheme = {
  base: "flex",
  field: {
    base: "relative w-full",
    icon: {
      base: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
      svg: "h-5 w-5 text-gray-500 dark:text-gray-400",
    },
    rightIcon: {
      base: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
      svg: "h-5 w-5 text-gray-500 dark:text-gray-400",
    },
    input: {
      base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50 rounded-lg",
      sizes: {
        sm: "p-2 sm:text-xs",
        md: "p-2.5 text-sm",
        lg: "sm:text-md p-4",
      },
      colors: {
        default:
          "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500",
        failure:
          "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
      },
      withRightIcon: {
        on: "pr-10",
        off: "",
      },
      withIcon: {
        on: "pl-10",
        off: "",
      },
    },
  },
};

export interface TextInputProps
  extends Omit<ComponentProps<"input">, "ref" | "color" | "size"> {
  size?: TextInputSizes;
  icon?: FC<ComponentProps<"svg">>;
  rightIcon?: FC<ComponentProps<"svg">>;
  color?: TextInputColors;
}

/* eslint @typescript-eslint/restrict-template-expressions: "off" */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      color = "default",
      icon: Icon,
      rightIcon: RightIcon,
      size = "md",
      ...props
    },
    ref
  ) => (
    <>
      <div className={classNames(theme.base, className)}>
        <div className={theme.field.base}>
          {Icon && (
            <div className={theme.field.icon.base}>
              <Icon className={theme.field.icon.svg} />
            </div>
          )}
          {RightIcon && (
            <div
              data-testid="right-icon"
              className={theme.field.rightIcon.base}
            >
              <RightIcon className={theme.field.rightIcon.svg} />
            </div>
          )}
          <input
            className={classNames(
              theme.field.input.base,
              theme.field.input.colors[color],
              theme.field.input.withIcon[Icon ? "on" : "off"],
              theme.field.input.sizes[size]
            )}
            {...props}
            ref={ref}
          />
        </div>
      </div>
    </>
  )
);

TextInput.displayName = "TextInput";
