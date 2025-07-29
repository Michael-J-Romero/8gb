import { homepageSections } from "@/lib/homepageSections";
import { HomepageSectionCard } from "@/components/homepage-section-card";
import React from "react";

const sectionIcons = [
  "🛒", // Shop
  "🦋", // Evolutions
  "💖", // Donations
  "👾", // About
  "📬", // Contact
  "🎤", // Events
  "🧴", // Resin Care
];

export default function SectionCards() {
  return (
    <div className="w-full max-w-5xl grid grid-cols-2 gap-4 mt-8">
      {homepageSections.map((section, i) => (
        <HomepageSectionCard
          key={section.href}
          href={section.href}
          label={section.label}
          desc={section.desc}
          icon={sectionIcons[i]}
        />
      ))}
    </div>
  );
}
