import * as React from "react";
import { Button, Stack, DialogActions } from "@mui/material";
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
  const popupActions = placeActionsInsideForm
    ? undefined
    : actions ?? (
        <Stack direction="row" spacing={1}>
          {renderButtonsBefore}
          <Button onClick={_onCancel} color="inherit" disabled={!!submitting}>
            {cancelLabel}
          </Button>
          <Button type="submit" variant="contained" disabled={!!submitting}>
            {submitLabel}
          </Button>
        </Stack>
      );

  return (
    <Popup
      {...popupProps}
      onClose={onClose}
      loading={submitting}
      actions={popupActions}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ display: "contents", paddingTop: "5px" }}
        >
          {children}

          {placeActionsInsideForm && (
            <DialogActions>
              {renderButtonsBefore}
              <Button
                onClick={_onCancel}
                color="inherit"
                disabled={!!submitting}
              >
                {cancelLabel}
              </Button>
              <Button type="submit" variant="contained" disabled={!!submitting}>
                {submitLabel}
              </Button>
            </DialogActions>
          )}
        </form>
      </FormProvider>
    </Popup>
  );
}
