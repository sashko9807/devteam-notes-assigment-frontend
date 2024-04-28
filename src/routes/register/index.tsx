import { Grid, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

import RegisterForm from "../../components/auth/register/RegisterForm";

function RegisterPage() {
  return (
    <Grid
      container
      item
      justifyContent={"center"}
      direction={"column"}
      alignItems={"center"}
      gap={5}
      sx={{ paddingTop: 10 }}
    >
      <Typography variant="h3" component={"h1"}>
        Register
      </Typography>
      <RegisterForm />
    </Grid>
  );
}

export const Route = createFileRoute("/register/")({
  component: RegisterPage,
});
