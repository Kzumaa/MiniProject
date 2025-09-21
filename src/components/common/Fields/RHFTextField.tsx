import { TextField, type TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function RHFTextField(props: TextFieldProps & { name: string }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...props}
          {...field}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          fullWidth
        />
      )}
    />
  );
}
