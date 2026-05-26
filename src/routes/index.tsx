import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: () => {
    throw notFound();
  },
  component: () => null,
  notFoundComponent: () => (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      <h1>404 — Página não encontrada</h1>
    </div>
  ),
});
