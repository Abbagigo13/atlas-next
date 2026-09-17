module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/atlas/atlas/src/lib/atlas/symbols.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SYMBOLS",
    ()=>SYMBOLS,
    "fmtPct",
    ()=>fmtPct,
    "fmtPrice",
    ()=>fmtPrice,
    "fmtTime",
    ()=>fmtTime,
    "fmtUsd",
    ()=>fmtUsd,
    "getSymbol",
    ()=>getSymbol
]);
const SYMBOLS = [
    {
        key: 'BTC',
        label: 'BTC/USDT',
        bitget: 'BTCUSDT',
        coingecko: 'bitcoin',
        cmc: 'BTC',
        fallbackPrice: 77150,
        kind: 'crypto'
    },
    {
        key: 'ETH',
        label: 'ETH/USDT',
        bitget: 'ETHUSDT',
        coingecko: 'ethereum',
        cmc: 'ETH',
        fallbackPrice: 2410,
        kind: 'crypto'
    },
    {
        key: 'SOL',
        label: 'SOL/USDT',
        bitget: 'SOLUSDT',
        coingecko: 'solana',
        cmc: 'SOL',
        fallbackPrice: 128.4,
        kind: 'crypto'
    },
    {
        key: 'rTSLA',
        label: 'rTSLA/USDT',
        bitget: 'TSLAUSDT',
        fallbackPrice: 402.6,
        kind: 'tokenized-stock'
    },
    {
        key: 'rNVDA',
        label: 'rNVDA/USDT',
        bitget: 'NVDAUSDT',
        fallbackPrice: 183.2,
        kind: 'tokenized-stock'
    },
    {
        key: 'rAAPL',
        label: 'rAAPL/USDT',
        bitget: 'AAPLUSDT',
        fallbackPrice: 262.8,
        kind: 'tokenized-stock'
    },
    {
        key: 'rMSFT',
        label: 'rMSFT/USDT',
        bitget: 'MSFTUSDT',
        fallbackPrice: 489.5,
        kind: 'tokenized-stock'
    },
    {
        key: 'rMETA',
        label: 'rMETA/USDT',
        bitget: 'METAUSDT',
        fallbackPrice: 611.9,
        kind: 'tokenized-stock'
    }
];
function getSymbol(key) {
    return SYMBOLS.find((s)=>s.key === key) ?? SYMBOLS[0];
}
function fmtPrice(n) {
    if (!Number.isFinite(n)) return '—';
    const digits = n >= 1000 ? 2 : n >= 10 ? 3 : 4;
    return n.toLocaleString('en-US', {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits
    });
}
function fmtUsd(n, digits = 2) {
    const sign = n < 0 ? '-' : '';
    return `${sign}$${Math.abs(n).toLocaleString('en-US', {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits
    })}`;
}
function fmtPct(n, digits = 2) {
    return `${n >= 0 ? '+' : ''}${n.toFixed(digits)}%`;
}
function fmtTime(ts) {
    return new Date(ts).toLocaleTimeString('en-GB', {
        hour12: false
    });
}
}),
"[project]/atlas/atlas/src/pages/api/market.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/lib/atlas/symbols.ts [api] (ecmascript)");
;
const num = (v)=>{
    const n = typeof v === 'string' ? Number.parseFloat(v) : typeof v === 'number' ? v : NaN;
    return Number.isFinite(n) ? n : NaN;
};
async function jsonFetch(url, init, timeoutMs = 6000) {
    const ctrl = new AbortController();
    const t = setTimeout(()=>ctrl.abort(), timeoutMs);
    try {
        const r = await fetch(url, {
            ...init,
            signal: ctrl.signal,
            cache: 'no-store'
        });
        if (!r.ok) throw new Error(`${r.status}`);
        return await r.json();
    } finally{
        clearTimeout(t);
    }
}
/** 1 — Bitget v3 public tickers. */ async function bitgetV3(symbol) {
    const body = await jsonFetch(`https://api.bitget.com/api/v3/market/tickers?category=SPOT&symbol=${symbol}`);
    const d = body?.data?.[0];
    if (!d) return null;
    const price = num(d.lastPrice ?? d.lastPr);
    if (!Number.isFinite(price)) return null;
    return {
        price,
        change24h: num(d.price24hPcnt) * 100,
        high24h: num(d.highPrice24h ?? d.high24h),
        low24h: num(d.lowPrice24h ?? d.low24h),
        volume24h: num(d.volume24h ?? d.baseVolume),
        source: 'bitget-v3'
    };
}
/** 2 — Bitget v2 spot tickers (kept as the closest sibling fallback). */ async function bitgetV2(symbol) {
    const body = await jsonFetch(`https://api.bitget.com/api/v2/spot/market/tickers?symbol=${symbol}`);
    const d = body?.data?.[0];
    if (!d) return null;
    const price = num(d.lastPr);
    if (!Number.isFinite(price)) return null;
    return {
        price,
        change24h: num(d.change24h) * 100,
        high24h: num(d.high24h),
        low24h: num(d.low24h),
        volume24h: num(d.baseVolume),
        source: 'bitget-v2'
    };
}
/** 3 — CoinMarketCap (only when a key is present, it is not keyless). */ async function coinmarketcap(cmc) {
    const key = process.env.CMC_API_KEY;
    if (!key || !cmc) return null;
    const body = await jsonFetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${cmc}&convert=USD`, {
        headers: {
            'X-CMC_PRO_API_KEY': key
        }
    });
    const q = body?.data?.[cmc]?.quote?.USD;
    if (!q || !Number.isFinite(q.price)) return null;
    const price = q.price;
    const change = q.percent_change_24h ?? 0;
    return {
        price,
        change24h: change,
        high24h: price * (1 + Math.abs(change) / 200),
        low24h: price * (1 - Math.abs(change) / 200),
        volume24h: q.volume_24h ?? 0,
        source: 'coinmarketcap'
    };
}
/** 4 — CoinGecko public (keyless), crypto only. */ async function coingecko(id) {
    if (!id) return null;
    const body = await jsonFetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true`);
    const d = body?.[id];
    if (!d?.usd) return null;
    const change = d.usd_24h_change ?? 0;
    return {
        price: d.usd,
        change24h: change,
        high24h: d.usd * (1 + Math.abs(change) / 200),
        low24h: d.usd * (1 - Math.abs(change) / 200),
        volume24h: d.usd_24h_vol ?? 0,
        source: 'coingecko'
    };
}
/** 5 — Mock of last resort: stable, seeded wobble so the UI always renders. */ function mock(base) {
    const drift = Math.sin(Date.now() / 900_000) * 0.006;
    const price = base * (1 + drift);
    const change = drift * 100;
    return {
        price,
        change24h: change,
        high24h: price * 1.004,
        low24h: price * 0.995,
        volume24h: base * 12,
        source: 'mock'
    };
}
async function handler(req, res) {
    const key = typeof req.query.symbol === 'string' ? req.query.symbol : 'BTC';
    const spec = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["getSymbol"])(key);
    const chain = [
        ()=>bitgetV3(spec.bitget),
        ()=>bitgetV2(spec.bitget),
        ()=>coinmarketcap(spec.cmc),
        ()=>coingecko(spec.coingecko)
    ];
    for (const step of chain){
        try {
            const q = await step();
            if (q && Number.isFinite(q.price)) {
                res.setHeader('Cache-Control', 'no-store');
                return res.status(200).json({
                    symbol: spec.key,
                    label: spec.label,
                    price: q.price,
                    change24h: Number.isFinite(q.change24h) ? q.change24h : 0,
                    high24h: Number.isFinite(q.high24h) ? q.high24h : q.price * 1.004,
                    low24h: Number.isFinite(q.low24h) ? q.low24h : q.price * 0.996,
                    volume24h: Number.isFinite(q.volume24h) ? q.volume24h : 0,
                    source: q.source,
                    ts: Date.now()
                });
            }
        } catch  {
        // try the next source
        }
    }
    const q = mock(spec.fallbackPrice);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({
        symbol: spec.key,
        label: spec.label,
        ...q,
        ts: Date.now()
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0-newtn._.js.map