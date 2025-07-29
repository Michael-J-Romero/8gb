import React from "react";
import dynamic from "next/dynamic";
import { Engine } from "@tsparticles/engine";

const Particles = dynamic(() => import("@tsparticles/react").then(mod => mod.Particles), { ssr: false });

export function SparkleText({ children, className = "", style = {} }) {
  return (
    <div style={{ width: "400px", height: "200px", background: "#222", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
      TEST DIV
    </div>
  );
}
