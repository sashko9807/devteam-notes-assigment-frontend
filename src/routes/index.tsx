import { createFileRoute } from "@tanstack/react-router";

function IndexPage() {
  return <h1>This is index page</h1>;
}

export const Route = createFileRoute("/")({
  component: IndexPage,
});
