import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import "./quiz-aula-magna.css";
import doctorMobile from "@/assets/quiz-aula-magna-francisco-480.webp.asset.json";
import doctorDesktop from "@/assets/quiz-aula-magna-francisco-800.webp.asset.json";
import fontAsset from "@/assets/quiz-aula-magna-inter-tight.woff2.asset.json";

export const Route = createFileRoute("/quiz-aula-magna")({
  head: () => ({
    meta: [
      { title: "Teste Clínico | Aula Magna Emergência Obstétrica" },
      { name: "description", content: "Teste clínico com 8 decisões sobre hipotensão, hemorragia e HELLP na emergência obstétrica." },
      { property: "og:title", content: "Teste Clínico | Aula Magna Emergência Obstétrica" },
      { property: "og:description", content: "Teste suas decisões clínicas em emergências obstétricas e receba um resultado imediato." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "preload", as: "font", href: fontAsset.url, type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", as: "image", href: doctorMobile.url, type: "image/webp", media: "(max-width: 600px)" },
      { rel: "preload", as: "image", href: doctorDesktop.url, type: "image/webp", media: "(min-width: 601px)" },
    ],
  }),
  component: QuizAulaMagna,
});

type Stage = "intro" | "question" | "result";

type Question = {
  eyebrow: string;
  title: string;
  scenario: string;
  choices: string[];
  correct: number;
  correctFeedback: string;
  wrongFeedback: string;
};

const questions: Question[] = [
{eyebrow:"Primeira resposta",title:"A pressão caiu: o que organiza sua decisão?",scenario:"Logo após raquianestesia para cesariana, ocorre queda da pressão arterial. A frequência cardíaca permanece disponível para interpretação e não há evidência de sangramento. A equipe se prepara para administrar um vasopressor. Qual princípio deve organizar a primeira decisão?",choices:["Definir uma meta hemodinâmica e escolher o vasopressor segundo a fisiologia e o padrão clínico observado.","Escolher previamente um único vasopressor e utilizá-lo em qualquer padrão hemodinâmico pós-raqui.","Aguardar sintomas maternos importantes antes de tratar, evitando interferir precocemente na pressão arterial.","Corrigir inicialmente apenas com volume e considerar vasopressor somente se essa estratégia falhar."],correct:0,correctFeedback:"A escolha farmacológica não deve ser automática. Ela precisa estar conectada à meta hemodinâmica, à frequência cardíaca e ao padrão fisiológico presente.",wrongFeedback:"A armadilha é transformar a hipotensão pós-raqui em uma resposta automática. Primeiro, interprete a alteração fisiológica e defina o objetivo hemodinâmico; então escolha o vasoativo por critério."},
{eyebrow:"Escolha do vasopressor",title:"Frequência cardíaca baixa: qual droga faz mais sentido?",scenario:"Após raquianestesia para cesariana, uma paciente apresenta queda da pressão arterial acompanhada de frequência cardíaca materna baixa. Não há evidência de hemorragia. O anestesiologista precisa selecionar o vasopressor considerando o efeito esperado sobre a frequência cardíaca.",choices:["Fenilefrina, porque sua tendência a reduzir a frequência cardíaca favorece esse padrão específico.","Efedrina, porque pode ser apropriada quando a hipotensão ocorre com frequência cardíaca materna baixa.","Fenilefrina, porque a frequência cardíaca não deve participar da escolha nesse contexto.","Adiar o vasopressor até que a hipotensão se torne clinicamente significativa."],correct:1,correctFeedback:"A frequência cardíaca modifica a escolha farmacológica. A fenilefrina pode reduzir reflexamente a frequência cardíaca; diante de frequência cardíaca baixa, a efedrina pode ser uma escolha coerente com o padrão apresentado.",wrongFeedback:"A armadilha é tratar todos os episódios de hipotensão pós-raqui da mesma maneira. Quando a frequência cardíaca está baixa, o perfil farmacodinâmico também precisa participar da decisão."},
{eyebrow:"Reconhecimento precoce",title:"Você esperaria o sangramento ficar maior?",scenario:"Após o parto, a perda sanguínea objetivamente medida chega a 350 mL. A paciente apresenta frequência cardíaca de 108 bpm e pressão arterial de 98/60 mmHg. A equipe considera aguardar maior volume antes de ativar a resposta.",choices:["Reconhecer o gatilho e iniciar a primeira resposta, integrando perda objetiva e alteração hemodinâmica.","Aguardar 500 mL de perda, pois volumes inferiores não justificam ativação da resposta à HPP.","Aguardar 1.000 mL de perda, utilizando esse volume como critério obrigatório para qualquer intervenção.","Solicitar hemoglobina e condicionar a ativação do protocolo ao resultado laboratorial."],correct:0,correctFeedback:"O reconhecimento não depende exclusivamente de atingir um volume isolado. Perda objetiva associada a alterações hemodinâmicas deve antecipar a primeira resposta.",wrongFeedback:"A armadilha é esperar um número tradicional enquanto sinais circulatórios já indicam deterioração. A leitura correta combina quantificação objetiva e fisiologia materna."},
{eyebrow:"Antifibrinólise precoce",title:"O TXA pode esperar a causa?",scenario:"Uma paciente desenvolve hemorragia pós-parto já diagnosticada. A equipe iniciou as medidas para controlar o sangramento, mas ainda investiga qual dos 4 Ts explica o quadro. Surge a dúvida sobre aguardar a definição etiológica antes do ácido tranexâmico.",choices:["Adiar o ácido tranexâmico até definir exatamente qual dos 4 Ts está causando o sangramento.","Associar precocemente ácido tranexâmico ao tratamento da HPP enquanto investigação e controle da causa prosseguem.","Reservar ácido tranexâmico exclusivamente para falha dos uterotônicos e das primeiras medidas mecânicas.","Utilizar ácido tranexâmico como substituto dos uterotônicos enquanto se aguarda a causa."],correct:1,correctFeedback:"O TXA integra a resposta precoce à HPP e não exige que a etiologia esteja completamente esclarecida. Ele ocorre em paralelo à investigação dos 4 Ts e ao controle da fonte.",wrongFeedback:"O erro é colocar em sequência medidas que deveriam ocorrer paralelamente. O TXA é antifibrinolítico e não substitui uterotônicos nem intervenções direcionadas à causa."},
{eyebrow:"Mudança de hipótese",title:"O útero contraiu. Por que ainda sangra?",scenario:"Durante o tratamento de hemorragia pós-parto inicialmente atribuída à atonia, o útero torna-se firme, porém o sangramento continua relevante. Uterotônicos já foram utilizados e a equipe cogita insistir na mesma hipótese.",choices:["Intensificar indefinidamente os uterotônicos, pois a atonia permanece a causa de toda HPP persistente.","Aguardar hipotensão importante antes de reconsiderar a causa e modificar a estratégia inicial.","Reavaliar imediatamente a etiologia pelos 4 Ts e direcionar a resposta para outra possível fonte hemorrágica.","Concentrar a condução exclusivamente na reposição volêmica até que novos exames determinem a causa."],correct:2,correctFeedback:"Útero firme com sangramento persistente enfraquece a hipótese de atonia como explicação única. O raciocínio deve voltar aos 4 Ts e avançar no controle da fonte.",wrongFeedback:"A armadilha é permanecer preso ao diagnóstico inicial apesar de a resposta clínica ter mudado. Persistência do sangramento obriga reavaliação causal e possível escalonamento."},
{eyebrow:"Decisão neuroaxial",title:"Uma contagem isolada decide o neuroaxial?",scenario:"Gestante com síndrome HELLP necessita definição da técnica anestésica. Existe uma contagem de plaquetas disponível, mas o quadro é dinâmico e há preocupação com possível evolução da plaquetopenia. A equipe discute decidir apenas pelo número registrado.",choices:["Utilizar exclusivamente a última contagem de plaquetas, porque a tendência não modifica a avaliação.","Desconsiderar a contagem plaquetária se não houver sangramento clínico evidente no momento.","Excluir automaticamente qualquer técnica neuroaxial sempre que houver diagnóstico de HELLP.","Considerar contagem, tendência das plaquetas, contexto clínico e atualidade da informação antes da decisão neuroaxial."],correct:3,correctFeedback:"HELLP é um cenário dinâmico. O número não deve virar autorização automática: contagem, tendência, contexto e atualidade da informação precisam ser interpretados em conjunto.",wrongFeedback:"A armadilha está nos extremos: confiar cegamente em um valor isolado ou excluir neuroaxial apenas pelo diagnóstico. A decisão deve ser contextual e considerar a evolução da plaquetopenia."},
{eyebrow:"Toxicidade do magnésio",title:"Quando o magnésio exige mudar a estratégia?",scenario:"Paciente com síndrome HELLP recebe sulfato de magnésio para profilaxia de convulsões. Durante a evolução, apresenta piora da função renal e achados compatíveis com acúmulo de magnésio. A equipe precisa reconhecer o novo risco farmacológico.",choices:["Manter a infusão sem alterações, pois a eliminação do magnésio não depende significativamente da função renal.","Aumentar o magnésio, pois a disfunção renal reduz sua concentração sérica e sua eficácia anticonvulsivante.","Interromper o magnésio, avaliar a toxicidade e considerar gluconato de cálcio intravenoso como antagonista.","Substituir automaticamente o magnésio sem relacionar os achados clínicos à função renal."],correct:2,correctFeedback:"O magnésio é eliminado principalmente pelos rins; a disfunção renal eleva o risco de acúmulo. Na suspeita de toxicidade, deve-se interromper a administração, avaliar e considerar gluconato de cálcio intravenoso.",wrongFeedback:"A armadilha é dissociar o magnésio da função renal. Sua deterioração pode transformar um esquema habitual em risco de acúmulo e exige reavaliação imediata da estratégia."},
{eyebrow:"Caso integrado",title:"Quando HELLP e hemorragia mudam sua escolha?",scenario:"Paciente com pré-eclâmpsia/HELLP evolui após o parto com hemorragia pós-parto e útero hipotônico. A resposta inicial à ocitocina é inadequada. A equipe considera escalar o uterotônico enquanto mantém TXA, ressuscitação e investigação da causa.",choices:["Manter TXA associado à resposta da HPP enquanto prossegue o controle da causa hemorrágica.","Escalonar o tratamento da atonia considerando as contraindicações maternas antes do próximo uterotônico.","Manter investigação dos 4 Ts em paralelo, caso o sangramento persista apesar da melhora do tônus.","Administrar metilergometrina apesar da doença hipertensiva, priorizando seu efeito uterotônico."],correct:3,correctFeedback:"O caso exige integrar as emergências. A metilergometrina deve ser evitada em doença hipertensiva; o escalonamento precisa respeitar as contraindicações maternas.",wrongFeedback:"A armadilha é pensar apenas no efeito uterotônico e esquecer o contexto materno. A escolha da droga continua dependente das contraindicações, mesmo sob pressão."}
];
const resultBands = [
{max:2,title:"Sua conduta ainda pode perder o momento de agir.",diagnosis:"Você reconhece partes importantes, mas ainda existem lacunas entre identificar a emergência, escolher a droga e saber quando mudar a estratégia.",bridge:"Na Aula Magna, o Dr. Francisco vai organizar hipotensão, hemorragia e HELLP em uma linha de decisão clínica — da primeira alteração ao controle do caso grave.",cta:"Quero organizar minha conduta"},
{max:5,title:"Você conhece as condutas, mas a sequência ainda pode falhar.",diagnosis:"Sua base existe, porém algumas decisões ainda parecem fragmentadas. Em uma emergência, o desafio é conectar fisiologia, farmacologia e escalonamento sem depender do improviso.",bridge:"A Aula Magna Emergência Obstétrica foi criada para transformar conhecimento isolado em uma sequência clara e aplicável ao plantão.",cta:"Quero aprimorar minha condução"},
{max:7,title:"Sua base é boa. Agora ela precisa virar precisão sob pressão.",diagnosis:"Você reconhece a maior parte das decisões essenciais. O próximo nível é reduzir as zonas de dúvida e conectar a droga certa ao momento clínico certo.",bridge:"Na Aula Magna, o Dr. Francisco aprofunda as decisões de hipotensão, hemorragia e HELLP com raciocínio prático e casos clínicos.",cta:"Quero elevar minha precisão"},
{max:8,title:"Você domina os fundamentos. Agora avance para os casos complexos.",diagnosis:"Você demonstrou uma leitura sólida das principais decisões. Mas acertar em um teste é diferente de coordenar escolhas simultâneas quando o caso se agrava.",bridge:"Na Aula Magna, o Dr. Francisco vai levar essa base para a aplicação prática — da primeira queda de pressão ao controle do sangramento.",cta:"Quero avançar nos casos complexos"}
];

function track(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const target = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  target.dataLayer = target.dataLayer || [];
  target.dataLayer.push({ event, ...data });
}

function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand-lockup${compact ? " compact" : ""}`} aria-label="Aula Magna Emergência Obstétrica">
      <small>Aula Magna</small><strong>Emergência</strong><strong>Obstétrica</strong>
    </div>
  );
}

function QuizAulaMagna() {
  const [stage, setStage] = useState<Stage>("intro");
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [offerUrl, setOfferUrl] = useState("https://anestesiotrends.com/aula-magna/");

  useEffect(() => {
    const destination = new URL("https://anestesiotrends.com/aula-magna/");
    const incoming = new URLSearchParams(window.location.search);
    incoming.forEach((value, key) => {
      if (key.startsWith("utm_") || key === "gclid" || key === "fbclid") destination.searchParams.set(key, value);
    });
    setOfferUrl(destination.toString());
  }, []);

  const question = questions[current];
  const isCorrect = answer === question?.correct;
  const result = useMemo(() => resultBands.find((band) => score <= band.max) || resultBands[3], [score]);

  function startQuiz() {
    setCurrent(0); setAnswer(null); setRevealed(false); setScore(0); setStage("question");
    track("quiz_start");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function confirmAnswer() {
    if (answer === null || revealed) return;
    const correct = answer === question.correct;
    if (correct) setScore((value) => value + 1);
    setRevealed(true);
    track("quiz_answer", { question: current + 1, answer: answer + 1, correct });
  }

  function advance() {
    if (current === questions.length - 1) {
      setStage("result");
      track("quiz_complete", { score, band: result.title });
    } else {
      setCurrent((value) => value + 1); setAnswer(null); setRevealed(false);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="aula-magna-quiz site-shell">
      <div className="top-strip">
        <div className="strip-track" aria-hidden="true">
          <span>Aula Magna Emergência Obstétrica</span><b>✦</b><strong>Exclusivo para anestesiologistas</strong><b>✦</b>
          <span>Aula Magna Emergência Obstétrica</span><b>✦</b><strong>Exclusivo para anestesiologistas</strong><b>✦</b>
        </div>
        <span className="sr-only">Aula Magna Emergência Obstétrica — exclusivo para anestesiologistas</span>
      </div>

      {stage === "intro" && (
        <section className="intro" aria-labelledby="intro-title">
          <div className="doctor-stage" aria-hidden="true">
            <picture>
              <source media="(max-width: 600px)" srcSet={doctorMobile.url} />
              <img src={doctorDesktop.url} alt="" width={800} height={1000} fetchPriority="high" loading="eager" decoding="async" className="doctor-image" />
            </picture>
            <BrandLockup />
          </div>
          <div className="intro-copy">
            <div className="test-label">Teste clínico • 8 decisões</div>
            <h1 id="intro-title">Você confia na sua conduta diante de uma <span>emergência obstétrica?</span> <em>Prove.</em></h1>
            <p className="intro-description">Enfrente 8 decisões clínicas sobre hipotensão, hemorragia e HELLP e descubra se você sabe qual droga usar e qual passo vem depois quando o caso se agrava.</p>
            <button className="primary-cta" onClick={startQuiz}>Começar o teste <span aria-hidden="true">→</span></button>
            <p className="microcopy">◷ Leva cerca de 4 minutos &nbsp;•&nbsp; Resultado imediato</p>
          </div>
        </section>
      )}

      {stage === "question" && (
        <section className="quiz-stage" aria-labelledby="question-title">
          <header className="quiz-header">
            <BrandLockup compact />
            <div className="progress-copy"><span>Seu raciocínio em ação</span><strong>{current + 1}/8</strong></div>
          </header>
          <div className="progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={((current + 1) / questions.length) * 100} aria-label={`Progresso: pergunta ${current + 1} de 8`}><span style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div>
          <article className="question-card">
            <div className="question-kicker"><span>Caso clínico {String(current + 1).padStart(2, "0")}</span><span className="dot" />{question.eyebrow}</div>
            <h1 id="question-title">{question.title}</h1>
            <p className="scenario">{question.scenario}</p>
            <div className="choice-list" role="radiogroup" aria-label={`Alternativas da pergunta ${current + 1}`}>
              {question.choices.map((choice, index) => {
                const selected = answer === index;
                const correct = index === question.correct;
                const className = revealed ? (correct ? "choice correct" : selected ? "choice wrong" : "choice muted") : selected ? "choice selected" : "choice";
                return (
                  <label className={className} key={choice}>
                    <input type="radio" name={`aula-magna-question-${current}`} value={index} checked={selected} disabled={revealed} onChange={() => setAnswer(index)} /><span>{String.fromCharCode(65 + index)}) {choice}</span>
                    {revealed && correct && <span className="mark" aria-hidden="true">✓</span>}
                    {revealed && selected && !correct && <span className="mark" aria-hidden="true">×</span>}
                  </label>
                );
              })}
            </div>
            {revealed && (
              <div className={isCorrect ? "feedback good" : "feedback bad"} role="status" aria-live="polite">
                <div className="feedback-icon" aria-hidden="true">{isCorrect ? "✓" : "×"}</div>
                <div><strong>{isCorrect ? "Decisão correta." : "A melhor decisão seria outra."}</strong><p>{isCorrect ? question.correctFeedback : question.wrongFeedback}</p></div>
              </div>
            )}
            <button className="primary-cta question-cta" disabled={answer === null} onClick={revealed ? advance : confirmAnswer}>
              {revealed ? (current === questions.length - 1 ? "Ver meu resultado" : "Próximo caso") : "Confirmar decisão"}<span aria-hidden="true">→</span>
            </button>
          </article>
          <p className="note">Conteúdo educacional em validação pelo Dr. Francisco. A conduta assistencial deve considerar avaliação clínica, recursos disponíveis e protocolo institucional.</p>
        </section>
      )}

      {stage === "result" && (
        <section className="result-stage" aria-labelledby="result-title">
          <BrandLockup compact />
          <article className="result-card">
            <span className="result-eyebrow">Seu resultado</span>
            <div className="result-score"><strong>{score}</strong><span>/8</span></div>
            <h1 id="result-title">{result.title}</h1>
            <p className="result-diagnosis">{result.diagnosis}</p>
            <div className="result-bridge"><span>O próximo passo</span><p>{result.bridge}</p></div>
            <a
              className="primary-cta result-cta"
              href={offerUrl}
              target="_self"
              onClick={(event) => {
                event.preventDefault();
                track("quiz_cta_click", { score, destination: "aula_magna" });
                window.location.assign(offerUrl);
              }}
            >
              {result.cta}<span aria-hidden="true">→</span>
            </a>
          </article>
          <footer className="result-footer"><strong>Aula Magna Emergência Obstétrica</strong><span>Hipotensão • Hemorragia • HELLP</span></footer>
        </section>
      )}
    </main>
  );
}
