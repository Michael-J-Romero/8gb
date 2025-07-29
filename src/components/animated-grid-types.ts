// Types for params
export interface AnimatedGridParams {
  starCount: number;
  starSize: number;
  gridSize: number;
  divisions: number;
  gridOpacity: number;
  gridRotationSpeed: number;
  gridZSpeed: number;
  starRotationSpeed: number;
  cameraZoom: number;
  cameraX: number;
  cameraY: number;
  cameraZ: number;
  cameraFov: number;
  planeWaviness: number;
  planeDistortion: number;
  planeRotX: number;
  planeRotY: number;
  planeRotZ: number;
  vanishingPointX: number;
  vanishingPointY: number;
  starTrail: number;
  gridTrail: number;
  gridColor1: string;
  gridColor2: string;
  bgColor: string;
  starColor: string; // Added starColor
  maxCameraZRotationDeg: number; // Added maxCameraZRotationDeg
  cameraZRotStartDeg: number; // Start rotation in degrees
  cameraZRotRangeDeg: number; // How far to rotate (positive, in degrees)
}
