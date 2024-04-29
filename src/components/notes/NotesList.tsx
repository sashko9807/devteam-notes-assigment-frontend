import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import NotesCard from "./NotesCard";
import { NoteResponse } from "../../common/hooks/notes";
import {
  useDeleteNoteDialogStore,
  useEditNoteDialogStore,
} from "../../common/stores/notesModalStore";

type NoteListProps = {
  notes: NoteResponse[];
};
export default function NotesList({ notes }: NoteListProps) {
  const deleteDialogStore = useDeleteNoteDialogStore();
  const editDialogStore = useEditNoteDialogStore();

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
            onEdit={editDialogStore.toggleFn}
          />
        </Grid>
      ))}
    </Grid>
  );
}
