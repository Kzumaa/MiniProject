import {
  TextField,
  InputAdornment,
  IconButton,
  alpha,
  useTheme,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useState, useRef, useEffect } from "react";

export default function SearchBar({
  defaultValue = "",
  onSearch,
  debounceMs = 0, // Optional debounce in ms (0 = disabled)
  placeholder = "Search…",
  variant = "outlined",
  autoFocus = false,
  sx = {},
}: {
  defaultValue?: string;
  onSearch: (q: string) => void;
  debounceMs?: number;
  placeholder?: string;
  variant?: "outlined" | "filled" | "standard";
  autoFocus?: boolean;
  sx?: Record<string, unknown>;
}) {
  const theme = useTheme();
  const [q, setQ] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);

  // Handle debounced search
  useEffect(() => {
    if (!debounceMs) return;

    // Clear any existing timer
    if (timerRef.current) window.clearTimeout(timerRef.current);

    // Set up new timer if value is not empty
    timerRef.current = window.setTimeout(() => {
      if (q !== defaultValue) onSearch(q);
    }, debounceMs);

    // Cleanup
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [q, debounceMs, onSearch, defaultValue]);

  // Handle clear button
  const handleClear = () => {
    setQ("");
    if (inputRef.current) inputRef.current.focus();
  };

  // Handle manual search trigger
  const handleSearch = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    onSearch(q);
  };

  return (
    <Box
      sx={{
        position: "relative",
        transition: theme.transitions.create(["transform", "box-shadow"]),
        ...(focused && {
          transform: "scale(1.01)",
        }),
        ...sx,
      }}
    >
      <TextField
        placeholder={placeholder}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        variant={variant}
        autoFocus={autoFocus}
        inputRef={inputRef}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ ml: 0.5 }}>
              <SearchIcon color="action" sx={{ opacity: focused ? 1 : 0.7 }} />
            </InputAdornment>
          ),
          endAdornment: q ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClear}
                sx={{
                  mr: -0.5,
                  transition: "opacity 0.2s",
                  opacity: 0.7,
                  "&:hover": { opacity: 1 },
                }}
                aria-label="clear search"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            transition: theme.transitions.create([
              "border-color",
              "background-color",
              "box-shadow",
            ]),
            "&:hover": {
              backgroundColor: theme.palette.background.paper,
              borderColor: focused
                ? theme.palette.primary.main
                : alpha(theme.palette.text.primary, 0.28),
            },
            "&.Mui-focused": {
              backgroundColor: theme.palette.background.paper,
              boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`,
            },
          },
          "& .MuiInputBase-input": {
            "&::placeholder": {
              opacity: 0.7,
              color: theme.palette.text.secondary,
            },
          },
        }}
      />
    </Box>
  );
}
