import { createFileRoute } from "@tanstack/react-router";

function DashboardPage() {
  return <h1>This is DashboardPage</h1>;
}

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
});
