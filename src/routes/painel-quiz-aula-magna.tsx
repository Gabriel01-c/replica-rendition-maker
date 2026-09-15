import { FormEvent, useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LogOut, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import "./painel-quiz-aula-magna.css";

export const Route = createFileRoute("/painel-quiz-aula-magna")({
  head: () => ({
    meta: [
      { title: "Painel do Quiz | Aula Magna" },
      { name: "description", content: "Painel privado de métricas agregadas do Quiz Aula Magna." },
      { property: "og:title", content: "Painel do Quiz | Aula Magna" },
      { property: "og:description", content: "Painel privado de métricas agregadas do Quiz Aula Magna." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: QuizDashboard,
});

type Period = "all" | "today" | "7d" | "30d";
type Summary = { starts: number; completions: number; completion_rate: number; average_score: number };
type FunnelStep = { label: string; sessions: number; abandoned: number; abandonment_rate: number };
type QuestionMetric = { question_number: number; reached: number; answers: number; option_a: number; option_b: number; option_c: number; option_d: number; accuracy: number };
type DashboardData = { summary: Summary; funnel: FunnelStep[]; questions: QuestionMetric[]; generated_at: string };

const passwordKey = "quiz-aula-magna-dashboard-password";

function isDashboardData(value: unknown): value is DashboardData {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<DashboardData>;
  return Boolean(candidate.summary && Array.isArray(candidate.funnel) && Array.isArray(candidate.questions));
}

function QuizDashboard() {
  const [password, setPassword] = useState("");
  const [period, setPeriod] = useState<Period>("all");
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  const loadDashboard = useCallback(async (credential: string, selectedPeriod: Period) => {
    setLoading(true);
    setError("");
    const { data: result, error: rpcError } = await supabase.rpc("quiz_aula_magna_dashboard", {
      p_password: credential,
      p_period: selectedPeriod,
    });
    if (rpcError || !isDashboardData(result)) {
      setData(null);
      setError(rpcError?.code === "42501" ? "Senha incorreta." : "Não foi possível carregar os dados.");
      setLoading(false);
      return false;
    }
    setData(result);
    setLoading(false);
    return true;
  }, []);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(passwordKey);
    if (!stored) { setReady(true); return; }
    setPassword(stored);
    void loadDashboard(stored, "all").then((valid) => {
      if (!valid) window.sessionStorage.removeItem(passwordKey);
      setReady(true);
    });
  }, [loadDashboard]);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valid = await loadDashboard(password, period);
    if (valid) window.sessionStorage.setItem(passwordKey, password);
  }

  function signOut() {
    window.sessionStorage.removeItem(passwordKey);
    setPassword("");
    setData(null);
    setError("");
  }

  if (!ready || (loading && !data)) return <main className="quiz-dashboard"><div className="qd-state"><div><div className="qd-spinner" /><p>Carregando painel…</p></div></div></main>;

  if (!data) return (
    <main className="quiz-dashboard">
      <div className="qd-login">
        <form className="qd-login-card" onSubmit={signIn}>
          <p className="qd-kicker">Acesso restrito</p>
          <h1>Painel do Quiz</h1>
          <p className="qd-copy">Digite a senha administrativa para acessar as métricas agregadas.</p>
          <label htmlFor="dashboard-password">Senha</label>
          <input id="dashboard-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          <Button className="qd-button" type="submit" disabled={loading}>{loading ? "Verificando…" : "Entrar"}</Button>
          {error && <p className="qd-error" role="alert">{error}</p>}
        </form>
      </div>
    </main>
  );

  const maximum = Math.max(data.summary.starts, 1);
  return (
    <main className="quiz-dashboard">
      <div className="qd-shell">
        <header className="qd-header">
          <div><p className="qd-kicker">Aula Magna Emergência Obstétrica</p><h1>Desempenho do quiz</h1></div>
          <div className="qd-actions">
            <select aria-label="Período" value={period} onChange={(event) => { const next = event.target.value as Period; setPeriod(next); void loadDashboard(password, next); }}>
              <option value="all">Todo o período</option><option value="today">Hoje</option><option value="7d">Últimos 7 dias</option><option value="30d">Últimos 30 dias</option>
            </select>
            <Button className="qd-icon-button" variant="outline" size="icon" onClick={() => void loadDashboard(password, period)} disabled={loading} title="Atualizar"><RefreshCw aria-hidden="true" /></Button>
            <Button className="qd-icon-button" variant="outline" size="icon" onClick={signOut} title="Sair"><LogOut aria-hidden="true" /></Button>
          </div>
        </header>

        {error && <p className="qd-error" role="alert">{error}</p>}
        <section className="qd-summary" aria-label="Resumo">
          <div className="qd-card"><span>Inícios</span><strong>{data.summary.starts}</strong></div>
          <div className="qd-card"><span>Conclusões</span><strong>{data.summary.completions}</strong></div>
          <div className="qd-card"><span>Taxa de conclusão</span><strong>{data.summary.completion_rate}%</strong></div>
          <div className="qd-card"><span>Média de acertos</span><strong>{data.summary.average_score}/7</strong></div>
        </section>

        <section className="qd-section">
          <div className="qd-section-head"><h2>Funil e abandono</h2><span>{loading ? "Atualizando…" : "Sessões por etapa"}</span></div>
          <div className="qd-funnel">
            {data.funnel.map((step) => <div className="qd-funnel-row" key={step.label}><strong>{step.label}</strong><div className="qd-track"><div className="qd-fill" style={{ width: `${(step.sessions / maximum) * 100}%` }} /></div><span className="qd-loss">{step.sessions} · −{step.abandoned} ({step.abandonment_rate}%)</span></div>)}
          </div>
        </section>

        <section className="qd-section">
          <div className="qd-section-head"><h2>Desempenho por pergunta</h2><span>Distribuição das alternativas</span></div>
          {data.summary.starts === 0 ? <p className="qd-copy">Ainda não há respostas neste período.</p> : <div className="qd-table-wrap"><table><thead><tr><th>Pergunta</th><th>Chegaram</th><th>Respostas</th><th>A</th><th>B</th><th>C</th><th>D</th><th>Acerto</th></tr></thead><tbody>{data.questions.map((question) => <tr key={question.question_number}><td><strong>Pergunta {question.question_number}</strong></td><td>{question.reached}</td><td>{question.answers}</td><td>{question.option_a}%</td><td>{question.option_b}%</td><td>{question.option_c}%</td><td>{question.option_d}%</td><td className="qd-accuracy">{question.accuracy}%</td></tr>)}</tbody></table></div>}
        </section>
      </div>
    </main>
  );
}