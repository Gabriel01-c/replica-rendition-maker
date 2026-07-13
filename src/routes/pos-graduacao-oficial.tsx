import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import drFrancisco from "@/assets/dr-francisco-polemicas-transparent.png.asset.json";
import salaCirurgica from "@/assets/sala-cirurgica.png.asset.json";
import anhanguera from "@/assets/anhanguera.png.asset.json";
import reconhecidoMec from "@/assets/reconhecido-mec.png.asset.json";


export const Route = createFileRoute("/pos-graduacao-oficial")({
  head: () => ({
    meta: [
      { title: "Pós-Graduação em Anestesia Obstétrica — Dr. Francisco Amaral" },
      {
        name: "description",
        content:
          "A 1ª Pós-Graduação em Anestesia Obstétrica do Brasil 100% online. 480h, 12 disciplinas, 12 meses, sem TCC. Certificado reconhecido.",
      },
      {
        property: "og:title",
        content: "Pós-Graduação em Anestesia Obstétrica — Dr. Francisco Amaral",
      },
      {
        property: "og:description",
        content:
          "Domine as emergências, as drogas e as decisões que definem se a gestante sobrevive.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PosGraduacaoOficial,
});

const NAVY = "#0a1929";
const NAVY_DEEP = "#061424";
const TEAL = "#5eead4";
const GOLD = "#c9a84c";

const MARQUEE_TEXT =
  "EXCLUSIVO PARA MÉDICOS ANESTESIOLOGISTAS  •  A 1ª PÓS-GRADUAÇÃO EM ANESTESIA OBSTÉTRICA DO BRASIL 100% ONLINE  •  480H  •  12 DISCIPLINAS  •  12 MESES  •  SEM TCC  •  CERTIFICADO RECONHECIDO  •  ";

// Ajuste a data-alvo da próxima turma/abertura
const TARGET_DATE = new Date("2026-08-15T00:00:00-03:00");

function Countdown() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, TARGET_DATE.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const items = [
    { value: days, label: "dias" },
    { value: hours, label: "horas" },
    { value: minutes, label: "min" },
    { value: seconds, label: "seg" },
  ];

  return (
    <div
      className="flex items-center justify-center gap-2 sm:gap-3"
      style={{ color: "#f4f7fb" }}
    >
      {items.map((item, i) => (
        <div key={item.label} className="flex items-center gap-2 sm:gap-3">
          <div className="flex flex-col items-center leading-none">
            <span
              className="min-w-[36px] text-center text-xl font-light tabular-nums sm:text-2xl"
              style={{
                fontFamily:
                  '"Bricolage Grotesque", "Inter Tight", system-ui, sans-serif',
              }}
            >
              {String(item.value).padStart(2, "0")}
            </span>
            <span
              className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.14em] sm:text-[10px]"
              style={{ color: "rgba(232,238,245,0.55)" }}
            >
              {item.label}
            </span>
          </div>
          {i < items.length - 1 && (
            <span
              className="self-start pb-3 text-base font-light sm:text-lg"
              style={{ color: "rgba(94,234,212,0.5)" }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function PosGraduacaoOficial() {
  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: NAVY_DEEP,
        color: "#e8eef5",
        fontFamily: '"Inter Tight", system-ui, sans-serif',
      }}
    >
      {/* Marquee bar */}
      <div
        className="relative overflow-hidden border-b"
        style={{
          background: `linear-gradient(90deg, ${NAVY} 0%, #102a44 50%, ${NAVY} 100%)`,
          borderColor: "rgba(94,234,212,0.15)",
        }}
      >
        <div className="flex whitespace-nowrap py-2.5 sm:py-3 animate-marquee">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="mx-6 text-[11px] font-semibold tracking-[0.18em] sm:text-xs"
              style={{ color: "rgba(232,238,245,0.85)" }}
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* Countdown */}
      <div
        className="border-b px-4 py-2.5 text-center sm:py-3"
        style={{
          background: `radial-gradient(800px 160px at 50% 0%, rgba(94,234,212,0.06), transparent 60%), ${NAVY_DEEP}`,
          borderColor: "rgba(94,234,212,0.08)",
        }}
      >
        <Countdown />
      </div>



      {/* HERO — ambiente de sala cirúrgica */}
      <section
        className="relative overflow-hidden lg:min-h-[calc(100vh-44px)]"
        style={{
          backgroundColor: "#09151d",
        }}
      >
        {/* Imagem de fundo: sala cirúrgica real */}
        <img
          src={salaCirurgica.url}
          alt="Ambiente de sala cirúrgica"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
          style={{ objectPosition: "70% center" }}
          draggable={false}
        />

        {/* Overlay bem leve para manter a sala visível e o texto legível */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,12,20,0.18) 0%, rgba(4,12,20,0.06) 40%, rgba(4,12,20,0.32) 100%)",
          }}
        />




        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-5 pt-8 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:pt-12 lg:gap-14 lg:pt-16">
          {/* MOBILE: image first with gradient overlap over text */}
          <div className="relative order-1 md:hidden">
            <div className="relative mx-auto max-w-md">
              <div
                className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, rgba(94,234,212,0.25), transparent 60%)",
                }}
              />
              {/* Lançamento oficial — mobile */}
              <div
                className="absolute left-1/2 top-2 z-10 -translate-x-1/2 whitespace-nowrap rounded border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] shadow-lg sm:top-3 sm:px-4 sm:py-2 sm:text-[11px]"
                style={{
                  backgroundColor: "rgba(6,18,28,0.82)",
                  borderColor: "rgba(94,234,212,0.35)",
                  color: "#f4f7fb",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(94,234,212,0.12)",
                }}
              >
                Lançamento Oficial
              </div>
              <img
                src={drFrancisco.url}
                alt="Dr. Francisco Amaral"
                className="w-full select-none"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
                }}
                draggable={false}
              />
              {/* Selos flutuantes — mobile */}
              <img
                src={anhanguera.url}
                alt="Anhanguera"
                className="pointer-events-none absolute left-2 bottom-10 w-28 select-none drop-shadow-[0_6px_16px_rgba(0,0,0,0.5)] sm:bottom-12 sm:w-32"
                draggable={false}
              />
              <img
                src={reconhecidoMec.url}
                alt="Reconhecido pelo MEC"
                className="pointer-events-none absolute right-2 bottom-10 w-28 select-none drop-shadow-[0_6px_16px_rgba(0,0,0,0.5)] sm:bottom-12 sm:w-32"
                draggable={false}
              />
            </div>

          </div>

          {/* TEXT COLUMN */}
          <div className="relative order-2 -mt-16 pb-14 sm:-mt-24 md:order-1 md:mt-0 md:pb-20 lg:pb-24">
            <h1
              className="text-[34px] font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-[56px]"
              style={{
                fontFamily:
                  '"Bricolage Grotesque", "Inter Tight", system-ui, sans-serif',
                color: "#f4f7fb",
              }}
            >
              A 1ª Pós-Graduação em{" "}
              <span style={{ color: TEAL, fontWeight: 500 }}>Anestesia Obstétrica</span>{" "}
              do Brasil{" "}
              <span
                className="relative inline-block font-medium"
                style={{ color: GOLD }}
              >
                100% online
                <span
                  className="absolute -bottom-1 left-0 h-[2px] w-full"
                  style={{
                    background: `linear-gradient(90deg, ${GOLD}, transparent)`,
                  }}
                />
              </span>
              .
            </h1>

            <p
              className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
              style={{ color: "rgba(232,238,245,0.75)" }}
            >
              Domine as emergências, as drogas e as decisões que definem se a gestante
              sobrevive — com formação estruturada, baseada em ciência e acessível de
              qualquer lugar do Brasil.
            </p>

            <ul
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[13px] font-medium tracking-wide sm:text-sm"
              style={{ color: "rgba(232,238,245,0.9)" }}
            >
              {[
                "480 horas",
                "100% Online",
                "12 disciplinas",
                "12 meses",
                "Sem TCC",
                "Certificado reconhecido",
              ].map((item, i, arr) => (
                <li key={item} className="flex items-center gap-3">
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{ backgroundColor: TEAL }}
                  />
                  {item}
                  {i < arr.length - 1 && (
                    <span className="hidden text-white/20 sm:inline">/</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* DESKTOP IMAGE */}
          <div className="relative order-3 hidden md:order-2 md:block md:h-full md:translate-x-10 lg:h-full">
            <div className="relative mx-auto flex h-full min-h-[560px] items-end justify-center lg:justify-end">
              <div
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                  background:
                    "radial-gradient(circle at 60% 45%, rgba(94,234,212,0.22), transparent 60%)",
                  filter: "blur(20px)",
                }}
              />
              {/* Lançamento oficial — desktop */}
              <div
                className="absolute left-1/2 top-4 z-10 -translate-x-1/2 whitespace-nowrap rounded border px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] shadow-xl xl:top-6 xl:px-6 xl:py-2.5 xl:text-xs"
                style={{
                  backgroundColor: "rgba(6,18,28,0.82)",
                  borderColor: "rgba(94,234,212,0.35)",
                  color: "#f4f7fb",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(94,234,212,0.12)",
                }}
              >
                Lançamento Oficial
              </div>
              <img
                src={drFrancisco.url}
                alt="Dr. Francisco Amaral"
                className="h-full max-h-[88vh] w-auto select-none object-contain"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 60%, transparent 98%), linear-gradient(to left, black 85%, transparent 100%)",
                  WebkitMaskComposite: "source-in",
                  maskImage:
                    "linear-gradient(to bottom, black 60%, transparent 98%)",
                }}
                draggable={false}
              />
              {/* Selos flutuantes — desktop */}
              <img
                src={anhanguera.url}
                alt="Anhanguera"
                className="pointer-events-none absolute left-4 top-8 w-40 select-none drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)] xl:top-10 xl:w-48"
                draggable={false}
              />
              <img
                src={reconhecidoMec.url}
                alt="Reconhecido pelo MEC"
                className="pointer-events-none absolute right-6 top-8 w-40 select-none drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)] xl:top-10 xl:w-48"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* bottom fade into next section */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
          style={{
            background: `linear-gradient(to bottom, transparent, ${NAVY_DEEP})`,
          }}
        />
      </section>

      {/* A formação que a residência não te deu */}
      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: GOLD }}
          >
            O que ninguém te ensinou
          </span>
          <h2
            className="mt-4 text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            style={{
              fontFamily:
                '"Bricolage Grotesque", "Inter Tight", system-ui, sans-serif',
              color: "#f4f7fb",
            }}
          >
            A formação que a{" "}
            <em className="not-italic" style={{ color: TEAL, fontWeight: 500 }}>
              residência não te deu
            </em>
          </h2>

          <div
            className="mt-10 space-y-6 text-lg leading-relaxed"
            style={{ color: "rgba(232,238,245,0.8)" }}
          >
            <p>
              Você está na sala de cirurgia. A gestante acabou de descompensar. A
              pressão caiu, o sangramento não para e a equipe espera uma decisão sua.
            </p>
            <p>
              Esse é o momento que separa o anestesiologista que{" "}
              <span style={{ color: "#f4f7fb" }}>domina</span> a obstetrícia do que
              apenas <span style={{ color: "#f4f7fb" }}>sobrevive</span> nela.
            </p>
            <p>
              A residência te ensinou técnica. Mas ninguém te ensinou a{" "}
              <span style={{ color: TEAL }}>tomar decisão sob pressão real</span> — com
              drogas vasoativas na mão, hemorragia na mesa e HELLP no laudo.
            </p>
            <p style={{ color: "#f4f7fb" }}>
              Essa pós-graduação foi criada exatamente para isso.
            </p>
          </div>
        </div>
      </section>

      {/* Ao concluir */}
      <section
        className="px-5 py-20 sm:px-8 lg:py-28"
        style={{
          background: `linear-gradient(180deg, ${NAVY_DEEP} 0%, ${NAVY} 100%)`,
        }}
      >
        <div className="mx-auto max-w-3xl">
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: TEAL }}
          >
            Resultado
          </span>
          <h2
            className="mt-4 text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            style={{
              fontFamily:
                '"Bricolage Grotesque", "Inter Tight", system-ui, sans-serif',
              color: "#f4f7fb",
            }}
          >
            Ao concluir você vai:
          </h2>

          <ul className="mt-10 divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {[
              "Saber qual vasoativo usar, em qual dose e por quê — sem hesitar",
              "Conduzir hemorragia puerperal sem depender de sorte ou intuição",
              "Manejar HELLP, pré-eclâmpsia grave e gestante cardiopata com protocolo claro",
              "Dominar a via aérea difícil obstétrica antes que ela te domine",
              "Aplicar analgesia de parto e anestesia para cesariana com domínio técnico completo",
              "Sair do centro obstétrico sabendo que fez o que precisava ser feito",
            ].map((item, i) => (
              <li
                key={i}
                className="flex gap-5 border-t py-5 first:border-t-0"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <span
                  className="mt-1 shrink-0 font-mono text-xs tabular-nums"
                  style={{ color: GOLD }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-base leading-relaxed sm:text-lg"
                  style={{ color: "rgba(232,238,245,0.9)" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Coordenador */}
      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: GOLD }}
          >
            Coordenador e Professor Principal
          </span>
          <h2
            className="mt-4 text-3xl font-light leading-tight tracking-tight sm:text-4xl"
            style={{
              fontFamily:
                '"Bricolage Grotesque", "Inter Tight", system-ui, sans-serif',
              color: "#f4f7fb",
            }}
          >
            Dr. Francisco Amaral Egydio de Carvalho
          </h2>
          <div
            className="mt-8 space-y-5 text-base leading-relaxed sm:text-lg"
            style={{ color: "rgba(232,238,245,0.8)" }}
          >
            <p>
              Doutor em Clínica Cirúrgica pela Universidade Federal do Paraná, com
              fellowship nos Estados Unidos e mais de 20 anos dentro do centro
              obstétrico. São mais de{" "}
              <span style={{ color: TEAL }}>20.000 anestesias realizadas</span> e uma
              tese de doutorado sobre morfina intratecal em cesarianas — porque para o
              Francisco, cada decisão clínica precisa ter respaldo científico.
            </p>
            <p>
              Membro da Sociedade Paranaense de Anestesiologia e coordenador desta
              pós-graduação, ele ensina do jeito que a residência deveria ter ensinado:
              com casos reais, ciência aplicada e raciocínio clínico que funciona na
              prática.
            </p>
          </div>
        </div>
      </section>

      {/* Corpo Docente */}
      <section
        className="px-5 py-20 sm:px-8 lg:py-28"
        style={{ backgroundColor: NAVY }}
      >
        <div className="mx-auto max-w-4xl">
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: TEAL }}
          >
            Corpo Docente
          </span>
          <h2
            className="mt-4 text-3xl font-light leading-tight tracking-tight sm:text-4xl"
            style={{
              fontFamily:
                '"Bricolage Grotesque", "Inter Tight", system-ui, sans-serif',
              color: "#f4f7fb",
            }}
          >
            Uma pós-graduação é tão forte quanto quem ensina.
          </h2>
          <p
            className="mt-5 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: "rgba(232,238,245,0.7)" }}
          >
            Cada disciplina desta formação foi entregue a um especialista com
            experiência clínica real na área que leciona.
          </p>

          <div className="mt-12 space-y-4">
            {[
              {
                name: "Dr. Francisco Amaral Egydio de Carvalho",
                title: "Doutor — Coordenador",
                disc: [
                  "Hemorragia Pós-Parto e Manejo Avançado do Sangramento Obstétrico",
                  "Analgesia Pós-Cesariana",
                  "Anestesia na Gestante com Comorbidades 1 e 2",
                ],
              },
              {
                name: "Dr. Luiz Roberto Maia",
                title: "Mestre",
                disc: ["Analgesia de Parto", "Via Aérea Difícil e POCUS"],
              },
              {
                name: "Dra. Camila Claro do Amaral",
                title: "Especialista",
                disc: [
                  "Anestesia para Cesariana",
                  "Fisiologia e Farmacologia na Gestação",
                  "Anestesia para Cirurgias Não Obstétricas na Gestação",
                ],
              },
            ].map((p) => (
              <article
                key={p.name}
                className="rounded-lg border p-6 transition-colors sm:p-7"
                style={{
                  borderColor: "rgba(94,234,212,0.12)",
                  backgroundColor: "rgba(255,255,255,0.02)",
                }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3
                    className="text-lg font-medium sm:text-xl"
                    style={{
                      fontFamily:
                        '"Bricolage Grotesque", "Inter Tight", system-ui, sans-serif',
                      color: "#f4f7fb",
                    }}
                  >
                    {p.name}
                  </h3>
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: GOLD }}
                  >
                    {p.title}
                  </span>
                </div>
                <ul
                  className="mt-4 space-y-1.5 text-sm leading-relaxed sm:text-base"
                  style={{ color: "rgba(232,238,245,0.75)" }}
                >
                  {p.disc.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full"
                        style={{ backgroundColor: TEAL }}
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Módulos */}
      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: GOLD }}
          >
            Módulos
          </span>
          <h2
            className="mt-4 text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            style={{
              fontFamily:
                '"Bricolage Grotesque", "Inter Tight", system-ui, sans-serif',
              color: "#f4f7fb",
            }}
          >
            Disciplinas do Curso
          </h2>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div>
              <h3
                className="text-[11px] font-semibold uppercase tracking-[0.28em]"
                style={{ color: TEAL }}
              >
                Núcleo Clínico
              </h3>
              <ol
                className="mt-6 space-y-4 text-base leading-relaxed sm:text-lg"
                style={{ color: "rgba(232,238,245,0.9)" }}
              >
                {[
                  "Hemorragia Pós-Parto e Manejo Avançado do Sangramento Obstétrico",
                  "Analgesia de Parto",
                  "Anestesia para Cesariana",
                  "Analgesia Pós-Cesariana",
                  "Fisiologia e Farmacologia na Gestação",
                  "Via Aérea Difícil e POCUS",
                  "Anestesia na Gestante com Comorbidades 1",
                  "Anestesia na Gestante com Comorbidades 2",
                  "Anestesia para Cirurgias Não Obstétricas na Gestação",
                ].map((m, i) => (
                  <li key={m} className="flex gap-4">
                    <span
                      className="mt-1 shrink-0 font-mono text-xs tabular-nums"
                      style={{ color: GOLD }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{m}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3
                className="text-[11px] font-semibold uppercase tracking-[0.28em]"
                style={{ color: TEAL }}
              >
                Disciplinas Institucionais
              </h3>
              <ol
                className="mt-6 space-y-4 text-base leading-relaxed sm:text-lg"
                style={{ color: "rgba(232,238,245,0.9)" }}
              >
                {[
                  "Avaliação do Paciente Crítico",
                  "Prática Baseada em Evidência",
                  "Atenção Integral à Saúde da Mulher no Trabalho de Parto, Parto e Puerpério",
                ].map((m, i) => (
                  <li key={m} className="flex gap-4">
                    <span
                      className="mt-1 shrink-0 font-mono text-xs tabular-nums"
                      style={{ color: GOLD }}
                    >
                      {String(i + 10).padStart(2, "0")}
                    </span>
                    <span>{m}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Para quem é */}
      <section
        className="px-5 py-20 sm:px-8 lg:py-28"
        style={{
          background: `linear-gradient(180deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)`,
        }}
      >
        <div className="mx-auto max-w-3xl">
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: TEAL }}
          >
            Para quem é
          </span>
          <h2
            className="mt-4 text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            style={{
              fontFamily:
                '"Bricolage Grotesque", "Inter Tight", system-ui, sans-serif',
              color: "#f4f7fb",
            }}
          >
            Esta pós-graduação é pra você que:
          </h2>

          <ul className="mt-10 space-y-6">
            {[
              "Já perdeu o sono pensando em como teria agido diferente num caso obstétrico difícil.",
              "Sente que a residência te preparou para a técnica, mas não para a emergência real.",
              "Quer atuar em maternidade com segurança — não com medo.",
              "Está se preparando para a prova de título e precisa dominar obstetrícia de verdade.",
              "Cansa de buscar respostas em grupos de WhatsApp quando deveria ter o protocolo na cabeça.",
            ].map((item, i) => (
              <li key={i} className="flex gap-5">
                <span
                  className="mt-2 h-px w-8 shrink-0"
                  style={{ backgroundColor: GOLD }}
                />
                <span
                  className="text-base leading-relaxed sm:text-lg"
                  style={{ color: "rgba(232,238,245,0.9)" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer
        className="border-t px-5 py-10 text-center text-xs tracking-[0.2em]"
        style={{
          borderColor: "rgba(94,234,212,0.1)",
          color: "rgba(232,238,245,0.4)",
        }}
      >
        DR. FRANCISCO AMARAL  ·  ANESTESIA OBSTÉTRICA
      </footer>
    </main>
  );
}
