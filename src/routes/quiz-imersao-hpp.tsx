import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import "./live-secreta.css";

export const Route = createFileRoute("/live-secreta")({
  head: () => ({
    meta: [
      { title: "Teste Clínico | Imersão Hemorragia Pós-Parto" },
      {
        name: "description",
        content:
          "Teste clínico com 8 decisões sobre a condução da hemorragia pós-parto.",
      },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: "/live-secreta/assets/dr-francisco-480.webp",
        type: "image/webp",
        media: "(max-width: 600px)",
      },
      {
        rel: "preload",
        as: "image",
        href: "/live-secreta/assets/dr-francisco-800.webp",
        type: "image/webp",
        media: "(min-width: 601px)",
      },
    ],
  }),
  component: LiveSecreta,
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
  {
    eyebrow: "Primeira resposta",
    title: "Você reconhece a HPP antes do colapso?",
    scenario: "Após uma cesariana, a perda sanguínea objetivamente estimada é de 350 mL. A paciente apresenta FC 108 bpm e PA 98/60 mmHg. Qual é a melhor decisão neste momento?",
    choices: [
      "Aguardar a perda alcançar 500 mL para caracterizar HPP.",
      "Aguardar a perda alcançar 1.000 mL, por se tratar de cesariana.",
      "Iniciar a resposta à HPP: há perda ≥ 300 mL associada a sinais hemodinâmicos anormais.",
      "Solicitar hemoglobina e aguardar o resultado antes de intervir.",
    ],
    correct: 2,
    correctFeedback: "A resposta não deve depender apenas de a perda chegar a 500 ou 1.000 mL. A associação entre perda objetiva e alterações hemodinâmicas já exige o pacote de primeira resposta.",
    wrongFeedback: "O ponto crítico é não esperar um volume isolado. A gestante pode compensar inicialmente e deteriorar antes que a hipotensão pareça grave.",
  },
  {
    eyebrow: "Leitura hemodinâmica",
    title: "O que o índice de choque revela?",
    scenario: "Durante uma HPP, a paciente apresenta frequência cardíaca de 112 bpm e pressão arterial sistólica de 100 mmHg. Como esse dado deve ser interpretado?",
    choices: [
      "Índice de choque de 0,89; resultado tranquilizador.",
      "Índice de choque de 1,12; sinal de alerta que deve acelerar a avaliação e o escalonamento.",
      "Índice de choque de 2,12; indicação isolada e obrigatória de transfusão maciça.",
      "O índice de choque não é útil na paciente obstétrica.",
    ],
    correct: 1,
    correctFeedback: "O índice de choque é FC ÷ PAS. Aqui, 112 ÷ 100 = 1,12. Um resultado acima de 1 aumenta a preocupação com instabilidade e necessidade de escalonamento.",
    wrongFeedback: "A pressão isolada pode transmitir falsa segurança. O resultado de 1,12 não determina sozinho uma transfusão, mas deve acelerar a avaliação do sangramento, da perfusão e da resposta.",
  },
  {
    eyebrow: "Sequência inicial",
    title: "Qual frente vem primeiro?",
    scenario: "A equipe suspeita de HPP por atonia uterina. Qual alternativa representa melhor a atuação nos primeiros minutos?",
    choices: [
      "Instalar monitorização invasiva e aguardar exames antes de começar o tratamento.",
      "Administrar grande volume de cristaloide e observar antes de acionar outros recursos.",
      "Coordenar a equipe, quantificar a perda, garantir acessos e perfusão, tratar e buscar o controle da causa em paralelo.",
      "Corrigir a pressão com vasopressor e considerar o problema controlado se ela normalizar.",
    ],
    correct: 2,
    correctFeedback: "Na HPP, diagnóstico, ressuscitação e controle da fonte acontecem simultaneamente. Os primeiros minutos servem para impedir o atraso cumulativo.",
    wrongFeedback: "A emergência não deve ser conduzida de forma linear. Não se espera exame, resposta ao cristaloide ou monitorização invasiva para iniciar as medidas essenciais.",
  },
  {
    eyebrow: "Tratamento tempo-dependente",
    title: "Quando entra o ácido tranexâmico?",
    scenario: "A HPP foi clinicamente diagnosticada e o parto ocorreu há menos de três horas. Qual conduta está mais alinhada ao uso terapêutico do TXA?",
    choices: [
      "Reservá-lo para quando todos os uterotônicos e procedimentos tiverem falhado.",
      "Administrar 1 g IV em 10 minutos precocemente; repetir 1 g se o sangramento continuar após 30 minutos ou reiniciar em até 24 horas.",
      "Utilizá-lo apenas quando exames confirmarem coagulopatia.",
      "Administrá-lo profilaticamente a todas as pacientes, mesmo sem diagnóstico de HPP.",
    ],
    correct: 1,
    correctFeedback: "O TXA terapêutico é tempo-dependente. Seu lugar é no tratamento precoce da HPP diagnosticada, junto às demais medidas, e não como último recurso.",
    wrongFeedback: "A armadilha é tratar o TXA como resgate tardio. O benefício é maior quando ele é administrado cedo, dentro da janela recomendada.",
  },
  {
    eyebrow: "Escolha farmacológica",
    title: "A comorbidade muda sua escolha?",
    scenario: "Uma paciente com pré-eclâmpsia grave e pressão arterial elevada apresenta atonia persistente após a ocitocina. O que deve pesar na escolha do próximo uterotônico?",
    choices: [
      "A metilergometrina é preferencial justamente por elevar a pressão arterial.",
      "A metilergometrina deve ser evitada pelo risco de vasoconstrição e agravamento da hipertensão.",
      "As comorbidades não interferem na escolha dos uterotônicos.",
      "Todo uterotônico de segunda linha possui o mesmo perfil de contraindicações.",
    ],
    correct: 1,
    correctFeedback: "A escolha do uterotônico precisa considerar as comorbidades. Em doença hipertensiva, a metilergometrina pode ampliar o risco materno.",
    wrongFeedback: "Saber o nome do fármaco não basta. A metilergometrina exige especial cautela e deve ser evitada diante de hipertensão ou pré-eclâmpsia.",
  },
  {
    eyebrow: "Controle da causa",
    title: "Quando deixa de ser “só atonia”?",
    scenario: "Apesar do tratamento inicial, o sangramento continua. Ao exame, o útero está firme e contraído. Qual deve ser o próximo raciocínio?",
    choices: [
      "Repetir indefinidamente uterotônicos, porque toda HPP decorre de atonia.",
      "Considerar trauma, retenção de tecido, coagulopatia ou sangramento oculto e buscar o controle da fonte.",
      "Interromper a investigação, porque o útero contraído exclui hemorragia relevante.",
      "Manter apenas vasopressor até a estabilização da pressão arterial.",
    ],
    correct: 1,
    correctFeedback: "Atonia é frequente, mas não explica todos os casos. Útero firme com sangramento persistente exige mudança de hipótese e investigação rápida das demais causas.",
    wrongFeedback: "Persistir na hipótese errada gera atraso. É hora de reavaliar trauma, tecido, coagulação e a possibilidade de sangramento oculto.",
  },
  {
    eyebrow: "Ressuscitação hemostática",
    title: "Como interpretar o fibrinogênio?",
    scenario: "Uma paciente permanece com HPP ativa e apresenta fibrinogênio de 170 mg/dL. Qual é a melhor interpretação?",
    choices: [
      "O valor é aceitável e não exige atenção durante a hemorragia obstétrica.",
      "O resultado só importa depois que a hemoglobina estiver criticamente baixa.",
      "É hipofibrinogenemia relevante; considerar reposição conforme o protocolo e corrigir também cálcio, temperatura e pH.",
      "O resultado indica que apenas cristaloide aquecido é suficiente.",
    ],
    correct: 2,
    correctFeedback: "Na gestação, o fibrinogênio basal é mais alto. Durante HPP ativa, valor abaixo de 200 mg/dL é um sinal importante para reposição hemostática conforme o protocolo.",
    wrongFeedback: "O fibrinogênio pode cair precocemente na HPP grave. Esperar apenas pela hemoglobina pode atrasar a correção da coagulopatia.",
  },
  {
    eyebrow: "Pós-cesariana",
    title: "E quando o sangramento não está visível?",
    scenario: "Na recuperação pós-anestésica, a paciente permanece hipotensa e exige doses crescentes de vasopressor. O sangramento vaginal parece pequeno e o útero está firme. Qual é a decisão mais segura?",
    choices: [
      "Atribuir a hipotensão ao bloqueio neuroaxial e manter apenas o vasopressor.",
      "Considerar que a HPP está excluída porque o sangramento vaginal é pequeno.",
      "Suspeitar de sangramento oculto, reavaliar perfusão e exames e acionar a equipe para localizar e controlar a fonte.",
      "Aguardar a próxima hemoglobina antes de comunicar a equipe.",
    ],
    correct: 2,
    correctFeedback: "Depois da cesariana, a ausência de sangramento vaginal volumoso não exclui hemorragia. Hipotensão persistente e necessidade crescente de vasopressor podem sinalizar perda oculta.",
    wrongFeedback: "O sangramento pode não estar visível. Confiar apenas na perda vaginal pode atrasar o diagnóstico de hemorragia intra-abdominal ou retroperitoneal.",
  },
];

