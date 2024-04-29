import { createFileRoute, redirect } from "@tanstack/react-router";
import { notesQueryOptions } from "../../common/hooks/notes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useAccessToken } from "../../common/stores/authStore";
import { Button, Divider, Grid, Typography } from "@mui/material";

import NotesList from "../../components/notes/NotesList";
import { useDeleteNoteDialogStore } from "../../common/stores/notesModalStore";
import DeleteNoteModal from "../../components/notes/DeleteNoteModal";

function DashboardPage() {
  const accessToken = useAccessToken();
  const notesQuery = useSuspenseQuery(notesQueryOptions(accessToken));
  const deleteModalStore = useDeleteNoteDialogStore();
  const notes = notesQuery.data.data;

  return (
    <Grid container direction="column" spacing={2}>
      <Grid container item direction={"column"}>
        <Typography component={"h1"} variant="h2">
          My notes
        </Typography>
        <Grid item sx={{ py: 2 }}>
          <Button variant="contained">Add new note</Button>
        </Grid>
      </Grid>
      <Divider />
      <NotesList notes={notes} />
      <DeleteNoteModal
        note={deleteModalStore.note}
        open={deleteModalStore.open}
        onClose={deleteModalStore.toggleFn}
      />
    </Grid>
  );
}

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
  loader: ({ context: { queryClient, auth } }) => {
    const accessToken = auth.accessToken;
    if (!auth.isAuthenticated) {
      throw redirect({ to: "/login" });
    }
    return queryClient.ensureQueryData(notesQueryOptions(accessToken));
  },
});
