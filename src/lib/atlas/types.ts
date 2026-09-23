export type AgentId = 'bull' | 'bear' | 'risk' | 'trader';

export type Ticker = {
  symbol: string;
  label: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  source: 'bitget-v3' | 'bitget-v2' | 'coinmarketcap' | 'coingecko' | 'mock';
  ts: number;
};

export type CandleInterval = '15m' | '1h' | '4h' | '1d';

export type Candle = { t: number; o: number; h: number; l: number; c: number };

export type CandlesResponse = {
  symbol: string;
  interval: CandleInterval;
  candles: Candle[];
  source: 'bitget' | 'coingecko' | 'mock';
};

export type DebateMessage = {
  agent: AgentId;
  text: string;
  ts: number;
};

export type Action = 'LONG' | 'SHORT' | 'WAIT';

export type Decision = {
  action: Action;
  entry: number;
  stop: number;
  target: number;
  sizeMultiplier: number;
  confidence: number;
  riskReward: number;
  reasoning: string;
};

export type DebateResult = {
  symbol: string;
  price: number;
  source: 'qwen' | 'local';
  model: string;
  messages: DebateMessage[];
  decision: Decision;
  latencyMs: number;
  fellBack: boolean;
};

export type DebateRecord = {
  id: string;
  ts: number;
  symbol: string;
  label: string;
  price: number;
  source: 'qwen' | 'local';
  model: string;
  decision: Decision;
  messages: DebateMessage[];
};

export type Position = {
  id: string;
  symbol: string;
  label: string;
  action: Exclude<Action, 'WAIT'>;
  entry: number;
  stop: number;
  target: number;
  qty: number;
  notional: number;
  sizeMultiplier: number;
  openedAt: number;
  reasoning: string;
  markPrice: number;
};

export type ClosedTrade = {
  id: string;
  symbol: string;
  label: string;
  action: Exclude<Action, 'WAIT'>;
  entry: number;
  exit: number;
  qty: number;
  pnl: number;
  pnlPct: number;
  openedAt: number;
  closedAt: number;
  reason: 'target' | 'stop' | 'manual';
};

export type EquityPoint = { t: number; equity: number };

export type AgentRecord = { wins: number; losses: number; calls: number };

export type Settings = {
  paperTrading: boolean;
  autoExecute: boolean;
  speed: 'instant' | 'realistic';
  autoMode: boolean;
};

export type PaperState = {
  version: 1;
  balance: number;
  positions: Position[];
  trades: ClosedTrade[];
  equity: EquityPoint[];
  records: Record<Exclude<AgentId, 'trader'>, AgentRecord>;
  settings: Settings;
  lastMessages: Partial<Record<AgentId, string>>;
};

export const START_BALANCE = 3000;

export const AGENTS: Record<
  AgentId,
  { name: string; emoji: string; role: string; text: string; border: string; chip: string; dot: string }
> = {
  bull: {
    name: 'Bull Agent',
    emoji: '🐂',
    role: 'Long thesis',
    text: 'text-emerald-300',
    border: 'border-emerald-400/30 bg-emerald-400/[0.07]',
    chip: 'border-emerald-400/35 bg-emerald-400/12 text-emerald-300',
    dot: 'bg-emerald-400',
  },
  bear: {
    name: 'Bear Agent',
    emoji: '🐻',
    role: 'Short thesis',
    text: 'text-rose-300',
    border: 'border-rose-400/30 bg-rose-400/[0.07]',
    chip: 'border-rose-400/35 bg-rose-400/12 text-rose-300',
    dot: 'bg-rose-400',
  },
  risk: {
    name: 'Risk Manager',
    emoji: '🛡️',
    role: 'Verdict',
    text: 'text-amber-200',
    border: 'border-amber-300/30 bg-amber-300/[0.07]',
    chip: 'border-amber-300/35 bg-amber-300/12 text-amber-200',
    dot: 'bg-amber-300',
  },
  trader: {
    name: 'Trader',
    emoji: '⚡',
    role: 'Execution',
    text: 'text-sky-300',
    border: 'border-sky-400/30 bg-sky-400/[0.07]',
    chip: 'border-sky-400/35 bg-sky-400/12 text-sky-300',
    dot: 'bg-sky-400',
  },
};
