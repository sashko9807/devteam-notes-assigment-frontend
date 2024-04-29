import { Grid } from "@mui/material";

import NotesCard from "./NoteCard";
import { NoteResponse } from "../../common/hooks/notes";
import {
  useCreateNoteDialogStore,
  useDeleteNoteDialogStore,
  useSelectNoteAaction,
} from "../../common/stores/notesModalStore";

type NoteListProps = {
  notes: NoteResponse[];
};
export default function NotesList({ notes }: NoteListProps) {
  const deleteDialogStore = useDeleteNoteDialogStore();
  const createDialogStore = useCreateNoteDialogStore();
  const selectedNote = useSelectNoteAaction();

  return (
    <Grid
      container
      item
      component={"ul"}
      direction={"row"}
      gap={2}
      justifyContent={"center"}
    >
      {notes.map((note) => (
        <Grid
          item
          component={"li"}
          key={note.id}
          xs={12}
          md={2}
          sx={{ listStyle: "none" }}
        >
          <NotesCard
            note={note}
            onDelete={deleteDialogStore.toggleFn}
            selectNote={selectedNote}
            onEdit={createDialogStore.toggleFn}
          />
        </Grid>
      ))}
    </Grid>
  );
}