const resultBands = [
  {
    max: 2,
    title: "Suas decisões ainda não seguem uma sequência segura.",
    diagnosis: "Você reconhece partes importantes da HPP, mas ainda pode perder o momento de agir ou escalar. Em uma emergência real, essa hesitação favorece atrasos sucessivos.",
    bridge: "Na Imersão Hemorragia Pós-Parto, o Dr. Francisco Amaral Egydio vai organizar essas decisões em um protocolo clínico aplicável — da primeira resposta à transfusão maciça.",
    cta: "Quero dominar o próximo passo",
  },
  {
    max: 5,
    title: "Você conhece as condutas, mas a sequência ainda pode falhar.",
    diagnosis: "Sua base existe, porém alguns pontos críticos ainda não estão automáticos: reconhecer antes da deterioração, escolher pela comorbidade e integrar ressuscitação e controle da fonte.",
    bridge: "Na imersão ao vivo, o Dr. Francisco vai transformar conhecimento fragmentado em uma linha de decisão clara, rápida e aplicável ao plantão obstétrico.",
    cta: "Quero aprimorar minha condução",
  },
  {
    max: 7,
    title: "Sua base é boa. Agora, ela precisa virar precisão sob pressão.",
    diagnosis: "Você reconhece a maior parte das decisões essenciais. O próximo nível é reduzir as zonas de dúvida e conectar farmacologia, hemodinâmica e controle da causa.",
    bridge: "A Imersão Hemorragia Pós-Parto foi criada para aprofundar essa condução com casos clínicos, raciocínio de escalonamento e decisões simultâneas.",
    cta: "Quero elevar minha precisão",
  },
  {
    max: 8,
    title: "Você domina os fundamentos. Agora, avance para os casos complexos.",
    diagnosis: "Você demonstrou uma leitura sólida da primeira resposta à HPP. Mas reconhecer os fundamentos em um teste é diferente de coordenar decisões simultâneas em um cenário real.",
    bridge: "Na imersão ao vivo, o Dr. Francisco vai avançar para a aplicação prática do protocolo, dos casos iniciais às situações de maior gravidade.",
    cta: "Quero avançar para os casos complexos",
  },
];

