# Atlas

**Three AI agents debate. One makes the call.**

Atlas is an autonomous multi-agent trading desk built for **Bitget AI Base Camp Hackathon S2 — Track 2: Agentic Trading**. A Bull Agent and Bear Agent argue opposite theses on a live instrument, a Risk Manager arbitrates and returns a structured verdict, and a Trader logs the execution against a live paper-trading book. Every decision is fully transparent — no black-box signals, just a visible reasoning trail from event to decision to execution.

🔗 **Live app:** https://atlas-next-alpha.vercel.app

---

## What it does

1. **Debate** — Bull, Bear and Risk Manager agents (powered by Qwen3.8-max) argue a ticker in sequence, each citing concrete levels from live market data.
2. **Decision** — the Risk Manager returns a strict JSON verdict: action (LONG / SHORT / WAIT), entry, stop, target, position size, confidence, and reward:risk.
3. **Execution** — the Trader logs the fill, and the position is opened against a live paper-trading account ($3,000 starting balance, no real funds at risk).
4. **Tracking** — open positions are marked to market continuously and auto-close on stop/target hit. Every closed trade, every past debate, and the full equity curve are preserved.

## Features

- **Live multi-agent debate** with real-time reasoning, confidence scores, and a structured risk verdict
- **Live price charts** (candlestick, 15m/1H/4H/1D) for every tradable instrument
- **Multi-symbol watchlist** — crypto (BTC, ETH) and Bitget's tokenized US stocks (rTSLA, rNVDA, rAAPL, rMSFT, rMETA), all with real live prices
- **Paper trading engine** — risk-based position sizing, automatic stop/target execution, full trade log
- **Portfolio analytics** — equity curve, win rate, Sharpe ratio, realized/unrealized P&L
- **Debate history / transparency log** — every debate ever run is archived with its full reasoning trail and outcome, satisfying the track's "paper trading log" requirement
- **Shared, persistent state** — the paper account and debate history live in a server-side database, not a browser's local storage, so the account keeps running continuously regardless of who visits the link
- **Operator / spectator mode** — only the project operator's browser can start debates or execute trades; everyone else gets a live, read-only view (prevents duplicate auto-trading bots across visitors)
- **Resilient data fallbacks** — market data falls back through Bitget → CoinGecko → mock so the app never breaks even if an upstream source is rate-limited or geo-blocked; reasoning falls back from Qwen to a deterministic local agent team if the AI gateway is unavailable

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| AI reasoning | Qwen3.8-max via Bitget's hackathon-subsidized gateway |
| Market data | Bitget Spot API (v2/v3), CoinGecko (fallback), synthetic mock (last resort) |
| Persistence | Upstash Redis (via `@upstash/redis`) |
| Hosting | Vercel |

## Architecture

```
┌─────────┐    ┌─────────┐    ┌──────────────┐    ┌─────────┐
│  Bull   │ →  │  Bear   │ →  │ Risk Manager │ →  │ Trader  │
│ Agent   │    │ Agent   │    │  (verdict)   │    │ (log)   │
└─────────┘    └─────────┘    └──────┬───────┘    └────┬────┘
                                      │                 │
                                      ▼                 ▼
                              JSON decision      Paper execution
                              (action, entry,    (position opened,
                               stop, target,      marked to market,
                               size, confidence)  auto-closed on
                                                   stop/target)
```

Each agent call hits Qwen3.8-max through Bitget's hackathon gateway. If the gateway is unavailable or times out, the whole debate transparently falls back to a deterministic local agent team so the app never breaks — the UI clearly labels which source produced each debate.

Market data for every symbol follows the same resilience pattern: Bitget's live spot API first, CoinGecko as a crypto-only fallback, and a seeded synthetic generator as the absolute last resort — so price charts and the watchlist always render, even if an upstream source is down.

## Getting started locally

```bash
git clone https://github.com/Abbagigo13/atlas-next.git
cd atlas-next
npm install
```

Create `.env.local` with:

```bash
QWEN_API_KEY=your_bitget_hackathon_qwen_key
QWEN_BASE_URL=https://hackathon.bitgetops.com/v1/chat/completions

# Upstash Redis (shared persistence) — pull via `vercel env pull .env.local`
# once connected to a Vercel project, or paste manually from the Upstash
# integration dashboard:
KV_REST_API_URL=
KV_REST_API_TOKEN=
```

Without a Qwen key, Atlas still runs end-to-end using its built-in local agent team.

```bash
npm run dev
```

Open `http://localhost:3000`.

## Deployment

Atlas is deployed on Vercel with an Upstash Redis database connected via the Vercel Storage marketplace integration, which auto-provisions `KV_REST_API_URL` / `KV_REST_API_TOKEN` for all environments.

The `/api/debate` route is configured with `maxDuration: 60` in `vercel.json` to accommodate the multi-call agent debate within Vercel's Hobby-plan execution limit.

To grant your own browser operator (trading) privileges on a deployed instance, visit the app once with `?operator=1` appended to the URL — this is stored locally and persists across future visits from that browser.

## Project structure

```
src/
├── pages/api/
│   ├── debate.ts      # Orchestrates the 4-agent Qwen debate, with local fallback
│   ├── market.ts      # Live ticker data with Bitget → CoinGecko → mock fallback
│   ├── candles.ts      # OHLC candle data for the price chart
│   └── state.ts         # Shared paper account + debate history (Upstash Redis)
├── lib/atlas/
│   ├── usePaper.ts            # Paper trading engine (positions, trades, equity)
│   ├── useDebate.ts           # Debate streaming + state machine
│   ├── useDebateHistory.ts    # Persisted debate archive
│   ├── useOperator.ts         # Operator / spectator access control
│   ├── useCandles.ts          # Price chart data hook
│   ├── useWatchlist.ts        # Multi-symbol live price hook
│   ├── localAgents.ts         # Deterministic fallback agent team
│   └── symbols.ts             # Tradable instrument definitions
└── components/dashboard/      # Dashboard UI (Debate, Positions, Portfolio, etc.)
```

## Hackathon submission notes

Built for **Track 2 — Agentic Trading** of Bitget AI Base Camp Hackathon S2. The LLM (Qwen3.8-max) is the primary decision-maker, not an assistant: it senses live market conditions, debates both sides of a trade autonomously, and executes against a continuously running paper book with no human in the loop (auto mode runs a fresh debate every 5 minutes). The full event → decision → execution flow, along with the running paper trading log, is visible and auditable at every step via the Debate and History tabs.

## License

Built for Bitget AI Base Camp Hackathon S2. All trading is simulated — no real funds are ever at risk.
