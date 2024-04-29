import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AppNavbar } from "../components/nav/AppNavbar";
import { Box } from "@mui/material";
import { QueryClient } from "@tanstack/react-query";
import { AuthStore } from "../common/stores/authStore";

function RootComponent() {
  return (
    <>
      <header>
        <AppNavbar />
      </header>
      <Box sx={{ marginTop: 10 }} component={"main"}>
        <Outlet />
      </Box>
    </>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: AuthStore;
}>()({
  component: RootComponent,
});
