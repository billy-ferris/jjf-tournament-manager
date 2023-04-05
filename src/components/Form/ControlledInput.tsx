import {
  type FieldPath,
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form";

import { classNames } from "~/utils/classNames";
import { InputWrapper } from "./InputWrapper";

interface ControlledInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  type: string;
  label: string;
  placeholder: string;
  controllerProps: UseControllerProps<TFieldValues, TName>;
}

export const ControlledInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  type,
  label,
  placeholder,
  controllerProps: { control, name, shouldUnregister },
}: ControlledInputProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    shouldUnregister,
  });

  return (
    <InputWrapper label={label} error={error}>
      <input
        type={type}
        ref={ref}
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        className={classNames(
          !error
            ? "border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            : "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500",
          "block w-full rounded-md sm:text-sm"
        )}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={`${name}-error`}
      />
    </InputWrapper>
  );
};
