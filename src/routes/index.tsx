import { createFileRoute } from "@tanstack/react-router";
import { useAuthStore } from "../components/auth/AuthStoreProvider";
import { TAuthStore } from "../common/stores/authStore";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import LinkButton from "../components/nav/common/button/LinkButton";
import { routes } from "../common/routes";

function IndexPage() {
  const { isAuthenticated } = useAuthStore<TAuthStore>((state) => state);
  return (
    <Grid
      container
      py={10}
      justifyContent={"center"}
      alignItems={"center"}
      gap={3}
      direction={"column"}
    >
      <Grid
        container
        item
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        px={2}
      >
        <Typography variant="h1" textAlign={"center"}>
          Note app
        </Typography>
        <Typography
          variant="h2"
          textAlign={"center"}
          sx={{ wordBreak: "break-word" }}
        >
          Better way to manage your notes
        </Typography>
      </Grid>
      <Grid item></Grid>
      <LinkButton to={routes.dashboard.index} variant="contained">
        Get started
      </LinkButton>
    </Grid>
  );
}

export const Route = createFileRoute("/")({
  component: IndexPage,
  meta: () => {
    return [{ title: "Note App" }];
  },
  staticData: {
    title: "Note App - Manage your own notes",
    description: "Note App is web application, helping you to manage notes",
    metaTitle: "Note App",
    metaDescription: "Note App is web application, helping you to manage notes",
  },
});
