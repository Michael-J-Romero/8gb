// ...existing code...
import * as THREE from "three";

export function setupAnimatedGridMesh({
  mountRef,
  params,
  cameraZRot,
  zPos,
}) {
  // This function contains the Three.js scene setup, animation, and rendering logic
  let renderer;
  let camera;
  let scene;
  let stars;
  let animationId;
  let width = window.innerWidth;
  let height = window.innerHeight;

  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(params.bgColor);

  camera = new THREE.PerspectiveCamera(params.cameraFov, width / height, 0.1, 1000);
  camera.position.set(params.cameraX, params.cameraY, params.cameraZ);
  camera.lookAt(params.vanishingPointX, 0, params.vanishingPointY);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);

  // Add wavy plane (now the only grid/mesh)
  const planeGeometry = new THREE.PlaneGeometry(
    params.gridSize * 2,
    params.gridSize * 2,
    params.divisions,
    params.divisions
  );
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: params.gridColor1,
    wireframe: true,
    side: THREE.DoubleSide,
    opacity: params.gridOpacity,
    transparent: true,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = params.planeRotX;
  plane.rotation.y = params.planeRotY;
  plane.rotation.z = params.planeRotZ;
  plane.position.y = -6.5;
  scene.add(plane);

  // Add stars
  const starGeometry = new THREE.BufferGeometry();
  const starVertices = [];
  for (let i = 0; i < params.starCount; i++) {
    starVertices.push(
      (Math.random() - 0.5) * params.gridSize * 2,
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * params.gridSize * 2
    );
  }
  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3)
  );
  const starMaterial = new THREE.PointsMaterial({
    color: params.starColor || "#ffffff",
    size: params.starSize,
  });
  stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  // Animate plane vertices for wavy effect
  function updatePlaneVertices(time) {
    const pos = planeGeometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const wave =
        Math.sin(x * 0.1 * params.planeWaviness + time * 0.7) *
          2 * params.planeWaviness +
        Math.cos(y * 0.13 * params.planeDistortion + time * 0.5) *
          2 * params.planeDistortion;
      pos.setZ(i, wave);
    }
    pos.needsUpdate = true;
  }

  // Animation loop
  function animate() {
    const time = performance.now() * 0.001;
    plane.rotation.x = params.planeRotX;
    plane.rotation.y = params.planeRotY;
    let zRot = 0;
    if (typeof cameraZRot.get === "function") {
      zRot = cameraZRot.get();
    } else if (typeof cameraZRot === "number") {
      zRot = cameraZRot;
    }
    plane.rotation.x = zRot;
    camera.fov = params.cameraFov;
    camera.position.set(params.cameraX, params.cameraY, params.cameraZ);
    camera.rotation.z = zRot;
    camera.lookAt(params.vanishingPointX, 0, params.vanishingPointY);
    camera.updateProjectionMatrix();
    updatePlaneVertices(time);
    stars.rotation.y += params.starRotationSpeed;
    renderer.autoClear = false;
    if (params.gridTrail > 0) {
      const fadeMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: params.gridTrail,
        depthWrite: false,
      });
      const fadeGeometry = new THREE.PlaneGeometry(2, 2);
      const fadeMesh = new THREE.Mesh(fadeGeometry, fadeMaterial);
      fadeMesh.position.z = -1;
      scene.add(fadeMesh);
      renderer.render(scene, camera);
      scene.remove(fadeMesh);
      fadeMaterial.dispose();
      fadeGeometry.dispose();
    }
    renderer.render(scene, camera);
    animationId = requestAnimationFrame(animate);
  }

  if (mountRef.current) {
    mountRef.current.appendChild(renderer.domElement);
  }

  function handleResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
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
  };
}
// ...existing code...
