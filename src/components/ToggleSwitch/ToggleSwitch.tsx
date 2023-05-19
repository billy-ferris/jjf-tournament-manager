import { type ComponentProps, type FC, useId } from "react";
import classNames from "classnames";
import { Switch } from "@headlessui/react";

export interface ToggleSwitchRootTheme {
  active: { on: string; off: string };
  base: string;
  checked: {
    on: string;
    off: string;
  };
  label: string;
}

export interface ToggleSwitchToggleTheme {
  base: string;
  checked: {
    on: string;
    off: string;
  };
}

export interface ToggleSwitchTheme {
  root: ToggleSwitchRootTheme;
  toggle: ToggleSwitchToggleTheme;
}

const theme: ToggleSwitchTheme = {
  root: {
    base: "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2",
    active: {
      on: "cursor-pointer",
      off: "cursor-not-allowed opacity-50",
    },
    checked: {
      on: "bg-blue-600",
      off: "bg-gray-300 dark:bg-gray-600",
    },
    label: "ml-3 text-sm font-medium text-gray-900 dark:text-gray-300",
  },
  toggle: {
    base: "pointer-events-none bg-white inline-block h-5 w-5 transform rounded-full bg-white ring-0 transition duration-200 ease-in-out",
    checked: {
      on: "bg-white translate-x-5",
      off: "translate-x-0 bg-white dark:bg-gray-400",
    },
  },
};

export type ToggleProps = Omit<ComponentProps<"button">, "onChange"> & {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
};

export const ToggleSwitch: FC<ToggleProps> = ({
  checked = false,
  className,
  disabled,
  label,
  onChange,
}) => {
  const id = useId();

  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        aria-disabled={disabled}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        className={classNames(
          theme.root.base,
          theme.root.active[disabled ? "off" : "on"],
          theme.root.checked[checked ? "on" : "off"],
          className
        )}
      >
        <span
          className={classNames(
            theme.toggle.base,
            theme.toggle.checked[checked ? "on" : "off"]
          )}
        />
      </Switch>
      <Switch.Label
        as="span"
        data-testid="toggleswitch-label"
        id={`${id}-toggleswitch-label`}
        className={theme.root.label}
      >
        {label}
      </Switch.Label>
    </Switch.Group>
  );
};
