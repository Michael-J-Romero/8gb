"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { setupAnimatedGridMesh } from "./animated-grid-mesh";
import { AnimatedGridDevPanel } from "./AnimatedGridDevPanel";
import { AnimatedGridParams } from "./animated-grid-types";
import defaultParamsRaw from "@/app/components/animated-grid/default-params.json";

const defaultParams: AnimatedGridParams = {
  ...defaultParamsRaw,
  starShape: defaultParamsRaw.starShape as AnimatedGridParams["starShape"],
};

export default function AnimatedGridBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const paramsRef = useRef<AnimatedGridParams | null>(null);
  const { scrollY } = useScroll();
  const zPos = useTransform(scrollY, [0, 1000], [0, -100]);
  // Dev panel state
  const getInitialParams = (): AnimatedGridParams => {
    try {
      const saved = false//localStorage.getItem("animatedGridParams");
      if (saved) {
        return { ...defaultParams, ...JSON.parse(saved) };
      }
    } catch {}
    return defaultParams;
  };

  const [params, setParams] = useState<AnimatedGridParams>(getInitialParams);

  // Framer transforms (must be after params is defined)
  // Camera Z rotation: from startDeg to startDeg - rangeDeg (in radians)
  const cameraZRot = useTransform(
    scrollY,
    [0, 1000],
    [
      params.cameraZRotStartDeg * (Math.PI / 180),
      (params.cameraZRotStartDeg - params.cameraZRotRangeDeg) * (Math.PI / 180),
    ]
  );

  // Camera interpolation progress (0 = start, 1 = end)
  const camProgress = useTransform(scrollY, [0, 1000], [0, 1]);

  // Interpolated camera values
  const cameraX = useTransform(camProgress, [0, 1], [params.cameraX, params.cameraX2 ?? params.cameraX]);
  const cameraY = useTransform(camProgress, [0, 1], [params.cameraY, params.cameraY2 ?? params.cameraY]);
  const cameraZ = useTransform(camProgress, [0, 1], [params.cameraZ, params.cameraZ2 ?? params.cameraZ]);
  const cameraRotX = useTransform(camProgress, [0, 1], [params.cameraRotX ?? 0, params.cameraRotX2 ?? params.cameraRotX ?? 0]);
  const cameraRotY = useTransform(camProgress, [0, 1], [params.cameraRotY ?? 0, params.cameraRotY2 ?? params.cameraRotY ?? 0]);
  const cameraRotZ = useTransform(camProgress, [0, 1], [params.cameraRotZ ?? 0, params.cameraRotZ2 ?? params.cameraRotZ ?? 0]);
  const cameraFov = useTransform(camProgress, [0, 1], [params.cameraFov, params.cameraFov2 ?? params.cameraFov]);

  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  useEffect(() => {
    // Clean up any previous renderer
    const cleanup = setupAnimatedGridMesh({
      mountRef: mountRef as React.RefObject<HTMLDivElement>,
      params: paramsRef.current!,
      cameraZRot,
      zPos,
      // Pass interpolated camera values
      cameraX,
      cameraY,
      cameraZ,
      cameraRotX,
      cameraRotY,
      cameraRotZ,
      cameraFov,
    });
    return cleanup;
    // Re-run when params, cameraZRot, or zPos change
  }, [params, cameraZRot, zPos, cameraX, cameraY, cameraZ, cameraRotX, cameraRotY, cameraRotZ, cameraFov]);

  return (
    <>
      <motion.div
        ref={mountRef}
        className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: .3 }}
        transition={{ duration: 1 }}
      />
      <AnimatedGridDevPanel params={params} setParams={setParams} />
    </>
  );
}
