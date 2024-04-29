import { createFileRoute } from "@tanstack/react-router";
import { useIsAuthenticated } from "../common/stores/authStore";

function IndexPage() {
  const isAuthenticated = useIsAuthenticated();

  return <h1>{isAuthenticated.toString()}</h1>;
}

export const Route = createFileRoute("/")({
  component: IndexPage,
});
