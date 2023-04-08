import {
  type FieldPath,
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form";

import { InputWrapper } from "./InputWrapper";
import { TextInput } from "flowbite-react";

interface ControlledInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  controllerProps: UseControllerProps<TFieldValues, TName>;
  disabled?: boolean;
  helperText?: string;
  label: string;
  placeholder?: string;
  type: string;
}

export const ControlledInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  controllerProps: { control, name, shouldUnregister },
  disabled = false,
  helperText,
  label,
  placeholder,
  type,
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
    <InputWrapper htmlFor={name} label={label} error={error}>
      <TextInput
        aria-describedby={`${name}-error`}
        aria-invalid={!!error}
        color={!!error ? "failure" : "gray"}
        disabled={disabled}
        id={name}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
        type={type}
        value={value}
        helperText={helperText}
      />
    </InputWrapper>
  );
};
