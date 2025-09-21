import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export default function SearchBar({
  defaultValue = "",
  onSearch,
}: {
  defaultValue?: string;
  onSearch: (q: string) => void;
}) {
  const [q, setQ] = useState(defaultValue);
  return (
    <TextField
      placeholder="Search…"
      value={q}
      onChange={(e) => setQ(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSearch(q)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => onSearch(q)}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
    />
  );
}
