import { useState, useEffect, useRef } from "react";

const SparkLine = ({ color = "#ef4444", points = [], width = 120, height = 40 }) => {
  if (!points.length) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const pts = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`grad-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const generateSparkData = (trend = "down", len = 40) => {
  let val = 50 + Math.random() * 10;
  return Array.from({ length: len }, () => {
    val += (Math.random() - (trend === "down" ? 0.55 : 0.45)) * 3;
    return Math.max(10, Math.min(90, val));
  });
};

const cryptos = [
  { name: "Bitcoin", sym: "BTC", price: "$63,424.29", change: "-3.40%", delta: "-$2,233.60", down: true },
  { name: "Ethereum", sym: "ETH", price: "$1,769.24", change: "-2.65%", delta: "-$48.14", down: true },
  { name: "Solana", sym: "SOL", price: "$69.33", change: "-4.28%", delta: "-$3.10", down: true },
  { name: "Coin 50", sym: "C50", price: "$242.61", change: "-3.42%", delta: "-$8.59", down: true },
];

const newsItems = [
  {
    title: "Bitcoin Plunges to 4-Month Low, Erases All Post-War Gains",
    body: "Bitcoin (BTC) dropped nearly 4% to $63,407, hitting a near four-month low after dipping as low as $61,311 intraday. The sell-off has completely erased all gains accumulated since the onset of the US-Iran conflict, with BTC now trading almost 50% below its all-time high from October 2025.",
    open: true,
  },
  { title: "Strategy's Bitcoin Sale Shatters 'Never Sell' Confidence", body: "", open: false },
  { title: "Ethereum and Altcoins Follow Bitcoin Sharply Lower", body: "", open: false },
];

const watchlist = [
  { name: "ICICI Lombard Gen...", ticker: "ICICIGI · NSE", price: "₹1,732.9", change: "-0.45%", down: true, color: "#f97316" },
  { name: "Tata Technologies ...", ticker: "TATATECH · NSE", price: "₹748.35", change: "+2.37%", down: false, color: "#1d4ed8" },
  { name: "Infosys Limited", ticker: "INFY · NSE", price: "₹1,201.3", change: "-1.74%", down: true, color: "#6366f1" },
  { name: "Reliance Industrie...", ticker: "RELIANCE · BSE", price: "₹1,304.2", change: "-0.67%", down: true, color: "#0ea5e9" },
];

const predictionRows = [
  { price: "62,000", prob: "100.0%", change: "+3.1%", up: true },
  { price: "56,000", prob: "100.0%", change: "0.0%", up: false },
  { price: "58,000", prob: "100.0%", change: "0.0%", up: false },
];

const navItems = ["India Markets ▾", "Crypto", "Earnings", "Predictions", "Screener", "Watchlist"];

export default function Home() {
  const [activeNav, setActiveNav] = useState("Crypto");
  const [openNews, setOpenNews] = useState(0);
  const [sparkData] = useState(() => cryptos.map(() => generateSparkData("down")));
  const [chatInput, setChatInput] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        background: "#0d0d0f",
        minHeight: "100vh",
        color: "#e8e8ea",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          background: "#111114",
          borderRight: "1px solid #1e1e22",
          display: "flex",
          flexDirection: "column",
          padding: "18px 0",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div style={{ padding: "0 18px 18px", borderBottom: "1px solid #1e1e22" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div
              style={{
                width: 30,
                height: 30,
                background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
              }}
            >
              ✦
            </div>
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#1e1e25",
              border: "1px solid #2a2a32",
              borderRadius: 8,
              padding: "7px 12px",
              color: "#e8e8ea",
              cursor: "pointer",
              fontSize: 13,
              width: "100%",
            }}
          >
            <span>＋</span> New
          </button>
        </div>

        {/* Nav */}
        <nav style={{ padding: "12px 10px", flex: 1 }}>
          {[
            { icon: "🖥", label: "Computer" },
            { icon: "⬡", label: "Spaces" },
            { icon: "◈", label: "Artifacts" },
            { icon: "✦", label: "Customize" },
            { icon: "↺", label: "History" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 10px",
                borderRadius: 7,
                cursor: "pointer",
                fontSize: 13,
                color: "#888",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1a1f")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontSize: 15 }}>{icon}</span>
              {label}
            </div>
          ))}
        </nav>

        {/* Sign In */}
        <div style={{ padding: "12px 18px", borderTop: "1px solid #1e1e22" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#2a2a35",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
              }}
            >
              👤
            </div>
            <span style={{ fontSize: 13, color: "#888" }}>Sign In</span>
            <span style={{ marginLeft: "auto", color: "#444", fontSize: 11 }}>›</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top Bar */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 20px",
            borderBottom: "1px solid #1e1e22",
            gap: 16,
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em" }}>Perplexity Finance</span>
          <div
            style={{
              flex: 1,
              maxWidth: 480,
              margin: "0 auto",
              background: "#1a1a1f",
              border: "1px solid #2a2a32",
              borderRadius: 24,
              display: "flex",
              alignItems: "center",
              padding: "7px 14px",
              gap: 8,
              color: "#555",
              fontSize: 13,
            }}
          >
            <span>🔍</span>
            Search for stocks, crypto, and more...
          </div>
          <button
            style={{
              marginLeft: "auto",
              background: "#1a1a1f",
              border: "1px solid #2a2a32",
              borderRadius: 8,
              padding: "6px 14px",
              color: "#e8e8ea",
              fontSize: 13,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            ↗ Share
          </button>
        </header>

        {/* Nav Tabs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            borderBottom: "1px solid #1e1e22",
            gap: 0,
          }}
        >
          {navItems.map((item) => {
            const key = item.replace(" ▾", "");
            const isActive = activeNav === key;
            return (
              <button
                key={item}
                onClick={() => setActiveNav(key)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "13px 16px",
                  color: isActive ? "#e8e8ea" : "#666",
                  fontSize: 13,
                  cursor: "pointer",
                  borderBottom: isActive ? "2px solid #e8e8ea" : "2px solid transparent",
                  marginBottom: -1,
                  fontWeight: isActive ? 600 : 400,
                  transition: "color 0.15s",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                {item === "India Markets ▾" && <span>🇮🇳</span>}
                {item}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "20px", overflowY: "auto", display: "flex", gap: 20 }}>
          {/* Left column */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Crypto Movement */}
            <section>
              <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "#e8e8ea" }}>Crypto Movement</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                {cryptos.map((c, i) => (
                  <div
                    key={c.sym}
                    style={{
                      background: "#111114",
                      border: "1px solid #1e1e22",
                      borderRadius: 10,
                      padding: "14px 14px 10px",
                      cursor: "pointer",
                      transition: "border-color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#2e2e38")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1e1e22")}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</span>
                      <span style={{ fontSize: 12, color: c.down ? "#f87171" : "#4ade80", fontWeight: 600 }}>
                        {c.down ? "↘" : "↗"} {c.change}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: "#666", marginBottom: 8 }}>
                      {c.price}{"  "}<span style={{ color: c.down ? "#f87171" : "#4ade80" }}>{c.delta}</span>
                    </div>
                    <SparkLine
                      color={c.down ? "#f87171" : "#4ade80"}
                      points={sparkData[i]}
                      width={110}
                      height={36}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Market Summary */}
            <section>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e8e8ea" }}>Market Summary</h2>
                <span style={{ fontSize: 11, color: "#555" }}>Updated 55 seconds ago</span>
              </div>
              <div
                style={{
                  background: "#111114",
                  border: "1px solid #1e1e22",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                {newsItems.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      borderBottom: i < newsItems.length - 1 ? "1px solid #1e1e22" : "none",
                    }}
                  >
                    <button
                      onClick={() => setOpenNews(openNews === i ? -1 : i)}
                      style={{
                        width: "100%",
                        background: "none",
                        border: "none",
                        padding: "14px 16px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        color: "#e8e8ea",
                        textAlign: "left",
                        gap: 12,
                      }}
                    >
                      <span style={{ fontSize: 13, fontWeight: openNews === i ? 600 : 400 }}>{item.title}</span>
                      <span style={{ color: "#555", fontSize: 14, flexShrink: 0 }}>{openNews === i ? "∧" : "∨"}</span>
                    </button>
                    {openNews === i && item.body && (
                      <div
                        style={{
                          padding: "0 16px 16px",
                          fontSize: 12.5,
                          color: "#999",
                          lineHeight: 1.65,
                        }}
                      >
                        {item.body}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Chat Input */}
            <div
              style={{
                background: "#111114",
                border: "1px solid #2a2a32",
                borderRadius: 12,
                padding: "14px 16px",
              }}
            >
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask anything about crypto"
                style={{
                  background: "none",
                  border: "none",
                  outline: "none",
                  color: "#888",
                  fontSize: 13,
                  width: "100%",
                  marginBottom: 10,
                }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  style={{
                    background: "#1e1e25",
                    border: "1px solid #2a2a32",
                    borderRadius: 6,
                    padding: "5px 10px",
                    color: "#888",
                    fontSize: 12,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  ＋
                </button>
                <button
                  style={{
                    background: "#1e1e25",
                    border: "1px solid #2a2a32",
                    borderRadius: 6,
                    padding: "5px 12px",
                    color: "#888",
                    fontSize: 12,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  🔍 Search ▾
                </button>
                <button
                  style={{
                    background: "#1e1e25",
                    border: "1px solid #2a2a32",
                    borderRadius: 6,
                    padding: "5px 12px",
                    color: "#888",
                    fontSize: 12,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  🖥 Computer
                </button>
                <div style={{ marginLeft: "auto" }}>
                  <button
                    style={{
                      background: chatInput ? "#7c3aed" : "#1e1e25",
                      border: "none",
                      borderRadius: 6,
                      width: 28,
                      height: 28,
                      color: chatInput ? "#fff" : "#555",
                      cursor: "pointer",
                      fontSize: 14,
                      transition: "background 0.2s",
                    }}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside style={{ width: 280, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Sentiment Badge */}
            <div
              style={{
                background: "#111114",
                border: "1px solid #1e1e22",
                borderRadius: 10,
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", gap: 2 }}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} style={{ width: 3, height: 14, background: "#ef4444", borderRadius: 2, opacity: 0.7 + i * 0.03 }} />
                ))}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#ef4444" }}>Bearish Sentiment</div>
                <div style={{ fontSize: 10, color: "#555" }}>Crypto · 4 Jun 2026, IST</div>
              </div>
            </div>

            {/* Watchlist */}
            <div
              style={{
                background: "#111114",
                border: "1px solid #1e1e22",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 14px",
                  borderBottom: "1px solid #1e1e22",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 600 }}>Create Watchlist</span>
                <span style={{ fontSize: 16, color: "#555", cursor: "pointer" }}>⊞</span>
              </div>
              {watchlist.map((s) => (
                <div
                  key={s.ticker}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 14px",
                    borderBottom: "1px solid #1a1a1e",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#161619")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: s.color,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {s.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {s.name}
                    </div>
                    <div style={{ fontSize: 10, color: "#555" }}>{s.ticker}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{s.price}</div>
                    <div style={{ fontSize: 11, color: s.down ? "#f87171" : "#4ade80" }}>{s.change}</div>
                  </div>
                  <span style={{ color: "#333", fontSize: 16 }}>☆</span>
                </div>
              ))}
            </div>

            {/* Prediction Markets */}
            <div
              style={{
                background: "#111114",
                border: "1px solid #1e1e22",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "12px 14px", borderBottom: "1px solid #1e1e22" }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Prediction Markets</span>
              </div>
              <div style={{ padding: "10px 14px" }}>
                <div style={{ fontSize: 12, color: "#aaa", marginBottom: 10, fontWeight: 500 }}>
                  Bitcoin above ___ on June 4?
                </div>
                {predictionRows.map((r) => (
                  <div
                    key={r.price}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8,
                      fontSize: 12,
                    }}
                  >
                    <span style={{ width: 52, color: "#e8e8ea", fontWeight: 500 }}>{r.price}</span>
                    <div
                      style={{
                        flex: 1,
                        height: 4,
                        background: "#1e1e25",
                        borderRadius: 4,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: r.prob,
                          height: "100%",
                          background: r.up ? "#4ade80" : "#3a3a45",
                          borderRadius: 4,
                        }}
                      />
                    </div>
                    <span style={{ width: 44, textAlign: "right", color: "#555" }}>{r.prob}</span>
                    <span
                      style={{
                        width: 40,
                        textAlign: "right",
                        color: r.up ? "#4ade80" : "#555",
                        fontWeight: r.up ? 600 : 400,
                      }}
                    >
                      {r.up ? "↗" : "—"} {r.change}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 10,
                    color: "#444",
                    marginTop: 8,
                    paddingTop: 8,
                    borderTop: "1px solid #1e1e22",
                  }}
                >
                  <span>$5.6M vol.</span>
                  <span>+11 on Polymarket</span>
                </div>
              </div>
              <div style={{ padding: "10px 14px", borderTop: "1px solid #1e1e22" }}>
                <div style={{ fontSize: 12, color: "#aaa", fontWeight: 500 }}>What price will Bitcoin hit in June?</div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}