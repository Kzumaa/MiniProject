import * as React from "react";
import {
  Button,
  Stack,
  DialogActions,
  CircularProgress,
  Box,
  useTheme,
  alpha,
  Typography,
} from "@mui/material";
import {
  FormProvider,
  type UseFormReturn,
  type FieldValues,
} from "react-hook-form";
import Popup, { type PopupProps } from "./Popup";

export type FormDialogProps<T extends FieldValues> = Omit<
  PopupProps,
  "actions" | "onClose"
> & {
  methods: UseFormReturn<T>;
  onSubmit: (values: T) => void | Promise<void>;
  onClose: () => void;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;

  placeActionsInsideForm?: boolean;

  actions?: React.ReactNode;

  submitting?: boolean;
  renderButtonsBefore?: React.ReactNode;
  children?: React.ReactNode;
};

export default function FormDialog<T extends FieldValues>({
  methods,
  onSubmit,
  onClose,
  onCancel,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  actions,
  submitting,
  renderButtonsBefore,
  placeActionsInsideForm = true,
  children,
  ...popupProps
}: FormDialogProps<T>) {
  const _onCancel = onCancel ?? onClose;

  // When actions are placed inside the form, we don't pass Popup.actions,
  // and we render <DialogActions> inside the form instead.
  const theme = useTheme();
  const accentColor = theme.palette.primary.main;

  const popupActions = placeActionsInsideForm
    ? undefined
    : actions ?? (
        <Stack direction="row" spacing={2}>
          {renderButtonsBefore}
          <Button
            onClick={_onCancel}
            variant="outlined"
            color="inherit"
            disabled={!!submitting}
            sx={{
              borderColor: "divider",
              "&:hover": {
                borderColor: "text.primary",
                backgroundColor: alpha(theme.palette.text.primary, 0.04),
              },
            }}
          >
            {cancelLabel}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!!submitting}
            sx={{
              position: "relative",
              fontWeight: 500,
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
                backgroundColor: alpha(accentColor, 0.9),
              },
            }}
          >
            {submitting ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CircularProgress size={16} sx={{ mr: 1, color: "inherit" }} />
                <Typography variant="button">Processing...</Typography>
              </Box>
            ) : (
              submitLabel
            )}
          </Button>
        </Stack>
      );

  return (
    <Popup
      {...popupProps}
      onClose={onClose}
      loading={submitting}
      actions={popupActions}
      slotProps={{
        ...popupProps.slotProps,
        paper: {
          ...(popupProps.slotProps?.paper || {}),
          style: {
            borderRadius: "16px",
            overflow: "hidden",
            backgroundImage: `linear-gradient(to bottom, ${alpha(
              accentColor,
              0.02
            )}, transparent)`,
          },
        },
      }}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ display: "contents", paddingTop: "5px" }}
        >
          <Box sx={{ position: "relative" }}>{children}</Box>

          {placeActionsInsideForm && (
            <DialogActions
              sx={{
                px: 3,
                py: 2,
                borderTop: "1px solid",
                borderColor: "divider",
                mt: 2,
              }}
            >
              {renderButtonsBefore}
              <Button
                onClick={_onCancel}
                variant="outlined"
                color="inherit"
                disabled={!!submitting}
                sx={{
                  borderColor: "divider",
                  "&:hover": {
                    borderColor: "text.primary",
                    backgroundColor: alpha(theme.palette.text.primary, 0.04),
                  },
                }}
              >
                {cancelLabel}
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={!!submitting}
                sx={{
                  position: "relative",
                  fontWeight: 500,
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                    backgroundColor: alpha(accentColor, 0.9),
                  },
                  ml: 2,
                }}
              >
                {submitting ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CircularProgress
                      size={16}
                      sx={{ mr: 1, color: "inherit" }}
                    />
                    <Typography variant="button">Processing...</Typography>
                  </Box>
                ) : (
                  submitLabel
                )}
              </Button>
            </DialogActions>
          )}
        </form>
      </FormProvider>
    </Popup>
  );
}
