"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { Shield, Zap, FileText, Clock } from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "Prevent problems",
    description: "Proactive maintenance catches issues before they become outages. Scheduled servicing means surprises are rare.",
    size: "large" as const,
  },
  {
    icon: Zap,
    title: "Respond quickly",
    description: "Defined escalation matrix and rapid response team with clear SLAs.",
    size: "small" as const,
  },
  {
    icon: FileText,
    title: "Document everything",
    description: "Service logs, checklists, and health summaries after every visit.",
    size: "small" as const,
  },
  {
    icon: Clock,
    title: "Support long term",
    description: "The same engineering team that builds your system maintains it for years after installation.",
    size: "large" as const,
  },
];

export function SupportPhilosophy() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Large cards - span more columns */}
      {principles.map((p, i) => (
        <motion.div
          key={p.title}
          className={`rounded-3xl border border-border bg-card p-5 sm:p-6 md:p-8 ${
            p.size === "large" ? "md:col-span-7" : "md:col-span-5"
          } ${i >= 2 ? "md:mt-0" : ""}`}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.7,
            delay: prefersReducedMotion ? 0 : i * 0.1,
            ease: EASE_OUT_EXPO as [number, number, number, number],
          }}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-charcoal">
            <p.icon className="h-6 w-6" strokeWidth={1.5} />
          </span>
          <h3 className="mt-5 text-xl font-semibold text-charcoal font-heading">{p.title}</h3>
          <p className="mt-3 text-sm text-steel leading-relaxed">{p.description}</p>
        </motion.div>
      ))}
    </div>
  );
}