import {
  type FieldPath,
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form";

import { InputWrapper } from "./InputWrapper";
import { SelectInput } from "./SelectInput";

type SelectOption = {
  label: string;
  value: string | number;
};

interface ControlledSelectInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  controllerProps: UseControllerProps<TFieldValues, TName>;
  disabled?: boolean;
  helperText?: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
}

export const ControlledSelectInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  controllerProps: { control, name, shouldUnregister },
  disabled = false,
  helperText,
  label,
  options,
  placeholder,
  required,
}: ControlledSelectInputProps<TFieldValues, TName>) => {
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
      <SelectInput
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
        value={value}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(({ label, value }, idx) => (
          <option key={`${idx}-${label}`} value={value}>
            {label}
          </option>
        ))}
      </SelectInput>
    </InputWrapper>
  );
};
