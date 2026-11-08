"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Home,
  Info,
  MapPin,
  MessageSquareText,
  PartyPopper,
  Phone,
  RotateCcw,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";
import { useEstimateStore } from "@/store/estimate";
import { cn } from "@/lib/utils";
import { EASE, SPRING } from "@/lib/motion";

/* ── Types & state ─────────────────────────────────────────────────────── */

type EstimateData = {
  service: string;
  propertyType: string;
  zip: string;
  description: string;
  timeline: string;
  budget: string;
  name: string;
  phone: string;
  email: string;
  contactMethod: string;
};

const EMPTY: EstimateData = {
  service: "",
  propertyType: "",
  zip: "",
  description: "",
  timeline: "",
  budget: "",
  name: "",
  phone: "",
  email: "",
  contactMethod: "",
};

const STEP_LABELS = ["Service", "Property", "Details", "Contact", "Review"] as const;

type Errors = Partial<Record<keyof EstimateData, string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const zipRe = /^\d{5}$/;
const phoneRe = /^[\d\s()+.\-]{7,20}$/;

function validateStep(step: number, d: EstimateData): Errors {
  const e: Errors = {};
  if (step === 0 && !d.service) e.service = "Please choose a service to continue.";
  if (step === 1 && !d.propertyType)
    e.propertyType = "Please select a property type.";
  if (step === 2) {
    if (!zipRe.test(d.zip.trim())) e.zip = "Enter a valid 5-digit ZIP code.";
    if (!d.timeline) e.timeline = "Choose a timeline that fits your project.";
  }
  if (step === 3) {
    if (d.name.trim().length < 2) e.name = "Please enter your name.";
    if (!phoneRe.test(d.phone.trim()))
      e.phone = "Enter a phone number, e.g. (555) 123-4567.";
    if (!emailRe.test(d.email.trim())) e.email = "Enter a valid email address.";
    if (!d.contactMethod) e.contactMethod = "Choose a preferred contact method.";
  }
  return e;
}

/* ── Small UI helpers ──────────────────────────────────────────────────── */

