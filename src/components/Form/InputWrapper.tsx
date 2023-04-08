import { type FieldError } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Label } from "flowbite-react";

type InputWrapperProps = {
  children: React.ReactNode;
  className?: string;
  error?: FieldError | undefined;
  htmlFor: string;
  label: string;
};

export const InputWrapper = ({
  children,
  className = "",
  error,
  htmlFor,
  label,
}: InputWrapperProps) => (
  <div>
    <Label className={className} htmlFor={htmlFor} value={label} />
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
