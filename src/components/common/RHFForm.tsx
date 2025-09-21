import {
  FormProvider,
  type UseFormReturn,
  type FieldValues,
} from "react-hook-form";

export default function RHFForm<T extends FieldValues>({
  methods,
  onSubmit,
  children,
}: {
  methods: UseFormReturn<T>;
  onSubmit: (values: T) => void | Promise<void>;
  children: React.ReactNode;
}) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
