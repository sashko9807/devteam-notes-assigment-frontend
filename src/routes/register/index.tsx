import { createFileRoute } from "@tanstack/react-router";

function RegisterPage() {
  return <h1>This is register page</h1>;
}

export const Route = createFileRoute("/register/")({
  component: RegisterPage,
});
