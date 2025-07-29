"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { setupAnimatedGridMesh } from "./animated-grid-mesh";
import { AnimatedGridDevPanel } from "./AnimatedGridDevPanel";
import { AnimatedGridParams } from "./animated-grid-types";

export default function AnimatedGridBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const zPos = useTransform(scrollY, [0, 1000], [0, -100]);
  // Dev panel state
  const getInitialParams = (): AnimatedGridParams => {
    try {
      const saved = localStorage.getItem("animatedGridParams");
      if (saved) {
        return { ...defaultParams, ...JSON.parse(saved) };
      }
    } catch {}
    return defaultParams;
  };

  const defaultParams: AnimatedGridParams = {
    starCount: 0,
    starSize: 0.7,
    gridSize: 100,
    divisions: 40,
    gridOpacity: 0.7,
    gridRotationSpeed: 0.0005,
    gridZSpeed: 0.1,
    starRotationSpeed: 0.0007,
    cameraZoom: 40,
    cameraX: 0,
    cameraY: 10,
    cameraZ: 40,
    cameraFov: 75,
    gridColor1: "#9f5fff",
    gridColor2: "#3f0077",
    bgColor: "#1a002a",
    starColor: "#ffffff",
    planeWaviness: 1,
    planeDistortion: 1,
    planeRotX: -Math.PI / 2,
    planeRotY: 0,
    planeRotZ: 0,
    vanishingPointX: 0,
    vanishingPointY: 0,
    starTrail: 0.2,
    gridTrail: 0.2,
    maxCameraZRotationDeg: 45,
    cameraZRotStartDeg: 0,
    cameraZRotRangeDeg: 45,
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

  useEffect(() => {
    const cleanup = setupAnimatedGridMesh({
      mountRef,
      params,
      cameraZRot,
      zPos,
    });
    return cleanup;
    // eslint-disable-next-line
  }, [params, zPos]);

  return (
    <>
      <motion.div
        ref={mountRef}
        className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <AnimatedGridDevPanel params={params} setParams={setParams} />
    </>
  );
}
