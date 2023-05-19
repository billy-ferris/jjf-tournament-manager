import { type ReactNode } from "react";
import { type FieldError } from "react-hook-form";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

import { HelperText } from "./HelperText";
import { Label } from "./Label";

type InputWrapperProps = {
  children: ReactNode;
  className?: string;
  error?: FieldError | undefined;
  helperText?: ReactNode;
  htmlFor: string;
  label: string;
};

export const InputWrapper = ({
  children,
  className = "",
  error,
  helperText,
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
    {helperText && <HelperText color="default">{helperText}</HelperText>}
    {error?.message && (
      <HelperText color="failure" aria-label={error.message}>
        {error.message}
      </HelperText>
    )}
  </div>
);
