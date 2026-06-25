const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

async function groqChat(messages: any[], options: any = {}) {
  if (!GROQ_API_KEY) throw new Error("VITE_GROQ_API_KEY not configured");
  const res = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_API_KEY}` },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 1500,
      response_format: options.jsonMode ? { type: "json_object" } : undefined,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Groq API error ${res.status}`);
  }
  const data = await res.json();
  return data.choices[0].message.content;
}

const QIDS_SYSTEM_PROMPT = `You are the QIDS (Quadrant Intelligence Development System) assessment agent.
QIDS measures four intelligence pillars:
- IQ (Intelligence Quotient): Verbal, Quantitative, Psychometric, Performance
- EQ (Emotional Quotient): Self-Awareness, Emotion Regulation, Self-Motivation, Empathy, Interpersonal Skills
- SQ (Social Quotient): Assessment Centre, Cognitive Social Intelligence, Performance Activities
- AQ (Adversity Quotient): Situational Agility, Proactive Momentum, Relational Resilience, Regenerative Capacity
Always respond with valid JSON only. No markdown, no explanation outside JSON.`;

export async function generateIQQuestions({
  ageGroup,
  section,
  count = 3,
  context = "individual",
}: any) {
  const sectionDescriptions: Record<string, string> = {
    verbal: "verbal reasoning, vocabulary, comprehension, analogies",
    quantitative: "numerical reasoning, arithmetic, pattern sequences",
    psychometric: "abstract reasoning, spatial intelligence, pattern recognition",
    performance: "real-world problem solving, creative thinking, decision making",
  };
  const prompt = `Generate ${count} IQ assessment questions for the "${section}" sub-section.
Age group: ${ageGroup === "11-18" ? "11-18 years" : "19-32 years"}. Context: ${context}.
Return JSON: { "questions": [{ "type": "mcq" or "open", "subParam": "...", "q": "question text", "options": ["A","B","C","D"] (mcq only), "answer": 0 (mcq only) }] }`;

  const content = await groqChat(
    [
      { role: "system", content: QIDS_SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    { jsonMode: true, temperature: 0.8 },
  );
  const parsed = JSON.parse(content);
  return parsed.questions || [];
}

export async function generateEQQuestions({
  ageGroup,
  component,
  count = 2,
  context = "individual",
}: any) {
  const prompt = `Generate ${count} EQ Likert-scale self-report statements for the "${component}" component.
Age group: ${ageGroup === "11-18" ? "11-18 years" : "19-32 years"}. Context: ${context}.
Return JSON: { "statements": [{ "subParam": "...", "statement": "I ..." }] }`;

  const content = await groqChat(
    [
      { role: "system", content: QIDS_SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    { jsonMode: true, temperature: 0.75 },
  );
  const parsed = JSON.parse(content);
  return parsed.statements || [];
}

export async function generateAQQuestions({
  ageGroup,
  component,
  count = 2,
  context = "individual",
}: any) {
  const prompt = `Generate ${count} AQ scenario-based questions for the "${component}" component.
Age group: ${ageGroup === "11-18" ? "11-18 years" : "19-32 years"}. Context: ${context}.
Return JSON: { "questions": [{ "subParam": "...", "scenario": "...", "q": "..." }] }`;

  const content = await groqChat(
    [
      { role: "system", content: QIDS_SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    { jsonMode: true, temperature: 0.8 },
  );
  const parsed = JSON.parse(content);
  return parsed.questions || [];
}

export async function generateSQQuestions({ count = 2, context = "individual" }: any) {
  const prompt = `Generate ${count} SQ Cognitive Social Intelligence scenario questions.
Context: ${context}.
Return JSON: { "questions": [{ "subParam": "...", "scenario": "...", "question": "...", "options": [{ "text": "...", "marks": 0 }] }] }`;

  const content = await groqChat(
    [
      { role: "system", content: QIDS_SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    { jsonMode: true, temperature: 0.75 },
  );
  const parsed = JSON.parse(content);
  return parsed.questions || [];
}

export async function generateReportNarrative({
  intake,
  pillarScores,
  grade,
  careerProfile,
  ageGroup,
}: any) {
  const prompt = `Generate a professional QIDS assessment narrative.
Name: ${intake?.name || "the individual"}
Overall Grade: ${grade?.grade} (Score: ${(Object.values(pillarScores) as number[]).reduce((a: number, b: number) => a + b, 0) / 4}/100)
Pillar Scores: IQ=${pillarScores.IQ}, EQ=${pillarScores.EQ}, SQ=${pillarScores.SQ}, AQ=${pillarScores.AQ}
Return JSON: { "summary": "...", "development": "...", "recommendations": "..." }`;

  const content = await groqChat(
    [
      { role: "system", content: QIDS_SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    { jsonMode: true, temperature: 0.6, maxTokens: 800 },
  );
  return JSON.parse(content);
}
