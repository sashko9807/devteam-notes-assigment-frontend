import { createFileRoute, redirect } from "@tanstack/react-router";
import { notesQueryOptions } from "../../common/hooks/notes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useAccessToken } from "../../common/stores/authStore";
import { Button, Divider, Grid, Typography } from "@mui/material";

import NotesList from "../../components/notes/NotesList";
import { useCreateNoteDialogStore } from "../../common/stores/notesModalStore";
import DeleteNoteModal from "../../components/notes/DeleteNoteModal";
import CreateNoteDialog from "../../components/notes/CreateNoteDialog";

function DashboardPage() {
  const accessToken = useAccessToken();
  const notesQuery = useSuspenseQuery(notesQueryOptions(accessToken));
  const createDialogStore = useCreateNoteDialogStore();
  const notes = notesQuery.data.data;

  return (
    <Grid container direction="column" spacing={2} py={5} px={6}>
      <Grid container item direction={"column"}>
        <Typography component={"h1"} variant="h2">
          My notes
        </Typography>
        <Grid item sx={{ py: 2 }}>
          <Button
            variant="contained"
            onClick={() => createDialogStore.toggleFn()}
          >
            Add new note
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <NotesList notes={notes} />
      <DeleteNoteModal />
      <CreateNoteDialog />
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
