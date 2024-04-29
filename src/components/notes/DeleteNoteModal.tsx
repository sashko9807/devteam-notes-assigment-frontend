import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import {
  DeleteMutation,
  NoteResponse,
  useDeleteNote,
} from "../../common/hooks/notes";
import { useAccessToken } from "../../common/stores/authStore";
import { useRouter } from "@tanstack/react-router";
import {
  useDeleteNoteDialogStore,
  useSelectedNote,
} from "../../common/stores/notesModalStore";

export default function DeleteNoteModal() {
  const deleteNoteMutation = useDeleteNote();
  const router = useRouter();
  const accessToken = useAccessToken();
  const deleteModalStore = useDeleteNoteDialogStore();
  const selectedNote = useSelectedNote();
  function deleteNote() {
    const data: DeleteMutation = {
      noteId: selectedNote.id,
      accessToken: accessToken,
    };
    deleteNoteMutation.mutate(data);
    router.invalidate();
    deleteModalStore.toggleFn();
  }
  return (
    <Dialog
      open={deleteModalStore.open}
      onClose={() => deleteModalStore.toggleFn()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 0,
          boxShadow: "0 3px 6px #00000029",
        },
        "& .MuiDialog-paperWidthSm": {
          width: "100%",
          maxWidth: "350px",
          marginLeft: 0,
          marginRight: 0,
        },
        "& .MuiDialogTitle-root": {
          fontSize: "1em",
          color: "#00000099",
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">Delete note?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {selectedNote.title}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => deleteModalStore.toggleFn()} color="primary">
          Cancel
        </Button>
        <Button color="primary" autoFocus onClick={() => deleteNote()}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
