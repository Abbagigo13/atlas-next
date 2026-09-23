'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ParticleField from '@/components/ParticleField';
import AgentsPanel from './AgentsPanel';
import DebatePanel from './DebatePanel';
import DecisionCard from './DecisionCard';
import OverrideModal from './OverrideModal';
import PortfolioPanel from './PortfolioPanel';
import PositionsPanel from './PositionsPanel';
import Sidebar, { PANELS, type PanelId } from './Sidebar';
import SettingsPanel from './SettingsPanel';
import Topbar from './Topbar';
import TradeLogPanel from './TradeLogPanel';
import { getSymbol, fmtPct, fmtUsd } from '@/lib/atlas/symbols';
import { useDebate } from '@/lib/atlas/useDebate';
import { usePaper } from '@/lib/atlas/usePaper';
import type { Decision, Ticker } from '@/lib/atlas/types';
import PriceChart from './PriceChart';
import HistoryPanel from './HistoryPanel';
import { useDebateHistory } from '@/lib/atlas/useDebateHistory';
import Watchlist from './Watchlist';

const POLL_MS = 15_000;
const AUTO_MS = 5 * 60_000;

export default function Dashboard() {
  const paper = usePaper();
  const { settings } = paper.state;
  const debate = useDebate(settings.speed);
  const history = useDebateHistory();
  const historyStamp = useRef<string | null>(null);
  const fallbackFlagged = useRef<string | null>(null);
  const [panel, setPanel] = useState<PanelId>('debate');
  const [menuOpen, setMenuOpen] = useState(false);
  const [symbol, setSymbol] = useState('BTC');
  const [ticker, setTicker] = useState<Ticker | null>(null);
  const [overrideOpen, setOverrideOpen] = useState(false);
  const [executedFor, setExecutedFor] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const tickerRef = useRef<Ticker | null>(null);
  tickerRef.current = ticker;
  const openSymbols = useMemo(
    () => Array.from(new Set(paper.state.positions.map((p) => p.symbol))),
    [paper.state.positions],
  );
  const openSymbolsRef = useRef<string[]>(openSymbols);
  openSymbolsRef.current = openSymbols;

  const flash = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast((t) => (t === msg ? null : t)), 3200);
  }, []);

  useEffect(() => {
    if (!debate.meta?.fellBack) return;
    const stamp = `${symbol}-${debate.meta.latencyMs}`;
    if (fallbackFlagged.current === stamp) return;
    fallbackFlagged.current = stamp;
    flash('Qwen unavailable — fell back to local reasoning for this debate');
  }, [debate.meta, symbol, flash]);

  const fetchTicker = useCallback(async (key: string): Promise<Ticker | null> => {
    try {
      const r = await fetch(`/api/market?symbol=${encodeURIComponent(key)}`, { cache: 'no-store' });
      if (!r.ok) return null;
      return (await r.json()) as Ticker;
    } catch {
      return null;
    }
  }, []);

  /** Selected-symbol price polling. */
  useEffect(() => {
    let alive = true;
    const tick = async () => {
      const t = await fetchTicker(symbol);
      if (alive && t) setTicker(t);
    };
    setTicker(null);
    tick();
    const id = window.setInterval(tick, POLL_MS);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, [symbol, fetchTicker]);

  /** Mark open positions to market (any symbol) and auto-close on stop/target. */
  useEffect(() => {
    if (!paper.hydrated) return;
    let alive = true;
    const run = async () => {
      const keys = openSymbolsRef.current;
      if (keys.length === 0) return;
      const results = await Promise.all(keys.map((k) => fetchTicker(k)));
      if (!alive) return;
      const prices: Record<string, number> = {};
      results.forEach((r) => {
        if (r) prices[r.symbol] = r.price;
      });
      const closed = paper.mark(prices);
      if (closed > 0) flash(`${closed} position${closed > 1 ? 's' : ''} closed by stop / target`);
    };
    run();
    const id = window.setInterval(run, POLL_MS);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, [paper.hydrated, paper.mark, fetchTicker, flash, openSymbols.length]);

  /** Keep the Agents panel samples fresh. */
  useEffect(() => {
    debate.messages.forEach((m) => {
      if (m.agent !== 'trader') paper.rememberMessage(m.agent, m.text);
    });
  }, [debate.messages, paper.rememberMessage]);

  const startDebate = useCallback(async () => {
    setPanel('debate');
    setExecutedFor(null);
    let t = tickerRef.current;
    if (!t || t.symbol !== symbol) {
      t = await fetchTicker(symbol);
      if (t) setTicker(t);
    }
    if (!t) {
      flash('Market data unavailable — try Refresh');
      return;
    }
    await debate.run(t);
  }, [debate, fetchTicker, flash, symbol]);

  const executeDecision = useCallback(
    (override?: Partial<Decision>) => {
      const d = debate.decision;
      const t = tickerRef.current;
      if (!d || !t) return;
      const pos = paper.execute(d, t, override);
      if (pos) {
        setExecutedFor(`${t.symbol}-${d.entry}-${d.action}`);
        flash(`Paper ${pos.action} ${pos.label} filled at ${pos.entry.toFixed(2)}`);
        setPanel('positions');
      }
    },
    [debate.decision, paper, flash],
  );

  /** Auto-execute the verdict when enabled. */
  const autoRef = useRef<string | null>(null);
  useEffect(() => {
    const d = debate.decision;
    if (!settings.autoExecute || !d || debate.status !== 'done' || d.action === 'WAIT') return;
    const stamp = `${symbol}-${d.entry}-${d.action}-${d.confidence}`;
    if (autoRef.current === stamp) return;
    autoRef.current = stamp;
    executeDecision();
  }, [debate.decision, debate.status, settings.autoExecute, symbol, executeDecision]);

  /** Auto mode: a fresh debate every 5 minutes. */
  useEffect(() => {
    if (!settings.autoMode) return;
    const id = window.setInterval(() => {
      if (!debate.running) void startDebate();
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [settings.autoMode, debate.running, startDebate]);

  const spec = getSymbol(symbol);
  useEffect(() => {
    if (debate.status !== 'done' || !debate.decision || !debate.meta) return;
    const t = tickerRef.current;
    if (!t || t.symbol !== symbol) return;
    const stamp = `${symbol}-${debate.decision.entry}-${debate.decision.action}-${debate.meta.latencyMs}`;
    if (historyStamp.current === stamp) return;
    historyStamp.current = stamp;
    history.add({
      id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
      ts: Date.now(),
      symbol,
      label: spec.label,
      price: t.price,
      source: debate.meta.source as 'qwen' | 'local',
      model: debate.meta.model,
      decision: debate.decision,
      messages: debate.messages,
    });
  }, [debate.status, debate.decision, debate.meta, debate.messages, symbol, spec.label, history]);

  const decisionStamp = debate.decision
    ? `${symbol}-${debate.decision.entry}-${debate.decision.action}`
    : null;

  const title = PANELS.find((p) => p.id === panel)?.label ?? 'Debate';

  return (
    <div className="relative min-h-screen">
      <ParticleField />

      <div className="relative z-10 flex min-h-screen">
        <Sidebar
          active={panel}
          onSelect={setPanel}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          counts={{ positions: paper.state.positions.length, trades: paper.state.trades.length }}
          equity={fmtUsd(paper.stats.equity)}
          returnPct={fmtPct(paper.stats.totalReturnPct)}
          returnUp={paper.stats.totalReturnPct >= 0}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            symbol={symbol}
            onSymbol={setSymbol}
            ticker={ticker}
            running={debate.running}
            onStart={() => void startDebate()}
            onStop={debate.stop}
            onRefresh={() => void fetchTicker(symbol).then((t) => t && setTicker(t))}
            settings={settings}
            onSettings={paper.setSettings}
            onOpenMenu={() => setMenuOpen(true)}
            title={title}
          />

          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:py-8">
            {panel === 'debate' && (
  <div className="flex flex-col gap-5">
    <Watchlist active={symbol} onSelect={setSymbol} />
<PriceChart symbol={symbol} symbolLabel={spec.label} ticker={ticker} />
    <PriceChart symbol={symbol} symbolLabel={spec.label} ticker={ticker} />
    <DebatePanel
                  messages={debate.messages}
                  typing={debate.typing}
                  status={debate.status}
                  meta={debate.meta}
                  error={debate.error}
                  symbolLabel={spec.label}
                />
                <DecisionCard
                  decision={debate.decision}
                  ticker={ticker}
                  pending={debate.running}
                  executed={executedFor !== null && executedFor === decisionStamp}
                  onExecute={() => executeDecision()}
                  onOverride={() => setOverrideOpen(true)}
                />
              </div>
            )}

            {panel === 'positions' && (
              <PositionsPanel
                positions={paper.state.positions}
                onClose={(id, exit) => {
                  paper.closePosition(id, exit, 'manual');
                  flash('Position closed at mark');
                }}
              />
            )}

            {panel === 'log' && <TradeLogPanel trades={paper.state.trades} />}
            {panel === 'history' && (
  <HistoryPanel
    records={history.records}
    positions={paper.state.positions}
    trades={paper.state.trades}
  />
)}

            {panel === 'portfolio' && (
              <PortfolioPanel
                curve={paper.curve}
                equity={paper.stats.equity}
                totalReturnPct={paper.stats.totalReturnPct}
                winRate={paper.stats.winRate}
                sharpe={paper.stats.sharpe}
                wins={paper.stats.wins}
                losses={paper.stats.losses}
                unrealized={paper.stats.unrealized}
                balance={paper.state.balance}
              />
            )}

            {panel === 'agents' && (
              <AgentsPanel records={paper.state.records} lastMessages={paper.state.lastMessages} />
            )}

            {panel === 'settings' && (
              <SettingsPanel
                settings={settings}
                onChange={paper.setSettings}
                onReset={() => {
                  paper.reset();
                  flash('Paper account reset to $3,000');
                }}
                dataSource={ticker?.source ?? 'connecting…'}
                aiSource={debate.meta?.source === 'qwen' ? 'qwen3.8-max (live)' : 'atlas local agents'}
              />
            )}
          </main>
        </div>
      </div>

      <OverrideModal
        open={overrideOpen}
        decision={debate.decision}
        onClose={() => setOverrideOpen(false)}
        onConfirm={(patch) => {
          setOverrideOpen(false);
          executeDecision(patch);
        }}
      />

      {toast && (
        <div className="glass rise-in fixed bottom-5 left-1/2 z-90 -translate-x-1/2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-2xl">
          {toast}
        </div>
      )}
    </div>
  );
}
