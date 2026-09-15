CREATE OR REPLACE FUNCTION public.quiz_aula_magna_cta_click(p_session_id uuid, p_quiz_slug text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  IF p_session_id IS NULL OR p_quiz_slug IS DISTINCT FROM 'quiz-aula-magna' THEN
    RAISE EXCEPTION 'Invalid quiz CTA click';
  END IF;

  UPDATE public.quiz_sessions
  SET cta_clicked_at = COALESCE(cta_clicked_at, now()),
      last_activity_at = now()
  WHERE session_id = p_session_id
    AND quiz_slug = p_quiz_slug;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Quiz session not found';
  END IF;
END;
$function$;