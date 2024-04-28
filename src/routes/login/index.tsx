import { Grid, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "../../components/auth/login/LoginForm";
const LoginPage = () => {
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
        Login
      </Typography>
      <LoginForm />
    </Grid>
  );
};
export const Route = createFileRoute("/login/")({
  component: LoginPage,
});
