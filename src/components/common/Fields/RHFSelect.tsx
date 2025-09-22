import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectProps,
  FormHelperText,
  useTheme,
  alpha,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Option = { value: string | number; label: string };

export default function RHFSelect({
  name,
  label,
  options,
  ...rest
}: SelectProps & { name: string; label: string; options: Option[] }) {
  const { control } = useFormContext();
  const theme = useTheme();
  const id = `label-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl
          fullWidth
          error={!!fieldState.error}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              transition: theme.transitions.create(["border-color"]),
              "&.Mui-focused": {
                borderColor: theme.palette.primary.main,
                // Removed boxShadow to prevent label overlap issues
              },
              "&:hover:not(.Mui-error)": {
                borderColor: theme.palette.text.primary,
              },
            },
            "& .MuiInputLabel-root": {
              fontSize: "0.9rem",
            },
            ...(rest.sx || {}),
          }}
        >
          <InputLabel
            id={id}
            sx={{
              transform: "translate(14px, 14px) scale(1)",
              "&.Mui-focused, &.MuiFormLabel-filled": {
                transform: "translate(14px, -8px) scale(0.8)",
              },
            }}
          >
            {label}
          </InputLabel>
          <Select
            labelId={id}
            label={label}
            {...field}
            {...rest}
            MenuProps={{
              PaperProps: {
                sx: {
                  borderRadius: "8px",
                  boxShadow: theme.shadows[4],
                  mt: 1,
                },
              },
              ...rest.MenuProps,
            }}
          >
            {options.map((op) => (
              <MenuItem
                key={op.value}
                value={op.value}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.15),
                    },
                  },
                }}
              >
                {op.label}
              </MenuItem>
            ))}
          </Select>
          {!!fieldState.error && (
            <FormHelperText sx={{ mx: 1.5 }}>
              {fieldState.error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
