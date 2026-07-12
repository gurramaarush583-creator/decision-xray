# AI Decision X-Ray

**See what's really behind an AI's decision — the factors, the uncertainty, and the bias it won't tell you about.**

Built for Hoobit Hacks 2026 (Theme: AI Apocalypse)

## What it does

Most "AI decision" tools show you a black box: input goes in, a verdict comes out. Decision X-Ray does the opposite — it exposes the entire reasoning process behind a simulated AI decision (loan approval, college admission, or job hiring), including:

- **Contributing Factors** — weighted breakdown of what drove the decision
- **Counterfactual Playground** — drag sliders (credit score, GPA, experience, etc.) and watch the decision update live
- **Uncertainty Analyzer** — flags what information was missing or unclear, and how much it mattered
- **Evidence Trail** — every conclusion tagged as an observed fact, an inference, or an assumption
- **Trust Score Dashboard** — multi-dimensional scoring: explainability, data completeness, robustness, and how much human oversight is needed
- **Human Review Mode** — act as a human reviewer, uphold or override the AI's call, and compare your reasoning against the AI's

## Why this matters (theme fit)

AI systems already make consequential decisions about people's loans, education, and jobs — often without explanation. This project makes that opacity visible and interactive, so users can see not just *what* an AI decided, but *how confident it really was*, *what it didn't know*, and *where a human should step in*. It's built to spark critical thinking about AI's growing role in high-stakes decisions, not to declare AI good or bad.

## Tech stack

- React + Vite
- Tailwind CSS
- Groq API (Llama 3.3 70B) for decision analysis
- Vercel (hosting + serverless functions)

## Running locally

```bash
git clone <repo-url>
cd decision-xray
npm install
vercel env add GROQ_API_KEY   # paste your Groq API key, select Development
vercel dev
```

## Live demo

https://decision-xray.vercel.app

## AI Usage Disclosure

See `AI_DISCLOSURE.md` for full details on how AI was used in building and running this project.

## License

Built solo for Hoobit Hacks 2026.