"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

type RouterContextValue = {
  /** Current hash path, e.g. "/", "/services", "/services/lawn-care" */
  path: string;
  /** Navigate to a hash path; optionally scroll to a section id after render */
  navigate: (to: string, sectionId?: string) => void;
};

const RouterContext = createContext<RouterContextValue>({
  path: "/",
  navigate: () => {},
});

function getHashPath(): string {
  if (typeof window === "undefined") return "/";
  const raw = window.location.hash.replace(/^#/, "");
  return raw.length > 0 ? raw : "/";
}

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const path = useSyncExternalStore(subscribe, getHashPath, () => "/");

  // Scroll to top after every route change (external DOM side effect).
  useEffect(() => {
    const t = window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 60);
    return () => window.clearTimeout(t);
  }, [path]);

  const navigate = useCallback((to: string, sectionId?: string) => {
    const current = getHashPath();
    if (to === current) {
      if (sectionId) {
        scrollToSection(sectionId);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    window.location.hash = to;
    if (sectionId) {
      window.setTimeout(() => scrollToSection(sectionId), 450);
    }
  }, []);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}
