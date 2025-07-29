"use client";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";

export function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-background text-foreground">
        {children}
      </main>
    </ThemeProvider>
  );
}
