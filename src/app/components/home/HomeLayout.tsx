import React from "react";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-green-400" style={{ background: "none" }}>
      <div className="w-full max-w-4xl flex flex-col md:flex-column gap-8 p-6 justify-flex-start" style={{ background: "none" }}>
        {children}
      </div>
    </section>
  );
}
