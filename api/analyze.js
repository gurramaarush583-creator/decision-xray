export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { decisionType, inputData } = req.body;

  const systemPrompt = `You are an AI transparency engine called "Decision X-Ray." 
Given a fictional AI-driven decision (loan approval, college admission, hiring, or parole risk), 
you must respond with ONLY valid JSON, no markdown, no preamble, matching this exact schema:

{
  "decision": "string - the AI's fictional decision output",
  "confidenceScore": number (0-100),
  "factors": [
    { "name": "string", "weight": number (0-100), "direction": "positive" | "negative" | "neutral" }
  ],
  "uncertainty": [
    { "issue": "string - what information is missing or unclear", "impact": "high" | "medium" | "low" }
  ],
  "biasFlags": [
    "string - a plausible bias or fairness concern in how this decision may have been made"
  ],
  "alternateOutcome": {
    "changedFactor": "string - one factor to hypothetically change",
    "newDecision": "string - what the outcome would likely be if that factor changed",
    "explanation": "string - why that changes the outcome"
  },
  "evidenceTrail": [
    { "claim": "string - a specific conclusion the AI drew", "type": "observed_fact" | "inference" | "assumption", "detail": "string - one sentence on where this came from or why it's classified this way" }
  ],
  "trustDimensions": {
    "explainability": { "score": number (0-100), "note": "string - one sentence on how clear the reasoning is" },
    "dataCompleteness": { "score": number (0-100), "note": "string - one sentence on how complete the input data was" },
    "robustness": { "score": number (0-100), "note": "string - one sentence on how stable this decision would be to small changes" },
    "humanOversightNeeded": { "score": number (0-100), "note": "string - one sentence on whether a human should review this, higher score means MORE oversight needed" }
  }
}

For evidenceTrail: "observed_fact" means directly stated in the input data. "inference" means logically derived from the facts but not stated directly. "assumption" means the model filled a gap with a plausible but unverified guess. Include 3-5 entries covering a mix of all three types.

Be specific and realistic, not generic. Do not include any text outside the JSON object.`;

  const userPrompt = `Decision type: ${decisionType}\nApplicant/case data: ${inputData}\n\nGenerate the fictional AI decision and its full X-Ray breakdown.`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 1200,
        response_format: { type: "json_object" },
      }),
    });
    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content || "{}";
    const parsed = JSON.parse(raw);

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("Groq error:", err);
    return res.status(500).json({ error: "Analysis failed" });
  }
}