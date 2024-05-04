import { createFileRoute } from "@tanstack/react-router";
import { useAuthStore } from "../components/auth/AuthStoreProvider";
import { TAuthStore } from "../common/stores/authStore";

function IndexPage() {
  const { isAuthenticated } = useAuthStore<TAuthStore>((state) => state);
  return <h1>{`${isAuthenticated}`}</h1>;
}

export const Route = createFileRoute("/")({
  component: IndexPage,
});
