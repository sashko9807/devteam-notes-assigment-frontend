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

type DeleteNoteDialog = {
  open: boolean;
  onClose: (note: NoteResponse) => void;
  note: NoteResponse;
};
export default function DeleteNoteModal({
  open,
  onClose,
  note,
}: DeleteNoteDialog) {
  const deleteNoteMutation = useDeleteNote();
  const router = useRouter();
  const accessToken = useAccessToken();
  function deleteNote() {
    const data: DeleteMutation = {
      noteId: note.id,
      accessToken: accessToken,
    };
    deleteNoteMutation.mutate(data);
    router.invalidate();
    onClose(note);
  }
  return (
    <Dialog
      open={open}
      onClose={() => onClose(note)}
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
          {note.title}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(note)} color="primary">
          Cancel
        </Button>
        <Button color="primary" autoFocus onClick={() => deleteNote()}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}