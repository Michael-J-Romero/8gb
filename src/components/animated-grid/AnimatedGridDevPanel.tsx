import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import defaultParamsRaw from "@/app/components/animated-grid/default-params.json";
import type { AnimatedGridParams } from "@/components/animated-grid/animated-grid-types";

const defaultParams: AnimatedGridParams = {
  ...defaultParamsRaw,
  starShape: defaultParamsRaw.starShape as AnimatedGridParams["starShape"],
};

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
      const saved = false//localStorage.getItem("animatedGridParams");
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

  // Restore params from default JSON
  const handleRestoreDefaults = () => {
    try {
      setParams({ ...defaultParams });
      localStorage.setItem("animatedGridParams", JSON.stringify(defaultParams));
    } catch {}
  };
return <></>
  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        className="bg-black text-green-200 border border-green-700 rounded-t-lg px-4 py-2 font-mono text-xs flex items-center justify-between shadow-lg focus:outline-none"
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
          <Tabs defaultValue="grid">
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="stars">Stars</TabsTrigger>
              <TabsTrigger value="camera">Camera</TabsTrigger>
              <TabsTrigger value="bloom">Bloom/Glow</TabsTrigger>
              <TabsTrigger value="background">Background</TabsTrigger>
            </TabsList>
            <TabsContent value="grid">
              {/* Grid controls */}
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
              {/* Grid Radius */}
              <label className="flex items-center justify-between gap-2">
                Grid Radius
                <input
                  type="range"
                  min={1}
                  max={200}
                  step={1}
                  value={params.gridRadius ?? (params.gridSize * 0.5)}
                  onChange={(e) =>
                    setParams((p) => ({ ...p, gridRadius: +e.target.value }))
                  }
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={1}
                  max={200}
                  step={1}
                  value={params.gridRadius ?? (params.gridSize * 0.5)}
                  onChange={(e) =>
                    setParams((p) => ({ ...p, gridRadius: +e.target.value }))
                  }
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
              {/* Grid Radius X */}
              <label className="flex items-center justify-between gap-2">
                Grid Radius X
                <input
                  type="range"
                  min={1}
                  max={200}
                  step={1}
                  value={params.gridRadiusX ?? (params.gridRadius ?? params.gridSize * 0.5)}
                  onChange={(e) => setParams((p) => ({ ...p, gridRadiusX: +e.target.value }))}
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={1}
                  max={200}
                  step={1}
                  value={params.gridRadiusX ?? (params.gridRadius ?? params.gridSize * 0.5)}
                  onChange={(e) => setParams((p) => ({ ...p, gridRadiusX: +e.target.value }))}
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
              {/* Grid Radius Y */}
              <label className="flex items-center justify-between gap-2">
                Grid Radius Y
                <input
                  type="range"
                  min={1}
                  max={200}
                  step={1}
                  value={params.gridRadiusY ?? (params.gridRadius ?? params.gridSize * 0.5)}
                  onChange={(e) => setParams((p) => ({ ...p, gridRadiusY: +e.target.value }))}
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={1}
                  max={200}
                  step={1}
                  value={params.gridRadiusY ?? (params.gridRadius ?? params.gridSize * 0.5)}
                  onChange={(e) => setParams((p) => ({ ...p, gridRadiusY: +e.target.value }))}
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
              {/* Grid Y Offset */}
              <label className="flex items-center justify-between gap-2">
                Grid Y Offset
                <input
                  type="range"
                  min={-100}
                  max={100}
                  step={1}
                  value={params.gridYOffset ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, gridYOffset: +e.target.value }))}
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={-100}
                  max={100}
                  step={1}
                  value={params.gridYOffset ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, gridYOffset: +e.target.value }))}
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
              {/* Grid X Offset */}
              <label className="flex items-center justify-between gap-2">
                Grid X Offset
                <input
                  type="range"
                  min={-200}
                  max={200}
                  step={1}
                  value={params.gridXOffset ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, gridXOffset: +e.target.value }))}
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={-200}
                  max={200}
                  step={1}
                  value={params.gridXOffset ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, gridXOffset: +e.target.value }))}
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
              {/* Grid Z Offset */}
              <label className="flex items-center justify-between gap-2">
                Grid Z Offset
                <input
                  type="range"
                  min={-200}
                  max={200}
                  step={1}
                  value={params.gridZOffset ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, gridZOffset: +e.target.value }))}
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={-200}
                  max={200}
                  step={1}
                  value={params.gridZOffset ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, gridZOffset: +e.target.value }))}
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
              {/* Mesh Color */}
              <label className="flex items-center justify-between gap-2">
                Mesh Color
                <input
                  type="color"
                  value={params.gridColor1}
                  onChange={(e) => setParams((p) => ({ ...p, gridColor1: e.target.value }))}
                  className="w-10 h-6 border border-green-700 rounded"
                />
                <input
                  type="text"
                  value={params.gridColor1}
                  onChange={(e) => setParams((p) => ({ ...p, gridColor1: e.target.value }))}
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
              {/* Grid Origin X */}
              <label className="flex items-center justify-between gap-2">
                Grid Origin X
                <input
                  type="range"
                  min={-200}
                  max={200}
                  step={1}
                  value={params.gridOriginX ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, gridOriginX: +e.target.value }))}
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={-200}
                  max={200}
                  step={1}
                  value={params.gridOriginX ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, gridOriginX: +e.target.value }))}
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
              {/* Grid Origin Y */}
              <label className="flex items-center justify-between gap-2">
                Grid Origin Y
                <input
                  type="range"
                  min={-200}
                  max={200}
                  step={1}
                  value={params.gridOriginY ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, gridOriginY: +e.target.value }))}
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={-200}
                  max={200}
                  step={1}
                  value={params.gridOriginY ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, gridOriginY: +e.target.value }))}
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
              {/* Grid Origin Z */}
              <label className="flex items-center justify-between gap-2">
                Grid Origin Z
                <input
                  type="range"
                  min={-200}
                  max={200}
                  step={1}
                  value={params.gridOriginZ ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, gridOriginZ: +e.target.value }))}
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={-200}
                  max={200}
                  step={1}
                  value={params.gridOriginZ ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, gridOriginZ: +e.target.value }))}
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
            </TabsContent>
            <TabsContent value="stars">
              {/* Star controls */}
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
                  max={7}
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
                  max={7} 
                  step={0.05}
                  value={params.starSize}
                  onChange={(e) =>
                    setParams((p) => ({ ...p, starSize: +e.target.value }))
                  }
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
              {/* Star Color */}
              <label className="flex items-center justify-between gap-2">
                Star Color
                <input
                  type="color"
                  value={params.starColor}
                  onChange={(e) => setParams((p) => ({ ...p, starColor: e.target.value }))}
                  className="w-10 h-6 border border-green-700 rounded"
                />
                <input
                  type="text"
                  value={params.starColor}
                  onChange={(e) => setParams((p) => ({ ...p, starColor: e.target.value }))}
                  className="w-20 bg-black border border-green-700 text-green-200 rounded px-1"
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
              {/* Star Shape */}
              <label className="flex items-center justify-between gap-2">
                Star Shape
                <select
                  value={params.starShape ?? 'circle'}
                  onChange={(e) => setParams((p) => ({ ...p, starShape: e.target.value as any }))}
                  className="w-24 bg-black border border-green-700 text-green-200 rounded px-1"
                >
                  <option value="circle">Circle</option>
                  <option value="star">Star</option>
                  <option value="cross">Cross</option>
                  <option value="square">Square</option>
                </select>
              </label>
            </TabsContent>
            <TabsContent value="camera">
              {/* Camera controls */}
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
              {/* Camera Rot X */}
              <label className="flex items-center justify-between gap-2">
                Camera Rot X (rad)
                <input
                  type="range"
                  min={-3.1416}
                  max={3.1416}
                  step={0.01}
                  value={params.cameraRotX ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, cameraRotX: +e.target.value }))}
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={-3.1416}
                  max={3.1416}
                  step={0.01}
                  value={params.cameraRotX ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, cameraRotX: +e.target.value }))}
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
              {/* Camera Rot Y */}
              <label className="flex items-center justify-between gap-2">
                Camera Rot Y (rad)
                <input
                  type="range"
                  min={-3.1416}
                  max={3.1416}
                  step={0.01}
                  value={params.cameraRotY ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, cameraRotY: +e.target.value }))}
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={-3.1416}
                  max={3.1416}
                  step={0.01}
                  value={params.cameraRotY ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, cameraRotY: +e.target.value }))}
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
              {/* Camera Rot Z */}
              <label className="flex items-center justify-between gap-2">
                Camera Rot Z (rad)
                <input
                  type="range"
                  min={-3.1416}
                  max={3.1416}
                  step={0.01}
                  value={params.cameraRotZ ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, cameraRotZ: +e.target.value }))}
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={-3.1416}
                  max={3.1416}
                  step={0.01}
                  value={params.cameraRotZ ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, cameraRotZ: +e.target.value }))}
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
                  onChange={(e) => setParams((p) => ({ ...p, cameraFov: +e.target.value }))
                  }
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={10}
                  max={120}
                  step={1}
                  value={params.cameraFov}
                  onChange={(e) => setParams((p) => ({ ...p, cameraFov: +e.target.value }))
                  }
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
              {/* --- Camera 2 values --- */}
              <div className="mt-2 mb-1 font-bold text-green-400">Scroll End Camera Values</div>
              {/* Camera X2 */}
              <label className="flex items-center justify-between gap-2">
                Camera X2
                <input
                  type="range"
                  min={-100}
                  max={100}
                  step={1}
                  value={params.cameraX2 ?? 0}
                  onChange={(e) =>
                    setParams((p) => ({ ...p, cameraX2: +e.target.value }))
                  }
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={-100}
                  max={100}
                  step={1}
                  value={params.cameraX2 ?? 0}
                  onChange={(e) =>
                    setParams((p) => ({ ...p, cameraX2: +e.target.value }))
                  }
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
              {/* Camera Y2 */}
              <label className="flex items-center justify-between gap-2">
                Camera Y2
                <input
                  type="range"
                  min={-100}
                  max={100}
                  step={1}
                  value={params.cameraY2 ?? 0}
                  onChange={(e) =>
                    setParams((p) => ({ ...p, cameraY2: +e.target.value }))
                  }
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={-100}
                  max={100}
                  step={1}
                  value={params.cameraY2 ?? 0}
                  onChange={(e) =>
                    setParams((p) => ({ ...p, cameraY2: +e.target.value }))
                  }
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
              {/* Camera Z2 */}
              <label className="flex items-center justify-between gap-2">
                Camera Z2
                <input
                  type="range"
                  min={-100}
                  max={100}
                  step={1}
                  value={params.cameraZ2 ?? 0}
                  onChange={(e) =>
                    setParams((p) => ({ ...p, cameraZ2: +e.target.value }))
                  }
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={-100}
                  max={100}
                  step={1}
                  value={params.cameraZ2 ?? 0}
                  onChange={(e) =>
                    setParams((p) => ({ ...p, cameraZ2: +e.target.value }))
                  }
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
              {/* Camera Rot X2 */}
              <label className="flex items-center justify-between gap-2">
                Camera Rot X2 (rad)
                <input
                  type="range"
                  min={-3.1416}
                  max={3.1416}
                  step={0.01}
                  value={params.cameraRotX2 ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, cameraRotX2: +e.target.value }))
                  }
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={-3.1416}
                  max={3.1416}
                  step={0.01}
                  value={params.cameraRotX2 ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, cameraRotX2: +e.target.value }))
                  }
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
              {/* Camera Rot Y2 */}
              <label className="flex items-center justify-between gap-2">
                Camera Rot Y2 (rad)
                <input
                  type="range"
                  min={-3.1416}
                  max={3.1416}
                  step={0.01}
                  value={params.cameraRotY2 ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, cameraRotY2: +e.target.value }))
                  }
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={-3.1416}
                  max={3.1416}
                  step={0.01}
                  value={params.cameraRotY2 ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, cameraRotY2: +e.target.value }))
                  }
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
              {/* Camera Rot Z2 */}
              <label className="flex items-center justify-between gap-2">
                Camera Rot Z2 (rad)
                <input
                  type="range"
                  min={-3.1416}
                  max={3.1416}
                  step={0.01}
                  value={params.cameraRotZ2 ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, cameraRotZ2: +e.target.value }))
                  }
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={-3.1416}
                  max={3.1416}
                  step={0.01}
                  value={params.cameraRotZ2 ?? 0}
                  onChange={(e) => setParams((p) => ({ ...p, cameraRotZ2: +e.target.value }))
                  }
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
              {/* Camera FOV2 */}
              <label className="flex items-center justify-between gap-2">
                Camera FOV2
                <input
                  type="range"
                  min={10}
                  max={120}
                  step={1}
                  value={params.cameraFov2 ?? 75}
                  onChange={(e) => setParams((p) => ({ ...p, cameraFov2: +e.target.value }))
                  }
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={10}
                  max={120}
                  step={1}
                  value={params.cameraFov2 ?? 75}
                  onChange={(e) => setParams((p) => ({ ...p, cameraFov2: +e.target.value }))
                  }
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
            </TabsContent>
            <TabsContent value="bloom">
              {/* Bloom/Glow controls */}
              {/* Chromatic Aberration Toggle */}
              <label className="flex items-center justify-between gap-2">
                Chromatic Aberration
                <input
                  type="checkbox"
                  checked={!!params.chromaticAberration}
                  onChange={e => setParams(p => ({ ...p, chromaticAberration: e.target.checked }))
                  }
                  className="accent-green-500 w-5 h-5"
                />
              </label>
              {params.chromaticAberration && (
                <div className="space-y-2 pl-4">
                  <label className="flex items-center justify-between gap-2">
                    Strength
                    <input
                      type="range"
                      min={0.0}
                      max={0.02}
                      step={0.0001}
                      value={params.chromaticAberrationStrength ?? 0.003}
                      onChange={e => setParams(p => ({ ...p, chromaticAberrationStrength: +e.target.value }))}
                      style={{ flex: 1 }}
                    />
                    <input
                      type="number"
                      min={0.0}
                      max={0.02}
                      step={0.0001}
                      value={params.chromaticAberrationStrength ?? 0.003}
                      onChange={e => setParams(p => ({ ...p, chromaticAberrationStrength: +e.target.value }))}
                      className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                    />
                  </label>
                  <label className="flex items-center justify-between gap-2">
                    Offset X
                    <input
                      type="range"
                      min={-0.02}
                      max={0.02}
                      step={0.0001}
                      value={params.chromaticAberrationOffsetX ?? 0.003}
                      onChange={e => setParams(p => ({ ...p, chromaticAberrationOffsetX: +e.target.value }))}
                      style={{ flex: 1 }}
                    />
                    <input
                      type="number"
                      min={-0.02}
                      max={0.02}
                      step={0.0001}
                      value={params.chromaticAberrationOffsetX ?? 0.003}
                      onChange={e => setParams(p => ({ ...p, chromaticAberrationOffsetX: +e.target.value }))}
                      className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                    />
                  </label>
                  <label className="flex items-center justify-between gap-2">
                    Offset Y
                    <input
                      type="range"
                      min={-0.02}
                      max={0.02}
                      step={0.0001}
                      value={params.chromaticAberrationOffsetY ?? 0.003}
                      onChange={e => setParams(p => ({ ...p, chromaticAberrationOffsetY: +e.target.value }))}
                      style={{ flex: 1 }}
                    />
                    <input
                      type="number"
                      min={-0.02}
                      max={0.02}
                      step={0.0001}
                      value={params.chromaticAberrationOffsetY ?? 0.003}
                      onChange={e => setParams(p => ({ ...p, chromaticAberrationOffsetY: +e.target.value }))}
                      className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                    />
                  </label>
                </div>
              )}
              {/* Bloom Color */}
              <label className="flex items-center justify-between gap-2">
                Bloom Color
                <input
                  type="color"
                  value={params.bloomColor || "#ffffff"}
                  onChange={(e) =>
                    setParams((p) => ({ ...p, bloomColor: e.target.value }))
                  }
                  className="w-10 h-6 bg-black border border-green-700 rounded"
                  title="Bloom Color"
                />
                <input
                  type="text"
                  value={params.bloomColor || "#ffffff"}
                  onChange={(e) =>
                    setParams((p) => ({ ...p, bloomColor: e.target.value }))
                  }
                  className="w-20 bg-black border border-green-700 text-green-200 rounded px-1"
                  placeholder="#ffffff"
                />
              </label>
              {/* Bloom Strength */}
              <label className="flex items-center justify-between gap-2">
                Bloom Strength
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={0.01}
                  value={params.bloomStrength ?? 2.5}
                  onChange={(e) =>
                    setParams((p) => ({ ...p, bloomStrength: +e.target.value }))
                  }
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={0}
                  max={5}
                  step={0.01}
                  value={params.bloomStrength ?? 2.5}
                  onChange={(e) =>
                    setParams((p) => ({ ...p, bloomStrength: +e.target.value }))
                  }
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
              {/* Bloom Radius */}
              <label className="flex items-center justify-between gap-2">
                Bloom Radius
                <input
                  type="range"
                  min={0}
                  max={3}
                  step={0.01}
                  value={params.bloomRadius ?? 1.2}
                  onChange={(e) =>
                    setParams((p) => ({ ...p, bloomRadius: +e.target.value }))
                  }
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={0}
                  max={3}
                  step={0.01}
                  value={params.bloomRadius ?? 1.2}
                  onChange={(e) =>
                    setParams((p) => ({ ...p, bloomRadius: +e.target.value }))
                  }
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
              {/* Bloom Threshold */}
              <label className="flex items-center justify-between gap-2">
                Bloom Threshold
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={params.bloomThreshold ?? 0.1}
                  onChange={(e) =>
                    setParams((p) => ({ ...p, bloomThreshold: +e.target.value }))
                  }
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min={0}
                  max={1}
                  step={0.01}
                  value={params.bloomThreshold ?? 0.1}
                  onChange={(e) =>
                    setParams((p) => ({ ...p, bloomThreshold: +e.target.value }))
                  }
                  className="w-16 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
            </TabsContent>
            <TabsContent value="background">
              {/* Background controls */}
              {/* Background Color */}
              <label className="flex items-center justify-between gap-2">
                Background Color
                <input
                  type="color"
                  value={params.bgColor}
                  onChange={(e) => setParams((p) => ({ ...p, bgColor: e.target.value }))}
                  className="w-10 h-6 border border-green-700 rounded"
                />
                <input
                  type="text"
                  value={params.bgColor}
                  onChange={(e) => setParams((p) => ({ ...p, bgColor: e.target.value }))}
                  className="w-20 bg-black border border-green-700 text-green-200 rounded px-1"
                />
              </label>
            </TabsContent>
          </Tabs>
          {/* Copy JSON button */}
          <div className="pt-2 flex justify-between">
            <button
              className="bg-green-900 hover:bg-green-700 text-green-200 border border-green-700 rounded px-3 py-1 text-xs font-mono"
              onClick={handleCopy}
              type="button"
            >
              Copy JSON
            </button>
            <button
              className="bg-green-900 hover:bg-green-700 text-green-200 border border-green-700 rounded px-3 py-1 text-xs font-mono ml-2"
              onClick={handleRestoreDefaults}
              type="button"
            >
              Restore Defaults
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
