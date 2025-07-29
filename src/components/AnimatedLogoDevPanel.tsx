import React, { useState } from "react";

export default function AnimatedLogoDevPanel({ hue, setHue }) {
  return (
    <div className="p-4 border rounded bg-neutral-900/80 text-green-200 flex flex-col gap-2">
      <label className="font-retro text-xs">Logo Hue</label>
      <input
        type="range"
        min={0}
        max={360}
        value={hue}
        onChange={e => setHue(Number(e.target.value))}
        className="w-full"
      />
      <div className="text-xs">{hue}°</div>
    </div>
  );
}
