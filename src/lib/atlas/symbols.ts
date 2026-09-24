export type SymbolSpec = {
  /** UI key, also the value of the dropdown. */
  key: string;
  label: string;
  /** Bitget spot symbol. */
  bitget: string;
  /** CoinGecko id, when the asset is a crypto. */
  coingecko?: string;
  /** CoinMarketCap symbol, when available. */
  cmc?: string;
  /** Reference price used by the mock source of last resort. */
  fallbackPrice: number;
  kind: 'crypto' | 'tokenized-stock';
};

export const SYMBOLS: SymbolSpec[] = [
  { key: 'BTC', label: 'BTC/USDT', bitget: 'BTCUSDT', coingecko: 'bitcoin', cmc: 'BTC', fallbackPrice: 77150, kind: 'crypto' },
  { key: 'ETH', label: 'ETH/USDT', bitget: 'ETHUSDT', coingecko: 'ethereum', cmc: 'ETH', fallbackPrice: 2410, kind: 'crypto' },
  { key: 'SOL', label: 'SOL/USDT', bitget: 'SOLUSDT', coingecko: 'solana', cmc: 'SOL', fallbackPrice: 128.4, kind: 'crypto' },
  { key: 'rTSLA', label: 'rTSLA/USDT', bitget: 'RTSLAUSDT', fallbackPrice: 402.6, kind: 'tokenized-stock' },
  { key: 'rNVDA', label: 'rNVDA/USDT', bitget: 'RNVDAUSDT', fallbackPrice: 183.2, kind: 'tokenized-stock' },
  { key: 'rAAPL', label: 'rAAPL/USDT', bitget: 'RAAPLUSDT', fallbackPrice: 262.8, kind: 'tokenized-stock' },
  { key: 'rMSFT', label: 'rMSFT/USDT', bitget: 'RMSFTUSDT', fallbackPrice: 489.5, kind: 'tokenized-stock' },
  { key: 'rMETA', label: 'rMETA/USDT', bitget: 'RMETAUSDT', fallbackPrice: 611.9, kind: 'tokenized-stock' },

export function getSymbol(key: string): SymbolSpec {
  return SYMBOLS.find((s) => s.key === key) ?? SYMBOLS[0];
}

export function fmtPrice(n: number): string {
  if (!Number.isFinite(n)) return '—';
  const digits = n >= 1000 ? 2 : n >= 10 ? 3 : 4;
  return n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export function fmtUsd(n: number, digits = 2): string {
  const sign = n < 0 ? '-' : '';
  return `${sign}$${Math.abs(n).toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}`;
}

export function fmtPct(n: number, digits = 2): string {
  return `${n >= 0 ? '+' : ''}${n.toFixed(digits)}%`;
}

export function fmtTime(ts: number): string {
  return new Date(ts).toLocaleTimeString('en-GB', { hour12: false });
}
