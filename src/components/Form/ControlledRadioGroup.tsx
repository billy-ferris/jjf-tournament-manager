import { RadioGroup } from "@headlessui/react";
import {
  type FieldPath,
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form";
import classNames from "classnames";

// TODO: add generic to extend options type
interface ControlledRadioGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  controllerProps: UseControllerProps<TFieldValues, TName>;
  label: string;
  options: { id: string; name: string }[];
}

const theme = {
  base: "flex h-full gap-4 rounded-lg border border-gray-300 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800",
  state: {
    checked: "border-purple-600 dark:border-blue-700 dark:bg-blue-700",
  },
};

export const ControlledRadioGroup = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  controllerProps: { name, control },
  label,
  options,
}: ControlledRadioGroupProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value, ref },
  } = useController({ name, control });

  return (
    <RadioGroup
      onChange={onChange}
      value={value}
      className="grid grid-flow-row auto-rows-max gap-y-3"
      ref={ref}
    >
      <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
      {options.map((option) => (
        // TODO: Extract out option component
        <RadioGroup.Option
          key={option.id}
          value={option.id}
          className={({ checked }) =>
            classNames(checked && theme.state.checked, theme.base)
          }
        >
          <div className="flex flex-col gap-y-0.5">
            <RadioGroup.Label
              className="text-sm font-semibold leading-tight text-black dark:text-white"
              as="span"
            >
              {option.name}
            </RadioGroup.Label>
          </div>
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
};
