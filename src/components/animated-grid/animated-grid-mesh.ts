// ...existing code...
import * as THREE from "three";
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { ChromaticAberrationShader } from './chromaticAberrationShader';

interface AnimatedGridMeshParams {
  bgColor: string | number;
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
  vanishingPointX: number;
  vanishingPointY: number;
  gridSize: number;
  divisions: number;
  gridColor1: string | number;
  gridOpacity: number;
  planeWaviness: number;
  planeDistortion: number;
  starCount: number;
  starColor?: string | number;
  starSize: number;
  starRotationSpeed: number;
  scrollSpeed?: number;
  // --- Bloom/Glow options ---
  bloomStrength?: number;
  bloomRadius?: number;
  bloomThreshold?: number;
  bloomColor?: string | number; // Add bloomColor param
  gridRadius?: number; // Optional grid radius control
  gridRadiusX?: number;
  gridRadiusY?: number;
  gridYOffset?: number;
  gridXOffset?: number;
  gridZOffset?: number;
  gridOriginX?: number;
  gridOriginY?: number;
  gridOriginZ?: number;
  // Chromatic aberration effect toggle and options
  chromaticAberration?: boolean;
  chromaticAberrationStrength?: number;
  chromaticAberrationOffsetX?: number;
  chromaticAberrationOffsetY?: number;
  starShape?: 'circle' | 'star' | 'cross' | 'square'; // Shape of the star, default 'circle'
}

