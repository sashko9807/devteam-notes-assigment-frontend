import { createRootRoute, Outlet } from "@tanstack/react-router";
import { AppNavbar } from "../components/nav/AppNavbar";
import { Box } from "@mui/material";

export const Route = createRootRoute({
  component: () => {
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
  },
});
