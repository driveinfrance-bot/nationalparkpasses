import * as React from "react";
import { cn } from "@/lib/utils";

const inputTokenStyles: React.CSSProperties = {
  "--input-border": "#94a3b8",
  "--input-focus": "#1F3A2E",
  "--input-placeholder": "#64748b",
  "--input-disabled-bg": "#f1f5f9",
  "--input-disabled-text": "#94a3b8",
} as React.CSSProperties;

export function Input({ className, style, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-lg border border-[var(--input-border)] bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-[var(--input-placeholder)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--input-focus)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[var(--input-disabled-bg)] disabled:text-[var(--input-disabled-text)]",
        className
      )}
      style={{ ...inputTokenStyles, ...style }}
      {...props}
    />
  );
}
