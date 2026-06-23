import { useEffect, useRef } from "react";
import * as THREE from "three";

const cssHslToHex = (value: string, fallback: number) => {
  const channels = value.match(/[\d.]+/g)?.map(Number);

  if (!channels || channels.length < 3) {
    return fallback;
  }

  const [hue, saturation, lightness] = channels;
  const color = new THREE.Color();
  color.setHSL(hue / 360, saturation / 100, lightness / 100);

  return color.getHex();
};

const ThreeDiningScene = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
      });
    } catch (error) {
      canvas.dataset.renderError = "webgl";
      console.error("Unable to initialize the 3D grill scene:", error);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0.25, 1.7, 6.6);
    camera.lookAt(0, -0.4, 0);

    renderer.setClearAlpha(0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    const root = new THREE.Group();
    root.position.set(1.0, -0.2, 0);
    scene.add(root);

    // Kabul Street Kitchen palette: ember orange, amber/gold, deep charcoal.
    // Values are read from the (repurposed) `--comorin-*` CSS variables.
    const getThemePalette = () => {
      const styles = window.getComputedStyle(document.documentElement);

      return {
        charcoal: cssHslToHex(styles.getPropertyValue("--comorin-teal-dark"), 0x161210),
        ember: cssHslToHex(styles.getPropertyValue("--comorin-teal"), 0xf6611a),
        amber: cssHslToHex(styles.getPropertyValue("--comorin-teal-light"), 0xf9b53c),
        steel: 0x9aa1a8,
        sear: 0x53301c,
        meat: 0x8a4a26,
      };
    };
    const palette = getThemePalette();

    // --- Brazier / charcoal grill body -------------------------------------
    const grill = new THREE.Group();
    grill.position.set(0, -1.15, 0);
    root.add(grill);

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: palette.charcoal,
      roughness: 0.55,
      metalness: 0.55,
    });
    const body = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.5, 1.7), bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    grill.add(body);

    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x0b0807,
      roughness: 0.9,
      metalness: 0.2,
    });
    const innerBed = new THREE.Mesh(new THREE.BoxGeometry(4.3, 0.18, 1.4), innerMaterial);
    innerBed.position.y = 0.2;
    grill.add(innerBed);

    const legMaterial = new THREE.MeshStandardMaterial({ color: 0x0c0a09, roughness: 0.6, metalness: 0.6 });
    [-2.0, 2.0].forEach((x) => {
      [-0.65, 0.65].forEach((z) => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.1, 12), legMaterial);
        leg.position.set(x, -0.78, z);
        leg.castShadow = true;
        grill.add(leg);
      });
    });

    // --- Glowing ember coals ------------------------------------------------
    const emberMaterial = new THREE.MeshStandardMaterial({
      color: palette.ember,
      emissive: palette.ember,
      emissiveIntensity: 1.2,
      roughness: 0.85,
    });
    const embers: THREE.Mesh[] = [];
    const emberPhases: number[] = [];
    for (let index = 0; index < 60; index += 1) {
      const ember = new THREE.Mesh(new THREE.DodecahedronGeometry(0.07 + (index % 4) * 0.018, 0), emberMaterial.clone());
      ember.position.set(
        -1.95 + Math.random() * 3.9,
        0.27 + Math.random() * 0.03,
        -0.6 + Math.random() * 1.2,
      );
      ember.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
      grill.add(ember);
      embers.push(ember);
      emberPhases.push(Math.random() * Math.PI * 2);
    }

    // --- Grill grate --------------------------------------------------------
    const grateMaterial = new THREE.MeshStandardMaterial({ color: palette.steel, roughness: 0.35, metalness: 0.9 });
    for (let index = 0; index < 11; index += 1) {
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.5, 10), grateMaterial);
      bar.rotation.x = Math.PI / 2;
      bar.position.set(-2.0 + index * 0.4, 0.42, 0);
      bar.castShadow = true;
      grill.add(bar);
    }

    // --- Kebab skewers ------------------------------------------------------
    const skewerGroup = new THREE.Group();
    skewerGroup.position.set(0, -0.66, 0);
    root.add(skewerGroup);

    const skewerMaterial = new THREE.MeshStandardMaterial({ color: palette.steel, roughness: 0.3, metalness: 0.95 });
    const meatMaterial = new THREE.MeshStandardMaterial({
      color: palette.meat,
      emissive: palette.sear,
      emissiveIntensity: 0.25,
      roughness: 0.75,
    });

    const skewerOffsets = [-0.45, -0.05, 0.35];
    skewerOffsets.forEach((z, sIndex) => {
      const skewer = new THREE.Group();
      skewer.position.set(0, 0.16 + sIndex * 0.004, z);

      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 4.2, 12), skewerMaterial);
      rod.rotation.z = Math.PI / 2;
      rod.castShadow = true;
      skewer.add(rod);

      for (let m = 0; m < 7; m += 1) {
        const chunk = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.34, 0.34), meatMaterial);
        chunk.position.set(-1.55 + m * 0.52, 0, 0);
        chunk.rotation.set((m % 2) * 0.18, m * 0.4, 0.05);
        chunk.castShadow = true;
        skewer.add(chunk);
      }
      skewerGroup.add(skewer);
    });

    // --- Naan to the side ---------------------------------------------------
    const naanMaterial = new THREE.MeshStandardMaterial({ color: 0xd9a85c, roughness: 0.85 });
    const naan = new THREE.Mesh(new THREE.SphereGeometry(0.55, 36, 18), naanMaterial);
    naan.position.set(2.05, -0.62, 0.55);
    naan.scale.set(1.4, 0.12, 0.85);
    naan.rotation.z = -0.12;
    naan.castShadow = true;
    root.add(naan);

    // --- Rising sparks / heat particles ------------------------------------
    const sparkGroup = new THREE.Group();
    root.add(sparkGroup);
    const sparkMaterials = [
      new THREE.MeshBasicMaterial({ color: palette.ember }),
      new THREE.MeshBasicMaterial({ color: palette.amber }),
      new THREE.MeshBasicMaterial({ color: 0xffd27a }),
    ];
    const sparks: THREE.Mesh[] = [];
    const sparkSpeeds: number[] = [];
    for (let index = 0; index < 70; index += 1) {
      const material = sparkMaterials[index % sparkMaterials.length];
      const spark = new THREE.Mesh(new THREE.SphereGeometry(0.018 + (index % 3) * 0.006, 6, 6), material);
      spark.position.set(
        -2.0 + Math.random() * 4.0,
        -0.5 + Math.random() * 2.6,
        -0.6 + Math.random() * 1.2,
      );
      sparkGroup.add(spark);
      sparks.push(spark);
      sparkSpeeds.push(0.004 + Math.random() * 0.012);
    }

    // --- Lighting -----------------------------------------------------------
    const keyLight = new THREE.DirectionalLight(0xfff1de, 3.4);
    keyLight.position.set(-2.6, 4.6, 4.4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const emberGlow = new THREE.PointLight(palette.ember, 4.5, 9);
    emberGlow.position.set(0, -0.6, 1.4);
    scene.add(emberGlow);

    const amberGlow = new THREE.PointLight(palette.amber, 2.6, 8);
    amberGlow.position.set(-1.6, 0.2, 2.6);
    scene.add(amberGlow);

    const ambient = new THREE.HemisphereLight(0xffe9cf, palette.charcoal, 0.9);
    scene.add(ambient);

    const pointer = { x: 0, y: 0 };
    const targetPointer = { x: 0, y: 0 };
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      const width = Math.max(clientWidth, 1);
      const height = Math.max(clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const onPointerMove = (event: PointerEvent) => {
      targetPointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      targetPointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const render = (time = 0) => {
      const seconds = time * 0.001;
      pointer.x += (targetPointer.x - pointer.x) * 0.045;
      pointer.y += (targetPointer.y - pointer.y) * 0.045;

      root.rotation.y = Math.sin(seconds * 0.22) * 0.08 + pointer.x * 0.13;
      root.rotation.x = -0.04 + pointer.y * 0.03;
      skewerGroup.rotation.y = Math.sin(seconds * 0.4) * 0.03;

      // Coals pulse like a living fire.
      const flicker = 0.85 + Math.sin(seconds * 6) * 0.15;
      embers.forEach((ember, index) => {
        const material = ember.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = 0.9 + Math.sin(seconds * 4 + emberPhases[index]) * 0.6;
      });
      emberGlow.intensity = 4.0 + flicker * 1.4;

      // Sparks drift upward and recycle.
      sparks.forEach((spark, index) => {
        spark.position.y += sparkSpeeds[index];
        spark.position.x += Math.sin(seconds * 2 + index) * 0.0014;
        if (spark.position.y > 2.2) {
          spark.position.y = -0.5;
          spark.position.x = -2.0 + Math.random() * 4.0;
        }
      });

      camera.position.x += (0.25 + pointer.x * 0.28 - camera.position.x) * 0.04;
      camera.position.y += (1.7 - pointer.y * 0.12 - camera.position.y) * 0.04;
      camera.lookAt(0.25, -0.45, 0);

      renderer.render(scene, camera);
      canvas.dataset.rendered = "true";

      if (!prefersReducedMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      window.cancelAnimationFrame(animationFrame);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) {
            material.forEach((item) => item.dispose());
          } else {
            material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="hero-three-scene" aria-hidden="true">
      <canvas ref={canvasRef} data-testid="hero-3d-canvas" className="h-full w-full" />
    </div>
  );
};

export default ThreeDiningScene;
