import { createFileRoute } from "@tanstack/react-router";
import type { MouseEvent } from "react";
import "./acretismo-obrigado.css";

/** LINK DO GRUPO — preencher com o link definitivo do WhatsApp. Vazio = navegação bloqueada na prévia. */
const GROUP_URL = "";

export const Route = createFileRoute("/acretismo-obrigado")({
  head: () => ({
    meta: [
      { title: "Compra confirmada — Protocolo PAS" },
      { name: "description", content: "Sua compra foi confirmada e sua Aula Bônus de Drogas Vasoativas está liberada." },
      { property: "og:title", content: "Compra confirmada — Protocolo PAS" },
      { property: "og:description", content: "Acesse a Aula Bônus de Drogas Vasoativas pelo grupo exclusivo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AcretismoObrigado,
});

function AcretismoObrigado() {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!GROUP_URL) e.preventDefault();
  };
  return (
    <div className="acr-ty">
      <main className="wrap">
        <div className="confirm">
          <i aria-hidden="true" />COMPRA CONFIRMADA
        </div>

        <div className="player" aria-hidden="true">
          <div className="player-screen">
            <span className="play">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </span>
            <div className="player-copy">
              <strong>AULA BÔNUS</strong>
              <span>DROGAS VASOATIVAS</span>
            </div>
            <svg className="ecg" viewBox="0 0 320 40" preserveAspectRatio="none" fill="none">
              <path d="M0 24 H96 L108 24 L114 12 L121 34 L128 20 L134 24 H214 L226 24 L232 10 L239 32 L246 21 L252 24 H320" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </div>
          <div className="player-caption">
            <span className="unlock"><i aria-hidden="true" />AULA BÔNUS DESBLOQUEADA</span>
            <span className="dur">CONTEÚDO EXCLUSIVO</span>
          </div>
        </div>

        <h1>
          Sua compra está confirmada. Agora tem uma <em>Aula Bônus</em> esperando por você.
        </h1>

        <p>Você acaba de receber uma aula exclusiva sobre <strong>Drogas Vasoativas</strong>, para aprofundar seu raciocínio e escolher a droga certa no plantão com mais critério.</p>

        <p className="guide">Entre no grupo pelo botão abaixo. O link para assistir à aula está na descrição.</p>

        <a className="cta" href={GROUP_URL || "#"} onClick={onClick} target={GROUP_URL ? "_blank" : undefined} rel="noopener noreferrer" aria-label="Entrar no grupo do WhatsApp e acessar a Aula Bônus">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.78 11.78 0 0 0 12.06 0C5.5 0 .17 5.33.17 11.89c0 2.09.55 4.13 1.6 5.93L0 24l6.34-1.66a11.86 11.86 0 0 0 5.72 1.46h.01c6.56 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.17-3.44-8.43ZM12.07 21.3a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.76.99 1-3.67-.22-.38a9.39 9.39 0 0 1-1.43-4.84c0-5.18 4.22-9.4 9.4-9.4 2.51 0 4.87.98 6.65 2.76a9.36 9.36 0 0 1 2.75 6.65c0 5.18-4.22 9.4-9.26 9.4Zm5.16-7.04c-.28-.14-1.66-.82-1.92-.92-.26-.09-.45-.14-.64.14-.19.28-.74.92-.91 1.11-.17.19-.34.21-.62.07-.28-.14-1.18-.43-2.25-1.39-.83-.74-1.39-1.66-1.56-1.94-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.19-.28.28-.47.09-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.28-1 1-1 2.43s1.03 2.83 1.17 3.02c.14.19 2.02 3.08 4.9 4.32.69.3 1.22.47 1.64.6.69.22 1.32.19 1.82.12.55-.08 1.66-.68 1.9-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33Z" /></svg>
          ENTRAR NO GRUPO E ACESSAR A AULA BÔNUS
        </a>
      </main>
    </div>
  );
}
