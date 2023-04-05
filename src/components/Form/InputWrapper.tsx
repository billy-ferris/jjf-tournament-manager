import { type FieldError } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

import { classNames } from "~/utils/classNames";

type InputWrapperProps = {
  label: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
};

export const InputWrapper = ({
  label,
  className = "",
  error,
  children,
}: InputWrapperProps) => (
  <div>
    <label
      className={classNames(
        className,
        "block text-sm font-medium text-gray-700"
      )}
    >
      {label}
      <div className="relative mt-1">
        {children}

        {!!error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden={error ? "false" : "true"}
            />
          </div>
        )}
      </div>
    </label>
    {error?.message && (
      <p
        aria-label={error.message}
        className="mt-2 text-sm text-red-600"
        role="alert"
      >
        {error.message}
      </p>
    )}
  </div>
);
