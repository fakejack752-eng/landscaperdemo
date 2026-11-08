"use client";

import { useRouter } from "@/lib/router";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/lib/motion";
import { ArrowLeft } from "lucide-react";

type LegalPageProps = {
  title: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

function LegalPage({ title, intro, sections }: LegalPageProps) {
  const { navigate } = useRouter();

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        description={intro}
        crumbs={[title]}
      />
      <section className="bg-ivory py-16 lg:py-24" aria-label={title}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="space-y-10">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-serif text-2xl font-semibold text-forest">
                  {s.heading}
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-dashed border-earth/40 bg-earth/[0.06] p-5 text-xs leading-relaxed text-foreground/80">
              This page is template text for the demo website concept. A real
              business must replace it with reviewed legal language for its
              jurisdiction before launch.
            </div>

            <button
              onClick={() => navigate("/")}
              className="group inline-flex items-center gap-2 text-sm font-bold text-forest underline-offset-4 hover:underline"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              Back to home
            </button>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** Privacy policy (demo template). */
export function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy (Demo)"
      intro="Plain-language template explaining what a website like this would — and would not — collect."
      sections={[
        {
          heading: "Nothing is collected on this demo",
          body: [
            "This is a demonstration website. The estimate form, contact form, and chat widget do not transmit data anywhere. Anything you type exists only in your own browser and disappears when you leave the page.",
            "No cookies are set for tracking, no analytics are loaded, and no information is shared with third parties.",
          ],
        },
        {
          heading: "What a real version would collect",
          body: [
            "If the business connects this website to a real inbox or CRM, submissions would typically include the name, phone number, email, ZIP code, and project details you provide — used solely to respond to your inquiry.",
            "A privacy policy for a launched site would then describe data storage, retention, third-party processors (such as a CRM provider), and your rights under applicable law, including the ability to request deletion.",
          ],
        },
        {
          heading: "Placeholder contact details",
          body: [
            `The phone number (${siteConfig.business.phoneDisplay}) and email (${siteConfig.business.email}) shown across this website are placeholders. They are not monitored and must be replaced with verified contact information before launch.`,
          ],
        },
        {
          heading: "Questions",
          body: [
            "Because this is a demo, there is no data controller to contact about personal information. For questions about this website concept, visit the credit link in the footer.",
          ],
        },
      ]}
    />
  );
}

/** Terms of use (demo template). */
export function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use (Demo)"
      intro="Template terms describing how the demo content may be understood and used."
      sections={[
        {
          heading: "Demonstration purposes only",
          body: [
            "This website is a design and functionality demonstration created by AI Automation NY. The business described — Evergreen Landscape & Outdoor Living — is fictional. All services, coverage areas, processes, imagery, pricing options, and copy are sample content.",
            "Nothing on this site constitutes an offer to perform services, a price quote, or a factual claim about any real company.",
          ],
        },
        {
          heading: "No submitted information is processed",
          body: [
            "Forms on this website do not send, store, or share information. They exist to demonstrate the customer experience of a real inquiry flow.",
            "The interactive AI-automation walkthrough, chat widget, and notification examples are prewritten front-end simulations. No CRM, phone system, or calendar is connected.",
          ],
        },
        {
          heading: "Imagery & intellectual property",
          body: [
            "Images shown are stock or generated examples labeled as design inspiration. They must be replaced with licensed photography or genuine project photos before any commercial use.",
            "The website structure, copy template, and code are intended as a starting point for AI Automation NY client projects.",
          ],
        },
        {
          heading: "Liability",
          body: [
            "The demo is provided as-is, without warranties of any kind. Visitors should not rely on any content here for making purchasing, hiring, or business decisions.",
          ],
        },
      ]}
    />
  );
}
