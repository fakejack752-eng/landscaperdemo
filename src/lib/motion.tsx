"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

/** Soft spring used for micro-interactions (hover lifts, check pops, panels). */
export const SPRING = { type: "spring", stiffness: 320, damping: 28 } as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Fade + slide entrance on scroll. Disabled when user prefers reduced motion. */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function staggerContainer(
  stagger = 0.08,
  delayChildren = 0
): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

type StaggerProps = RevealProps & { stagger?: number };

/** Staggered container for card reveals. */
export function Stagger({ children, className, stagger = 0.08, delay = 0 }: StaggerProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={cn("h-full", className)}>{children}</div>;
  return (
    <motion.div className={cn("h-full", className)} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

/** Interactive wrapper: spring lift on hover, gentle press on tap.
 *  Falls back to a plain div when the user prefers reduced motion. */
export function HoverLift({
  children,
  className,
  lift = 5,
}: RevealProps & { lift?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      whileHover={{ y: -lift }}
      whileTap={{ scale: 0.985 }}
      transition={SPRING}
    >
      {children}
    </motion.div>
  );
}
