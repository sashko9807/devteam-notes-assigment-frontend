import { Grid, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "../../components/auth/login/LoginForm";
const LoginPage = () => {
  return (
    <Grid
      container
      justifyContent={"center"}
      direction={"column"}
      alignItems={"center"}
      gap={5}
      sx={{ paddingTop: 10 }}
    >
      <Typography variant="h3" component={"h1"}>
        Login
      </Typography>
      <Grid container justifyContent={"center"}>
        <Grid container item gap={2} xs={12} md={6}>
          <LoginForm />
        </Grid>
      </Grid>
    </Grid>
  );
};
export const Route = createFileRoute("/login/")({
  component: LoginPage,
  staticData: {
    title: "Login",
    description: "Login in your profile",
  },
});
