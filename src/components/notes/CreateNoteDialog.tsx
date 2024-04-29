import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";

import { useEffect } from "react";
import {
  CreateNoteVariables,
  useCreateNoteMutation,
  useUpdateNoteMutation,
} from "../../common/hooks/notes";
import FormInput from "../common/inputs/FormField";
import { SubmitHandler, useForm } from "react-hook-form";
import zod, { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useCreateNoteDialogStore,
  useSelectedNote,
} from "../../common/stores/notesModalStore";
import { useAccessToken } from "../../common/stores/authStore";

const createNoteSchema = zod.object({
  title: zod.string().min(1, "Title field is required"),
  content: zod.string().min(1, "Content fiels is required"),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;

export default function CreateNoteDialog() {
  const selectedNote = useSelectedNote();
  const accessToken = useAccessToken();
  const isNewNote = Boolean(selectedNote.id);
  const createDialogStore = useCreateNoteDialogStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateNoteInput>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: { title: selectedNote.title, content: selectedNote.content },
  });

  const createNoteMutation = useCreateNoteMutation();
  const updateNoteMutation = useUpdateNoteMutation();

  const onSubmit: SubmitHandler<CreateNoteInput> = async (data, event) => {
    event?.preventDefault();
    const mutationData: CreateNoteVariables = {
      id: selectedNote.id,
      title: data.title,
      content: data.content,
      accessToken: accessToken,
    };
    if (selectedNote.id) {
      await updateNoteMutation.mutateAsync(mutationData);
    } else {
      await createNoteMutation.mutateAsync(mutationData);
    }
    createDialogStore.toggleFn();
  };

  useEffect(() => {
    reset({ title: selectedNote.title, content: selectedNote.content });
  }, [selectedNote]);

  const onClose = () => {
    createDialogStore.toggleFn();
  };
  return (
    <Dialog
      open={createDialogStore.open}
      onClose={onClose}
      aria-labelledby="notes-dialog-title"
      aria-describedby="notes-dialog-form"
      PaperProps={{ sx: { width: "100%" } }}
    >
      <Grid container direction={"column"} gap={1}>
        <Grid item>
          <DialogTitle id="notes-dialog-title">
            {isNewNote ? "Update note" : "Add note"}
          </DialogTitle>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={3} gap={2} direction={"column"}>
              <Grid item>
                <FormInput
                  variant="outlined"
                  fullWidth
                  label={"Title"}
                  placeholder="Add title…"
                  {...register("title")}
                  fielderror={errors.title}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  multiline
                  label={"Content"}
                  placeholder="Add content…"
                  variant="outlined"
                  fielderror={errors.content}
                  fullWidth
                  sx={{ input: { height: 200, width: "100%" } }}
                  {...register("content")}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Button
                  onClick={() => {
                    createDialogStore.toggleFn();
                    reset();
                  }}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button type="submit" color="primary" autoFocus>
                  {isNewNote ? "Update" : "Add"}
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </form>
      </Grid>
    </Dialog>
  );
}
