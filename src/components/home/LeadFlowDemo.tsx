"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Inbox,
  MapPin,
  MessagesSquare,
  Phone,
  Play,
  RotateCcw,
  Send,
  Sparkles,
  StickyNote,
  Tag,
  UserRound,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { Icon } from "@/lib/icons";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

type Lead = (typeof siteConfig.leadFlow.sampleLead);

const STEP_ICONS = [
  Send,           // request
  Inbox,          // pipeline
  Bell,           // notify
  MessagesSquare, // respond
  CalendarCheck,  // schedule
  StickyNote,     // followup
] as const;

function DemoChip({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-gold/20 px-2 py-0.5 text-[0.58rem] font-black uppercase tracking-[0.16em] text-earth-deep",
        className
      )}
    >
      <Sparkles className="size-2.5" aria-hidden="true" />
      Example
    </span>
  );
}

/* ── Visualization panels ──────────────────────────────────────────────── */

function PanelRequest({ lead }: { lead: Lead }) {
  return (
    <div className="mx-auto w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-lg">
      <DemoChip />
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
        Website estimate form
      </p>
      <div className="mt-3 space-y-2.5">
        {([
          [UserRound, lead.name],
          [Tag, lead.service],
          [MapPin, `${lead.property} · ${lead.zip}`],
          [Clock, lead.timeline],
        ] as Array<[typeof UserRound, string]>).map(([IconCmp, text], i) => {
          const I = IconCmp;
          return (
            <div key={i} className="flex items-center gap-2.5 rounded-lg bg-ivory/80 px-3 py-2">
              <I className="size-3.5 shrink-0 text-forest" aria-hidden="true" />
              <span className="min-w-0 truncate text-xs font-semibold text-foreground/85">{text}</span>
            </div>
          );
        })}
        <p className="rounded-lg border border-border bg-ivory/60 px-3 py-2 text-xs italic leading-relaxed text-muted-foreground">
          “{lead.message}”
        </p>
        <div className="flex items-center justify-center gap-2 rounded-lg bg-forest px-3 py-2.5 text-xs font-bold text-ivory">
          <Send className="size-3.5 text-gold" aria-hidden="true" />
          Submit request
        </div>
      </div>
    </div>
  );
}

function PanelPipeline({ stage }: { stage: "new" | "followup" }) {
  const lead = siteConfig.leadFlow.sampleLead;
  return (
    <div className="mx-auto w-full min-w-0 max-w-md">
      <DemoChip />
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="min-w-0 rounded-xl border border-border bg-ivory/70 p-3">
          <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-muted-foreground">
            New requests
          </p>
          <div className="mt-2 space-y-2">
            {stage === "new" && <LeadCard />}
            <div className="rounded-lg border border-dashed border-border bg-card/70 px-3 py-2 text-[0.68rem] font-semibold text-muted-foreground">
              Lawn care quote — Bayside
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-xl border border-border bg-ivory/70 p-3">
          <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-muted-foreground">
            Follow-up
          </p>
          <div className="mt-2 space-y-2">
            {stage === "followup" && <LeadCard />}
            <div className="rounded-lg border border-dashed border-border bg-card/70 px-3 py-2 text-[0.68rem] font-semibold text-muted-foreground">
              Spring cleanup — Astoria
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[0.65rem] text-muted-foreground">
        {stage === "new"
          ? "The inquiry lands as a lead card the moment it's submitted."
          : "The pipeline tracks the estimate until it's won or closed."}
      </p>
    </div>
  );
}

function LeadCard() {
  const lead = siteConfig.leadFlow.sampleLead;
  return (
    <motion.div
      layoutId="lead-card"
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      className="rounded-lg border-l-4 border-l-gold bg-card p-3 shadow-md"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="min-w-0 truncate text-xs font-black text-forest">{lead.name}</p>
        <span className="rounded bg-forest/10 px-1.5 py-0.5 text-[0.58rem] font-bold uppercase text-forest">
          {lead.zip.replace("ZIP ", "")}
        </span>
      </div>
      <p className="mt-1 text-[0.68rem] font-semibold text-foreground/80">{lead.service}</p>
      <p className="text-[0.62rem] text-muted-foreground">{lead.property}</p>
    </motion.div>
  );
}