export function setupAnimatedGridMesh({
  mountRef,
  params,
  cameraZRot,
  zPos,
  cameraX,
  cameraY,
  cameraZ,
  cameraRotX,
  cameraRotY,
  cameraRotZ,
  cameraFov,
}: {

  
  mountRef: React.RefObject<HTMLDivElement>;
  params: AnimatedGridMeshParams;
  cameraZRot: number | { get: () => number };
  zPos: number | { get: () => number };
  cameraX?: number | { get: () => number };
  cameraY?: number | { get: () => number };
  cameraZ?: number | { get: () => number };
  cameraRotX?: number | { get: () => number };
  cameraRotY?: number | { get: () => number };
  cameraRotZ?: number | { get: () => number };
  cameraFov?: number | { get: () => number };
}) {
  // --- NEW SOLUTION: Separate scenes for bloom and grid ---
  let renderer: THREE.WebGLRenderer;
  let camera: THREE.PerspectiveCamera;
  let bloomScene: THREE.Scene;
  let gridScene: THREE.Scene;
  let stars: THREE.Points | null = null;
  let animationId: number;
  let width = window.innerWidth;
  let height = window.innerHeight;

  // Camera
  function getMotionValue(val: any, fallback: number) {
    if (val && typeof val.get === "function") return val.get();
    if (typeof val === "number") return val;
    return fallback;
  }
  camera = new THREE.PerspectiveCamera(
    getMotionValue(cameraFov, params.cameraFov),
    width / height,
    0.1,
    1000
  );
  camera.position.set(
    getMotionValue(cameraX, params.cameraX),
    getMotionValue(cameraY, params.cameraY),
    getMotionValue(cameraZ, params.cameraZ)
  );
  // Only set rotation if any cameraRot param is nonzero, otherwise use lookAt
  const rotX = getMotionValue(cameraRotX, params.cameraRotX ?? 0);
  const rotY = getMotionValue(cameraRotY, params.cameraRotY ?? 0);
  const rotZ = getMotionValue(cameraRotZ, params.cameraRotZ ?? 0);
  if (rotX !== 0 || rotY !== 0 || rotZ !== 0) {
    camera.rotation.set(rotX, rotY, rotZ);
  } else {
    camera.lookAt(params.vanishingPointX, 0, params.vanishingPointY);
  }

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(width, height);
  renderer.setClearColor(params.bgColor, 1);
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.opacity = "1"; // FIX: make grid fully opaque
  renderer.domElement.style.top = "0";
  renderer.domElement.style.left = "0";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";

  // --- Bloom Scene (background, glowy) ---
  bloomScene = new THREE.Scene();
  // No need to set bloomScene.background, renderer handles bg color

  // --- Grid Scene (foreground, sharp) ---
  gridScene = new THREE.Scene();
  gridScene.background = null; // transparent

  // --- STARS (background, subtle) ---
  if (params.starCount > 0 && params.starSize > 0) {
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(params.starCount * 3);
    for (let i = 0; i < params.starCount; i++) {
      // Distribute stars in a large sphere behind the grid
      const r = params.gridSize * 2.5 + Math.random() * params.gridSize * 2.5;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi) - params.gridSize * 2.5; // push stars further back
      starPositions[i * 3] = x;
      starPositions[i * 3 + 1] = y;
      starPositions[i * 3 + 2] = z;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    let starMaterial: THREE.PointsMaterial | THREE.ShaderMaterial;
    // Custom star shapes
    switch (params.starShape) {
      case 'star':
        starMaterial = new THREE.ShaderMaterial({
          uniforms: {
            color: { value: new THREE.Color(params.starColor ?? 0xffffff) },
            size: { value: params.starSize },
          },
          vertexShader: `
            uniform float size;
            void main() {
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            uniform vec3 color;
            void main() {
              vec2 uv = gl_PointCoord - vec2(0.5);
              float d = length(uv);
              float angle = atan(uv.y, uv.x);
              float rays = pow(abs(sin(5.0 * angle)), 8.0);
              float star = smoothstep(0.45, 0.25, d) * rays;
              if (d > 0.5 || star < 0.1) discard;
              gl_FragColor = vec4(color, star * 0.85);
            }
          `,
          transparent: true,
        });
        break;
      case 'cross':
        starMaterial = new THREE.ShaderMaterial({
          uniforms: {
            color: { value: new THREE.Color(params.starColor ?? 0xffffff) },
            size: { value: params.starSize },
          },
          vertexShader: `
            uniform float size;
            void main() {
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            uniform vec3 color;
            void main() {
              vec2 uv = abs(gl_PointCoord - vec2(0.5));
              float bar = step(0.18, uv.x) + step(0.18, uv.y);
              float cross = step(0.22, min(uv.x, uv.y));
              float mask = (uv.x < 0.08 || uv.y < 0.08) ? 1.0 : 0.0;
              if (mask < 0.5) discard;
              gl_FragColor = vec4(color, 0.85);
            }
          `,
          transparent: true,
        });
        break;
      case 'square':
        starMaterial = new THREE.ShaderMaterial({
          uniforms: {
            color: { value: new THREE.Color(params.starColor ?? 0xffffff) },
            size: { value: params.starSize },
          },
          vertexShader: `
            uniform float size;
            void main() {
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            uniform vec3 color;
            void main() {
              vec2 uv = abs(gl_PointCoord - vec2(0.5));
              if (uv.x > 0.5 || uv.y > 0.5) discard;
              gl_FragColor = vec4(color, 0.85);
            }
          `,
          transparent: true,
        });
        break;
      default:
        starMaterial = new THREE.PointsMaterial({
          color: params.starColor ?? 0xffffff,
          size: params.starSize,
          sizeAttenuation: true,
          transparent: true,
          opacity: 0.85,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
    }
    stars = new THREE.Points(starGeometry, starMaterial);
    stars.frustumCulled = false;
    bloomScene.add(stars);
  }

  // Plane geometry (shared)
  const planeGeometry = new THREE.PlaneGeometry(
    params.gridSize * 2,
    params.gridSize * 2,
    params.divisions,
    params.divisions
  );

  // Grid vertices (shared)
  const gridVertices = [];
  const pos = planeGeometry.attributes.position;
  const segX = params.divisions;
  const segY = params.divisions;
  // Only connect true neighbors (no wrap-around)
  for (let iy = 0; iy <= segY; iy++) {
    for (let ix = 0; ix <= segX; ix++) {
      const i = iy * (segX + 1) + ix;
      // Horizontal neighbor
      if (ix < segX) {
        const iRight = iy * (segX + 1) + (ix + 1);
        gridVertices.push(
          pos.getX(i), pos.getY(i), pos.getZ(i),
          pos.getX(iRight), pos.getY(iRight), pos.getZ(iRight)
        );
      }
      // Vertical neighbor
      if (iy < segY) {
        const iDown = (iy + 1) * (segX + 1) + ix;
        gridVertices.push(
          pos.getX(i), pos.getY(i), pos.getZ(i),
          pos.getX(iDown), pos.getY(iDown), pos.getZ(iDown)
        );
      }
    }
  }

  // --- Bloom grid (bloom color, glowy) ---
  const bloomGridGeometry = new LineGeometry();
  bloomGridGeometry.setPositions(gridVertices);
  const bloomGridMaterial = new LineMaterial({
    color: params.bloomColor ?? 0xff00ff,
    linewidth: 3.02,
    transparent: true,
    opacity: 1,
    blending: THREE.AdditiveBlending,
    depthTest: false,
  });
  bloomGridMaterial.resolution.set(width, height);
  bloomGridMaterial.camera = camera;
  bloomGridMaterial.needsUpdate = true;
  const bloomGridLines = new LineSegments2(bloomGridGeometry, bloomGridMaterial);
  bloomGridLines.position.y = -6.5;
  bloomGridLines.computeLineDistances();
  bloomScene.add(bloomGridLines);

  // --- Normal grid (sharp, no bloom, foreground) ---
  // Use a separate geometry instance for the normal grid
  const gridGeometry = new LineGeometry();
  gridGeometry.setPositions([...gridVertices]); // clone array to avoid reference issues
  const gridMaterial = new LineMaterial({
    color: params.gridColor1 ?? 0x00ffff,
    linewidth: 2.5, // THICKER grid lines for visibility
    transparent: true,
    opacity: params.gridOpacity ?? 1,
    blending: THREE.NormalBlending, // solid over bloom
    depthTest: false,
  });
  gridMaterial.resolution.set(width, height);
  gridMaterial.camera = camera;
  gridMaterial.needsUpdate = true;
  const gridLines = new LineSegments2(gridGeometry, gridMaterial);
  gridLines.position.y = -6.5;
  gridLines.computeLineDistances();
  gridScene.add(gridLines);

  // --- BLOOM POSTPROCESSING ---
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(bloomScene, camera);
  composer.addPass(renderPass);
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(width, height),
    params.bloomStrength ?? 2.5,
    params.bloomRadius ?? 1.2,
    params.bloomThreshold ?? 0.1
  );
  composer.addPass(bloomPass);

  // Chromatic Aberration Pass
  let chromaPass: any = null;
  if (params.chromaticAberration) {
    chromaPass = new ShaderPass(ChromaticAberrationShader);
    const strength = params.chromaticAberrationStrength ?? 0.003;
    const offsetX = params.chromaticAberrationOffsetX ?? strength;
    const offsetY = params.chromaticAberrationOffsetY ?? strength;
    chromaPass.uniforms['offset'].value = [offsetX, offsetY];
    composer.addPass(chromaPass);
  }

  // --- Animate plane vertices for wavy + curved effect ---
  function updatePlaneVertices(time: number, zOffset: number) {
    const pos = planeGeometry.attributes.position;
    const radius = typeof params.gridRadius === 'number' ? params.gridRadius : params.gridSize * 0.5;
    const radiusX = typeof params.gridRadiusX === 'number' ? params.gridRadiusX : (typeof params.gridRadius === 'number' ? params.gridRadius : params.gridSize * 0.5);
    const radiusY = typeof params.gridRadiusY === 'number' ? params.gridRadiusY : (typeof params.gridRadius === 'number' ? params.gridRadius : params.gridSize * 0.5);
    const yOffset = typeof params.gridYOffset === 'number' ? params.gridYOffset : 0;
    const xOffset = typeof params.gridXOffset === 'number' ? params.gridXOffset : 0;
    const zOffsetParam = typeof params.gridZOffset === 'number' ? params.gridZOffset : 0;
    const originX = typeof params.gridOriginX === 'number' ? params.gridOriginX : 0;
    const originY = typeof params.gridOriginY === 'number' ? params.gridOriginY : 0;
    const originZ = typeof params.gridOriginZ === 'number' ? params.gridOriginZ : 0;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i) - originX + xOffset;
      const z = pos.getY(i) + zOffset + zOffsetParam - originY - originZ;
      // Elliptical/circular grid with y offset and origin
      let baseY = Math.sqrt(Math.max(0, radiusX * radiusY - (x * x * radiusY / radiusX) - (z * z * radiusX / radiusY))) - radiusY + yOffset;
      const wave =
        Math.sin(x * 0.1 * params.planeWaviness + time * 0.7) * 2 * params.planeWaviness +
        Math.cos(z * 0.13 * params.planeDistortion + time * 0.5) * 2 * params.planeDistortion;
      pos.setZ(i, baseY + wave);
    }
    pos.needsUpdate = true;

    // --- FINAL: Clean grid, only horizontal and vertical lines, no wrap-around, no squares logic ---
    // --- ZIG-ZAG ROWS: Draw horizontal lines in a zig-zag pattern to avoid wrap-around lines ---
    const newGridVertices: number[] = [];
    // Horizontal lines (rows, zig-zag)
    for (let iy = 0; iy <= segY; iy++) {
      if (iy % 2 === 0) {
        // Left to right
        for (let ix = 0; ix < segX; ix++) {
          const i0 = iy * (segX + 1) + ix;
          const i1 = iy * (segX + 1) + (ix + 1);
          newGridVertices.push(
            pos.getX(i0), pos.getY(i0), pos.getZ(i0),
            pos.getX(i1), pos.getY(i1), pos.getZ(i1)
          );
        }
      } else {
        // Right to left
        for (let ix = segX; ix > 0; ix--) {
          const i0 = iy * (segX + 1) + ix;
          const i1 = iy * (segX + 1) + (ix - 1);
          newGridVertices.push(
            pos.getX(i0), pos.getY(i0), pos.getZ(i0),
            pos.getX(i1), pos.getY(i1), pos.getZ(i1)
          );
        }
      }
    }
    // Vertical lines (columns, top to bottom, NO zig-zag)
    // Vertical lines (columns, zig-zag)
// Vertical lines (columns, zig-zag)
for (let ix = 0; ix <= segX; ix++) {
  if (ix % 2 === 0) {
    // Top to bottom
    for (let iy = 0; iy < segY; iy++) {
      const i0 = iy * (segX + 1) + ix;
      const i1 = (iy + 1) * (segX + 1) + ix;
      newGridVertices.push(
        pos.getX(i0), pos.getY(i0), pos.getZ(i0),
        pos.getX(i1), pos.getY(i1), pos.getZ(i1)
      );
    }
  } else {
    // Bottom to top
    for (let iy = segY - 1; iy >= 0; iy--) {
      const i0 = (iy + 1) * (segX + 1) + ix;
      const i1 = iy * (segX + 1) + ix;
      newGridVertices.push(
        pos.getX(i0), pos.getY(i0), pos.getZ(i0),
        pos.getX(i1), pos.getY(i1), pos.getZ(i1)
      );
    }
  }
}

    // bloomGridGeometry.setPositions(newGridVertices);
    // bloomGridGeometry.attributes.position.needsUpdate = true;
    // bloomGridLines.computeLineDistances();
    // gridGeometry.setPositions(newGridVertices);
    // gridGeometry.attributes.position.needsUpdate = true;
    // gridLines.computeLineDistances();
// Create new geometry every frame to avoid stray diagonals
const vertexArray = new Float32Array(newGridVertices);

const newBloomGeometry = new LineGeometry();
newBloomGeometry.setPositions(vertexArray);
bloomGridLines.geometry.dispose();
bloomGridLines.geometry = newBloomGeometry;

const newGridGeometry = new LineGeometry();
newGridGeometry.setPositions(vertexArray);
gridLines.geometry.dispose();
gridLines.geometry = newGridGeometry;

  }

  // --- Animation loop ---
  let planeZOffset = 0;
  function animate() {
    const time = performance.now() * 0.001;
    planeZOffset += params.scrollSpeed || 0.1;
    if (planeZOffset > params.gridSize * 2) {
      planeZOffset = 0;
    }
    const zRot = getMotionValue(cameraZRot, 0);
    const zPosVal = getMotionValue(zPos, 0);
    camera.fov = getMotionValue(cameraFov, params.cameraFov);
    camera.position.set(
      getMotionValue(cameraX, params.cameraX),
      getMotionValue(cameraY, params.cameraY),
      getMotionValue(cameraZ, params.cameraZ) + zPosVal
    );
    const rotX = getMotionValue(cameraRotX, params.cameraRotX ?? 0);
    const rotY = getMotionValue(cameraRotY, params.cameraRotY ?? 0);
    const rotZ = getMotionValue(cameraRotZ, params.cameraRotZ ?? 0);
    if (rotX !== 0 || rotY !== 0 || rotZ !== 0) {
      camera.rotation.set(rotX, rotY, rotZ);
    } else {
      camera.rotation.set(0, 0, 0);
      camera.lookAt(params.vanishingPointX, 0, params.vanishingPointY);
    }
    camera.updateProjectionMatrix();
    updatePlaneVertices(time, planeZOffset);
    // Only update stars if they exist
    if (stars) {
      stars.rotation.y += params.starRotationSpeed;
    }
    renderer.autoClear = true;
    // 1. Render bloom scene (background, with bloom)
    composer.render();
    // 2. Render grid scene (foreground, sharp, no bloom) over the result
    renderer.autoClear = false;
    renderer.render(gridScene, camera);
    // Update material params
    gridMaterial.resolution.set(width, height);
    gridMaterial.camera = camera;
    gridMaterial.needsUpdate = true;
    gridMaterial.opacity = params.gridOpacity;
    bloomGridMaterial.resolution.set(width, height);
    bloomGridMaterial.camera = camera;
    bloomGridMaterial.needsUpdate = true;
    // Update chromatic aberration pass if needed
    if (chromaPass) {
      chromaPass.enabled = !!params.chromaticAberration;
      const strength = params.chromaticAberrationStrength ?? 0.003;
      const offsetX = params.chromaticAberrationOffsetX ?? strength;
      const offsetY = params.chromaticAberrationOffsetY ?? strength;
      chromaPass.uniforms['offset'].value = [offsetX, offsetY];
    }
    animationId = requestAnimationFrame(animate);
  }

  if (mountRef.current) {
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);
  }

  function handleResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    composer.setSize(width, height);
    bloomPass.setSize(width, height);
    gridMaterial.resolution.set(width, height);
    gridMaterial.camera = camera;
    gridMaterial.needsUpdate = true;
    bloomGridMaterial.resolution.set(width, height);
    bloomGridMaterial.camera = camera;
    bloomGridMaterial.needsUpdate = true;
  }
  window.addEventListener("resize", handleResize);

  animate();

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", handleResize);
    if (mountRef.current) {
      mountRef.current.removeChild(renderer.domElement);
    }
    renderer.dispose();
    bloomScene.remove(bloomGridLines);
    (bloomGridLines.geometry as any).dispose?.();
    (bloomGridLines.material as any).dispose?.();
    gridScene.remove(gridLines);
    (gridLines.geometry as any).dispose?.();
    (gridLines.material as any).dispose?.();
  };
}
// ...existing code...
