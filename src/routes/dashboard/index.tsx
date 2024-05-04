import { createFileRoute } from "@tanstack/react-router";
import { notesQueryOptions } from "../../common/hooks/notes";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Button, Divider, Grid, Typography } from "@mui/material";

import NotesList from "../../components/notes/NotesList";
import { useCreateNoteDialogStore } from "../../common/stores/notesModalStore";
import DeleteNoteModal from "../../components/notes/DeleteNoteModal";
import CreateNoteDialog from "../../components/notes/CreateNoteDialog";
import { useAuthStore } from "../../components/auth/AuthStoreProvider";

function DashboardPage() {
  const { accessToken } = useAuthStore((state) => state);
  const notesQuery = useSuspenseQuery(notesQueryOptions(accessToken));
  const createDialogStore = useCreateNoteDialogStore();
  const notes = notesQuery.data;

  return (
    <Grid container direction="column" spacing={2} py={5} px={3}>
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
  beforeLoad(opts) {
    return opts;
  },
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(
      notesQueryOptions(context.auth.accessToken)
    );
  },
});
