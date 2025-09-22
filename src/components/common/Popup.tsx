import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  type DialogProps,
  useTheme,
  useMediaQuery,
  Box,
  DialogContentText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export type PopupProps = {
  open: boolean;
  title?: React.ReactNode;
  onClose: () => void;

  children?: React.ReactNode; // form or detail content
  actions?: React.ReactNode; // footer actions (optional)

  maxWidth?: DialogProps["maxWidth"]; // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  fullWidth?: boolean;
  fullScreen?: boolean;
  responsiveFullScreen?: boolean; // auto FS on small screens
  scroll?: DialogProps["scroll"]; // 'paper' | 'body'
  keepMounted?: boolean;

  showCloseIcon?: boolean;
  disableBackdropClose?: boolean;
  disableEscapeKeyDown?: boolean;

  /** MUI v7 slot API (replaces deprecated PaperProps, etc.) */
  slotProps?: DialogProps["slotProps"];
  slots?: DialogProps["slots"];

  /** Props for child components we render ourselves (not deprecated) */
  contentProps?: React.ComponentProps<typeof DialogContent>;
  actionsProps?: React.ComponentProps<typeof DialogActions>;
  titleProps?: React.ComponentProps<typeof DialogTitle>;

  descriptionText?: string;
  loading?: boolean;
};

export default function Popup({
  open,
  title,
  onClose,

  children,
  actions,

  maxWidth = "sm",
  fullWidth = true,
  fullScreen,
  responsiveFullScreen = true,
  scroll = "paper",
  keepMounted,

  showCloseIcon = true,
  disableBackdropClose,
  disableEscapeKeyDown,

  slotProps,
  slots,

  contentProps,
  actionsProps,
  titleProps,

  descriptionText,
  loading,
}: PopupProps) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const computedFullScreen = fullScreen ?? (responsiveFullScreen && isXs);

  const handleClose = (
    _e: object,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    if (loading) return;
    if (disableBackdropClose && reason === "backdropClick") return;
    if (disableEscapeKeyDown && reason === "escapeKeyDown") return;
    onClose();
  };

  const titleId = React.useId();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby={title ? titleId : undefined}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={computedFullScreen}
      scroll={scroll}
      keepMounted={keepMounted}
      slotProps={slotProps}
      slots={slots}
    >
      {(title || showCloseIcon) && (
        <DialogTitle
          id={titleId}
          {...titleProps}
          sx={{ pr: showCloseIcon ? 6 : undefined }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Box flex={1}>{title}</Box>
            {showCloseIcon && (
              <IconButton
                aria-label="close"
                onClick={() => !loading && onClose()}
                edge="end"
                disabled={!!loading}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>
          {descriptionText && (
            <DialogContentText sx={{ mt: 1 }} component="div">
              {descriptionText}
            </DialogContentText>
          )}
        </DialogTitle>
      )}

      <DialogContent
        sx={{
          // Override MUI's default style that sets padding-top to 0
          ".MuiDialogTitle-root + &": {
            paddingTop: 2,
          },
          ...(contentProps?.sx || {}),
        }}
        {...contentProps}
      >
        {children}
      </DialogContent>

      {actions && <DialogActions {...actionsProps}>{actions}</DialogActions>}
    </Dialog>
  );
}
