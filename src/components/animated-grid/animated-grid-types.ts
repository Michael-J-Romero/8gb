// Types for params
export interface AnimatedGridParams {
  starCount: number;
  starSize: number;
  gridSize: number;
  divisions: number;
  gridOpacity: number;
  starRotationSpeed: number;
  cameraX: number;
  cameraY: number;
  cameraZ: number;
  cameraRotX?: number; // Camera rotation in radians, X axis
  cameraRotY?: number; // Camera rotation in radians, Y axis
  cameraRotZ?: number; // Camera rotation in radians, Z axis
  cameraFov: number;
  // --- Scroll end camera values ---
  cameraX2?: number;
  cameraY2?: number;
  cameraZ2?: number;
  cameraRotX2?: number;
  cameraRotY2?: number;
  cameraRotZ2?: number;
  cameraFov2?: number;
  planeWaviness: number;
  planeDistortion: number;
  vanishingPointX: number;
  vanishingPointY: number;
  gridColor1: string;
  bgColor: string;
  starColor: string; // Added starColor
  starShape?: 'circle' | 'star' | 'cross' | 'square'; // Shape of the star, default 'circle'

  // --- Bloom/Glow options ---
  bloomStrength?: number;
  bloomRadius?: number;
  bloomThreshold?: number;
  bloomColor?: string;

  // --- Dev panel options ---
  gridRadius?: number;
  gridRadiusX?: number;
  gridRadiusY?: number;
  gridYOffset?: number;
  gridXOffset?: number; // Added gridXOffset
  gridZOffset?: number; // Added gridZOffset
  gridOriginX?: number; // Added gridOriginX
  gridOriginY?: number; // Added gridOriginY
  gridOriginZ?: number; // Added gridOriginZ
  // Chromatic aberration effect toggle and options
  chromaticAberration?: boolean;
  chromaticAberrationStrength?: number; // 0.0 - 1.0, default 0.003
  chromaticAberrationOffsetX?: number; // horizontal offset, default 0.003
  chromaticAberrationOffsetY?: number; // vertical offset, default 0.003

  // --- Extra params for full compatibility ---
  gridRotationSpeed: number;
  gridZSpeed: number;
  cameraZoom: number;
  starTrail: number;
  gridTrail: number;
  gridColor2: string;
  maxCameraZRotationDeg: number;
  cameraZRotStartDeg: number;
  cameraZRotRangeDeg: number;
}
