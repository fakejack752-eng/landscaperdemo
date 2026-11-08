"use client";

import { Phone } from "lucide-react";
import { useRouter } from "@/lib/router";
import { siteConfig } from "@/config/site";

/** Sticky bottom bar on mobile: Call + Get an Estimate. */
export function MobileActionBar() {
  const { navigate } = useRouter();

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
      role="navigation"
      aria-label="Quick actions"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-2 border-t border-ivory/10 bg-forest text-ivory shadow-[0_-4px_16px_rgba(14,42,30,0.35)]">
        <a
          href={siteConfig.business.phoneHref}
          className="flex h-14 items-center justify-center gap-2 text-sm font-bold active:bg-forest-deep"
          aria-label={`Call ${siteConfig.business.phoneDisplay} (placeholder number)`}
        >
          <Phone className="size-4 text-gold" aria-hidden="true" />
          Call
        </a>
        <button
          onClick={() => navigate("/estimate")}
          className="flex h-14 items-center justify-center gap-2 bg-gold text-sm font-bold text-charcoal active:bg-gold-light"
        >
          Get an Estimate
        </button>
      </div>
    </div>
  );
}
