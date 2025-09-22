import { Box, Typography, Link, useTheme, alpha, Divider } from "@mui/material";

export default function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box>
      <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.6) }} />
      <Box
        sx={{
          py: 2.5,
          px: 3,
          textAlign: "center",
          color: alpha(theme.palette.text.secondary, 0.8),
          backgroundImage: `linear-gradient(180deg, transparent, ${alpha(
            theme.palette.background.default,
            0.05
          )})`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: 1, sm: 2 },
            mb: 1.5,
          }}
        >
          <Link
            href="#"
            underline="hover"
            sx={{
              color: "inherit",
              fontSize: "0.85rem",
              transition: "color 0.2s",
              "&:hover": { color: theme.palette.primary.main },
            }}
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            underline="hover"
            sx={{
              color: "inherit",
              fontSize: "0.85rem",
              transition: "color 0.2s",
              "&:hover": { color: theme.palette.primary.main },
            }}
          >
            Terms of Use
          </Link>
          <Link
            href="#"
            underline="hover"
            sx={{
              color: "inherit",
              fontSize: "0.85rem",
              transition: "color 0.2s",
              "&:hover": { color: theme.palette.primary.main },
            }}
          >
            Contact Support
          </Link>
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.8rem",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          © {currentYear} Mentor–Mentee Portal. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
