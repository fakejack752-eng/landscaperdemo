"use client";

import {
  ArrowRight,
  Bell,
  BrickWall,
  Building2,
  CalendarCheck,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Clock,
  Droplets,
  Flower2,
  Grass,
  Home,
  Info,
  Leaf,
  Lightbulb,
  MapPin,
  MessagesSquare,
  PencilRuler,
  Phone,
  Ruler,
  Shovel,
  Snowflake,
  Sprout,
  Sun,
  TreePine,
  Trees,
  type LucideIcon,
} from "lucide-react";

export const iconMap = {
  ArrowRight,
  Bell,
  BrickWall,
  Building2,
  CalendarCheck,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Clock,
  Droplets,
  Flower2,
  Grass,
  Home,
  Info,
  Leaf,
  Lightbulb,
  MapPin,
  MessagesSquare,
  PencilRuler,
  Phone,
  Ruler,
  Shovel,
  Snowflake,
  Sprout,
  Sun,
  TreePine,
  Trees,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Component = iconMap[name];
  if (!Component) return null;
  return <Component className={className} aria-hidden="true" />;
}
