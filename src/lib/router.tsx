"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
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

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState("/");
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      setPath(getHashPath());
    }
    const onHashChange = () => {
      setPath(getHashPath());
      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
      }, 60);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

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
    setPath(to);
    if (sectionId) {
      window.setTimeout(() => scrollToSection(sectionId), 450);
    } else {
      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
      }, 60);
    }
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}