function ChoiceCard({
  checked,
  onSelect,
  icon,
  label,
  hint,
  error,
  name,
}: {
  checked: boolean;
  onSelect: () => void;
  icon?: React.ReactNode;
  label: string;
  hint?: string;
  error?: string;
  name: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={checked}
      name={name}
      onClick={onSelect}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-[border-color,background-color,box-shadow] outline-offset-2",
        checked
          ? "border-forest bg-forest/[0.06] shadow-sm"
          : "border-border bg-card hover:border-forest/40"
      )}
    >
      {icon && (
        <span
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-lg transition-colors",
            checked ? "bg-forest text-ivory" : "bg-sage-light text-forest"
          )}
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-foreground">{label}</span>
        {hint && (
          <span className="mt-0.5 block text-xs text-muted-foreground">{hint}</span>
        )}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors",
          checked ? "border-forest bg-forest" : "border-border"
        )}
      >
        <AnimatePresence initial={false}>
          {checked && (
            <motion.span
              key="check"
              initial={reduce ? false : { scale: 0, rotate: -40 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={reduce ? undefined : { scale: 0, opacity: 0 }}
              transition={SPRING}
              className="grid place-items-center"
            >
              <CheckCircle2 className="size-3.5 text-ivory" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs font-semibold text-destructive">
      {message}
    </p>
  );
}

/* ── The form ──────────────────────────────────────────────────────────── */

/** localStorage key for the in-browser draft (demo convenience — nothing is
 *  ever transmitted; clearing browser data removes it). */
const DRAFT_KEY = "evergreen-estimate-draft-v1";

function readDraft(): { data: EstimateData; step: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { data?: unknown; step?: unknown };
    if (!parsed || typeof parsed !== "object" || !parsed.data) return null;
    const d = parsed.data as Record<string, unknown>;
    // Only accept string fields that match the EstimateData shape.
    const keys = Object.keys(EMPTY) as Array<keyof EstimateData>;
    if (!keys.every((k) => typeof d[k] === "string")) return null;
    const step =
      typeof parsed.step === "number" && Number.isInteger(parsed.step)
        ? Math.min(Math.max(parsed.step, 0), 4)
        : 0;
    return { data: { ...EMPTY, ...(d as EstimateData) }, step };
  } catch {
    return null;
  }
}

export function EstimateForm({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();
  const prefill = useEstimateStore((s) => s.prefillService);

  const [step, setStep] = useState(0);
  // Consume a service prefill coming from a service detail page on first render.
  const [data, setData] = useState<EstimateData>(() =>
    prefill ? { ...EMPTY, service: prefill } : EMPTY
  );
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  /** true once the localStorage draft has been read (client only). */
  const [hydrated, setHydrated] = useState(false);
  /** true when a saved draft was restored into the form. */
  const [restored, setRestored] = useState(false);
  /** Direction of the last step change: 1 = forward, -1 = back. */
  const [dir, setDir] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Restore a saved draft after hydration (avoids SSR mismatches).
   * Deferred by one tick — React 19 lint rules forbid synchronous setState
   * inside effects, and the delay is imperceptible.
   * A service prefill from a service page always wins over a saved draft. */
  useEffect(() => {
    const t = setTimeout(() => {
      const draft = readDraft();
      if (draft) {
        if (!prefill || prefill === draft.data.service) {
          setData(draft.data);
          setStep(draft.step);
          setRestored(true);
        } else {
          // User arrived from a different service page — keep their draft
          // details but re-anchor to the newly selected service, step 1.
          setData({ ...draft.data, service: prefill });
          setStep(0);
          setRestored(true);
        }
      }
      setHydrated(true);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  /* Persist the draft (skipped until restore has run). */
  useEffect(() => {
    if (!hydrated || submitted) return;
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ data, step }));
    } catch {
      /* private browsing / quota — persistence is a nicety, not a requirement */
    }
  }, [hydrated, submitted, data, step]);

  const clearDraft = () => {
    try {
      window.localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
  };

  const set = <K extends keyof EstimateData>(key: K, value: EstimateData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const goTo = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
    setErrors({});
    topRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const next = () => {
    const e = validateStep(step, data);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    goTo(Math.min(step + 1, 4));
  };

  const back = () => goTo(Math.max(step - 1, 0));

  const submit = () => {
    setSubmitting(true);
    // Pure front-end demo: nothing is sent anywhere.
    timerRef.current = setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      clearDraft();
      topRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }, reduce ? 100 : 1100);
  };

  const reset = () => {
    clearDraft();
    setData(EMPTY);
    setErrors({});
    setSubmitted(false);
    setStep(0);
    setRestored(false);
  };

  const progress = useMemo(() => ((step + 1) / 5) * 100, [step]);

  // Step-1 options include the prefilled service title when it doesn't match
  // a standard estimate option (e.g. coming from a service detail page).
  const serviceOptions = useMemo(() => {
    const opts: string[] = [...siteConfig.estimate.services];
    if (prefill && !opts.includes(prefill)) opts.unshift(prefill);
    return opts;
  }, [prefill]);

  /* ── Success screen ────────────────────────────────────────────────── */
  if (submitted) {
    return (
      <div
        ref={topRef}
        className="rounded-3xl border border-border bg-card p-8 text-center shadow-lg sm:p-12"
        role="status"
      >
        <motion.span
          initial={reduce ? false : { scale: 0.3, rotate: -16, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ ...SPRING, delay: 0.05 }}
          className="mx-auto grid size-16 place-items-center rounded-full bg-forest/10 text-forest"
        >
          <PartyPopper className="size-8" aria-hidden="true" />
        </motion.span>
        <h3 className="mt-5 font-serif text-3xl font-semibold text-forest">
          Demo request received.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
          {siteConfig.demo.submissionMessage}
        </p>
        <div className="mx-auto mt-6 max-w-md rounded-2xl border border-dashed border-border bg-ivory/70 p-5 text-left">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-earth">
            Example of what a business would receive
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
            <li><span className="font-semibold">Service:</span> {data.service}</li>
            <li><span className="font-semibold">Property:</span> {data.propertyType}</li>
            <li><span className="font-semibold">ZIP:</span> {data.zip}</li>
            <li><span className="font-semibold">Timeline:</span> {data.timeline}</li>
            {data.budget && <li><span className="font-semibold">Budget:</span> {data.budget}</li>}
            <li><span className="font-semibold">Contact:</span> {data.name} · {data.contactMethod}</li>
          </ul>
        </div>
        <p className="mx-auto mt-5 max-w-md text-xs leading-relaxed text-muted-foreground">
          Nothing was sent, stored, or shared — this confirmation is part of the
          design demonstration. Connecting the form to a real inbox or CRM is a
          configuration step described in the README.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            onClick={reset}
            variant="outline"
            className="h-11 rounded-full border-forest/30 px-6 font-semibold text-forest hover:bg-forest/5"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Start another request
          </Button>
          <Button
            onClick={() => window.location.hash = "/"}
            className="h-11 rounded-full bg-forest px-6 font-bold text-ivory hover:bg-forest-deep"
          >
            Back to home
          </Button>
        </div>
      </div>
    );
  }

  /* ── Error helper for current step ─────────────────────────────────── */
  const err = (k: keyof EstimateData) => errors[k];

  return (
    <div ref={topRef} className="scroll-mt-24">
      {/* Progress */}
      <div className="rounded-t-3xl border border-b-0 border-border bg-forest px-6 pb-6 pt-6 sm:px-8">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gold">
            Estimate request
          </p>
          <p className="text-xs font-semibold text-ivory/70">
            Step {step + 1} of 5 — {STEP_LABELS[step]}
          </p>
        </div>
        <div
          className="mt-3.5 h-1.5 overflow-hidden rounded-full bg-ivory/15"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Form progress"
        >
          <motion.div
            className="h-full rounded-full bg-gold"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={reduce ? { duration: 0 } : { duration: 0.5, ease: EASE }}
          />
        </div>
        <div className="mt-3 hidden justify-between sm:flex">
          {STEP_LABELS.map((label, i) => (
            <span
              key={label}
              className={cn(
                "text-[0.65rem] font-bold uppercase tracking-[0.14em]",
                i < step ? "text-gold" : i === step ? "text-ivory" : "text-ivory/40"
              )}
            >
              {i < step ? "✓ " : ""}{label}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="rounded-b-3xl border border-t-0 border-border bg-card p-6 shadow-lg sm:p-8">
        {restored && (
          <div
            role="status"
            className="mb-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-xl border border-sage bg-sage/20 px-4 py-2.5"
          >
            <p className="text-xs font-semibold text-foreground/80">
              We restored your saved progress from this browser. Nothing has
              been sent or stored anywhere else.
            </p>
            <button
              type="button"
              onClick={reset}
              className="shrink-0 rounded-full px-3 py-1 text-xs font-bold text-forest underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest"
            >
              Start over
            </button>
          </div>
        )}
        {/* Step content — slides in the direction of travel */}
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={step}
            initial={reduce ? false : { opacity: 0, x: 34 * dir }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -26 * dir }}
            transition={{ duration: 0.3, ease: EASE }}
          >
        {step === 0 && (
          <fieldset>
            <legend className="font-serif text-2xl font-semibold text-forest">
              What service are you interested in?
            </legend>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Pick the closest match — you can add details in the next steps.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {serviceOptions.map((s) => (
                <ChoiceCard
                  key={s}
                  name="service"
                  label={s}
                  checked={data.service === s}
                  onSelect={() => set("service", s)}
                  icon={<ClipboardList className="size-4.5" aria-hidden="true" />}
                />
              ))}
            </div>
            <FieldError id="err-service" message={err("service")} />
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend className="font-serif text-2xl font-semibold text-forest">
              What kind of property is this?
            </legend>
            <p className="mt-1.5 text-sm text-muted-foreground">
              This helps tailor the visit and the estimate.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {siteConfig.estimate.propertyTypes.map((p, i) => (
                <ChoiceCard
                  key={p}
                  name="propertyType"
                  label={p}
                  checked={data.propertyType === p}
                  onSelect={() => set("propertyType", p)}
                  icon={
                    i === 2 ? (
                      <MapPin className="size-4.5" aria-hidden="true" />
                    ) : (
                      <Home className="size-4.5" aria-hidden="true" />
                    )
                  }
                />
              ))}
            </div>
            <FieldError id="err-property" message={err("propertyType")} />
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="space-y-6">
            <div>
              <legend className="font-serif text-2xl font-semibold text-forest">
                Tell us about the project
              </legend>
              <p className="mt-1.5 text-sm text-muted-foreground">
                A sentence or two is plenty — photos can come later.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-[10rem_1fr]">
              <div>
                <Label htmlFor="est-zip" className="text-sm font-semibold">
                  ZIP code <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="est-zip"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="11375"
                  maxLength={5}
                  value={data.zip}
                  onChange={(e) => set("zip", e.target.value.replace(/\D/g, "").slice(0, 5))}
                  aria-invalid={!!err("zip")}
                  aria-describedby={err("zip") ? "err-zip" : undefined}
                  className="mt-2 h-11"
                />
                <FieldError id="err-zip" message={err("zip")} />
              </div>
              <div>
                <Label htmlFor="est-desc" className="text-sm font-semibold">
                  Project description{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    (optional)
                  </span>
                </Label>
                <Textarea
                  id="est-desc"
                  placeholder="e.g. Front walkway is crumbling; interested in bluestone with matching steps…"
                  rows={4}
                  value={data.description}
                  onChange={(e) => set("description", e.target.value)}
                  className="mt-2 resize-none"
                />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label className="text-sm font-semibold" htmlFor="est-timeline-radio">
                  Timeline <span className="text-destructive">*</span>
                </Label>
                <div id="est-timeline-radio" role="radiogroup" aria-label="Timeline" className="mt-2 space-y-2.5">
                  {siteConfig.estimate.timelines.map((t) => (
                    <ChoiceCard
                      key={t}
                      name="timeline"
                      label={t}
                      checked={data.timeline === t}
                      onSelect={() => set("timeline", t)}
                    />
                  ))}
                </div>
                <FieldError id="err-timeline" message={err("timeline")} />
              </div>
              <div>
                <Label className="text-sm font-semibold" htmlFor="est-budget-radio">
                  Budget range{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    (optional)
                  </span>
                </Label>
                <div id="est-budget-radio" role="radiogroup" aria-label="Budget range" className="mt-2 space-y-2.5">
                  {siteConfig.estimate.budgets.map((b) => (
                    <ChoiceCard
                      key={b}
                      name="budget"
                      label={b}
                      checked={data.budget === b}
                      onSelect={() => set("budget", b)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset className="space-y-5">
            <div>
              <legend className="font-serif text-2xl font-semibold text-forest">
                Where should we send the estimate?
              </legend>
              <p className="mt-1.5 text-sm text-muted-foreground">
                On a real website this reaches the business&apos;s inbox or
                CRM. Here, it stays in your browser.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="est-name" className="text-sm font-semibold">
                  Full name <span className="text-destructive">*</span>
                </Label>
                <div className="relative mt-2">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="est-name"
                    autoComplete="name"
                    placeholder="Alex Rivera"
                    value={data.name}
                    onChange={(e) => set("name", e.target.value)}
                    aria-invalid={!!err("name")}
                    aria-describedby={err("name") ? "err-name" : undefined}
                    className="h-11 pl-10"
                  />
                </div>
                <FieldError id="err-name" message={err("name")} />
              </div>
              <div>
                <Label htmlFor="est-phone" className="text-sm font-semibold">
                  Phone <span className="text-destructive">*</span>
                </Label>
                <div className="relative mt-2">
                  <Phone className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="est-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(555) 123-4567"
                    value={data.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    aria-invalid={!!err("phone")}
                    aria-describedby={err("phone") ? "err-phone" : undefined}
                    className="h-11 pl-10"
                  />
                </div>
                <FieldError id="err-phone" message={err("phone")} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="est-email" className="text-sm font-semibold">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="est-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                  aria-invalid={!!err("email")}
                  aria-describedby={err("email") ? "err-email" : undefined}
                  className="mt-2 h-11"
                />
                <FieldError id="err-email" message={err("email")} />
              </div>
            </div>
            <div>
              <Label className="text-sm font-semibold" htmlFor="est-contact-radio">
                Preferred contact method <span className="text-destructive">*</span>
              </Label>
              <div id="est-contact-radio" role="radiogroup" aria-label="Preferred contact method" className="mt-2 grid gap-3 sm:grid-cols-3">
                {siteConfig.estimate.contactMethods.map((m, i) => (
                  <ChoiceCard
                    key={m}
                    name="contactMethod"
                    label={m}
                    checked={data.contactMethod === m}
                    onSelect={() => set("contactMethod", m)}
                    icon={
                      i === 0 ? (
                        <Phone className="size-4.5" aria-hidden="true" />
                      ) : (
                        <MessageSquareText className="size-4.5" aria-hidden="true" />
                      )
                    }
                  />
                ))}
              </div>
              <FieldError id="err-contact" message={err("contactMethod")} />
            </div>
          </fieldset>
        )}

        {step === 4 && (
          <div>
            <h3 className="font-serif text-2xl font-semibold text-forest">
              Review your request
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              A quick look before submitting. Use the Back button to change
              anything.
            </p>
            <dl className="mt-6 grid gap-3 rounded-2xl border border-border bg-ivory/60 p-5 sm:grid-cols-2">
              {[
                ["Service", data.service],
                ["Property type", data.propertyType],
                ["ZIP code", data.zip],
                ["Timeline", data.timeline],
                ["Budget", data.budget || "—"],
                ["Description", data.description || "—"],
                ["Name", data.name],
                ["Phone", data.phone],
                ["Email", data.email],
                ["Preferred contact", data.contactMethod],
              ].map(([k, v]) => (
                <div key={k} className="min-w-0">
                  <dt className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="mt-0.5 truncate text-sm font-semibold text-foreground">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-gold/50 bg-gold/10 p-4">
              <Info className="mt-0.5 size-4.5 shrink-0 text-earth-deep" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-foreground/85">
                <span className="font-bold">Demo notice:</span>{" "}
                {siteConfig.demo.formNotice}
              </p>
            </div>
          </div>
        )}
          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        <div className="mt-8 flex flex-col-reverse items-stretch gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            onClick={back}
            disabled={step === 0}
            variant="ghost"
            className="h-11 rounded-full px-5 font-semibold text-forest disabled:opacity-0"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </Button>
          {step < 4 ? (
            <Button
              type="button"
              onClick={next}
              className="h-11 rounded-full bg-gold px-7 font-bold text-charcoal transition-transform hover:bg-gold-light active:scale-95"
            >
              Continue
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="h-11 rounded-full bg-forest px-7 font-bold text-ivory transition-transform hover:bg-forest-deep active:scale-95"
            >
              {submitting ? (
                <>
                  <span
                    className="size-4 animate-spin rounded-full border-2 border-ivory/40 border-t-ivory"
                    aria-hidden="true"
                  />
                  Sending…
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-4" aria-hidden="true" />
                  Submit request
                </>
              )}
            </Button>
          )}
        </div>
        {!compact && (
          <p className="mt-4 text-center text-[0.68rem] leading-relaxed text-muted-foreground sm:text-left">
            {siteConfig.demo.formNotice}
          </p>
        )}
      </div>
    </div>
  );
}
