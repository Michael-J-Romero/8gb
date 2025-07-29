import { useState, useEffect } from "react";

// Developer panel for controlling background parameters
export function AnimatedGridDevPanel({
  params,
  setParams,
}: {
  params: AnimatedGridParams;
  setParams: React.Dispatch<React.SetStateAction<AnimatedGridParams>>;
}) {
  const [open, setOpen] = useState(true);

  // Persist params to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("animatedGridParams", JSON.stringify(params));
    } catch {}
  }, [params]);

  // Load params from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("animatedGridParams");
      if (saved) {
        setParams((p) => ({ ...p, ...JSON.parse(saved) }));
      }
    } catch {}
    // eslint-disable-next-line
  }, []);

  // Copy params to clipboard
  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(JSON.stringify(params, null, 2));
    } catch {}
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        className="bg-black text-green-200 border border-green-700 rounded-t-lg px-4 py-2 font-mono text-xs w-80 flex items-center justify-between shadow-lg focus:outline-none"
        style={{ borderBottomLeftRadius: open ? 0 : '0.5rem', borderBottomRightRadius: open ? 0 : '0.5rem' }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="dev-panel-content"
      >
        <span className="font-bold text-green-400">V</span>
        <span className="ml-2">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div
          id="dev-panel-content"
          className="bg-black text-green-200 p-4 rounded-b-lg shadow-lg w-80 border border-green-700 border-t-0 space-y-2 font-mono text-xs max-h-96 overflow-y-auto animate-fade-in"
        >
          <div className="space-y-2">
            {/* Star Count */}
            <label className="flex items-center justify-between gap-2">
              Star Count
              <input
                type="range"
                min={100}
                max={3000}
                step={50}
                value={params.starCount}
                onChange={(e) =>
                  setParams((p) => ({ ...p, starCount: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={100}
                max={3000}
                step={50}
                value={params.starCount}
                onChange={(e) =>
                  setParams((p) => ({ ...p, starCount: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Star Size */}
            <label className="flex items-center justify-between gap-2">
              Star Size
              <input
                type="range"
                min={0.1}
                max={2}
                step={0.05}
                value={params.starSize}
                onChange={(e) =>
                  setParams((p) => ({ ...p, starSize: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={0.1}
                max={2}
                step={0.05}
                value={params.starSize}
                onChange={(e) =>
                  setParams((p) => ({ ...p, starSize: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Grid Size */}
            <label className="flex items-center justify-between gap-2">
              Grid Size
              <input
                type="range"
                min={20}
                max={200}
                step={1}
                value={params.gridSize}
                onChange={(e) =>
                  setParams((p) => ({ ...p, gridSize: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={20}
                max={200}
                step={1}
                value={params.gridSize}
                onChange={(e) =>
                  setParams((p) => ({ ...p, gridSize: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Grid Divisions */}
            <label className="flex items-center justify-between gap-2">
              Grid Divisions
              <input
                type="range"
                min={5}
                max={100}
                step={1}
                value={params.divisions}
                onChange={(e) =>
                  setParams((p) => ({ ...p, divisions: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={5}
                max={100}
                step={1}
                value={params.divisions}
                onChange={(e) =>
                  setParams((p) => ({ ...p, divisions: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Grid Opacity */}
            <label className="flex items-center justify-between gap-2">
              Grid Opacity
              <input
                type="range"
                min={0.1}
                max={1}
                step={0.01}
                value={params.gridOpacity}
                onChange={(e) =>
                  setParams((p) => ({ ...p, gridOpacity: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={0.1}
                max={1}
                step={0.01}
                value={params.gridOpacity}
                onChange={(e) =>
                  setParams((p) => ({ ...p, gridOpacity: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Grid Rotation Speed */}
            <label className="flex items-center justify-between gap-2">
              Grid Rotation Speed
              <input
                type="range"
                min={0}
                max={0.01}
                step={0.0001}
                value={params.gridRotationSpeed}
                onChange={(e) =>
                  setParams((p) => ({ ...p, gridRotationSpeed: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={0}
                max={0.01}
                step={0.0001}
                value={params.gridRotationSpeed}
                onChange={(e) =>
                  setParams((p) => ({ ...p, gridRotationSpeed: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Grid Z Speed */}
            <label className="flex items-center justify-between gap-2">
              Grid Z Speed
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={params.gridZSpeed}
                onChange={(e) =>
                  setParams((p) => ({ ...p, gridZSpeed: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={0}
                max={1}
                step={0.01}
                value={params.gridZSpeed}
                onChange={(e) =>
                  setParams((p) => ({ ...p, gridZSpeed: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Star Rotation Speed */}
            <label className="flex items-center justify-between gap-2">
              Star Rotation Speed
              <input
                type="range"
                min={0}
                max={0.01}
                step={0.0001}
                value={params.starRotationSpeed}
                onChange={(e) =>
                  setParams((p) => ({ ...p, starRotationSpeed: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={0}
                max={0.01}
                step={0.0001}
                value={params.starRotationSpeed}
                onChange={(e) =>
                  setParams((p) => ({ ...p, starRotationSpeed: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Camera Zoom */}
            <label className="flex items-center justify-between gap-2">
              Camera Zoom
              <input
                type="range"
                min={10}
                max={100}
                step={1}
                value={params.cameraZoom}
                onChange={(e) =>
                  setParams((p) => ({ ...p, cameraZoom: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={10}
                max={100}
                step={1}
                value={params.cameraZoom}
                onChange={(e) =>
                  setParams((p) => ({ ...p, cameraZoom: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Camera X */}
            <label className="flex items-center justify-between gap-2">
              Camera X
              <input
                type="range"
                min={-100}
                max={100}
                step={1}
                value={params.cameraX}
                onChange={(e) =>
                  setParams((p) => ({ ...p, cameraX: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={-100}
                max={100}
                step={1}
                value={params.cameraX}
                onChange={(e) =>
                  setParams((p) => ({ ...p, cameraX: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Camera Y */}
            <label className="flex items-center justify-between gap-2">
              Camera Y
              <input
                type="range"
                min={-100}
                max={100}
                step={1}
                value={params.cameraY}
                onChange={(e) =>
                  setParams((p) => ({ ...p, cameraY: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={-100}
                max={100}
                step={1}
                value={params.cameraY}
                onChange={(e) =>
                  setParams((p) => ({ ...p, cameraY: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Camera Z */}
            <label className="flex items-center justify-between gap-2">
              Camera Z
              <input
                type="range"
                min={-100}
                max={100}
                step={1}
                value={params.cameraZ}
                onChange={(e) =>
                  setParams((p) => ({ ...p, cameraZ: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={-100}
                max={100}
                step={1}
                value={params.cameraZ}
                onChange={(e) =>
                  setParams((p) => ({ ...p, cameraZ: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Camera FOV */}
            <label className="flex items-center justify-between gap-2">
              Camera FOV
              <input
                type="range"
                min={10}
                max={120}
                step={1}
                value={params.cameraFov}
                onChange={(e) =>
                  setParams((p) => ({ ...p, cameraFov: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={10}
                max={120}
                step={1}
                value={params.cameraFov}
                onChange={(e) =>
                  setParams((p) => ({ ...p, cameraFov: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Plane Rot X */}
            <label className="flex items-center justify-between gap-2">
              Plane Rot X
              <input
                type="range"
                min={-3.14}
                max={3.14}
                step={0.01}
                value={params.planeRotX}
                onChange={(e) =>
                  setParams((p) => ({ ...p, planeRotX: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={-3.14}
                max={3.14}
                step={0.01}
                value={params.planeRotX}
                onChange={(e) =>
                  setParams((p) => ({ ...p, planeRotX: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Plane Rot Y */}
            <label className="flex items-center justify-between gap-2">
              Plane Rot Y
              <input
                type="range"
                min={-3.14}
                max={3.14}
                step={0.01}
                value={params.planeRotY}
                onChange={(e) =>
                  setParams((p) => ({ ...p, planeRotY: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={-3.14}
                max={3.14}
                step={0.01}
                value={params.planeRotY}
                onChange={(e) =>
                  setParams((p) => ({ ...p, planeRotY: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Plane Rot Z */}
            <label className="flex items-center justify-between gap-2">
              Plane Rot Z
              <input
                type="range"
                min={-3.14}
                max={3.14}
                step={0.01}
                value={params.planeRotZ}
                onChange={(e) =>
                  setParams((p) => ({ ...p, planeRotZ: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={-3.14}
                max={3.14}
                step={0.01}
                value={params.planeRotZ}
                onChange={(e) =>
                  setParams((p) => ({ ...p, planeRotZ: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Vanishing Point X */}
            <label className="flex items-center justify-between gap-2">
              Vanishing Point X
              <input
                type="range"
                min={-2}
                max={2}
                step={0.01}
                value={params.vanishingPointX}
                onChange={(e) =>
                  setParams((p) => ({ ...p, vanishingPointX: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={-2}
                max={2}
                step={0.01}
                value={params.vanishingPointX}
                onChange={(e) =>
                  setParams((p) => ({ ...p, vanishingPointX: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Vanishing Point Y */}
            <label className="flex items-center justify-between gap-2">
              Vanishing Point Y
              <input
                type="range"
                min={-2}
                max={2}
                step={0.01}
                value={params.vanishingPointY}
                onChange={(e) =>
                  setParams((p) => ({ ...p, vanishingPointY: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={-2}
                max={2}
                step={0.01}
                value={params.vanishingPointY}
                onChange={(e) =>
                  setParams((p) => ({ ...p, vanishingPointY: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Star Trail Length */}
            <label className="flex items-center justify-between gap-2">
              Star Trail Length
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={params.starTrail}
                onChange={(e) =>
                  setParams((p) => ({ ...p, starTrail: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={0}
                max={1}
                step={0.01}
                value={params.starTrail}
                onChange={(e) =>
                  setParams((p) => ({ ...p, starTrail: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Grid Trail Length */}
            <label className="flex items-center justify-between gap-2">
              Grid Trail Length
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={params.gridTrail}
                onChange={(e) =>
                  setParams((p) => ({ ...p, gridTrail: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={0}
                max={1}
                step={0.01}
                value={params.gridTrail}
                onChange={(e) =>
                  setParams((p) => ({ ...p, gridTrail: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Background Color */}
            <label className="flex items-center justify-between gap-2">
              Background Color
              <input
                type="color"
                value={params.bgColor}
                onChange={(e) =>
                  setParams((p) => ({ ...p, bgColor: e.target.value }))
                }
                className="w-10 h-6 border border-green-700 rounded"
              />
              <input
                type="text"
                value={params.bgColor}
                onChange={(e) =>
                  setParams((p) => ({ ...p, bgColor: e.target.value }))
                }
                className="w-20 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Mesh Color */}
            <label className="flex items-center justify-between gap-2">
              Mesh Color
              <input
                type="color"
                value={params.gridColor1}
                onChange={(e) =>
                  setParams((p) => ({ ...p, gridColor1: e.target.value }))
                }
                className="w-10 h-6 border border-green-700 rounded"
              />
              <input
                type="text"
                value={params.gridColor1}
                onChange={(e) =>
                  setParams((p) => ({ ...p, gridColor1: e.target.value }))
                }
                className="w-20 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Star Color */}
            <label className="flex items-center justify-between gap-2">
              Star Color
              <input
                type="color"
                value={params.starColor}
                onChange={(e) =>
                  setParams((p) => ({ ...p, starColor: e.target.value }))
                }
                className="w-10 h-6 border border-green-700 rounded"
              />
              <input
                type="text"
                value={params.starColor}
                onChange={(e) =>
                  setParams((p) => ({ ...p, starColor: e.target.value }))
                }
                className="w-20 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Plane Waviness */}
            <label className="flex items-center justify-between gap-2">
              Plane Waviness
              <input
                type="range"
                min={0}
                max={2}
                step={0.01}
                value={params.planeWaviness}
                onChange={(e) =>
                  setParams((p) => ({ ...p, planeWaviness: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={0}
                max={2}
                step={0.01}
                value={params.planeWaviness}
                onChange={(e) =>
                  setParams((p) => ({ ...p, planeWaviness: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Plane Distortion */}
            <label className="flex items-center justify-between gap-2">
              Plane Distortion
              <input
                type="range"
                min={0}
                max={2}
                step={0.01}
                value={params.planeDistortion}
                onChange={(e) =>
                  setParams((p) => ({ ...p, planeDistortion: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={0}
                max={2}
                step={0.01}
                value={params.planeDistortion}
                onChange={(e) =>
                  setParams((p) => ({ ...p, planeDistortion: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Camera Z Rotation Max (deg) */}
            <label className="flex items-center justify-between gap-2">
              Camera Z Rot Max (deg)
              <input
                type="range"
                min={0}
                max={180}
                step={1}
                value={params.maxCameraZRotationDeg}
                onChange={(e) =>
                  setParams((p) => ({ ...p, maxCameraZRotationDeg: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={0}
                max={180}
                step={1}
                value={params.maxCameraZRotationDeg}
                onChange={(e) =>
                  setParams((p) => ({ ...p, maxCameraZRotationDeg: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Camera Z Start (deg) */}
            <label className="flex items-center justify-between gap-2">
              Camera Z Start (deg)
              <input
                type="range"
                min={-180}
                max={180}
                step={1}
                value={params.cameraZRotStartDeg}
                onChange={(e) =>
                  setParams((p) => ({ ...p, cameraZRotStartDeg: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={-180}
                max={180}
                step={1}
                value={params.cameraZRotStartDeg}
                onChange={(e) =>
                  setParams((p) => ({ ...p, cameraZRotStartDeg: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
            {/* Camera Z Range (deg) */}
            <label className="flex items-center justify-between gap-2">
              Camera Z Range (deg)
              <input
                type="range"
                min={0}
                max={360}
                step={1}
                value={params.cameraZRotRangeDeg}
                onChange={(e) =>
                  setParams((p) => ({ ...p, cameraZRotRangeDeg: +e.target.value }))
                }
                style={{ flex: 1 }}
              />
              <input
                type="number"
                min={0}
                max={360}
                step={1}
                value={params.cameraZRotRangeDeg}
                onChange={(e) =>
                  setParams((p) => ({ ...p, cameraZRotRangeDeg: +e.target.value }))
                }
                className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
              />
            </label>
          </div>
          {/* Copy JSON button */}
          <div className="pt-2 flex justify-end">
            <button
              className="bg-green-900 hover:bg-green-700 text-green-200 border border-green-700 rounded px-3 py-1 text-xs font-mono"
              onClick={handleCopy}
              type="button"
            >
              Copy JSON
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
