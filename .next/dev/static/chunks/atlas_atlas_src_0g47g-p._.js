(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/atlas/atlas/src/components/ParticleField.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ParticleField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const COLORS = [
    '#1DA2B4',
    '#35D0E2',
    '#4C63C9'
];
const PARTICLE_COUNT = 60;
const LINK_DISTANCE = 120;
function ParticleField() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ParticleField.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const reduceMotion = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            let width = 0;
            let height = 0;
            let dpr = 1;
            let frame = 0;
            let particles = [];
            const seed = {
                "ParticleField.useEffect.seed": ()=>{
                    particles = Array.from({
                        length: PARTICLE_COUNT
                    }, {
                        "ParticleField.useEffect.seed": ()=>({
                                x: Math.random() * width,
                                y: Math.random() * height,
                                vx: (Math.random() - 0.5) * 0.32,
                                vy: (Math.random() - 0.5) * 0.32,
                                r: Math.random() * 1.6 + 0.7,
                                color: COLORS[Math.floor(Math.random() * COLORS.length)]
                            })
                    }["ParticleField.useEffect.seed"]);
                }
            }["ParticleField.useEffect.seed"];
            const resize = {
                "ParticleField.useEffect.resize": ()=>{
                    dpr = Math.min(window.devicePixelRatio || 1, 2);
                    width = window.innerWidth;
                    height = window.innerHeight;
                    canvas.width = Math.floor(width * dpr);
                    canvas.height = Math.floor(height * dpr);
                    canvas.style.width = `${width}px`;
                    canvas.style.height = `${height}px`;
                    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                    if (particles.length === 0) seed();
                }
            }["ParticleField.useEffect.resize"];
            const draw = {
                "ParticleField.useEffect.draw": ()=>{
                    ctx.clearRect(0, 0, width, height);
                    for(let i = 0; i < particles.length; i += 1){
                        const p = particles[i];
                        if (!reduceMotion) {
                            p.x += p.vx;
                            p.y += p.vy;
                            if (p.x < -20) p.x = width + 20;
                            if (p.x > width + 20) p.x = -20;
                            if (p.y < -20) p.y = height + 20;
                            if (p.y > height + 20) p.y = -20;
                        }
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                        ctx.fillStyle = p.color;
                        ctx.globalAlpha = 0.5;
                        ctx.fill();
                        for(let j = i + 1; j < particles.length; j += 1){
                            const q = particles[j];
                            const dx = p.x - q.x;
                            const dy = p.y - q.y;
                            const dist = Math.hypot(dx, dy);
                            if (dist < LINK_DISTANCE) {
                                ctx.beginPath();
                                ctx.moveTo(p.x, p.y);
                                ctx.lineTo(q.x, q.y);
                                ctx.strokeStyle = '#1DA2B4';
                                ctx.globalAlpha = (1 - dist / LINK_DISTANCE) * 0.16;
                                ctx.lineWidth = 1;
                                ctx.stroke();
                            }
                        }
                    }
                    ctx.globalAlpha = 1;
                    frame = window.requestAnimationFrame(draw);
                }
            }["ParticleField.useEffect.draw"];
            resize();
            window.addEventListener('resize', resize);
            frame = window.requestAnimationFrame(draw);
            return ({
                "ParticleField.useEffect": ()=>{
                    window.cancelAnimationFrame(frame);
                    window.removeEventListener('resize', resize);
                }
            })["ParticleField.useEffect"];
        }
    }["ParticleField.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        "aria-hidden": "true",
        className: "pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
    }, void 0, false, {
        fileName: "[project]/atlas/atlas/src/components/ParticleField.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
_s(ParticleField, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = ParticleField;
var _c;
__turbopack_context__.k.register(_c, "ParticleField");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AgentsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/lib/atlas/types.ts [app-client] (ecmascript)");
'use client';
;
;
const PROFILES = [
    {
        id: 'bull',
        personality: 'Optimist · conviction long',
        mandate: 'Scans for breakouts, momentum shifts and oversold bounces. Must name an entry, an invalidation and a target in every argument.'
    },
    {
        id: 'bear',
        personality: 'Skeptic · conviction short / avoid',
        mandate: 'Attacks the long thesis on specifics — exhaustion, resistance rejections, macro Risk-Off — and states what would change its mind.'
    },
    {
        id: 'risk',
        personality: 'Judge · arbitrates and sizes',
        mandate: 'Weighs both cases and returns strict JSON: action, entry, stop, target, sizeMultiplier, confidence, reasoning. Can veto with WAIT.'
    }
];
function record(r) {
    const total = r.wins + r.losses;
    const pct = total ? r.wins / total * 100 : 0;
    return {
        total,
        pct
    };
}
function AgentsPanel({ records, lastMessages }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 gap-5 lg:grid-cols-3",
        children: PROFILES.map((profile)=>{
            const a = __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AGENTS"][profile.id];
            const r = records[profile.id];
            const { total, pct } = record(r);
            const sample = lastMessages[profile.id];
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                className: "glass card-lift relative flex flex-col overflow-hidden rounded-3xl p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": true,
                        className: `absolute inset-x-0 top-0 h-px ${a.dot} opacity-60`
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                        lineNumber: 51,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `grid h-11 w-11 shrink-0 place-items-center rounded-2xl border text-lg ${a.chip}`,
                                children: a.emoji
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                                lineNumber: 53,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "truncate text-lg font-bold tracking-tight",
                                        children: a.name
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                                        lineNumber: 57,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "truncate text-[11px] font-semibold text-muted-foreground",
                                        children: profile.personality
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                                        lineNumber: 58,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                                lineNumber: 56,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                        lineNumber: 52,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 grid grid-cols-3 gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-white/8 bg-white/[0.03] p-3 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-mono text-lg font-bold text-emerald-400",
                                        children: r.wins
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                                        lineNumber: 64,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] font-bold tracking-wider text-muted-foreground",
                                        children: "WINS"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                                        lineNumber: 65,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                                lineNumber: 63,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-white/8 bg-white/[0.03] p-3 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-mono text-lg font-bold text-rose-400",
                                        children: r.losses
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                                        lineNumber: 68,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] font-bold tracking-wider text-muted-foreground",
                                        children: "LOSSES"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                                        lineNumber: 69,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                                lineNumber: 67,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-white/8 bg-white/[0.03] p-3 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-mono text-lg font-bold text-white",
                                        children: r.calls
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                                        lineNumber: 72,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] font-bold tracking-wider text-muted-foreground",
                                        children: "CALLS"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                                        lineNumber: 73,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                                lineNumber: 71,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                        lineNumber: 62,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between text-[10px] font-bold tracking-[0.14em] text-muted-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "HIT RATE"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                                        lineNumber: 79,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono",
                                        children: total ? `${pct.toFixed(0)}%` : 'n/a'
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                                        lineNumber: 80,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 h-1.5 overflow-hidden rounded-full bg-white/8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `h-full rounded-full ${a.dot} transition-[width] duration-700`,
                                    style: {
                                        width: `${total ? Math.max(pct, 3) : 0}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                                    lineNumber: 83,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                                lineNumber: 82,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                        lineNumber: 77,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-xs leading-relaxed text-muted-foreground",
                        children: profile.mandate
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                        lineNumber: 90,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex-1 rounded-2xl border border-white/8 bg-white/[0.02] p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] font-bold tracking-[0.16em] text-muted-foreground",
                                children: "LATEST MESSAGE"
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                                lineNumber: 93,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs leading-relaxed text-white/75",
                                children: sample ?? 'No message yet — run a debate and this agent will speak.'
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                                lineNumber: 94,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                        lineNumber: 92,
                        columnNumber: 13
                    }, this)
                ]
            }, profile.id, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
                lineNumber: 50,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c = AgentsPanel;
var _c;
__turbopack_context__.k.register(_c, "AgentsPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/atlas/atlas/src/components/dashboard/Dashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$ParticleField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/components/ParticleField.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$dashboard$2f$AgentsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/components/dashboard/AgentsPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$dashboard$2f$DebatePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$dashboard$2f$DecisionCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$dashboard$2f$OverrideModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$dashboard$2f$PortfolioPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$dashboard$2f$PositionsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$dashboard$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$dashboard$2f$SettingsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$dashboard$2f$Topbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/components/dashboard/Topbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$dashboard$2f$TradeLogPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/lib/atlas/symbols.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$useDebate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/lib/atlas/useDebate.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$usePaper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/lib/atlas/usePaper.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const POLL_MS = 15_000;
const AUTO_MS = 5 * 60_000;
function Dashboard() {
    _s();
    const paper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$usePaper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePaper"])();
    const { settings } = paper.state;
    const debate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$useDebate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDebate"])(settings.speed);
    const [panel, setPanel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('debate');
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [symbol, setSymbol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('BTC');
    const [ticker, setTicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [overrideOpen, setOverrideOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [executedFor, setExecutedFor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const tickerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    tickerRef.current = ticker;
    const openSymbols = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Dashboard.useMemo[openSymbols]": ()=>Array.from(new Set(paper.state.positions.map({
                "Dashboard.useMemo[openSymbols]": (p)=>p.symbol
            }["Dashboard.useMemo[openSymbols]"])))
    }["Dashboard.useMemo[openSymbols]"], [
        paper.state.positions
    ]);
    const openSymbolsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(openSymbols);
    openSymbolsRef.current = openSymbols;
    const flash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Dashboard.useCallback[flash]": (msg)=>{
            setToast(msg);
            window.setTimeout({
                "Dashboard.useCallback[flash]": ()=>setToast({
                        "Dashboard.useCallback[flash]": (t)=>t === msg ? null : t
                    }["Dashboard.useCallback[flash]"])
            }["Dashboard.useCallback[flash]"], 3200);
        }
    }["Dashboard.useCallback[flash]"], []);
    const fetchTicker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Dashboard.useCallback[fetchTicker]": async (key)=>{
            try {
                const r = await fetch(`/api/market?symbol=${encodeURIComponent(key)}`, {
                    cache: 'no-store'
                });
                if (!r.ok) return null;
                return await r.json();
            } catch  {
                return null;
            }
        }
    }["Dashboard.useCallback[fetchTicker]"], []);
    /** Selected-symbol price polling. */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            let alive = true;
            const tick = {
                "Dashboard.useEffect.tick": async ()=>{
                    const t = await fetchTicker(symbol);
                    if (alive && t) setTicker(t);
                }
            }["Dashboard.useEffect.tick"];
            setTicker(null);
            tick();
            const id = window.setInterval(tick, POLL_MS);
            return ({
                "Dashboard.useEffect": ()=>{
                    alive = false;
                    window.clearInterval(id);
                }
            })["Dashboard.useEffect"];
        }
    }["Dashboard.useEffect"], [
        symbol,
        fetchTicker
    ]);
    /** Mark open positions to market (any symbol) and auto-close on stop/target. */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            if (!paper.hydrated) return;
            let alive = true;
            const run = {
                "Dashboard.useEffect.run": async ()=>{
                    const keys = openSymbolsRef.current;
                    if (keys.length === 0) return;
                    const results = await Promise.all(keys.map({
                        "Dashboard.useEffect.run": (k)=>fetchTicker(k)
                    }["Dashboard.useEffect.run"]));
                    if (!alive) return;
                    const prices = {};
                    results.forEach({
                        "Dashboard.useEffect.run": (r)=>{
                            if (r) prices[r.symbol] = r.price;
                        }
                    }["Dashboard.useEffect.run"]);
                    const closed = paper.mark(prices);
                    if (closed > 0) flash(`${closed} position${closed > 1 ? 's' : ''} closed by stop / target`);
                }
            }["Dashboard.useEffect.run"];
            run();
            const id = window.setInterval(run, POLL_MS);
            return ({
                "Dashboard.useEffect": ()=>{
                    alive = false;
                    window.clearInterval(id);
                }
            })["Dashboard.useEffect"];
        }
    }["Dashboard.useEffect"], [
        paper.hydrated,
        paper.mark,
        fetchTicker,
        flash,
        openSymbols.length
    ]);
    /** Keep the Agents panel samples fresh. */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            debate.messages.forEach({
                "Dashboard.useEffect": (m)=>{
                    if (m.agent !== 'trader') paper.rememberMessage(m.agent, m.text);
                }
            }["Dashboard.useEffect"]);
        }
    }["Dashboard.useEffect"], [
        debate.messages,
        paper.rememberMessage
    ]);
    const startDebate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Dashboard.useCallback[startDebate]": async ()=>{
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
        }
    }["Dashboard.useCallback[startDebate]"], [
        debate,
        fetchTicker,
        flash,
        symbol
    ]);
    const executeDecision = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Dashboard.useCallback[executeDecision]": (override)=>{
            const d = debate.decision;
            const t = tickerRef.current;
            if (!d || !t) return;
            const pos = paper.execute(d, t, override);
            if (pos) {
                setExecutedFor(`${t.symbol}-${d.entry}-${d.action}`);
                flash(`Paper ${pos.action} ${pos.label} filled at ${pos.entry.toFixed(2)}`);
                setPanel('positions');
            }
        }
    }["Dashboard.useCallback[executeDecision]"], [
        debate.decision,
        paper,
        flash
    ]);
    /** Auto-execute the verdict when enabled. */ const autoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            const d = debate.decision;
            if (!settings.autoExecute || !d || debate.status !== 'done' || d.action === 'WAIT') return;
            const stamp = `${symbol}-${d.entry}-${d.action}-${d.confidence}`;
            if (autoRef.current === stamp) return;
            autoRef.current = stamp;
            executeDecision();
        }
    }["Dashboard.useEffect"], [
        debate.decision,
        debate.status,
        settings.autoExecute,
        symbol,
        executeDecision
    ]);
    /** Auto mode: a fresh debate every 5 minutes. */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            if (!settings.autoMode) return;
            const id = window.setInterval({
                "Dashboard.useEffect.id": ()=>{
                    if (!debate.running) void startDebate();
                }
            }["Dashboard.useEffect.id"], AUTO_MS);
            return ({
                "Dashboard.useEffect": ()=>window.clearInterval(id)
            })["Dashboard.useEffect"];
        }
    }["Dashboard.useEffect"], [
        settings.autoMode,
        debate.running,
        startDebate
    ]);
    const spec = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSymbol"])(symbol);
    const decisionStamp = debate.decision ? `${symbol}-${debate.decision.entry}-${debate.decision.action}` : null;
    const title = __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$dashboard$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PANELS"].find((p)=>p.id === panel)?.label ?? 'Debate';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$ParticleField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/Dashboard.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 flex min-h-screen",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$dashboard$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        active: panel,
                        onSelect: setPanel,
                        open: menuOpen,
                        onClose: ()=>setMenuOpen(false),
                        counts: {
                            positions: paper.state.positions.length,
                            trades: paper.state.trades.length
                        },
                        equity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtUsd"])(paper.stats.equity),
                        returnPct: (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtPct"])(paper.stats.totalReturnPct),
                        returnUp: paper.stats.totalReturnPct >= 0
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/Dashboard.tsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-0 flex-1 flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$dashboard$2f$Topbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                symbol: symbol,
                                onSymbol: setSymbol,
                                ticker: ticker,
                                running: debate.running,
                                onStart: ()=>void startDebate(),
                                onStop: debate.stop,
                                onRefresh: ()=>void fetchTicker(symbol).then((t)=>t && setTicker(t)),
                                settings: settings,
                                onSettings: paper.setSettings,
                                onOpenMenu: ()=>setMenuOpen(true),
                                title: title
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/Dashboard.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                                className: "mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:py-8",
                                children: [
                                    panel === 'debate' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$dashboard$2f$DebatePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                messages: debate.messages,
                                                typing: debate.typing,
                                                status: debate.status,
                                                meta: debate.meta,
                                                error: debate.error,
                                                symbolLabel: spec.label
                                            }, void 0, false, {
                                                fileName: "[project]/atlas/atlas/src/components/dashboard/Dashboard.tsx",
                                                lineNumber: 198,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$dashboard$2f$DecisionCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                decision: debate.decision,
                                                ticker: ticker,
                                                pending: debate.running,
                                                executed: executedFor !== null && executedFor === decisionStamp,
                                                onExecute: ()=>executeDecision(),
                                                onOverride: ()=>setOverrideOpen(true)
                                            }, void 0, false, {
                                                fileName: "[project]/atlas/atlas/src/components/dashboard/Dashboard.tsx",
                                                lineNumber: 206,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/Dashboard.tsx",
                                        lineNumber: 197,
                                        columnNumber: 15
                                    }, this),
                                    panel === 'positions' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$dashboard$2f$PositionsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        positions: paper.state.positions,
                                        onClose: (id, exit)=>{
                                            paper.closePosition(id, exit, 'manual');
                                            flash('Position closed at mark');
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/Dashboard.tsx",
                                        lineNumber: 218,
                                        columnNumber: 15
                                    }, this),
                                    panel === 'log' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$dashboard$2f$TradeLogPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        trades: paper.state.trades
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/Dashboard.tsx",
                                        lineNumber: 227,
                                        columnNumber: 33
                                    }, this),
                                    panel === 'portfolio' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$dashboard$2f$PortfolioPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        curve: paper.curve,
                                        equity: paper.stats.equity,
                                        totalReturnPct: paper.stats.totalReturnPct,
                                        winRate: paper.stats.winRate,
                                        sharpe: paper.stats.sharpe,
                                        wins: paper.stats.wins,
                                        losses: paper.stats.losses,
                                        unrealized: paper.stats.unrealized,
                                        balance: paper.state.balance
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/Dashboard.tsx",
                                        lineNumber: 230,
                                        columnNumber: 15
                                    }, this),
                                    panel === 'agents' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$dashboard$2f$AgentsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        records: paper.state.records,
                                        lastMessages: paper.state.lastMessages
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/Dashboard.tsx",
                                        lineNumber: 244,
                                        columnNumber: 15
                                    }, this),
                                    panel === 'settings' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$dashboard$2f$SettingsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        settings: settings,
                                        onChange: paper.setSettings,
                                        onReset: ()=>{
                                            paper.reset();
                                            flash('Paper account reset to $3,000');
                                        },
                                        dataSource: ticker?.source ?? 'connecting…',
                                        aiSource: debate.meta?.source === 'qwen' ? 'qwen-plus (live)' : 'atlas local agents'
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/Dashboard.tsx",
                                        lineNumber: 248,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/Dashboard.tsx",
                                lineNumber: 195,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/Dashboard.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/Dashboard.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$components$2f$dashboard$2f$OverrideModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: overrideOpen,
                decision: debate.decision,
                onClose: ()=>setOverrideOpen(false),
                onConfirm: (patch)=>{
                    setOverrideOpen(false);
                    executeDecision(patch);
                }
            }, void 0, false, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/Dashboard.tsx",
                lineNumber: 263,
                columnNumber: 7
            }, this),
            toast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass rise-in fixed bottom-5 left-1/2 z-[90] -translate-x-1/2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-2xl",
                children: toast
            }, void 0, false, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/Dashboard.tsx",
                lineNumber: 274,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/atlas/atlas/src/components/dashboard/Dashboard.tsx",
        lineNumber: 165,
        columnNumber: 5
    }, this);
}
_s(Dashboard, "4txe+3OGPov/fawEG+QjKpbPVO8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$usePaper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePaper"],
        __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$useDebate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDebate"]
    ];
});
_c = Dashboard;
var _c;
__turbopack_context__.k.register(_c, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DebatePanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/lib/atlas/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/lib/atlas/symbols.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function Typing({ agent }) {
    const a = __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AGENTS"][agent];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `grid h-9 w-9 shrink-0 place-items-center rounded-xl border text-sm ${a.chip}`,
                children: a.emoji
            }, void 0, false, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-xs font-semibold ${a.text}`,
                        children: [
                            a.name,
                            " is thinking"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `typing-dot h-1.5 w-1.5 rounded-full ${a.dot}`
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `typing-dot h-1.5 w-1.5 rounded-full ${a.dot}`,
                                style: {
                                    animationDelay: '0.15s'
                                }
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                                lineNumber: 27,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `typing-dot h-1.5 w-1.5 rounded-full ${a.dot}`,
                                style: {
                                    animationDelay: '0.3s'
                                }
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                                lineNumber: 28,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = Typing;
function DebatePanel({ messages, typing, status, meta, error, symbolLabel }) {
    _s();
    const endRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DebatePanel.useEffect": ()=>{
            endRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            });
        }
    }["DebatePanel.useEffect"], [
        messages.length,
        typing
    ]);
    const live = status === 'thinking' || status === 'streaming';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass relative flex min-h-[26rem] flex-col overflow-hidden rounded-3xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hairline-top absolute inset-x-12 top-0 h-px"
            }, void 0, false, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-0 items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: [
                                    'inline-flex shrink-0 items-center gap-2 rounded-full border px-2.5 py-1',
                                    live ? 'border-emerald-400/30 bg-emerald-400/10' : 'border-white/10 bg-white/5'
                                ].join(' '),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: [
                                            'h-1.5 w-1.5 rounded-full',
                                            live ? 'pulse-ring-green bg-emerald-400' : 'bg-muted-foreground'
                                        ].join(' ')
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                                        lineNumber: 58,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-[10px] font-bold tracking-[0.16em] ${live ? 'text-emerald-300' : 'text-muted-foreground'}`,
                                        children: live ? 'LIVE' : 'IDLE'
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                                        lineNumber: 64,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate text-sm font-semibold text-white/85",
                                children: [
                                    "Debate feed · ",
                                    symbolLabel
                                ]
                            }, void 0, true, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    meta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "shrink-0 font-mono text-[11px] text-muted-foreground",
                        children: meta.source === 'qwen' ? `qwen-plus · ${(meta.latencyMs / 1000).toFixed(1)}s` : `${meta.model} · ${(meta.latencyMs / 1000).toFixed(1)}s`
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-5 sm:px-5",
                children: [
                    messages.length === 0 && !typing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-1 flex-col items-center justify-center gap-2 py-10 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold text-white/80",
                                children: "No debate running"
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "max-w-sm text-xs leading-relaxed text-muted-foreground",
                                children: [
                                    "Pick a symbol and hit ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-signal-bright",
                                        children: "Start Debate"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                                        lineNumber: 86,
                                        columnNumber: 37
                                    }, this),
                                    ". Bull, Bear, Risk Manager and Trader will each take the floor in order."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this),
                    messages.map((m, i)=>{
                        const a = __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AGENTS"][m.agent];
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rise-in flex min-w-0 gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `grid h-9 w-9 shrink-0 place-items-center rounded-xl border text-sm ${a.chip}`,
                                    children: a.emoji
                                }, void 0, false, {
                                    fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                                    lineNumber: 96,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `min-w-0 flex-1 rounded-2xl border p-4 ${a.border}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center justify-between gap-x-3 gap-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-sm font-bold ${a.text}`,
                                                    children: a.name
                                                }, void 0, false, {
                                                    fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                                                    lineNumber: 101,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono text-[11px] text-muted-foreground",
                                                    children: [
                                                        a.role,
                                                        " · ",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtTime"])(m.ts)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                                            lineNumber: 100,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-sm leading-relaxed whitespace-pre-line text-white/80",
                                            children: m.text
                                        }, void 0, false, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                                            lineNumber: 106,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, `${m.agent}-${i}`, true, {
                            fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, this);
                    }),
                    typing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Typing, {
                        agent: typing
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                        lineNumber: 112,
                        columnNumber: 20
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "rounded-2xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200",
                        children: [
                            error,
                            " — the local agent team will be used on the next run."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: endRef
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/atlas/atlas/src/components/dashboard/DebatePanel.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(DebatePanel, "wkzjRsewh8pSmp35FLqjNBWGCLs=");
_c1 = DebatePanel;
var _c, _c1;
__turbopack_context__.k.register(_c, "Typing");
__turbopack_context__.k.register(_c1, "DebatePanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DecisionCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PencilLine$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/pencil-line.js [app-client] (ecmascript) <export default as PencilLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/lib/atlas/symbols.ts [app-client] (ecmascript)");
'use client';
;
;
;
const BADGE = {
    LONG: 'border-emerald-400/40 bg-emerald-400/15 text-emerald-300',
    SHORT: 'border-rose-400/40 bg-rose-400/15 text-rose-300',
    WAIT: 'border-amber-300/40 bg-amber-300/15 text-amber-200'
};
function Cell({ label, value, tone = 'text-white' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-w-0 rounded-xl border border-white/8 bg-white/[0.03] p-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] font-bold tracking-[0.16em] text-muted-foreground",
                children: label
            }, void 0, false, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `mt-1 truncate font-mono text-sm font-bold ${tone}`,
                children: value
            }, void 0, false, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_c = Cell;
function DecisionCard({ decision, ticker, pending, executed, onExecute, onOverride }) {
    if (!decision) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "glass rounded-3xl p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                            className: "h-4 w-4 text-amber-200"
                        }, void 0, false, {
                            fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11px] font-bold tracking-[0.18em] text-muted-foreground",
                            children: "DECISION CARD"
                        }, void 0, false, {
                            fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-4 text-sm text-muted-foreground",
                    children: pending ? 'Risk Manager is still weighing the Bull and Bear cases…' : 'Run a debate to get a verdict. The Risk Manager returns entry, stop, target, size and reasoning as JSON.'
                }, void 0, false, {
                    fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this);
    }
    const rr = Math.min(decision.riskReward, 5);
    const rrPct = Math.min(rr / 4 * 100, 100);
    const ref = ticker?.price ?? decision.entry;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass relative overflow-hidden rounded-3xl p-5 sm:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hairline-top absolute inset-x-10 top-0 h-px"
            }, void 0, false, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-0 items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-extrabold tracking-wide ${BADGE[decision.action]}`,
                                children: decision.action
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "min-w-0 truncate text-sm font-semibold text-white/85",
                                children: [
                                    ticker?.label ?? '—',
                                    " · size ",
                                    decision.sizeMultiplier,
                                    "x"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] font-semibold text-muted-foreground",
                        children: [
                            "conf ",
                            decision.confidence,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cell, {
                        label: "ENTRY",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtPrice"])(decision.entry)
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cell, {
                        label: "STOP",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtPrice"])(decision.stop),
                        tone: "text-rose-300"
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cell, {
                        label: "TARGET",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtPrice"])(decision.target),
                        tone: "text-emerald-300"
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cell, {
                        label: "R:R",
                        value: `${decision.riskReward.toFixed(2)}R`,
                        tone: "text-signal-bright"
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between text-[10px] font-bold tracking-[0.16em] text-muted-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "RISK / REWARD"
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono",
                                children: [
                                    decision.riskReward.toFixed(2),
                                    " : 1"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 h-2 overflow-hidden rounded-full bg-white/8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full rounded-full bg-gradient-to-r from-signal to-signal-bright transition-[width] duration-700",
                            style: {
                                width: `${Math.max(rrPct, 4)}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 rounded-2xl border border-white/8 bg-white/[0.02] p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] font-bold tracking-[0.16em] text-amber-200",
                        children: "RISK MANAGER REASONING"
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm leading-relaxed text-white/80",
                        children: decision.reasoning
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 flex flex-col gap-3 sm:flex-row sm:items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onExecute,
                        disabled: decision.action === 'WAIT' || executed,
                        className: [
                            'group inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold tracking-wide text-white transition-all',
                            decision.action === 'WAIT' || executed ? 'cursor-not-allowed border border-white/10 bg-white/5 text-muted-foreground' : 'btn-signal'
                        ].join(' '),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this),
                            executed ? 'PAPER TRADE EXECUTED' : decision.action === 'WAIT' ? 'NOTHING TO EXECUTE' : 'EXECUTE PAPER TRADE'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onOverride,
                        className: "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-signal/50 hover:bg-white/[0.07]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PencilLine$3e$__["PencilLine"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this),
                            "Manual Override"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 text-[11px] text-muted-foreground",
                children: [
                    "Mark price ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtPrice"])(ref),
                    " · sizing uses 25% of equity × ",
                    decision.sizeMultiplier,
                    "x"
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/atlas/atlas/src/components/dashboard/DecisionCard.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_c1 = DecisionCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "Cell");
__turbopack_context__.k.register(_c1, "DecisionCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OverrideModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const ACTIONS = [
    'LONG',
    'SHORT',
    'WAIT'
];
function OverrideModal({ open, decision, onClose, onConfirm }) {
    _s();
    const [action, setAction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('LONG');
    const [entry, setEntry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [stop, setStop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [target, setTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [size, setSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OverrideModal.useEffect": ()=>{
            if (!decision) return;
            setAction(decision.action);
            setEntry(String(decision.entry));
            setStop(String(decision.stop));
            setTarget(String(decision.target));
            setSize(String(decision.sizeMultiplier || 0.5));
        }
    }["OverrideModal.useEffect"], [
        decision,
        open
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OverrideModal.useEffect": ()=>{
            const onKey = {
                "OverrideModal.useEffect.onKey": (e)=>{
                    if (e.key === 'Escape') onClose();
                }
            }["OverrideModal.useEffect.onKey"];
            window.addEventListener('keydown', onKey);
            return ({
                "OverrideModal.useEffect": ()=>window.removeEventListener('keydown', onKey)
            })["OverrideModal.useEffect"];
        }
    }["OverrideModal.useEffect"], [
        onClose
    ]);
    if (!open || !decision) return null;
    const nums = {
        entry: Number(entry),
        stop: Number(stop),
        target: Number(target),
        size: Number(size)
    };
    const valid = Number.isFinite(nums.entry) && Number.isFinite(nums.stop) && Number.isFinite(nums.target) && Number.isFinite(nums.size) && nums.entry > 0 && nums.stop > 0 && nums.target > 0 && nums.size > 0 && nums.stop !== nums.entry;
    const rr = valid ? Math.abs(nums.target - nums.entry) / Math.abs(nums.entry - nums.stop) : 0;
    const field = (label, value, set, step = 'any')=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "block min-w-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[10px] font-bold tracking-[0.16em] text-muted-foreground",
                    children: label
                }, void 0, false, {
                    fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
                    lineNumber: 57,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "number",
                    step: step,
                    value: value,
                    onChange: (e)=>set(e.target.value),
                    className: "mt-1.5 w-full rounded-xl border border-white/12 bg-[#0b1120] px-3 py-2.5 font-mono text-sm text-white outline-none transition-colors focus:border-signal/60"
                }, void 0, false, {
                    fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
                    lineNumber: 58,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
            lineNumber: 56,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[80] grid place-items-center px-4 py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: onClose,
                className: "absolute inset-0 bg-black/70 backdrop-blur-sm"
            }, void 0, false, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "dialog",
                "aria-modal": "true",
                "aria-label": "Manual override",
                className: "glass relative w-full max-w-lg overflow-hidden rounded-3xl p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hairline-top absolute inset-x-10 top-0 h-px"
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-bold tracking-tight",
                                        children: "Manual override"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
                                        lineNumber: 80,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-muted-foreground",
                                        children: "Edit the order before it hits the paper book. The agents keep their verdict on record."
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
                                        lineNumber: 81,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onClose,
                                "aria-label": "Close",
                                className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:text-foreground",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 flex gap-2",
                        children: ACTIONS.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setAction(a),
                                className: [
                                    'flex-1 rounded-xl border px-3 py-2.5 text-sm font-bold transition-colors',
                                    action === a ? a === 'LONG' ? 'border-emerald-400/50 bg-emerald-400/15 text-emerald-300' : a === 'SHORT' ? 'border-rose-400/50 bg-rose-400/15 text-rose-300' : 'border-amber-300/50 bg-amber-300/15 text-amber-200' : 'border-white/10 bg-white/[0.03] text-muted-foreground hover:text-foreground'
                                ].join(' '),
                                children: a
                            }, a, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 grid grid-cols-2 gap-3",
                        children: [
                            field('ENTRY', entry, setEntry),
                            field('STOP LOSS', stop, setStop),
                            field('TAKE PROFIT', target, setTarget),
                            field('SIZE MULTIPLIER', size, setSize, '0.1')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-bold tracking-[0.16em] text-muted-foreground",
                                children: "RESULTING R:R"
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-sm font-bold text-signal-bright",
                                children: valid ? `${rr.toFixed(2)}R` : 'invalid'
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 flex flex-col gap-3 sm:flex-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                disabled: !valid || action === 'WAIT',
                                onClick: ()=>onConfirm({
                                        action,
                                        entry: nums.entry,
                                        stop: nums.stop,
                                        target: nums.target,
                                        sizeMultiplier: nums.size,
                                        riskReward: Number(rr.toFixed(2))
                                    }),
                                className: [
                                    'flex-1 rounded-full px-6 py-3.5 text-sm font-bold text-white transition-all',
                                    !valid || action === 'WAIT' ? 'cursor-not-allowed border border-white/10 bg-white/5 text-muted-foreground' : 'btn-signal'
                                ].join(' '),
                                children: "Execute override"
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onClose,
                                className: "rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-white/[0.07]",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/atlas/atlas/src/components/dashboard/OverrideModal.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_s(OverrideModal, "KlBLjc5ib/FWPSEuoZoiMIDNxL0=");
_c = OverrideModal;
var _c;
__turbopack_context__.k.register(_c, "OverrideModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PortfolioPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/lib/atlas/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/lib/atlas/symbols.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function StatCard({ label, value, sub, tone = 'text-gradient-signal' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass card-lift min-w-0 rounded-2xl p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] font-bold tracking-[0.18em] text-muted-foreground",
                children: label
            }, void 0, false, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `mt-2 truncate text-3xl font-extrabold tracking-tight tabular-nums ${tone}`,
                children: value
            }, void 0, false, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 truncate text-xs text-muted-foreground",
                children: sub
            }, void 0, false, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c = StatCard;
function PortfolioPanel({ curve, equity, totalReturnPct, winRate, sharpe, wins, losses, unrealized, balance }) {
    _s();
    const chart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PortfolioPanel.useMemo[chart]": ()=>{
            const W = 720;
            const H = 240;
            const pad = 8;
            const pts = curve.length > 1 ? curve : [
                ...curve,
                {
                    t: Date.now(),
                    equity: curve[0]?.equity ?? __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["START_BALANCE"]
                }
            ];
            const values = pts.map({
                "PortfolioPanel.useMemo[chart].values": (p)=>p.equity
            }["PortfolioPanel.useMemo[chart].values"]);
            const min = Math.min(...values, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["START_BALANCE"]);
            const max = Math.max(...values, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["START_BALANCE"]);
            const span = max - min || Math.max(max * 0.02, 1);
            const x = {
                "PortfolioPanel.useMemo[chart].x": (i)=>pad + i / Math.max(pts.length - 1, 1) * (W - pad * 2)
            }["PortfolioPanel.useMemo[chart].x"];
            const y = {
                "PortfolioPanel.useMemo[chart].y": (v)=>H - pad - (v - min) / span * (H - pad * 2)
            }["PortfolioPanel.useMemo[chart].y"];
            const line = pts.map({
                "PortfolioPanel.useMemo[chart].line": (p, i)=>`${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.equity).toFixed(1)}`
            }["PortfolioPanel.useMemo[chart].line"]).join(' ');
            const area = `${line} L${x(pts.length - 1).toFixed(1)},${H - pad} L${x(0).toFixed(1)},${H - pad} Z`;
            return {
                W,
                H,
                line,
                area,
                baseY: y(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["START_BALANCE"]),
                up: values[values.length - 1] >= __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["START_BALANCE"]
            };
        }
    }["PortfolioPanel.useMemo[chart]"], [
        curve
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-4 sm:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        label: "TOTAL RETURN",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtPct"])(totalReturnPct),
                        sub: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtUsd"])(equity)} equity · start ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtUsd"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["START_BALANCE"], 0)}`,
                        tone: totalReturnPct >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        label: "WIN RATE",
                        value: `${winRate.toFixed(1)}%`,
                        sub: `${wins}W / ${losses}L closed`
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        label: "SHARPE",
                        value: sharpe.toFixed(2),
                        sub: "annualised from closed-trade returns"
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass relative overflow-hidden rounded-3xl p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hairline-top absolute inset-x-12 top-0 h-px"
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-sm font-bold tracking-wide text-white/85",
                                children: "Equity curve"
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "cash ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtUsd"])(balance)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                                        lineNumber: 88,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: unrealized >= 0 ? 'text-emerald-400' : 'text-rose-400',
                                        children: [
                                            "unrealized ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtUsd"])(unrealized)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                                        lineNumber: 89,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            curve.length,
                                            " marks"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                                        lineNumber: 92,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        viewBox: `0 0 ${chart.W} ${chart.H}`,
                        className: "mt-4 h-56 w-full",
                        preserveAspectRatio: "none",
                        role: "img",
                        "aria-label": "Equity curve",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: "atlas-eq",
                                    x1: "0",
                                    y1: "0",
                                    x2: "0",
                                    y2: "1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "0%",
                                            stopColor: "#35D0E2",
                                            stopOpacity: "0.35"
                                        }, void 0, false, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                                            lineNumber: 105,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "100%",
                                            stopColor: "#35D0E2",
                                            stopOpacity: "0"
                                        }, void 0, false, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this),
                            [
                                0.25,
                                0.5,
                                0.75
                            ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "0",
                                    x2: chart.W,
                                    y1: chart.H * f,
                                    y2: chart.H * f,
                                    stroke: "rgba(136,153,187,0.12)",
                                    strokeDasharray: "4 6"
                                }, f, false, {
                                    fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                                    lineNumber: 110,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                x1: "0",
                                x2: chart.W,
                                y1: chart.baseY,
                                y2: chart.baseY,
                                stroke: "rgba(136,153,187,0.45)",
                                strokeDasharray: "2 4"
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: chart.area,
                                fill: "url(#atlas-eq)"
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: chart.line,
                                fill: "none",
                                stroke: chart.up ? '#35D0E2' : '#fb7185',
                                strokeWidth: "2.5",
                                strokeLinejoin: "round",
                                strokeLinecap: "round",
                                vectorEffect: "non-scaling-stroke"
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-[11px] text-muted-foreground",
                        children: [
                            "Dashed line marks the ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtUsd"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["START_BALANCE"], 0),
                            " starting balance. Curve extends on every close and mark-to-market tick."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/atlas/atlas/src/components/dashboard/PortfolioPanel.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_s(PortfolioPanel, "TYd/CexE1t5SpkznUmmyfw36CY0=");
_c1 = PortfolioPanel;
var _c, _c1;
__turbopack_context__.k.register(_c, "StatCard");
__turbopack_context__.k.register(_c1, "PortfolioPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PositionsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/lib/atlas/symbols.ts [app-client] (ecmascript)");
'use client';
;
;
function PositionsPanel({ positions, onClose }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass relative overflow-hidden rounded-3xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hairline-top absolute inset-x-12 top-0 h-px"
            }, void 0, false, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-sm font-bold tracking-wide text-white/85",
                        children: "Open positions"
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[11px] text-muted-foreground",
                        children: [
                            positions.length,
                            " live · marked every 15s"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            positions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "px-5 py-12 text-center text-sm text-muted-foreground",
                children: "No open paper positions. Execute a verdict from the Debate panel."
            }, void 0, false, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full min-w-[46rem] text-left text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-b border-white/8 text-[10px] font-bold tracking-[0.14em] text-muted-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-5 py-3",
                                        children: "SYMBOL"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                        lineNumber: 31,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-3",
                                        children: "SIDE"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                        lineNumber: 32,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-3",
                                        children: "ENTRY"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                        lineNumber: 33,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-3",
                                        children: "MARK"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                        lineNumber: 34,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-3",
                                        children: "STOP / TARGET"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                        lineNumber: 35,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-3",
                                        children: "SIZE"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                        lineNumber: 36,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-3",
                                        children: "P&L"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                        lineNumber: 37,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-5 py-3 text-right",
                                        children: "ACTION"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                        lineNumber: 38,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                lineNumber: 30,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                            lineNumber: 29,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: positions.map((p)=>{
                                const dir = p.action === 'LONG' ? 1 : -1;
                                const pnl = (p.markPrice - p.entry) * p.qty * dir;
                                const pnlPct = (p.markPrice - p.entry) / p.entry * 100 * dir;
                                const up = pnl >= 0;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-b border-white/5 last:border-0 hover:bg-white/[0.02]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-5 py-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-semibold text-white",
                                                    children: p.label
                                                }, void 0, false, {
                                                    fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                                    lineNumber: 50,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-mono text-[11px] text-muted-foreground",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtTime"])(p.openedAt)
                                                }, void 0, false, {
                                                    fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                                    lineNumber: 51,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                            lineNumber: 49,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: [
                                                    'rounded-md px-2 py-0.5 font-mono text-[11px] font-bold',
                                                    p.action === 'LONG' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-rose-400/15 text-rose-300'
                                                ].join(' '),
                                                children: p.action
                                            }, void 0, false, {
                                                fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                                lineNumber: 54,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                            lineNumber: 53,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-4 font-mono text-white/85",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtPrice"])(p.entry)
                                        }, void 0, false, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                            lineNumber: 65,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-4 font-mono text-white/85",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtPrice"])(p.markPrice)
                                        }, void 0, false, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                            lineNumber: 66,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-4 font-mono text-[12px]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-rose-300/90",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtPrice"])(p.stop)
                                                }, void 0, false, {
                                                    fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                                    lineNumber: 68,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground",
                                                    children: " / "
                                                }, void 0, false, {
                                                    fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                                    lineNumber: 69,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-emerald-300/90",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtPrice"])(p.target)
                                                }, void 0, false, {
                                                    fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                                    lineNumber: 70,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                            lineNumber: 67,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-4 font-mono text-white/70",
                                            children: [
                                                p.sizeMultiplier,
                                                "x · ",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtUsd"])(p.notional)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                            lineNumber: 72,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: `px-3 py-4 font-mono font-bold ${up ? 'text-emerald-400' : 'text-rose-400'}`,
                                            children: [
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtUsd"])(pnl),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-1 text-[11px] font-semibold opacity-80",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtPct"])(pnlPct)
                                                }, void 0, false, {
                                                    fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                                    lineNumber: 77,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                            lineNumber: 75,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-5 py-4 text-right",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>onClose(p.id, p.markPrice),
                                                className: "rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold transition-colors hover:border-rose-400/50 hover:text-rose-300",
                                                children: "Close"
                                            }, void 0, false, {
                                                fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                                lineNumber: 80,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                            lineNumber: 79,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, p.id, true, {
                                    fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                                    lineNumber: 48,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                    lineNumber: 28,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/atlas/atlas/src/components/dashboard/PositionsPanel.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = PositionsPanel;
var _c;
__turbopack_context__.k.register(_c, "PositionsPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SettingsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/gauge.js [app-client] (ecmascript) <export default as Gauge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
'use client';
;
;
function Toggle({ checked, onChange, label, hint, icon: Icon, disabled = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-start justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-w-0 gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-signal-bright",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold text-white/90",
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs leading-relaxed text-muted-foreground",
                                children: hint
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                role: "switch",
                "aria-checked": checked,
                "aria-label": label,
                disabled: disabled,
                onClick: ()=>onChange(!checked),
                className: [
                    'relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-300',
                    checked ? 'border-signal/60 bg-signal/40' : 'border-white/12 bg-white/8',
                    disabled ? 'cursor-not-allowed opacity-50' : ''
                ].join(' '),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: [
                        'absolute top-[3px] h-[18px] w-[18px] rounded-full transition-transform duration-300',
                        checked ? 'translate-x-[22px] bg-signal-bright' : 'translate-x-[3px] bg-white/70'
                    ].join(' ')
                }, void 0, false, {
                    fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c = Toggle;
function SettingsPanel({ settings, onChange, onReset, dataSource, aiSource }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass relative overflow-hidden rounded-3xl p-5 sm:p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hairline-top absolute inset-x-12 top-0 h-px"
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-sm font-bold tracking-wide text-white/85",
                        children: "Execution"
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex flex-col gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Toggle, {
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"],
                                checked: settings.paperTrading,
                                onChange: (v)=>onChange({
                                        paperTrading: v
                                    }),
                                label: "Paper trading",
                                hint: "Always on in this build. Atlas never touches a live exchange account or a wallet — orders are simulated against live prices.",
                                disabled: true
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Toggle, {
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
                                checked: settings.autoExecute,
                                onChange: (v)=>onChange({
                                        autoExecute: v
                                    }),
                                label: "Auto-execute verdicts",
                                hint: "When the Risk Manager returns LONG or SHORT, the Trader fills it on the paper book without waiting for your click."
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Toggle, {
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__["Gauge"],
                                checked: settings.autoMode,
                                onChange: (v)=>onChange({
                                        autoMode: v
                                    }),
                                label: "Auto mode",
                                hint: "Runs a fresh debate on the selected symbol every 5 minutes for as long as this tab stays open."
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass rounded-3xl p-5 sm:p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-sm font-bold tracking-wide text-white/85",
                        children: "Agent speed"
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-muted-foreground",
                        children: "How the debate is delivered to the feed once the agents have answered."
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2",
                        children: [
                            {
                                id: 'instant',
                                title: 'Instant',
                                hint: 'All four messages land at once. Fastest read.'
                            },
                            {
                                id: 'realistic',
                                title: 'Realistic',
                                hint: '1.5s between agents with typing indicators.'
                            }
                        ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>onChange({
                                        speed: opt.id
                                    }),
                                className: [
                                    'rounded-2xl border p-4 text-left transition-all',
                                    settings.speed === opt.id ? 'border-signal/45 bg-signal/10' : 'border-white/8 bg-white/[0.02] hover:border-white/20'
                                ].join(' '),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-bold text-white/90",
                                        children: opt.title
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs leading-relaxed text-muted-foreground",
                                        children: opt.hint
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, opt.id, true, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass rounded-3xl p-5 sm:p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-sm font-bold tracking-wide text-white/85",
                        children: "Data & model"
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                        className: "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-white/8 bg-white/[0.02] p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        className: "text-[10px] font-bold tracking-[0.16em] text-muted-foreground",
                                        children: "MARKET DATA"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                                        lineNumber: 131,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        className: "mt-1.5 font-mono text-sm text-white/85",
                                        children: dataSource
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                                        lineNumber: 132,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        className: "mt-1 text-[11px] text-muted-foreground",
                                        children: "Bitget v3 → Bitget v2 → CoinMarketCap → CoinGecko → mock"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                                        lineNumber: 133,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-white/8 bg-white/[0.02] p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        className: "text-[10px] font-bold tracking-[0.16em] text-muted-foreground",
                                        children: "REASONING"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                                        lineNumber: 138,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        className: "mt-1.5 font-mono text-sm text-white/85",
                                        children: aiSource
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                                        lineNumber: 139,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        className: "mt-1 text-[11px] text-muted-foreground",
                                        children: "Set QWEN_API_KEY in .env.local for qwen-plus reasoning"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                                        lineNumber: 140,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass rounded-3xl p-5 sm:p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-sm font-bold tracking-wide text-white/85",
                        children: "Danger zone"
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-muted-foreground",
                        children: "Wipes the paper book, trade log, equity curve and agent records from this browser."
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            if (window.confirm('Reset the paper book to $3,000 and clear all history?')) onReset();
                        },
                        className: "mt-4 inline-flex items-center gap-2 rounded-full border border-rose-400/35 bg-rose-400/10 px-5 py-3 text-sm font-semibold text-rose-200 transition-colors hover:bg-rose-400/20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this),
                            "Reset paper account"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/atlas/atlas/src/components/dashboard/SettingsPanel.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c1 = SettingsPanel;
var _c, _c1;
__turbopack_context__.k.register(_c, "Toggle");
__turbopack_context__.k.register(_c1, "SettingsPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PANELS",
    ()=>PANELS,
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$messages$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessagesSquare$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/messages-square.js [app-client] (ecmascript) <export default as MessagesSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Triangle$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/triangle.js [app-client] (ecmascript) <export default as Triangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
'use client';
;
;
;
const PANELS = [
    {
        id: 'debate',
        label: 'Debate',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$messages$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessagesSquare$3e$__["MessagesSquare"]
    },
    {
        id: 'positions',
        label: 'Open Positions',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"]
    },
    {
        id: 'log',
        label: 'Trade Log',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"]
    },
    {
        id: 'portfolio',
        label: 'Portfolio',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
    },
    {
        id: 'agents',
        label: 'Agents',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"]
    }
];
function Sidebar({ active, onSelect, open, onClose, counts, equity, returnPct, returnUp }) {
    const body = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full flex-col gap-6 p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "group flex min-w-0 items-center gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-signal/40 bg-signal/10 transition-colors group-hover:border-signal-bright/70",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Triangle$3e$__["Triangle"], {
                                    className: "h-4 w-4 fill-signal-bright text-signal-bright"
                                }, void 0, false, {
                                    fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                                    lineNumber: 53,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block truncate text-base font-extrabold tracking-tight",
                                        children: "Atlas"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                                        lineNumber: 56,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block truncate text-[10px] font-semibold tracking-[0.16em] text-muted-foreground",
                                        children: "CONTROL ROOM"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                                        lineNumber: 57,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onClose,
                        "aria-label": "Close menu",
                        className: "grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:text-foreground lg:hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass rounded-2xl p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] font-bold tracking-[0.18em] text-muted-foreground",
                        children: "EQUITY"
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 font-mono text-xl font-bold text-white",
                        children: equity
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `mt-0.5 font-mono text-xs font-semibold ${returnUp ? 'text-emerald-400' : 'text-rose-400'}`,
                        children: [
                            returnPct,
                            " all time"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex flex-1 flex-col gap-1",
                children: PANELS.map((panel)=>{
                    const isActive = panel.id === active;
                    const badge = panel.id === 'positions' ? counts.positions : panel.id === 'log' ? counts.trades : 0;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            onSelect(panel.id);
                            onClose();
                        },
                        className: [
                            'group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-200',
                            isActive ? 'border border-signal/35 bg-signal/12 text-white' : 'border border-transparent text-muted-foreground hover:bg-white/5 hover:text-foreground'
                        ].join(' '),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(panel.icon, {
                                className: `h-4 w-4 shrink-0 ${isActive ? 'text-signal-bright' : 'text-muted-foreground group-hover:text-signal-bright'}`
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                                lineNumber: 100,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "min-w-0 flex-1 truncate text-left",
                                children: panel.label
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                                lineNumber: 103,
                                columnNumber: 15
                            }, this),
                            badge > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "shrink-0 rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] font-bold text-white/80",
                                children: badge
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                                lineNumber: 105,
                                columnNumber: 17
                            }, this)
                        ]
                    }, panel.id, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                        lineNumber: 86,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-white/8 bg-white/[0.02] p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "flex items-center gap-2 text-[11px] font-semibold text-muted-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "pulse-ring-green h-1.5 w-1.5 rounded-full bg-emerald-400"
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            "Paper book · no real funds"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "mt-3 inline-flex text-[11px] font-semibold text-signal-bright hover:underline",
                        children: "← Back to landing page"
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "glass sticky top-0 hidden h-screen w-[16.5rem] shrink-0 border-r border-white/8 lg:block",
                children: body
            }, void 0, false, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: [
                    'fixed inset-0 z-[70] lg:hidden',
                    open ? 'pointer-events-auto' : 'pointer-events-none'
                ].join(' '),
                "aria-hidden": !open,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: onClose,
                        className: `absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: [
                            'absolute inset-y-0 left-0 w-[17rem] max-w-[85vw] border-r border-white/10 bg-[#0b1120]/98 backdrop-blur-2xl transition-transform duration-300',
                            open ? 'translate-x-0' : '-translate-x-full'
                        ].join(' '),
                        children: body
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/atlas/atlas/src/components/dashboard/Sidebar.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/atlas/atlas/src/components/dashboard/Topbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Topbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/square.js [app-client] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$timer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Timer$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/timer.js [app-client] (ecmascript) <export default as Timer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/lib/atlas/symbols.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function Topbar({ symbol, onSymbol, ticker, running, onStart, onStop, onRefresh, settings, onSettings, onOpenMenu, title }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const boxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Topbar.useEffect": ()=>{
            const onDoc = {
                "Topbar.useEffect.onDoc": (e)=>{
                    if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
                }
            }["Topbar.useEffect.onDoc"];
            document.addEventListener('mousedown', onDoc);
            return ({
                "Topbar.useEffect": ()=>document.removeEventListener('mousedown', onDoc)
            })["Topbar.useEffect"];
        }
    }["Topbar.useEffect"], []);
    const up = (ticker?.change24h ?? 0) >= 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-40 border-b border-white/8 bg-[#0A0E1A]/85 backdrop-blur-xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex min-w-0 items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onOpenMenu,
                            "aria-label": "Open menu",
                            className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-signal/40 lg:hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "truncate text-base font-bold tracking-tight sm:text-lg",
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "truncate text-[11px] text-muted-foreground",
                                    children: ticker ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-white/80",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtPrice"])(ticker.price)
                                            }, void 0, false, {
                                                fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                                                lineNumber: 66,
                                                columnNumber: 19
                                            }, this),
                                            ' ',
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `font-mono ${up ? 'text-emerald-400' : 'text-rose-400'}`,
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtPct"])(ticker.change24h)
                                            }, void 0, false, {
                                                fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                                                lineNumber: 67,
                                                columnNumber: 19
                                            }, this),
                                            ' ',
                                            "· H ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtPrice"])(ticker.high24h),
                                            " · L ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtPrice"])(ticker.low24h),
                                            " · ",
                                            ticker.source
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                                        lineNumber: 65,
                                        columnNumber: 17
                                    }, this) : 'loading market data…'
                                }, void 0, false, {
                                    fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: boxRef,
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setOpen((v)=>!v),
                                    "aria-expanded": open,
                                    className: "inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-sm font-semibold transition-colors hover:border-signal/45",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono",
                                            children: symbol
                                        }, void 0, false, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                                            lineNumber: 88,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                            className: `h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`
                                        }, void 0, false, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                                            lineNumber: 89,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                                    lineNumber: 82,
                                    columnNumber: 13
                                }, this),
                                open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "glass absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl p-1.5 shadow-2xl",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SYMBOLS"].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                onSymbol(s.key);
                                                setOpen(false);
                                            },
                                            className: [
                                                'flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
                                                s.key === symbol ? 'bg-signal/15 text-white' : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                                            ].join(' '),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono font-semibold",
                                                    children: s.key
                                                }, void 0, false, {
                                                    fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[11px]",
                                                    children: s.kind === 'crypto' ? 'crypto' : 'tokenized'
                                                }, void 0, false, {
                                                    fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, s.key, true, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                                            lineNumber: 94,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                                    lineNumber: 92,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-flex overflow-hidden rounded-xl border border-white/12 bg-white/[0.04]",
                            children: [
                                'instant',
                                'realistic'
                            ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>onSettings({
                                            speed: s
                                        }),
                                    className: [
                                        'inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold capitalize transition-colors',
                                        settings.speed === s ? 'bg-signal/20 text-white' : 'text-muted-foreground hover:text-white'
                                    ].join(' '),
                                    children: [
                                        s === 'instant' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                                            lineNumber: 126,
                                            columnNumber: 36
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$timer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Timer$3e$__["Timer"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                                            lineNumber: 126,
                                            columnNumber: 70
                                        }, this),
                                        s
                                    ]
                                }, s, true, {
                                    fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                                    lineNumber: 117,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>onSettings({
                                    autoMode: !settings.autoMode
                                }),
                            className: [
                                'inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-bold tracking-wide transition-colors',
                                settings.autoMode ? 'border-emerald-400/45 bg-emerald-400/12 text-emerald-300' : 'border-white/12 bg-white/[0.04] text-muted-foreground hover:text-white'
                            ].join(' '),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `h-1.5 w-1.5 rounded-full ${settings.autoMode ? 'pulse-ring-green bg-emerald-400' : 'bg-muted-foreground'}`
                                }, void 0, false, {
                                    fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this),
                                "AUTO ",
                                settings.autoMode ? 'ON' : 'OFF'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                            lineNumber: 133,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onRefresh,
                            "aria-label": "Refresh market data",
                            className: "grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-white/[0.04] text-muted-foreground transition-colors hover:border-signal/45 hover:text-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                            lineNumber: 149,
                            columnNumber: 11
                        }, this),
                        running ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onStop,
                            className: "inline-flex items-center gap-2 rounded-xl border border-rose-400/40 bg-rose-400/12 px-4 py-2.5 text-sm font-bold text-rose-200 transition-colors hover:bg-rose-400/20",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                                    lineNumber: 164,
                                    columnNumber: 15
                                }, this),
                                "Stop"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                            lineNumber: 159,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onStart,
                            className: "btn-signal inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                                    lineNumber: 173,
                                    columnNumber: 15
                                }, this),
                                "Start Debate"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                            lineNumber: 168,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/atlas/atlas/src/components/dashboard/Topbar.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(Topbar, "E55k/749z7oFTEczBuWlNvQZcWk=");
_c = Topbar;
var _c;
__turbopack_context__.k.register(_c, "Topbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TradeLogPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/lib/atlas/symbols.ts [app-client] (ecmascript)");
'use client';
;
;
const REASON = {
    target: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    stop: 'border-rose-400/30 bg-rose-400/10 text-rose-300',
    manual: 'border-white/12 bg-white/5 text-muted-foreground'
};
function TradeLogPanel({ trades }) {
    const realized = trades.reduce((a, t)=>a + t.pnl, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass relative overflow-hidden rounded-3xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hairline-top absolute inset-x-12 top-0 h-px"
            }, void 0, false, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-sm font-bold tracking-wide text-white/85",
                        children: "Trade log"
                    }, void 0, false, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[11px] text-muted-foreground",
                        children: [
                            trades.length,
                            " closed · realized",
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: realized >= 0 ? 'text-emerald-400' : 'text-rose-400',
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtUsd"])(realized)
                            }, void 0, false, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                                lineNumber: 22,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            trades.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "px-5 py-12 text-center text-sm text-muted-foreground",
                children: "No closed trades yet. Positions land here when a stop or target is hit, or when you close them."
            }, void 0, false, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full min-w-[42rem] text-left text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-b border-white/8 text-[10px] font-bold tracking-[0.14em] text-muted-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-5 py-3",
                                        children: "CLOSED"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                                        lineNumber: 35,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-3",
                                        children: "SYMBOL"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                                        lineNumber: 36,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-3",
                                        children: "SIDE"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                                        lineNumber: 37,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-3",
                                        children: "ENTRY → EXIT"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                                        lineNumber: 38,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-3 py-3",
                                        children: "EXIT REASON"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                                        lineNumber: 39,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-5 py-3 text-right",
                                        children: "P&L"
                                    }, void 0, false, {
                                        fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                                        lineNumber: 40,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                                lineNumber: 34,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                            lineNumber: 33,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: trades.map((t)=>{
                                const up = t.pnl >= 0;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-b border-white/5 last:border-0 hover:bg-white/[0.02]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-5 py-4 font-mono text-[12px] text-muted-foreground",
                                            children: new Date(t.closedAt).toLocaleString('en-GB', {
                                                hour12: false
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                                            lineNumber: 48,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-4 font-semibold text-white",
                                            children: t.label
                                        }, void 0, false, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                                            lineNumber: 51,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: [
                                                    'rounded-md px-2 py-0.5 font-mono text-[11px] font-bold',
                                                    t.action === 'LONG' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-rose-400/15 text-rose-300'
                                                ].join(' '),
                                                children: t.action
                                            }, void 0, false, {
                                                fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                                                lineNumber: 53,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                                            lineNumber: 52,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-4 font-mono text-white/80",
                                            children: [
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtPrice"])(t.entry),
                                                " → ",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtPrice"])(t.exit)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                                            lineNumber: 64,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${REASON[t.reason]}`,
                                                children: t.reason
                                            }, void 0, false, {
                                                fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                                                lineNumber: 68,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                                            lineNumber: 67,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: `px-5 py-4 text-right font-mono font-bold ${up ? 'text-emerald-400' : 'text-rose-400'}`,
                                            children: [
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtUsd"])(t.pnl),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-1 text-[11px] font-semibold opacity-80",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtPct"])(t.pnlPct)
                                                }, void 0, false, {
                                                    fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                                            lineNumber: 74,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, t.id, true, {
                                    fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                                    lineNumber: 47,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                            lineNumber: 43,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                    lineNumber: 32,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/atlas/atlas/src/components/dashboard/TradeLogPanel.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = TradeLogPanel;
var _c;
__turbopack_context__.k.register(_c, "TradeLogPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/atlas/atlas/src/lib/atlas/symbols.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/atlas/atlas/src/lib/atlas/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AGENTS",
    ()=>AGENTS,
    "START_BALANCE",
    ()=>START_BALANCE
]);
const START_BALANCE = 3000;
const AGENTS = {
    bull: {
        name: 'Bull Agent',
        emoji: '🐂',
        role: 'Long thesis',
        text: 'text-emerald-300',
        border: 'border-emerald-400/30 bg-emerald-400/[0.07]',
        chip: 'border-emerald-400/35 bg-emerald-400/12 text-emerald-300',
        dot: 'bg-emerald-400'
    },
    bear: {
        name: 'Bear Agent',
        emoji: '🐻',
        role: 'Short thesis',
        text: 'text-rose-300',
        border: 'border-rose-400/30 bg-rose-400/[0.07]',
        chip: 'border-rose-400/35 bg-rose-400/12 text-rose-300',
        dot: 'bg-rose-400'
    },
    risk: {
        name: 'Risk Manager',
        emoji: '🛡️',
        role: 'Verdict',
        text: 'text-amber-200',
        border: 'border-amber-300/30 bg-amber-300/[0.07]',
        chip: 'border-amber-300/35 bg-amber-300/12 text-amber-200',
        dot: 'bg-amber-300'
    },
    trader: {
        name: 'Trader',
        emoji: '⚡',
        role: 'Execution',
        text: 'text-sky-300',
        border: 'border-sky-400/30 bg-sky-400/[0.07]',
        chip: 'border-sky-400/35 bg-sky-400/12 text-sky-300',
        dot: 'bg-sky-400'
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/atlas/atlas/src/lib/atlas/useDebate.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDebate",
    ()=>useDebate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
const ORDER = [
    'bull',
    'bear',
    'risk',
    'trader'
];
function useDebate(speed) {
    _s();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [typing, setTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [decision, setDecision] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [meta, setMeta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const runId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const timers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const clearTimers = ()=>{
        timers.current.forEach((t)=>window.clearTimeout(t));
        timers.current = [];
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDebate.useEffect": ()=>clearTimers
    }["useDebate.useEffect"], []);
    const stop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDebate.useCallback[stop]": ()=>{
            runId.current += 1;
            clearTimers();
            setTyping(null);
            setStatus({
                "useDebate.useCallback[stop]": (s)=>s === 'idle' ? 'idle' : 'done'
            }["useDebate.useCallback[stop]"]);
        }
    }["useDebate.useCallback[stop]"], []);
    const run = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDebate.useCallback[run]": async (ticker)=>{
            runId.current += 1;
            const id = runId.current;
            clearTimers();
            setMessages([]);
            setDecision(null);
            setError(null);
            setStatus('thinking');
            setTyping('bull');
            try {
                const res = await fetch('/api/debate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ticker
                    })
                });
                if (!res.ok) throw new Error(`debate ${res.status}`);
                const data = await res.json();
                if (id !== runId.current) return null;
                setMeta({
                    source: data.source,
                    model: data.model,
                    latencyMs: data.latencyMs
                });
                const ordered = [
                    ...data.messages
                ].sort({
                    "useDebate.useCallback[run].ordered": (a, b)=>ORDER.indexOf(a.agent) - ORDER.indexOf(b.agent)
                }["useDebate.useCallback[run].ordered"]);
                if (speed === 'instant') {
                    setMessages(ordered);
                    setDecision(data.decision);
                    setTyping(null);
                    setStatus('done');
                    return data;
                }
                setStatus('streaming');
                const gap = 1500;
                ordered.forEach({
                    "useDebate.useCallback[run]": (msg, i)=>{
                        const t = window.setTimeout({
                            "useDebate.useCallback[run].t": ()=>{
                                if (id !== runId.current) return;
                                setMessages({
                                    "useDebate.useCallback[run].t": (prev)=>[
                                            ...prev,
                                            msg
                                        ]
                                }["useDebate.useCallback[run].t"]);
                                const next = ordered[i + 1];
                                setTyping(next ? next.agent : null);
                                if (msg.agent === 'risk') setDecision(data.decision);
                                if (!next) setStatus('done');
                            }
                        }["useDebate.useCallback[run].t"], gap * i + 350);
                        timers.current.push(t);
                    }
                }["useDebate.useCallback[run]"]);
                return data;
            } catch (e) {
                if (id !== runId.current) return null;
                setError(e instanceof Error ? e.message : 'debate failed');
                setStatus('error');
                setTyping(null);
                return null;
            }
        }
    }["useDebate.useCallback[run]"], [
        speed
    ]);
    const running = status === 'thinking' || status === 'streaming';
    return {
        status,
        running,
        messages,
        typing,
        decision,
        meta,
        error,
        run,
        stop
    };
}
_s(useDebate, "x0qXmT6fdsDFY7E4mJkVBK+4aqo=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/atlas/atlas/src/lib/atlas/usePaper.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "emptyState",
    ()=>emptyState,
    "usePaper",
    ()=>usePaper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/lib/atlas/symbols.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/lib/atlas/types.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const KEY = 'atlas.paper.v1';
const emptyState = ()=>({
        version: 1,
        balance: __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["START_BALANCE"],
        positions: [],
        trades: [],
        equity: [
            {
                t: Date.now(),
                equity: __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["START_BALANCE"]
            }
        ],
        records: {
            bull: {
                wins: 0,
                losses: 0,
                calls: 0
            },
            bear: {
                wins: 0,
                losses: 0,
                calls: 0
            },
            risk: {
                wins: 0,
                losses: 0,
                calls: 0
            }
        },
        settings: {
            paperTrading: true,
            autoExecute: false,
            speed: 'realistic',
            autoMode: false
        },
        lastMessages: {}
    });
function load() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.localStorage.getItem(KEY);
        if (!raw) return emptyState();
        const parsed = JSON.parse(raw);
        if (parsed?.version !== 1) return emptyState();
        return {
            ...emptyState(),
            ...parsed,
            settings: {
                ...emptyState().settings,
                ...parsed.settings
            }
        };
    } catch  {
        return emptyState();
    }
}
const uid = ()=>`${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
function usePaper() {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(emptyState);
    const [hydrated, setHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const stateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(state);
    stateRef.current = state;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePaper.useEffect": ()=>{
            setState(load());
            setHydrated(true);
        }
    }["usePaper.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePaper.useEffect": ()=>{
            if (!hydrated) return;
            try {
                window.localStorage.setItem(KEY, JSON.stringify(state));
            } catch  {
            /* quota — ignore */ }
        }
    }["usePaper.useEffect"], [
        state,
        hydrated
    ]);
    const setSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePaper.useCallback[setSettings]": (patch)=>{
            setState({
                "usePaper.useCallback[setSettings]": (s)=>({
                        ...s,
                        settings: {
                            ...s.settings,
                            ...patch
                        }
                    })
            }["usePaper.useCallback[setSettings]"]);
        }
    }["usePaper.useCallback[setSettings]"], []);
    const rememberMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePaper.useCallback[rememberMessage]": (agent, text)=>{
            setState({
                "usePaper.useCallback[rememberMessage]": (s)=>({
                        ...s,
                        lastMessages: {
                            ...s.lastMessages,
                            [agent]: text
                        }
                    })
            }["usePaper.useCallback[rememberMessage]"]);
        }
    }["usePaper.useCallback[rememberMessage]"], []);
    /** Open a paper position from a decision. Risk-based sizing off current balance. */ const execute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePaper.useCallback[execute]": (decision, ticker, override)=>{
            const d = {
                ...decision,
                ...override
            };
            if (d.action === 'WAIT') return null;
            const spec = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$symbols$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSymbol"])(ticker.symbol);
            const notional = Math.max(Math.min(stateRef.current.balance * 0.25 * (d.sizeMultiplier || 1), stateRef.current.balance), 1);
            const qty = notional / d.entry;
            const position = {
                id: uid(),
                symbol: spec.key,
                label: spec.label,
                action: d.action,
                entry: d.entry,
                stop: d.stop,
                target: d.target,
                qty,
                notional,
                sizeMultiplier: d.sizeMultiplier,
                openedAt: Date.now(),
                reasoning: d.reasoning,
                markPrice: ticker.price
            };
            setState({
                "usePaper.useCallback[execute]": (s)=>({
                        ...s,
                        positions: [
                            position,
                            ...s.positions
                        ],
                        records: {
                            ...s.records,
                            risk: {
                                ...s.records.risk,
                                calls: s.records.risk.calls + 1
                            },
                            [d.action === 'LONG' ? 'bull' : 'bear']: {
                                ...s.records[d.action === 'LONG' ? 'bull' : 'bear'],
                                calls: s.records[d.action === 'LONG' ? 'bull' : 'bear'].calls + 1
                            }
                        }
                    })
            }["usePaper.useCallback[execute]"]);
            return position;
        }
    }["usePaper.useCallback[execute]"], []);
    const closePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePaper.useCallback[closePosition]": (id, exit, reason)=>{
            setState({
                "usePaper.useCallback[closePosition]": (s)=>{
                    const pos = s.positions.find({
                        "usePaper.useCallback[closePosition].pos": (p)=>p.id === id
                    }["usePaper.useCallback[closePosition].pos"]);
                    if (!pos) return s;
                    const dir = pos.action === 'LONG' ? 1 : -1;
                    const pnl = (exit - pos.entry) * pos.qty * dir;
                    const pnlPct = (exit - pos.entry) / pos.entry * 100 * dir;
                    const trade = {
                        id: pos.id,
                        symbol: pos.symbol,
                        label: pos.label,
                        action: pos.action,
                        entry: pos.entry,
                        exit,
                        qty: pos.qty,
                        pnl,
                        pnlPct,
                        openedAt: pos.openedAt,
                        closedAt: Date.now(),
                        reason
                    };
                    const balance = s.balance + pnl;
                    const won = pnl >= 0;
                    const winner = pos.action === 'LONG' ? 'bull' : 'bear';
                    const loser = pos.action === 'LONG' ? 'bear' : 'bull';
                    return {
                        ...s,
                        balance,
                        positions: s.positions.filter({
                            "usePaper.useCallback[closePosition]": (p)=>p.id !== id
                        }["usePaper.useCallback[closePosition]"]),
                        trades: [
                            trade,
                            ...s.trades
                        ].slice(0, 200),
                        equity: [
                            ...s.equity,
                            {
                                t: Date.now(),
                                equity: balance
                            }
                        ].slice(-400),
                        records: {
                            ...s.records,
                            [winner]: {
                                ...s.records[winner],
                                wins: s.records[winner].wins + (won ? 1 : 0),
                                losses: s.records[winner].losses + (won ? 0 : 1)
                            },
                            [loser]: {
                                ...s.records[loser],
                                wins: s.records[loser].wins + (won ? 0 : 1),
                                losses: s.records[loser].losses + (won ? 1 : 0)
                            },
                            risk: {
                                ...s.records.risk,
                                wins: s.records.risk.wins + (won ? 1 : 0),
                                losses: s.records.risk.losses + (won ? 0 : 1)
                            }
                        }
                    };
                }
            }["usePaper.useCallback[closePosition]"]);
        }
    }["usePaper.useCallback[closePosition]"], []);
    /** Mark open positions to market and auto-close on stop / target. */ const mark = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePaper.useCallback[mark]": (prices)=>{
            const hits = [];
            setState({
                "usePaper.useCallback[mark]": (s)=>({
                        ...s,
                        positions: s.positions.map({
                            "usePaper.useCallback[mark]": (p)=>{
                                const px = prices[p.symbol];
                                if (!px) return p;
                                const long = p.action === 'LONG';
                                const hitStop = long ? px <= p.stop : px >= p.stop;
                                const hitTarget = long ? px >= p.target : px <= p.target;
                                if (hitStop) hits.push({
                                    id: p.id,
                                    exit: p.stop,
                                    reason: 'stop'
                                });
                                else if (hitTarget) hits.push({
                                    id: p.id,
                                    exit: p.target,
                                    reason: 'target'
                                });
                                return {
                                    ...p,
                                    markPrice: px
                                };
                            }
                        }["usePaper.useCallback[mark]"])
                    })
            }["usePaper.useCallback[mark]"]);
            hits.forEach({
                "usePaper.useCallback[mark]": (h)=>closePosition(h.id, h.exit, h.reason)
            }["usePaper.useCallback[mark]"]);
            return hits.length;
        }
    }["usePaper.useCallback[mark]"], [
        closePosition
    ]);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePaper.useCallback[reset]": ()=>setState(emptyState())
    }["usePaper.useCallback[reset]"], []);
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "usePaper.useMemo[stats]": ()=>{
            const unrealized = state.positions.reduce({
                "usePaper.useMemo[stats].unrealized": (acc, p)=>{
                    const dir = p.action === 'LONG' ? 1 : -1;
                    return acc + (p.markPrice - p.entry) * p.qty * dir;
                }
            }["usePaper.useMemo[stats].unrealized"], 0);
            const equity = state.balance + unrealized;
            const wins = state.trades.filter({
                "usePaper.useMemo[stats]": (t)=>t.pnl >= 0
            }["usePaper.useMemo[stats]"]).length;
            const winRate = state.trades.length ? wins / state.trades.length * 100 : 0;
            const rets = state.trades.map({
                "usePaper.useMemo[stats].rets": (t)=>t.pnlPct / 100
            }["usePaper.useMemo[stats].rets"]);
            const mean = rets.length ? rets.reduce({
                "usePaper.useMemo[stats]": (a, b)=>a + b
            }["usePaper.useMemo[stats]"], 0) / rets.length : 0;
            const variance = rets.length > 1 ? rets.reduce({
                "usePaper.useMemo[stats]": (a, b)=>a + (b - mean) ** 2
            }["usePaper.useMemo[stats]"], 0) / (rets.length - 1) : 0;
            const sd = Math.sqrt(variance);
            const sharpe = sd > 0 ? mean / sd * Math.sqrt(252) : 0;
            return {
                unrealized,
                equity,
                totalReturnPct: (equity - __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["START_BALANCE"]) / __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["START_BALANCE"] * 100,
                winRate,
                sharpe,
                wins,
                losses: state.trades.length - wins
            };
        }
    }["usePaper.useMemo[stats]"], [
        state.balance,
        state.positions,
        state.trades
    ]);
    const curve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "usePaper.useMemo[curve]": ()=>{
            const live = [
                ...state.equity
            ];
            if (live.length && stats.equity !== live[live.length - 1].equity) {
                live.push({
                    t: Date.now(),
                    equity: stats.equity
                });
            }
            return live;
        }
    }["usePaper.useMemo[curve]"], [
        state.equity,
        stats.equity
    ]);
    return {
        state,
        hydrated,
        stats,
        curve,
        setSettings,
        execute,
        closePosition,
        mark,
        reset,
        rememberMessage
    };
}
_s(usePaper, "JmmShoES88owhUB8nMtKiiszxlU=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=atlas_atlas_src_0g47g-p._.js.map