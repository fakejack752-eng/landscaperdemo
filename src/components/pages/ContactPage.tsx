"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Info,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "@/lib/router";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Contact page — placeholder channels + demo-only message form. */
export function ContactPage() {
  const { navigate } = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const submit = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = "Please enter your name.";
    if (!emailRe.test(email.trim())) e.email = "Enter a valid email address.";
    if (message.trim().length < 5) e.message = "Please write a short message.";
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSending(true);
    timerRef.current = setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1000);
  };

  const channels = [
    {
      icon: Phone,
      label: "Call or text",
      value: siteConfig.business.phoneDisplay,
      note: "Placeholder number — replace with the real line before launch.",
      href: siteConfig.business.phoneHref,
    },
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.business.email,
      note: "Sample address for demonstration.",
    },
    {
      icon: MapPin,
      label: "Service area",
      value: siteConfig.business.serviceAreaLine,
      note: siteConfig.business.address,
    },
    {
      icon: CalendarClock,
      label: "Office hours",
      value: siteConfig.business.hours.map((h) => `${h.days}: ${h.time}`).join(" · "),
      note: "Example hours — editable in the site config.",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's Talk About Your Outdoor Space"
        description="Questions about services, availability, or scheduling? Reach out through any channel below — every contact point here is placeholder content for the demo."
        crumbs={["Contact"]}
      />

      <section className="bg-ivory py-16 lg:py-24" aria-label="Contact channels and form">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            {/* Channels */}
            <Reveal className="space-y-4">
              {channels.map((c) => (
                <div
                  key={c.label}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sage-light text-forest">
                    <c.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-muted-foreground">
                      {c.label}
                    </p>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="mt-1 block break-words font-serif text-lg font-semibold text-forest underline-offset-4 hover:underline"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="mt-1 break-words font-serif text-lg font-semibold text-forest">
                        {c.value}
                      </p>
                    )}
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {c.note}
                    </p>
                  </div>
                </div>
              ))}

              <div className="rounded-2xl bg-forest p-6 text-ivory shadow-md">
                <p className="font-serif text-xl font-semibold">
                  Want a quote faster?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ivory/75">
                  The guided estimate form captures service, property, and
                  timeline in about a minute.
                </p>
                <button
                  onClick={() => navigate("/estimate")}
                  className="group mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-charcoal transition-colors hover:bg-gold-light"
                >
                  Open the estimate form
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </button>
              </div>
            </Reveal>

            {/* Demo message form */}
            <Reveal delay={0.12}>
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
                <div className="border-b border-border bg-ivory-soft px-6 py-5 sm:px-8">
                  <h2 className="font-serif text-2xl font-semibold text-forest">
                    Send a quick message
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Example contact form — messages are not sent anywhere.
                  </p>
                </div>

                {sent ? (
                  <div className="p-8 text-center" role="status">
                    <span className="mx-auto grid size-14 place-items-center rounded-full bg-forest/10 text-forest">
                      <CheckCircle2 className="size-7" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-serif text-2xl font-semibold text-forest">
                      Demo message received.
                    </h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                      {siteConfig.demo.submissionMessage}
                    </p>
                    <Button
                      onClick={() => {
                        setSent(false);
                        setName("");
                        setEmail("");
                        setMessage("");
                      }}
                      variant="outline"
                      className="mt-6 h-11 rounded-full border-forest/30 px-6 font-semibold text-forest hover:bg-forest/5"
                    >
                      Write another message
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-5 p-6 sm:p-8">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="ct-name" className="text-sm font-semibold">
                          Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="ct-name"
                          autoComplete="name"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            setErrors((x) => ({ ...x, name: "" }));
                          }}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "ct-err-name" : undefined}
                          className="mt-2 h-11"
                        />
                        {errors.name && (
                          <p id="ct-err-name" role="alert" className="mt-1.5 text-xs font-semibold text-destructive">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="ct-email" className="text-sm font-semibold">
                          Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="ct-email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors((x) => ({ ...x, email: "" }));
                          }}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "ct-err-email" : undefined}
                          className="mt-2 h-11"
                        />
                        {errors.email && (
                          <p id="ct-err-email" role="alert" className="mt-1.5 text-xs font-semibold text-destructive">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="ct-msg" className="text-sm font-semibold">
                        Message <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="ct-msg"
                        rows={5}
                        placeholder="How can we help? e.g. Do you service Garden City for weekly lawn care?"
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          setErrors((x) => ({ ...x, message: "" }));
                        }}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "ct-err-msg" : undefined}
                        className="mt-2 resize-none"
                      />
                      {errors.message && (
                        <p id="ct-err-msg" role="alert" className="mt-1.5 text-xs font-semibold text-destructive">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      onClick={submit}
                      disabled={sending}
                      className="h-12 w-full rounded-full bg-forest font-bold text-ivory hover:bg-forest-deep sm:w-auto sm:px-8"
                    >
                      {sending ? (
                        <>
                          <span className="size-4 animate-spin rounded-full border-2 border-ivory/40 border-t-ivory" aria-hidden="true" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="size-4" aria-hidden="true" />
                          Send message
                        </>
                      )}
                    </Button>

                    <p
                      className={cn(
                        "flex items-start gap-2.5 rounded-xl border border-gold/50 bg-gold/10 p-4 text-xs leading-relaxed text-foreground/85",
                      )}
                    >
                      <Info className="mt-0.5 size-4 shrink-0 text-earth-deep" aria-hidden="true" />
                      <span>
                        <span className="font-bold">Demo notice:</span>{" "}
                        {siteConfig.demo.formNotice}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              <p className="mt-4 flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
                <MessageSquareText className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                Prefer instant answers? Try the demo chat bubble in the corner
                — it shows how automated responses would feel, using
                prewritten replies only.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
