import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";
const CHAT_URL = API_BASE.replace(/\/+$/, "") + "/chat/";

export default function ChatbotFinalDemo() {
  return <ChatWidget />;
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const [messages, setMessages] = useState(() => [
    msgAssistant(
      "Hi! I’m your Smart City Assistant. Ask about tenders, projects, events, or services.",
      { suggestions: ["Open tenders", "Ongoing projects", "Latest news", "Contact info"] }
    ),
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  const toggleLang = () => setLang((v) => (v === "en" ? "ml" : "en"));

  const send = async (promptText) => {
    const text = (promptText ?? input).trim();
    if (!text || busy) return;

    setInput("");
    setBusy(true);

    setMessages((m) => [...m, msgUser(text)]);

    const placeholderId = cryptoRandomId();
    setMessages((m) => [...m, { id: placeholderId, role: "assistant", type: "text", text: "" }]);

    try {
      const { data } = await axios.post(
        CHAT_URL,
        { message: text, lang },
        { headers: { "Content-Type": "application/json" }, timeout: 15000 }
      );

      const answer = data?.answer || "Sorry, I couldn't find an answer.";
      const sources = Array.isArray(data?.sources)
        ? data.sources.map((s) => ({
            label: s.title || s.kind || "Source",
            url: s.link || s.url || "#",
            kind: s.kind,
          }))
        : [];

      setMessages((m) =>
        m.map((x) => (x.id === placeholderId ? { ...x, text: answer, sources } : x))
      );
    } catch (err) {
      const errMsg =
        err?.message?.includes("Network Error") ||
        (err?.response && err.response.status === 0)
          ? "Couldn’t reach the server (maybe CORS or server is down). Please try again."
          : "Server error. Please try again.";
      setMessages((m) => m.map((x) => (x.id === placeholderId ? { ...x, text: errMsg } : x)));
    } finally {
      setBusy(false);
    }
  };

  const onSuggestionClick = (s) => send(s);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full text-white"
        style={{
          position: "fixed", bottom: 20, left: 20, zIndex: 2147483647,
          padding: "12px 16px", borderRadius: 9999,
          background: "linear-gradient(135deg, #2563eb 0%, #22c55e 100%)",
          boxShadow: "0 10px 24px rgba(0,0,0,.18)",
        }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? "Close" : "Chat"}
      </button>

      {open && (
        <div
          className="bg-white border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{
            position: "fixed", bottom: 90, left: 20, zIndex: 2147483647,
            width: 360, maxWidth: "92vw", height: 520, pointerEvents: "auto",
          }}
        >
          <div
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ background: "linear-gradient(90deg,#2563eb,#3b82f6)", color: "#fff" }}
          >
            <div className="font-semibold">Smart City Assistant</div>
            <div className="flex items-center gap-2">
              <LangBadge lang={lang} onClick={toggleLang} />
              <button type="button" onClick={() => setOpen(false)} className="text-white/90 hover:text-white">✕</button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2" style={{ background: "#f8fafc" }}>
            {messages.map((m) => (
              <MessageBubble key={m.id} msg={m} onSuggestionClick={onSuggestionClick} />
            ))}
          </div>

          <div className="p-2 border-t bg-white">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder={lang === "ml" ? "നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യൂ…" : "Type your question…"}
                className="flex-1 border rounded-xl px-3 py-2 outline-none"
              />
              <button
                type="button"
                onClick={() => send()}
                disabled={busy}
                className="px-4 py-2 rounded-xl text-white disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #2563eb 0%, #22c55e 100%)" }}
              >
                {busy ? (lang === "ml" ? "അയക്കുന്നു…" : "Sending…") : lang === "ml" ? "അയക്കുക" : "Send"}
              </button>
            </div>
            <div className="mt-2 text-[11px] text-gray-500 text-right">Powered by SCTL</div>
          </div>
        </div>
      )}
    </>
  );
}

function MessageBubble({ msg, onSuggestionClick }) {
  if (msg.type === "card") {
    return (
      <div className="max-w-[86%] bg-white border rounded-2xl shadow p-3 text-sm text-gray-800">
        <div className="font-semibold mb-2">{msg.card.title}</div>
        <div className="space-y-2">
          {msg.card.items.map((it, i) => (
            <div key={i} className="rounded-xl bg-gray-50 border p-2">
              <div className="font-medium">{it.name}</div>
              <div className="text-[12px] text-gray-600">Closes: {it.closing}</div>
              <a className="text-blue-600 text-[12px] underline" href="#" onClick={(e) => e.preventDefault()}>
                View details
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (msg.type === "handover") return <HandoverCard />;

  const isUser = msg.role === "user";
  return (
    <div className={`max-w-[86%] ${isUser ? "ml-auto" : ""}`}>
      <div className={`rounded-2xl px-3 py-2 whitespace-pre-wrap ${isUser ? "bg-blue-600 text-white" : "bg-white border text-gray-900"}`}>
        {msg.text || (msg.role === "assistant" ? <span className="text-gray-400">…</span> : null)}

        {msg.suggestions?.length ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {msg.suggestions.map((s, i) => (
              <button type="button" key={i} onClick={() => onSuggestionClick?.(s)} className="text-xs rounded-full border px-2 py-1 hover:bg-gray-100">
                {s}
              </button>
            ))}
          </div>
        ) : null}

        {(msg.sources?.length || msg.citations?.length) ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {msg.sources?.length
              ? msg.sources.map((s, i) => (
                  <a
                    key={i}
                    href={s.url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] bg-gray-100 border rounded-full px-2 py-0.5 underline hover:bg-gray-200"
                    title={s.kind ? `${s.label} • ${s.kind}` : s.label}
                  >
                    {s.label}
                  </a>
                ))
              : msg.citations.map((c, i) => (
                  <span key={i} className="text-[11px] bg-gray-100 border rounded-full px-2 py-0.5">{c}</span>
                ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function HandoverCard() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <div className="max-w-[86%] bg-white border rounded-2xl shadow p-3 text-sm text-gray-800">
      {!done ? (
        <>
          <div className="font-semibold">Connect with a human</div>
          <div className="text-[12px] text-gray-600 mb-2">Share your email; our team will reach out.</div>
          <div className="flex gap-2">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="flex-1 border rounded-xl px-3 py-2 text-sm" />
            <button
              type="button"
              onClick={() => setDone(true)}
              disabled={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
              className="px-3 py-2 rounded-xl text-white disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #2563eb 0%, #22c55e 100%)" }}
            >
              Submit
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-2 text-green-700">
          <span>✅</span>
          <div>Ticket created. Someone will contact <span className="font-medium">{email}</span> soon.</div>
        </div>
      )}
    </div>
  );
}

function LangBadge({ lang, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-[11px] bg-white/20 hover:bg-white/30 border border-white/30 rounded-full px-2 py-1"
      title="Toggle language"
    >
      {lang === "ml" ? "ML" : "EN"}
    </button>
  );
}

// Helpers
function msgUser(text) { return { id: cryptoRandomId(), role: "user", type: "text", text }; }
function msgAssistant(text, extra = {}) { return { id: cryptoRandomId(), role: "assistant", type: "text", text, ...extra }; }
function cryptoRandomId() {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const buf = new Uint32Array(1); crypto.getRandomValues(buf); return "m_" + buf[0].toString(16);
  }
  return "m_" + Math.random().toString(16).slice(2);
}
