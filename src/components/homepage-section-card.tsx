import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

interface HomepageSectionCardProps {
  href: string;
  label: string;
  desc: string;
  icon?: React.ReactNode;
}

export function HomepageSectionCard({ href, label, desc, icon }: HomepageSectionCardProps) {
  return (
    <Card className="retro-card green-glow group flex items-center gap-4 p-4 hover:border-green-300 transition-all">
      <span className="text-2xl drop-shadow-glow text-green-400">{icon}</span>
      <div className="flex-1">
        <Link href={href} className="text-lg font-retro font-bold text-green-400 group-hover:underline">
          {label}
        </Link>
        <div className="text-xs text-green-300 mt-1 font-retro">{desc}</div>
      </div>
    </Card>
  );
}