function track(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const target = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  target.dataLayer = target.dataLayer || [];
  target.dataLayer.push({ event, ...data });
}

function BrandLockup() {
  return (
    <div className="brand brand--compact" aria-label="Imersão Hemorragia Pós-Parto">
      <span>IMERSÃO</span><strong>HEMORRAGIA</strong><strong>PÓS-PARTO</strong>
    </div>
  );
}

export default function LiveSecreta() {
  const [stage, setStage] = useState<Stage>("intro");
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [offerUrl, setOfferUrl] = useState("https://anestesiotrends.com/imersao-hpp2/");

  useEffect(() => {
    const destination = new URL("https://anestesiotrends.com/imersao-hpp2/");
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
    <main className="hpp-page site-shell">
      <div className="top-strip">
        <div className="top-strip-track" aria-hidden="true">
          <span>Imersão Hemorragia Pós-Parto</span><b>✦</b><strong>Exclusivo para anestesiologistas</strong><b>✦</b>
          <span>Imersão Hemorragia Pós-Parto</span><b>✦</b><strong>Exclusivo para anestesiologistas</strong><b>✦</b>
        </div>
        <span className="sr-only">Imersão Hemorragia Pós-Parto — exclusivo para anestesiologistas</span>
      </div>

      {stage === "intro" && (
        <section className="intro-stage" aria-labelledby="intro-title">
          <div className="clinical-grid" />
          <div className="doctor-stage" aria-hidden="true">
            <div className="pulse-ring pulse-ring--one" /><div className="pulse-ring pulse-ring--two" /><div className="doctor-glow" />
            <picture>
              <source media="(max-width: 600px)" srcSet="/live-secreta/assets/dr-francisco-480.webp" />
              <img src="/live-secreta/assets/dr-francisco-800.webp" alt="" width={800} height={940} fetchPriority="high" loading="eager" decoding="async" className="doctor-image" />
            </picture>
            <img src="/live-secreta/assets/logo-imersao-hpp.webp" alt="" width={520} height={215} loading="eager" decoding="async" className="hero-logo" />
          </div>
          <div className="intro-copy">
            <div className="test-label"><span className="icon" aria-hidden="true">⌁</span>Teste clínico <span>•</span> 8 decisões</div>
            <h1 id="intro-title">Você confia na sua <span>conduta diante de uma HPP?</span> <em>Prove.</em></h1>
            <p className="intro-description">Enfrente 8 situações clínicas rápidas e descubra se sua tomada de decisão está preparada para agir sob pressão.</p>
            <button className="primary-cta" onClick={startQuiz}>Começar o teste <span aria-hidden="true">→</span></button>
            <div className="microcopy"><span className="icon" aria-hidden="true">◷</span>Leva cerca de 4 minutos <span>•</span> Resultado imediato</div>
          </div>
        </section>
      )}

      {stage === "question" && (
        <section className="quiz-stage" aria-labelledby="question-title">
          <header className="quiz-header">
            <BrandLockup />
            <div className="quiz-progress-copy"><span>Seu protocolo em ação</span><strong>{current + 1}/8</strong></div>
          </header>
          <div className="quiz-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={((current + 1) / questions.length) * 100} aria-label={`Progresso: pergunta ${current + 1} de 8`}><span style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div>
          <article className="question-card">
            <div className="question-kicker"><span>Caso clínico {String(current + 1).padStart(2, "0")}</span><span className="question-dot" />{question.eyebrow}</div>
            <h1 id="question-title">{question.title}</h1>
            <p className="scenario">{question.scenario}</p>
            <div className="choice-list" role="radiogroup" aria-label={`Alternativas da pergunta ${current + 1}`}>
              {question.choices.map((choice, index) => {
                const selected = answer === index;
                const correct = index === question.correct;
                const className = revealed ? (correct ? "choice choice--correct" : selected ? "choice choice--wrong" : "choice choice--muted") : selected ? "choice choice--selected" : "choice";
                return (
                  <label className={className} key={choice}>
                    <input type="radio" name={`hpp-question-${current}`} value={index} checked={selected} disabled={revealed} onChange={() => setAnswer(index)} /><span>{choice}</span>
                    {revealed && correct && <span className="choice-check" aria-hidden="true">✓</span>}
                    {revealed && selected && !correct && <span className="choice-x" aria-hidden="true">×</span>}
                  </label>
                );
              })}
            </div>
            {revealed && (
              <div className={isCorrect ? "feedback feedback--correct" : "feedback feedback--wrong"} role="status" aria-live="polite">
                <div className="feedback-icon" aria-hidden="true">{isCorrect ? "✓" : "×"}</div>
                <div><strong>{isCorrect ? "Decisão correta." : "A melhor decisão seria outra."}</strong><p>{isCorrect ? question.correctFeedback : question.wrongFeedback}</p></div>
              </div>
            )}
            <button className="primary-cta question-cta" disabled={answer === null} onClick={revealed ? advance : confirmAnswer}>
              {revealed ? (current === questions.length - 1 ? "Ver meu resultado" : "Próximo caso") : "Confirmar decisão"}<span aria-hidden="true">→</span>
            </button>
          </article>
          <p className="educational-note">Conteúdo educacional. A conduta assistencial deve considerar avaliação clínica, recursos disponíveis e protocolo institucional.</p>
        </section>
      )}

      {stage === "result" && (
        <section className="result-stage" aria-labelledby="result-title">
          <BrandLockup />
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
                track("quiz_cta_click", { score, destination: "imersao_hpp" });
                window.location.assign(offerUrl);
              }}
            >
              {result.cta}<span aria-hidden="true">→</span>
            </a>
          </article>
          <footer className="result-footer"><strong>Imersão Hemorragia Pós-Parto</strong><span>Protocolo de decisão • 27 de setembro • 9h às 17h • Ao vivo</span></footer>
        </section>
      )}
    </main>
  );
}
