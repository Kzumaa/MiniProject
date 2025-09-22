import * as React from "react";
import {
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  DialogActions,
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import type { Subject } from "@/types"; // uses your existing type
import { useToast } from "@/providers/hooks/useToast";
import Popup from "@/components/common/Popup";
import FormDialog from "@/components/common/FormDialog";
import RHFTextField from "@/components/common/Fields/RHFTextField";

/** ------- local schema for the form ------- */
type FormValues = { name: string; description: string };
const schema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

/** ------- demo seed data ------- */
const seedSubjects: Subject[] = [
  {
    id: 201,
    name: "Algorithms 101",
    description: "Intro to algorithms: sorting, graphs, complexity.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    mentorIds: [],
  },
  {
    id: 202,
    name: "Web Development",
    description: "HTML/CSS/JS and modern frameworks.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    mentorIds: [],
  },
  {
    id: 203,
    name: "Data Engineering",
    description: "Pipelines, warehouses, batch vs. streaming.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    mentorIds: [],
  },
];

export default function PopupFormDemo() {
  const { show } = useToast();

  // local, client-only "DB"
  const [subjects, setSubjects] = React.useState<Subject[]>(seedSubjects);
  const [nextId, setNextId] = React.useState<number>(204);

  // dialog states
  const [openDetail, setOpenDetail] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const [selected, setSelected] = React.useState<Subject | null>(null);

  const openDetailFor = (s: Subject) => {
    setSelected(s);
    setOpenDetail(true);
  };
  const openEditFor = (s: Subject) => {
    setSelected(s);
    setOpenEdit(true);
  };

  // Create handler (client-only)
  const handleCreate = (values: FormValues) => {
    const newItem: Subject = {
      id: nextId,
      name: values.name,
      description: values.description ?? "",
      mentorIds: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSubjects((prev) => [newItem, ...prev]);
    setNextId((n) => n + 1);
    show("Created (client-only mock)", "success");
  };

  // Edit handler (client-only)
  const handleEdit = (values: FormValues) => {
    if (!selected) return;
    setSubjects((prev) =>
      prev.map((s) =>
        s.id === selected.id
          ? {
              ...s,
              name: values.name,
              description: values.description ?? "",
              updatedAt: new Date().toISOString(),
            }
          : s
      )
    );
    show("Updated (client-only mock)", "success");
  };

  return (
    <Stack spacing={3} sx={{ py: 4 }}>
      <Typography variant="h4">
        Popup & FormDialog — Client-only Demo
      </Typography>

      <Card>
        <CardContent>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6">Subjects (mock)</Typography>
            <Button variant="contained" onClick={() => setOpenCreate(true)}>
              New Subject
            </Button>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <List>
            {subjects.map((s) => (
              <ListItem
                key={s.id}
                secondaryAction={
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => openDetailFor(s)}
                    >
                      Detail
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => openEditFor(s)}
                    >
                      Edit
                    </Button>
                  </Stack>
                }
              >
                <ListItemText
                  primary={`${s.name} (#${s.id})`}
                  secondary={s.description || "—"}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Detail popup using <Popup /> with explicit footer actions */}
      <Popup
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        title={selected ? `Subject #${selected.id}` : "Subject"}
        descriptionText="This is a read-only detail popup using mock data."
        maxWidth="sm"
        // example of MUI v7 slotProps (style the Paper)
        slotProps={{ paper: { sx: { borderRadius: 3 } } }}
        actions={
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setOpenDetail(false)}>Close</Button>
          </DialogActions>
        }
      >
        {selected && (
          <Stack spacing={1}>
            <Typography variant="subtitle1">{selected.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {selected.description || "—"}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="caption">
              Updated: {new Date(selected.updatedAt).toLocaleString()}
            </Typography>
          </Stack>
        )}
      </Popup>

      {/* Create form using <FormDialog /> (actions inside the form) */}
      <CreateSubjectDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSubmit={handleCreate}
      />

      {/* Edit form using <FormDialog /> with defaultValues */}
      {selected && (
        <EditSubjectDialog
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          record={selected}
          onSubmit={handleEdit}
        />
      )}
    </Stack>
  );
}

/** ----- Create form dialog (client-only) ----- */
function CreateSubjectDialog({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
}) {
  const [submitting, setSubmitting] = React.useState(false);
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { name: "", description: "" },
  });

  const handleSubmit = async (values: FormValues) => {
    setSubmitting(true);
    // simulate latency
    await new Promise((r) => setTimeout(r, 400));
    onSubmit(values);
    setSubmitting(false);
    onClose();
  };

  return (
    <FormDialog<FormValues>
      open={open}
      onClose={onClose}
      title="Create Subject"
      maxWidth="sm"
      methods={methods}
      onSubmit={handleSubmit}
      submitting={submitting}
      disableBackdropClose
    >
      <Stack spacing={3}>
        {" "}
        {/* Increase spacing between fields */}
        <RHFTextField name="name" label="Name" />
        <RHFTextField
          name="description"
          label="Description"
          multiline
          rows={3}
        />
      </Stack>
    </FormDialog>
  );
}

/** ----- Edit form dialog (client-only) ----- */
function EditSubjectDialog({
  open,
  onClose,
  record,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  record: Subject;
  onSubmit: (values: FormValues) => void;
}) {
  const [submitting, setSubmitting] = React.useState(false);
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { name: record.name, description: record.description || "" },
  });

  // keep the form in sync when record changes while dialog is open
  React.useEffect(() => {
    if (open)
      methods.reset({
        name: record.name,
        description: record.description || "",
      });
  }, [open, record, methods]);

  const handleSubmit = async (values: FormValues) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    onSubmit(values);
    setSubmitting(false);
    onClose();
  };

  return (
    <FormDialog<FormValues>
      open={open}
      onClose={onClose}
      title={`Edit Subject #${record.id}`}
      maxWidth="sm"
      methods={methods}
      onSubmit={handleSubmit}
      submitting={submitting}
      disableBackdropClose
      // Using the global padding from Popup.tsx now
    >
      <Stack spacing={3}>
        {" "}
        {/* Increase spacing between fields */}
        <RHFTextField name="name" label="Name" />
        <RHFTextField
          name="description"
          label="Description"
          multiline
          rows={3}
        />
      </Stack>
    </FormDialog>
  );
}
