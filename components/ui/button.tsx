import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

const primaryTokenStyles: React.CSSProperties = {
  "--button-bg": "var(--accent-9)",
  "--button-bg-hover": "var(--accent-10)",
  "--button-bg-active": "var(--accent-11)",
  "--button-fg": "var(--accent-contrast)",
  "--button-radius": "var(--radius-3)",
} as React.CSSProperties;

export function Button({ className, variant = "default", style, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "default"
          ? "bg-[var(--button-bg)] text-[var(--button-fg)] hover:bg-[var(--button-bg-hover)] active:bg-[var(--button-bg-active)] rounded-[var(--button-radius)]"
          : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
        className
      )}
      style={variant === "default" ? { ...primaryTokenStyles, ...style } : style}
      {...props}
    />
  );
}
