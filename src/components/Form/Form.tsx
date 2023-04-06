import {
  useForm,
  type UseFormReturn,
  type SubmitHandler,
  type UseFormProps,
  type FieldValues,
} from "react-hook-form";
import { type ZodType, type ZodTypeDef } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormProps<TFormValues extends FieldValues, Schema> = {
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  className?: string;
  id?: string;
  onSubmit: SubmitHandler<TFormValues>;
  options?: UseFormProps<TFormValues>;
  schema?: Schema;
};

export const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<
    unknown,
    ZodTypeDef,
    unknown
  >
>({
  children,
  className = "",
  id,
  onSubmit,
  options,
  schema,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema && zodResolver(schema),
  });

  return (
    <form
      className={className}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={methods.handleSubmit(onSubmit)}
      id={id}
    >
      {children(methods)}
    </form>
  );
};
