"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { useRouter } from "@/lib/router";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { EASE, SPRING } from "@/lib/motion";
import { Button } from "@/components/ui/button";

type Msg = {
  role: "bot" | "user";
  text: string;
  action?: { label: string; path: string };
};

const CANNED: Record<string, Msg> = {
  estimate: {
    role: "bot",
    text: "Wonderful — the quickest way is our guided estimate form. It takes about a minute: pick your service, property type, and timeline, then add contact details.",
    action: { label: "Open the estimate form", path: "/estimate" },
  },
  services: {
    role: "bot",
    text: "We cover everything from lawn care and garden planting to patios, lighting, and commercial grounds care — ten sample services in all, each with its own page.",
    action: { label: "Explore services", path: "/services" },
  },
  areas: {
    role: "bot",
    text: "We serve neighborhoods across Queens, Brooklyn, and Nassau County — from Astoria and Forest Hills to Garden City and Great Neck (sample coverage).",
    action: { label: "View service areas", path: "/areas" },
  },
};

const FALLBACK: Msg = {
  role: "bot",
  text: "Thanks for the message! For anything specific, the estimate form is the fastest way to tell us about your project — or tap one of the quick replies below.",
};

export function ChatWidget() {
  const { navigate } = useRouter();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: siteConfig.chat.opening },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const botReply = (key: string) => {
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, CANNED[key] ?? FALLBACK]);
    }, reduce ? 10 : 750);
    timers.current.push(t);
  };

  const onQuickReply = (key: string, label: string) => {
    setMessages((m) => [...m, { role: "user", text: label }]);
    botReply(key);
  };

  const onSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    const lower = text.toLowerCase();
    const key = lower.includes("estimate") || lower.includes("quote")
      ? "estimate"
      : lower.includes("service") || lower.includes("patio") || lower.includes("lawn") || lower.includes("garden")
        ? "services"
        : lower.includes("area") || lower.includes("queens") || lower.includes("brooklyn") || lower.includes("nassau")
          ? "areas"
          : "";
    botReply(key || "fallback");
  };

  return (
    <div className="fixed bottom-[4.25rem] right-4 z-40 flex flex-col items-end gap-3 lg:bottom-6 lg:right-6">
      {/* Panel */}
      <AnimatePresence>
        {open && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, y: 12, scale: 0.96 }}
          transition={SPRING}
          style={{ transformOrigin: "bottom right" }}
          className="flex max-h-[min(32rem,calc(100dvh-9rem))] w-[min(22.5rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          role="dialog"
          aria-label="Demo chat widget"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-forest px-4 py-3 text-ivory">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-full bg-ivory/10 text-gold">
                <MessageCircle className="size-4.5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold leading-tight">
                  {siteConfig.chat.title}
                </p>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold">
                  {siteConfig.chat.demoLabel}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="grid size-8 place-items-center rounded-md hover:bg-ivory/10"
              aria-label="Close chat"
            >
              <X className="size-4.5" aria-hidden="true" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="custom-scroll flex-1 space-y-3 overflow-y-auto bg-ivory/60 px-4 py-4"
            aria-live="polite"
          >
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  ...(i === messages.length - 1 ? SPRING : { duration: 0.25, ease: EASE }),
                  delay: open && i === 0 && messages.length === 1 ? 0.15 : 0,
                }}
                className={cn(
                  "flex",
                  m.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "rounded-br-sm bg-forest text-ivory"
                      : "rounded-bl-sm border border-border bg-card text-foreground"
                  )}
                >
                  {m.text}
                  {m.action && (
                    <Button
                      onClick={() => {
                        setOpen(false);
                        navigate(m.action!.path);
                      }}
                      size="sm"
                      className="mt-2.5 h-8 w-full rounded-full bg-gold text-xs font-bold text-charcoal hover:bg-gold-light"
                    >
                      {m.action.label}
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
            {typing && (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-border bg-card px-3.5 py-3">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60"
                      style={{ animationDelay: `${d * 0.15}s` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick replies */}
          <div className="flex flex-wrap gap-2 border-t border-border bg-card px-4 pt-3">
            {siteConfig.chat.quickReplies.map((qr) => (
              <button
                key={qr.key}
                onClick={() => onQuickReply(qr.key, qr.label)}
                className="rounded-full border border-forest/25 bg-forest/5 px-3 py-1.5 text-xs font-semibold text-forest transition-colors hover:bg-forest/10"
              >
                {qr.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 bg-card p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
            <label htmlFor="demo-chat-input" className="sr-only">
              Type a message (demo only, responses are prewritten)
            </label>
            <input
              id="demo-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSend()}
              placeholder="Type a message…"
              className="h-10 min-w-0 flex-1 rounded-full border border-input bg-background px-4 text-sm outline-none focus-visible:border-ring"
            />
            <button
              onClick={onSend}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-forest text-ivory transition-colors hover:bg-forest-deep"
              aria-label="Send demo message"
            >
              <Send className="size-4" aria-hidden="true" />
            </button>
          </div>
          <p className="border-t border-border bg-card px-4 pb-3 text-[0.65rem] leading-snug text-muted-foreground">
            Demo chat — prewritten responses only. Not a connected AI assistant,
            and no data is sent or stored.
          </p>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "group flex items-center gap-2 rounded-full bg-forest py-3 pl-3.5 pr-4 text-ivory shadow-xl transition-transform hover:scale-[1.03]",
          reduce && "transition-none hover:scale-100"
        )}
        aria-label={open ? "Close demo chat" : "Open demo chat"}
        aria-expanded={open}
      >
        <span className="relative grid size-6 place-items-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={reduce ? false : { rotate: -80, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { rotate: 80, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18, ease: EASE }}
              className="grid place-items-center"
            >
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <MessageCircle className="size-5 text-gold" aria-hidden="true" />
              )}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="text-sm font-bold">{open ? "Close" : "Chat with us"}</span>
        {!open && (
          <motion.span
            animate={reduce ? undefined : { scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, repeatDelay: 2.6, ease: "easeInOut" }}
            className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-gold text-[0.55rem] font-black text-charcoal"
          >
            1
          </motion.span>
        )}
      </button>
    </div>
  );
}
