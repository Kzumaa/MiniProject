import { TextField, type TextFieldProps, useTheme, alpha } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function RHFTextField(props: TextFieldProps & { name: string }) {
  const { control } = useFormContext();
  const theme = useTheme();

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
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              transition: theme.transitions.create([
                "border-color",
                "background-color",
              ]),
              "&.Mui-focused": {
                borderColor: theme.palette.primary.main,
                // Removed boxShadow to prevent label overlap issues
              },
              "&:hover:not(.Mui-error)": {
                borderColor: theme.palette.text.primary,
              },
            },
            "& .MuiInputBase-input": {
              "&::placeholder": {
                color: alpha(theme.palette.text.secondary, 0.6),
                opacity: 1,
              },
            },
            "& .MuiInputLabel-root": {
              fontSize: "0.9rem",
              transform: "translate(14px, 14px) scale(1)",
              "&.Mui-focused, &.MuiFormLabel-filled": {
                transform: "translate(14px, -8px) scale(0.8)",
              },
            },
            ...props.sx,
          }}
          InputLabelProps={{
            shrink: field.value ? true : undefined,
            ...props.InputLabelProps,
          }}
        />
      )}
    />
  );
}