function PanelNotify() {
  const lead = siteConfig.leadFlow.sampleLead;
  return (
    <div className="mx-auto w-full max-w-xs">
      <DemoChip />
      <div className="mx-auto mt-4 w-[15rem] max-w-full rounded-[1.8rem] border-[6px] border-charcoal bg-charcoal p-2 shadow-2xl">
        <div className="flex items-center justify-between px-3 pt-1">
          <span className="text-[0.6rem] font-bold text-ivory/70">9:41</span>
          <span className="size-2 rounded-full bg-ivory/30" aria-hidden="true" />
        </div>
        <motion.div
          initial={{ y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5, ease: EASE }}
          className="mt-2 rounded-2xl bg-card p-3 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg bg-forest text-gold">
              <Bell className="size-3.5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[0.65rem] font-black text-forest">
                Evergreen Leads
              </p>
              <p className="text-[0.55rem] font-semibold uppercase tracking-wide text-muted-foreground">
                now · example notification
              </p>
            </div>
          </div>
          <p className="mt-2 text-[0.7rem] font-semibold leading-snug text-foreground/85">
            {lead.notification}
          </p>
        </motion.div>
        <div className="my-3 grid place-items-center">
          <span className="size-8 rounded-full border-2 border-ivory/25" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-3 text-center text-[0.65rem] text-muted-foreground">
        Instant heads-up so no inquiry is ever missed.
      </p>
    </div>
  );
}

function PanelRespond() {
  const lead = siteConfig.leadFlow.sampleLead;
  return (
    <div className="mx-auto w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-lg">
      <DemoChip />
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
        Customer receives a reply
      </p>
      <div className="mt-3 space-y-2.5">
        <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-ivory px-3.5 py-2.5 text-xs leading-relaxed text-foreground/85">
          {lead.message}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.45, ease: EASE }}
          className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-forest px-3.5 py-2.5 text-xs leading-relaxed text-ivory"
        >
          {lead.response}
        </motion.div>
        <div className="flex items-center gap-1.5 text-[0.62rem] font-semibold text-muted-foreground">
          <Phone className="size-3 text-gold" aria-hidden="true" />
          A call could follow within minutes during business hours.
        </div>
      </div>
    </div>
  );
}

function PanelSchedule() {
  const lead = siteConfig.leadFlow.sampleLead;
  return (
    <div className="mx-auto w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-lg">
      <DemoChip />
      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Calendar — this week
        </p>
        <CalendarCheck className="size-4 text-forest" aria-hidden="true" />
      </div>
      <div className="mt-3 space-y-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.4, ease: EASE }}
          className="rounded-xl border-l-4 border-l-gold bg-forest p-3.5 text-ivory shadow-md"
        >
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-gold">
            On-site walkthrough
          </p>
          <p className="mt-1 text-sm font-bold">{lead.appointment}</p>
          <p className="mt-1 text-[0.7rem] text-ivory/75">
            {lead.name} · {lead.property}
          </p>
        </motion.div>
        <div className="rounded-xl border border-dashed border-border bg-ivory/60 px-3.5 py-2.5 text-[0.7rem] font-semibold text-muted-foreground">
          Thu · Follow-up call — held open
        </div>
      </div>
      <p className="mt-3 text-[0.65rem] leading-relaxed text-muted-foreground">
        Bookings sync to the estimator&apos;s calendar with reminders for
        customer and crew.
      </p>
    </div>
  );
}

function PanelFollowUp() {
  return (
    <div className="mx-auto w-full max-w-md">
      <DemoChip />
      <PanelPipeline stage="followup" />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4, ease: EASE }}
        className="mx-auto mt-4 flex max-w-sm items-start gap-2.5 rounded-xl border border-gold/40 bg-gold/10 p-3"
      >
        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-earth-deep" aria-hidden="true" />
        <p className="text-[0.68rem] leading-relaxed text-foreground/85">
          Estimate sent · reminder set to follow up in 2 days · status updates
          posted back to the customer automatically.
        </p>
      </motion.div>
    </div>
  );
}

/* ── Main section ──────────────────────────────────────────────────────── */

