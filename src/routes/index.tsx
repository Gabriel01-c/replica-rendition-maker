import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: RedirectToEbook,
});

function RedirectToEbook() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/ebook-vasoativo" });
  }, [navigate]);
  return null;
}
