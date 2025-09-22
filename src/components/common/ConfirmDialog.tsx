import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useTheme,
  alpha,
  Box,
  Fade,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function ConfirmDialog({
  open,
  title = "Confirm",
  message,
  onCancel,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: {
  open: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}) {
  const theme = useTheme();
  const errorColor = theme.palette.error.main;

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
      PaperProps={{
        sx: {
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: theme.shadows[10],
        },
      }}
      slotProps={{
        backdrop: {
          sx: { backdropFilter: "blur(4px)" },
        },
      }}
    >
      <DialogTitle
        sx={{
          p: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          borderBottom: "1px solid",
          borderColor: alpha(theme.palette.divider, 0.7),
        }}
      >
        <Box
          sx={{
            display: "flex",
            p: 1,
            borderRadius: "50%",
            backgroundColor: alpha(errorColor, 0.1),
          }}
        >
          <WarningAmberIcon sx={{ color: errorColor }} />
        </Box>
        <Box sx={{ fontWeight: 500 }}>{title}</Box>
      </DialogTitle>
      {!!message && (
        <DialogContent sx={{ pt: 3, px: 3, pb: 2 }}>
          <DialogContentText
            sx={{ color: alpha(theme.palette.text.primary, 0.8) }}
          >
            {message}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid",
          borderColor: alpha(theme.palette.divider, 0.7),
          backgroundColor: alpha(theme.palette.background.default, 0.6),
        }}
      >
        <Button
          onClick={onCancel}
          variant="outlined"
          color="inherit"
          sx={{
            borderColor: "divider",
            "&:hover": {
              borderColor: "text.primary",
              backgroundColor: alpha(theme.palette.text.primary, 0.04),
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          sx={{
            boxShadow: "none",
            ml: 1,
            fontWeight: 500,
            "&:hover": {
              boxShadow: "none",
              backgroundColor: alpha(errorColor, 0.9),
            },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
