import { cn } from "@/lib/utils";

export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-semibold tracking-tight",
        tone === "dark" ? "text-warm-white" : "text-charcoal",
        className
      )}
    >
      <span
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold",
          tone === "dark" ? "bg-warm-white text-charcoal" : "bg-deep-blue text-warm-white"
        )}
        aria-hidden
      >
        IBS
      </span>
      <span className="text-[0.95rem] leading-tight">
        Insight Business
        <br />
        Solutions
      </span>
    </span>
  );
}
