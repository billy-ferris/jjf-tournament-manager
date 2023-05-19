import {
  type FieldPath,
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form";

import { InputWrapper } from "./InputWrapper";
import { TextInput } from "./TextInput";

interface ControlledTextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  controllerProps: UseControllerProps<TFieldValues, TName>;
  disabled?: boolean;
  helperText?: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type: string;
}

export const ControlledTextInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  controllerProps: { control, name, shouldUnregister },
  disabled = false,
  helperText,
  label,
  placeholder,
  required,
  type,
}: ControlledTextInputProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    shouldUnregister,
  });

  return (
    <InputWrapper
      htmlFor={name}
      label={label}
      helperText={helperText}
      error={error}
    >
      <TextInput
        aria-describedby={`${name}-error`}
        aria-invalid={!!error}
        color={!!error ? "failure" : "default"}
        disabled={disabled}
        id={name}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
        required={required}
        type={type}
        value={value}
      />
    </InputWrapper>
  );
};
