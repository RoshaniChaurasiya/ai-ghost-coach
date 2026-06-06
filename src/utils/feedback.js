/**
 * Normalizes Gemini output into a consistent feedback shape.
 */
export function parseFeedback(raw) {
  let data = raw;

  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    const jsonMatch = trimmed.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('AI response was not valid JSON.');
    }
    data = JSON.parse(jsonMatch[0]);
  }

  const score = data.overallScore ?? data.score ?? '';
  const numericScore =
    typeof score === 'number'
      ? score
      : parseFloat(String(score).replace(/[^\d.]/g, ''), 10);

  return {
    overallScore: Number.isFinite(numericScore) ? numericScore : score,
    strengths: Array.isArray(data.strengths) ? data.strengths : [],
    areasToImprove: Array.isArray(data.areasToImprove)
      ? data.areasToImprove
      : Array.isArray(data.improvements)
        ? data.improvements
        : [],
    priorityFix: data.priorityFix ?? data.priority ?? '',
    drillSuggestion: data.drillSuggestion ?? data.drill ?? '',
    confidenceLevel: data.confidenceLevel ?? data.confidence ?? '',
  };
}

export function formatScore(score) {
  if (score === '' || score == null) return '—';
  const num = typeof score === 'number' ? score : parseFloat(score, 10);
  if (Number.isFinite(num)) return `${num}/10`;
  return String(score);
}