export function LeadFlowDemo() {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const steps = siteConfig.leadFlow.steps;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    setPlaying(false);
    if (timer.current) clearInterval(timer.current);
  }, []);

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  const play = () => {
    if (playing) {
      stop();
      return;
    }
    setCurrent(0);
    setPlaying(true);
    timer.current = setInterval(() => {
      setCurrent((c) => {
        if (c >= steps.length - 1) {
          stop();
          return c;
        }
        return c + 1;
      });
    }, reduce ? 400 : 2200);
  };

  const selectStep = (i: number) => {
    stop();
    setCurrent(i);
  };

  const PanelByStep = [
    <PanelRequest key="request" lead={siteConfig.leadFlow.sampleLead} />,
    <PanelPipeline key="pipeline" stage="new" />,
    <PanelNotify key="notify" />,
    <PanelRespond key="respond" />,
    <PanelSchedule key="schedule" />,
    <PanelFollowUp key="followup" />,
  ];

  return (
    <section className="bg-charcoal py-20 lg:py-28" aria-labelledby="leadflow-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="AI Automation — Interactive Demo"
          title={siteConfig.leadFlow.title}
          subtitle={siteConfig.leadFlow.intro}
          tone="light"
        />

        <div className="mt-14 grid min-w-0 gap-6 lg:grid-cols-[1fr_1.25fr]">
          {/* Step list */}
          <div className="min-w-0">
            <ol className="space-y-2.5">
              {steps.map((s, i) => {
                const StepIcon = STEP_ICONS[i];
                const active = i === current;
                const done = i < current;
                return (
                  <li key={s.key}>
                    <button
                      onClick={() => selectStep(i)}
                      aria-current={active ? "step" : undefined}
                      className={cn(
                        "group flex w-full items-center gap-3.5 rounded-xl border p-3.5 text-left transition-all outline-offset-2 sm:p-4",
                        active
                          ? "border-gold/60 bg-gold/10 shadow-lg"
                          : "border-ivory/12 bg-ivory/[0.04] hover:border-ivory/30 hover:bg-ivory/10"
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-10 shrink-0 place-items-center rounded-xl transition-colors",
                          active
                            ? "bg-gold text-charcoal"
                            : done
                              ? "bg-gold/25 text-gold"
                              : "bg-ivory/10 text-ivory/60"
                        )}
                      >
                        {done ? (
                          <CheckCircle2 className="size-5" aria-hidden="true" />
                        ) : (
                          <StepIcon className="size-5" aria-hidden="true" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "block text-[0.62rem] font-black uppercase tracking-[0.2em]",
                            active ? "text-gold" : "text-ivory/40"
                          )}
                        >
                          Step {i + 1}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 block text-sm font-bold leading-snug",
                            active ? "text-ivory" : "text-ivory/70"
                          )}
                        >
                          {s.label}
                        </span>
                      </span>
                      <ChevronRight
                        className={cn(
                          "size-4 shrink-0 transition-all",
                          active ? "text-gold" : "text-ivory/25"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={play}
                aria-pressed={playing}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-charcoal transition-colors hover:bg-gold-light"
              >
                {playing ? (
                  <>
                    <span className="size-3 rounded-sm border-x-[3px] border-gold bg-transparent" aria-hidden="true" />
                    Pause demo
                  </>
                ) : (
                  <>
                    <Play className="size-3.5 fill-current" aria-hidden="true" />
                    Play full walkthrough
                  </>
                )}
              </button>
              <button
                onClick={() => selectStep(0)}
                className="inline-flex items-center gap-2 rounded-full border border-ivory/25 px-5 py-2.5 text-sm font-semibold text-ivory/80 transition-colors hover:bg-ivory/10"
              >
                <RotateCcw className="size-3.5" aria-hidden="true" />
                Restart
              </button>
            </div>
          </div>

          {/* Visualization */}
          <div className="relative flex min-h-[26rem] min-w-0 flex-col rounded-3xl border border-ivory/12 bg-forest/40 p-5 backdrop-blur-sm sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex flex-1 items-center justify-center"
              >
                {PanelByStep[current]}
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 border-t border-ivory/10 pt-4">
              <p className="text-sm leading-relaxed text-ivory/80">
                <span className="font-bold text-gold">
                  Step {current + 1} — {steps[current].label}.
                </span>{" "}
                {steps[current].text}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-1.5" aria-hidden="true">
                  {steps.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        i === current ? "w-7 bg-gold" : "w-1.5 bg-ivory/25"
                      )}
                    />
                  ))}
                </div>
                <button
                  onClick={() => selectStep(Math.min(current + 1, steps.length - 1))}
                  disabled={current === steps.length - 1}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-gold transition-colors hover:text-gold-light disabled:opacity-40"
                >
                  Next step
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </button>
              </div>
              <p className="mt-3 text-[0.62rem] leading-relaxed text-ivory/45">
                Demonstration only — cards, notifications, and messages are
                static examples. No CRM, phone, or calendar system is actually
                connected on this demo website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
