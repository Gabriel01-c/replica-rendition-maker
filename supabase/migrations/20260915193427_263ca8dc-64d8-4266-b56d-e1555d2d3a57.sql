CREATE OR REPLACE FUNCTION public.quiz_aula_magna_dashboard(p_password text, p_period text DEFAULT 'all'::text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'extensions', 'pg_temp'
AS $function$
DECLARE
  v_from timestamptz;
  v_result jsonb;
  v_password_hash constant text := '$2a$12$A9rlMrxGS585LwWhd6Qoq.tor33L64CJaC0x1SANKnu49yNnvwKua';
BEGIN
  IF p_password IS NULL OR crypt(p_password, v_password_hash) IS DISTINCT FROM v_password_hash THEN
    RAISE EXCEPTION 'Invalid dashboard password' USING ERRCODE = '42501';
  END IF;

  v_from := CASE p_period
    WHEN 'today' THEN date_trunc('day', now())
    WHEN '7d' THEN now() - interval '7 days'
    WHEN '30d' THEN now() - interval '30 days'
    WHEN 'all' THEN NULL
    ELSE NULL
  END;

  IF p_period NOT IN ('all', 'today', '7d', '30d') THEN
    RAISE EXCEPTION 'Invalid dashboard period';
  END IF;

  WITH filtered_sessions AS (
    SELECT * FROM public.quiz_sessions
    WHERE quiz_slug = 'quiz-aula-magna'
      AND (v_from IS NULL OR started_at >= v_from)
  ),
  filtered_answers AS (
    SELECT a.*
    FROM public.quiz_answers a
    JOIN filtered_sessions s ON s.session_id = a.session_id
    WHERE a.quiz_slug = 'quiz-aula-magna'
  ),
  numbers AS (
    SELECT generate_series(1, 7) AS question_number
  ),
  scores AS (
    SELECT generate_series(0, 7) AS score
  ),
  summary AS (
    SELECT count(*)::int AS starts,
      count(*) FILTER (WHERE completed_at IS NOT NULL)::int AS completions,
      COALESCE(round(100.0 * count(*) FILTER (WHERE completed_at IS NOT NULL) / NULLIF(count(*), 0), 1), 0) AS completion_rate,
      COALESCE(round(avg(score) FILTER (WHERE completed_at IS NOT NULL), 2), 0) AS average_score
    FROM filtered_sessions
  ),
  questions AS (
    SELECT n.question_number,
      (SELECT count(*)::int FROM filtered_sessions s WHERE s.last_question_reached >= n.question_number) AS reached,
      count(a.id)::int AS answers,
      COALESCE(round(100.0 * count(*) FILTER (WHERE a.selected_option = 1) / NULLIF(count(a.id), 0), 1), 0) AS option_a,
      COALESCE(round(100.0 * count(*) FILTER (WHERE a.selected_option = 2) / NULLIF(count(a.id), 0), 1), 0) AS option_b,
      COALESCE(round(100.0 * count(*) FILTER (WHERE a.selected_option = 3) / NULLIF(count(a.id), 0), 1), 0) AS option_c,
      COALESCE(round(100.0 * count(*) FILTER (WHERE a.selected_option = 4) / NULLIF(count(a.id), 0), 1), 0) AS option_d,
      COALESCE(round(100.0 * count(*) FILTER (WHERE a.is_correct) / NULLIF(count(a.id), 0), 1), 0) AS accuracy
    FROM numbers n
    LEFT JOIN filtered_answers a ON a.question_number = n.question_number
    GROUP BY n.question_number ORDER BY n.question_number
  ),
  score_distribution AS (
    SELECT scores.score, count(fs.session_id)::int AS completions,
      COALESCE(round(100.0 * count(fs.session_id) / NULLIF((SELECT completions FROM summary), 0), 1), 0) AS percentage
    FROM scores
    LEFT JOIN filtered_sessions fs ON fs.score = scores.score AND fs.completed_at IS NOT NULL
    GROUP BY scores.score ORDER BY scores.score
  ),
  cta AS (
    SELECT count(*) FILTER (WHERE cta_clicked_at IS NOT NULL)::int AS unique_clicks,
      COALESCE(round(100.0 * count(*) FILTER (WHERE cta_clicked_at IS NOT NULL) / NULLIF(count(*) FILTER (WHERE completed_at IS NOT NULL), 0), 1), 0) AS click_rate
    FROM filtered_sessions WHERE completed_at IS NOT NULL
  ),
  stages AS (
    SELECT 0 AS stage_order, 'Início'::text AS label, (SELECT starts FROM summary) AS sessions
    UNION ALL
    SELECT n.question_number, 'Pergunta ' || n.question_number,
      (SELECT count(*)::int FROM filtered_answers a WHERE a.question_number = n.question_number)
    FROM numbers n
    UNION ALL SELECT 8, 'Conclusão', (SELECT completions FROM summary)
  ),
  funnel AS (
    SELECT stage_order, label, sessions,
      GREATEST(COALESCE(lag(sessions) OVER (ORDER BY stage_order), sessions) - sessions, 0)::int AS abandoned,
      COALESCE(round(100.0 * GREATEST(COALESCE(lag(sessions) OVER (ORDER BY stage_order), sessions) - sessions, 0)
        / NULLIF(lag(sessions) OVER (ORDER BY stage_order), 0), 1), 0) AS abandonment_rate
    FROM stages
  )
  SELECT jsonb_build_object(
    'summary', (SELECT to_jsonb(summary) FROM summary),
    'funnel', COALESCE((SELECT jsonb_agg(to_jsonb(funnel) - 'stage_order' ORDER BY stage_order) FROM funnel), '[]'::jsonb),
    'questions', COALESCE((SELECT jsonb_agg(to_jsonb(questions) ORDER BY question_number) FROM questions), '[]'::jsonb),
    'score_distribution', COALESCE((SELECT jsonb_agg(to_jsonb(score_distribution) ORDER BY score) FROM score_distribution), '[]'::jsonb),
    'cta', (SELECT to_jsonb(cta) FROM cta),
    'generated_at', now()
  ) INTO v_result;
  RETURN v_result;
END;
$function$;