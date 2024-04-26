import { createFileRoute } from "@tanstack/react-router";
const LoginPage = () => {
  return <h1>This is Login page</h1>;
};
export const Route = createFileRoute("/login/")({
  component: LoginPage,
});
