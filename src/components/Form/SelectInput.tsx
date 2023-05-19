import {
  type ComponentProps,
  type FC,
  forwardRef,
  type PropsWithChildren,
} from "react";
import classNames from "classnames";

type SelectInputSizes = "sm" | "md" | "lg";
type SelectInputColors = "default" | "failure";
type SelectInputBoolean = {
  on: string;
  off: string;
};

interface SelectInputTheme {
  base: string;
  field: {
    base: string;
    icon: {
      base: string;
      svg: string;
    };
    input: {
      base: string;
      sizes: Record<SelectInputSizes, string>;
      colors: Record<SelectInputColors, string>;
      withIcon: SelectInputBoolean;
      withRightIcon: SelectInputBoolean;
    };
  };
}

const theme: SelectInputTheme = {
  base: "flex",
  field: {
    base: "relative w-full",
    icon: {
      base: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
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

export interface SelectInputProps
  extends PropsWithChildren,
    Omit<ComponentProps<"select">, "ref" | "color" | "size"> {
  size?: SelectInputSizes;
  icon?: FC<ComponentProps<"svg">>;
  color?: SelectInputColors;
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  (
    {
      children,
      className,
      color = "default",
      icon: Icon,
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
          <select
            className={classNames(
              theme.field.input.base,
              theme.field.input.colors[color],
              theme.field.input.withIcon[Icon ? "on" : "off"],
              theme.field.input.sizes[size]
            )}
            {...props}
            ref={ref}
          >
            {children}
          </select>
        </div>
      </div>
    </>
  )
);

SelectInput.displayName = "SelectInput";
