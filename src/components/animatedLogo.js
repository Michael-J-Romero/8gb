"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useSpring, useMotionValueEvent } from "framer-motion";

const START_FRAME = 15; // Set your desired start frame here
const TOTAL_FRAMES = 94; // change this based on your actual frame count
const FRAME_PATHa = (i) =>
  `/logoanim/output_${String(i).padStart(4, "0")}.png`;

// C:\Users\Owner\Documents\new websites\chezmax\public\stat\output2_0001.png

const FRAME_PATHb = (i) =>
  `/animlogo/output${String(i).padStart(4, "0")}.png`;
export default function Dive(props) {
  const {
    variant = 'a',
    animationMode = 'matchScroll',
    tolerance = 60,
    scrollMode,
    padding = 0,
    paddingTop,
    paddingBottom,
    reverse = false,
    width, // new width prop
    ...rest
  } = props || {};

  // Set default aspect ratio (1:1 for now, can be changed if needed)
  const aspectRatio = 1; // 384/384
  const computedWidth = width || 384;
  const computedHeight = computedWidth / aspectRatio-40

  const ref = useRef(null);
  const FRAME_PATH = variant === 'a' ? FRAME_PATHa : FRAME_PATHa;
  const [isCentered, setIsCentered] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(START_FRAME);
  const [allLoaded, setAllLoaded] = useState(false);
  const [frameUrls, setFrameUrls] = useState([]); // Store Blob URLs
  const [isIntroPlaying, setIsIntroPlaying] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  // Use page scroll (window)
  const { scrollYProgress } = useScroll();
  // Always call useTransform to avoid conditional hook usage
  const transformedProgress = useTransform(
    scrollYProgress,
    [0, 1],
    scrollMode === 'slow' ? [0, 0.3] : [0, 1]
  );
  const progress = transformedProgress;
  // Add smoothing with useSpring, but make it very responsive
  const smoothProgress = useSpring(progress, { damping: 40, stiffness: 400 });
  // If reverse, swap the frame range (needed for non-scroll modes)
  // Only used for non-scroll doubled-frames logic now
  // Remove frameIndex from useEffect dependencies and logic
  // --- Simulate doubled frames for scroll-based animation ---
  useMotionValueEvent(smoothProgress, "change", (prog) => {
    if (isIntroPlaying) return;
    if (animationMode === 'matchScroll' || animationMode === 'withCenter') {
      let doubled = Math.max(0, Math.min(2, prog * 2));
      let frame;
      let flipped;
      if (doubled < 1) {
        flipped = false;
        frame = reverse
          ? Math.round(TOTAL_FRAMES - (TOTAL_FRAMES - START_FRAME) * doubled)
          : Math.round(START_FRAME + (TOTAL_FRAMES - START_FRAME) * doubled);
      } else {
        flipped = true;
        const t = doubled - 1;
        frame = reverse
          ? Math.round(START_FRAME + (TOTAL_FRAMES - START_FRAME) * t)
          : Math.round(TOTAL_FRAMES - (TOTAL_FRAMES - START_FRAME) * t);
      }
      frame = Math.max(START_FRAME, Math.min(TOTAL_FRAMES, frame));
      setCurrentFrame(frame);
      setIsFlipped(flipped);
    }
  });

  // Play intro animation through all frames on mount, then enable normal animation
  useEffect(() => {
    let frame = START_FRAME;
    setCurrentFrame(frame);
    setIsIntroPlaying(true);
    const interval = setInterval(() => {
      frame++;
      setCurrentFrame(frame);
      if (frame >= TOTAL_FRAMES) {
        clearInterval(interval);
        setIsIntroPlaying(false);
      }
    }, 24); // ~24fps
    return () => clearInterval(interval);
  }, []);

  // --- Animation Mode Logic ---
  useEffect(() => {
    if (isIntroPlaying) return; // Block all other frame logic during intro
    if (animationMode === 'loop') {
      let frame = START_FRAME;
      setCurrentFrame(frame);
      const interval = setInterval(() => {
        frame++;
        if (frame > TOTAL_FRAMES) frame = START_FRAME;
        setCurrentFrame(frame);
      }, 24); // ~24fps
      return () => clearInterval(interval);
    } else if (animationMode === 'onCentered') {
      // Listen for scroll and check if element is centered
      const handleScroll = () => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        if (Math.abs(elementCenter - viewportCenter) <= tolerance) {
          setIsCentered(true);
        } else {
          setIsCentered(false);
        }
      };
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // initial check
      return () => window.removeEventListener('scroll', handleScroll);
    } else if (animationMode === 'withCenter') {
      // Animate based on scroll, but only while element is visible (from enter to leave viewport)
      const handleScroll = () => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Allow override of padding for top/bottom
        const padTop = paddingTop !== undefined ? paddingTop : padding;
        const padBottom = paddingBottom !== undefined ? paddingBottom : padding;
        // Progress: 0 when bottom enters viewport + padBottom, 1 when top leaves viewport - padTop
        const totalTravel = windowHeight + rect.height - padTop - padBottom;
        const progress = 1 - (rect.bottom - padBottom) / totalTravel;
        const clamped = Math.max(0, Math.min(1, progress));
        // If reverse, reverse the frame calculation
        const frame = reverse
          ? Math.round(TOTAL_FRAMES - (TOTAL_FRAMES - START_FRAME) * clamped)
          : Math.round(START_FRAME + (TOTAL_FRAMES - START_FRAME) * clamped);
        setCurrentFrame(frame);
      };
      window.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [animationMode, tolerance, padding, paddingTop, paddingBottom, reverse, isIntroPlaying]);

  // For onCentered: play animation when centered (only if not intro)
  useEffect(() => {
    if (isIntroPlaying) return;
    if (animationMode !== 'onCentered' || !isCentered) return;
    let frame = START_FRAME;
    setCurrentFrame(frame);
    const interval = setInterval(() => {
      frame++;
      if (frame > TOTAL_FRAMES) {
        clearInterval(interval);
        return;
      }
      setCurrentFrame(frame);
    }, 24); // ~24fps
    return () => clearInterval(interval);
  }, [animationMode, isCentered, isIntroPlaying]);

  // Animate through all frames on mount (init)
  useEffect(() => {
    if (animationMode === undefined || animationMode === null) {
      let frame = START_FRAME;
      setCurrentFrame(frame);
      const interval = setInterval(() => {
        frame++;
        if (frame > TOTAL_FRAMES) {
          clearInterval(interval);
          return;
        }
        setCurrentFrame(frame);
      }, 24); // ~24fps
      return () => clearInterval(interval);
    }
  }, [animationMode]);

  // Preload frames as blobs and keep Blob URLs in memory
  useEffect(() => {
    let isMounted = true;
    let loaded = 0;
    const blobUrls = [];

    const loadFrame = async (i) => {
      const path = FRAME_PATH(i);
      console.log('Fetching frame', i, path); // Debug: log path
      try {
        const res = await fetch(path);
        if (!res.ok) {
          console.error('Failed to fetch', path, res.status);
          return;
        }
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        blobUrls[i] = url;
        loaded++;
        if (loaded === TOTAL_FRAMES && isMounted) {
          setFrameUrls([...blobUrls]);
          setAllLoaded(true);
        }
      } catch (e) {
        console.error('Error fetching', path, e);
      }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      loadFrame(i);
    }

    return () => {
      isMounted = false;
      blobUrls.forEach(url => url && URL.revokeObjectURL(url));
    };
  }, [FRAME_PATH]);

  // In render, just use currentFrame and isFlipped
  // Replace renderFrame/renderFlipped with currentFrame/isFlipped
  return (
    <div
      ref={ref}
      style={{
        width: computedWidth,
        height: computedHeight,
        zIndex: 20,
        overflow: 'hidden',
        position: 'relative',
        filter: typeof rest?.hue === 'number' ? `hue-rotate(${rest.hue}deg)` : undefined,
      }}
    >
      {!allLoaded && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // background: 'rgba(255,255,255,0.7)',
            zIndex: 1,
          }}
        >
          Loading...
        </div>
      )}
      {allLoaded && frameUrls[currentFrame] && (
        <img
          src={frameUrls[currentFrame]}
          alt="Dive animation frame"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transform: isFlipped ? 'scaleX(-1)' : undefined }}
        />
      )}
    </div>
  );
}
