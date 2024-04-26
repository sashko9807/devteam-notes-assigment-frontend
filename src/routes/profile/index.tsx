import { createFileRoute } from "@tanstack/react-router";

function ProfilePage() {
  return <h1>This is Profile page</h1>;
}
export const Route = createFileRoute("/profile/")({
  component: ProfilePage,
});
