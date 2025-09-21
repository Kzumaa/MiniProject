import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectProps,
  FormHelperText,
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
  const id = `label-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth error={!!fieldState.error}>
          <InputLabel id={id}>{label}</InputLabel>
          <Select labelId={id} label={label} {...field} {...rest}>
            {options.map((op) => (
              <MenuItem key={op.value} value={op.value}>
                {op.label}
              </MenuItem>
            ))}
          </Select>
          {!!fieldState.error && (
            <FormHelperText>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
