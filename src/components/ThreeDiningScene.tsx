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
      console.error("Unable to initialize the 3D dining scene:", error);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0.25, 1.6, 6.4);
    camera.lookAt(0, -0.35, 0);

    renderer.setClearAlpha(0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    const root = new THREE.Group();
    root.position.set(1.05, -0.25, 0);
    scene.add(root);

    const getThemePalette = () => {
      const styles = window.getComputedStyle(document.documentElement);

      return {
        themeDark: cssHslToHex(styles.getPropertyValue("--comorin-teal-dark"), 0x1c5f58),
        themeBase: cssHslToHex(styles.getPropertyValue("--comorin-teal"), 0x4bb2a8),
        themeLight: cssHslToHex(styles.getPropertyValue("--comorin-teal-light"), 0x8fd9d1),
        yellowAccent: 0xfde68a,
        porcelain: 0xf7fffb,
        clearGlass: 0xd9fbff,
      };
    };
    const palette = getThemePalette();

    const tableMaterial = new THREE.MeshStandardMaterial({
      color: palette.themeDark,
      roughness: 0.42,
      metalness: 0.14,
    });
    const table = new THREE.Mesh(new THREE.CylinderGeometry(3.95, 4.35, 0.28, 128), tableMaterial);
    table.position.set(0, -1.26, 0);
    table.scale.set(1.25, 1, 0.68);
    table.receiveShadow = true;
    root.add(table);

    const plateGroup = new THREE.Group();
    plateGroup.position.set(-0.45, -0.98, 0.15);
    root.add(plateGroup);

    const plateMaterial = new THREE.MeshPhysicalMaterial({
      color: palette.porcelain,
      roughness: 0.35,
      metalness: 0.02,
      clearcoat: 0.75,
      clearcoatRoughness: 0.25,
    });
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(1.42, 1.55, 0.12, 128), plateMaterial);
    plate.scale.set(1.22, 1, 0.82);
    plate.castShadow = true;
    plate.receiveShadow = true;
    plateGroup.add(plate);

    const plateRim = new THREE.Mesh(
      new THREE.TorusGeometry(1.47, 0.055, 16, 128),
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.28,
        clearcoat: 0.85,
      }),
    );
    plateRim.rotation.x = Math.PI / 2;
    plateRim.position.y = 0.085;
    plateRim.scale.set(1.22, 0.82, 1);
    plateRim.castShadow = true;
    plateGroup.add(plateRim);

    const qormaMaterial = new THREE.MeshStandardMaterial({
      color: palette.themeBase,
      emissive: palette.themeDark,
      emissiveIntensity: 0.12,
      roughness: 0.5,
    });
    const qorma = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.64, 0.08, 96), qormaMaterial);
    qorma.position.set(-0.42, 0.12, 0.08);
    qorma.scale.set(1.15, 1, 0.78);
    qorma.castShadow = true;
    plateGroup.add(qorma);

    const qormaRimMaterial = new THREE.MeshStandardMaterial({ color: palette.themeLight, roughness: 0.42 });
    const qormaRim = new THREE.Mesh(new THREE.TorusGeometry(0.63, 0.055, 16, 96), qormaRimMaterial);
    qormaRim.rotation.x = Math.PI / 2;
    qormaRim.position.set(-0.42, 0.18, 0.08);
    qormaRim.scale.set(1.15, 0.78, 1);
    qormaRim.castShadow = true;
    plateGroup.add(qormaRim);

    const garnishMaterial = new THREE.MeshStandardMaterial({ color: 0xc9f7ef, roughness: 0.7 });
    for (let index = 0; index < 9; index += 1) {
      const garnish = new THREE.Mesh(new THREE.SphereGeometry(0.032, 12, 8), garnishMaterial);
      const angle = index * 0.72;
      garnish.position.set(-0.42 + Math.cos(angle) * 0.34, 0.235, 0.08 + Math.sin(angle) * 0.18);
      garnish.scale.set(1.25, 0.35, 0.8);
      plateGroup.add(garnish);
    }

    const pastaMaterial = new THREE.MeshStandardMaterial({
      color: palette.yellowAccent,
      roughness: 0.46,
      metalness: 0,
    });
    for (let index = 0; index < 18; index += 1) {
      const start = -0.1 + index * 0.035;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.12 + Math.sin(index) * 0.12, 0.15, -0.32 + start),
        new THREE.Vector3(0.48 + Math.cos(index * 0.7) * 0.15, 0.22, -0.18 + start * 0.4),
        new THREE.Vector3(0.28 + Math.sin(index * 1.3) * 0.2, 0.17, 0.1 + start * 0.5),
        new THREE.Vector3(0.68 + Math.cos(index) * 0.1, 0.16, 0.25 - start),
      ]);
      const noodle = new THREE.Mesh(new THREE.TubeGeometry(curve, 36, 0.018, 8, false), pastaMaterial);
      noodle.castShadow = true;
      plateGroup.add(noodle);
    }

    const naanMaterial = new THREE.MeshStandardMaterial({
      color: 0xfff0ad,
      roughness: 0.8,
    });
    const naan = new THREE.Mesh(new THREE.SphereGeometry(0.42, 36, 18), naanMaterial);
    naan.position.set(-0.08, 0.14, -0.42);
    naan.scale.set(1.45, 0.09, 0.72);
    naan.rotation.z = -0.16;
    naan.castShadow = true;
    plateGroup.add(naan);

    const charMaterial = new THREE.MeshStandardMaterial({ color: palette.themeDark, roughness: 0.9 });
    for (let index = 0; index < 5; index += 1) {
      const char = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 8), charMaterial);
      char.position.set(-0.25 + index * 0.11, 0.19, -0.45 + Math.sin(index) * 0.07);
      char.scale.set(1.8, 0.18, 0.8);
      plateGroup.add(char);
    }

    const samosaMaterial = new THREE.MeshStandardMaterial({
      color: 0xfde68a,
      roughness: 0.68,
      metalness: 0.02,
    });
    const samosa = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.34, 3), samosaMaterial);
    samosa.position.set(-1.02, 0.22, 0.28);
    samosa.rotation.set(1.25, -0.28, 0.38);
    samosa.castShadow = true;
    plateGroup.add(samosa);

    const glassGroup = new THREE.Group();
    glassGroup.position.set(1.35, -0.85, -0.18);
    root.add(glassGroup);

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: palette.clearGlass,
      roughness: 0.04,
      metalness: 0,
      transmission: 0.45,
      transparent: true,
      opacity: 0.38,
      thickness: 0.3,
    });
    const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.27, 1.12, 64, 1, true), glassMaterial);
    glass.position.y = 0.34;
    glass.castShadow = true;
    glassGroup.add(glass);

    const lassiMaterial = new THREE.MeshStandardMaterial({ color: palette.themeLight, roughness: 0.38 });
    const lassi = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.24, 0.86, 64), lassiMaterial);
    lassi.position.y = 0.25;
    glassGroup.add(lassi);

    const lassiFoamMaterial = new THREE.MeshStandardMaterial({ color: palette.porcelain, roughness: 0.35 });
    const lassiFoam = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.29, 0.035, 64), lassiFoamMaterial);
    lassiFoam.position.y = 0.7;
    glassGroup.add(lassiFoam);

    const strawMaterial = new THREE.MeshStandardMaterial({ color: palette.themeBase, roughness: 0.36 });
    const straw = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.22, 18), strawMaterial);
    straw.position.set(0.12, 0.72, 0.02);
    straw.rotation.z = -0.28;
    glassGroup.add(straw);

    const spiceGroup = new THREE.Group();
    root.add(spiceGroup);
    const spiceMaterials = [
      new THREE.MeshStandardMaterial({ color: palette.yellowAccent, roughness: 0.5 }),
      new THREE.MeshStandardMaterial({ color: palette.themeLight, roughness: 0.55 }),
      new THREE.MeshStandardMaterial({ color: palette.themeBase, roughness: 0.65 }),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 }),
    ];

    const spiceSeeds: THREE.Mesh[] = [];
    for (let index = 0; index < 46; index += 1) {
      const material = spiceMaterials[index % spiceMaterials.length];
      const geometry =
        index % 3 === 0
          ? new THREE.CapsuleGeometry(0.026, 0.075, 4, 8)
          : new THREE.SphereGeometry(0.035 + (index % 4) * 0.006, 12, 8);
      const seed = new THREE.Mesh(geometry, material);
      const ring = 1.6 + (index % 7) * 0.17;
      const angle = index * 1.11;
      seed.position.set(Math.cos(angle) * ring * 0.64, -0.1 + (index % 9) * 0.18, Math.sin(angle) * ring * 0.34);
      seed.rotation.set(index * 0.2, index * 0.34, index * 0.13);
      seed.castShadow = true;
      spiceGroup.add(seed);
      spiceSeeds.push(seed);
    }

    const keyLight = new THREE.DirectionalLight(0xf8fff8, 4.4);
    keyLight.position.set(-2.6, 4.2, 4.4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x43dcc9, 2.4, 9);
    rimLight.position.set(2.7, 1.6, 2.1);
    scene.add(rimLight);

    const warmth = new THREE.PointLight(palette.themeLight, 2.1, 8);
    warmth.position.set(-1.8, 0.2, 2.7);
    scene.add(warmth);

    const ambient = new THREE.HemisphereLight(0xf7fffb, palette.themeDark, 1.5);
    scene.add(ambient);

    const applyThemePalette = () => {
      const nextPalette = getThemePalette();
      tableMaterial.color.setHex(nextPalette.themeDark);
      qormaMaterial.color.setHex(nextPalette.themeBase);
      qormaMaterial.emissive.setHex(nextPalette.themeDark);
      qormaRimMaterial.color.setHex(nextPalette.themeLight);
      pastaMaterial.color.setHex(nextPalette.yellowAccent);
      charMaterial.color.setHex(nextPalette.themeDark);
      samosaMaterial.color.setHex(nextPalette.yellowAccent);
      glassMaterial.color.setHex(nextPalette.clearGlass);
      lassiMaterial.color.setHex(nextPalette.themeLight);
      lassiFoamMaterial.color.setHex(nextPalette.porcelain);
      strawMaterial.color.setHex(nextPalette.themeBase);
      spiceMaterials[0].color.setHex(nextPalette.yellowAccent);
      spiceMaterials[1].color.setHex(nextPalette.themeLight);
      spiceMaterials[2].color.setHex(nextPalette.themeBase);
      warmth.color.setHex(nextPalette.themeLight);
      ambient.groundColor.setHex(nextPalette.themeDark);
    };

    const themeObserver = new MutationObserver(applyThemePalette);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

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

      root.rotation.y = Math.sin(seconds * 0.24) * 0.08 + pointer.x * 0.13;
      root.rotation.x = -0.05 + pointer.y * 0.035;
      plateGroup.rotation.y = Math.sin(seconds * 0.45) * 0.045;
      glassGroup.rotation.y = Math.sin(seconds * 0.38) * 0.055 - pointer.x * 0.04;
      spiceGroup.rotation.y = seconds * 0.08;

      spiceSeeds.forEach((seed, index) => {
        seed.position.y += Math.sin(seconds * 1.2 + index) * 0.0009;
        seed.rotation.x += 0.006 + (index % 3) * 0.001;
        seed.rotation.z += 0.004;
      });

      camera.position.x += (0.25 + pointer.x * 0.28 - camera.position.x) * 0.04;
      camera.position.y += (1.6 - pointer.y * 0.12 - camera.position.y) * 0.04;
      camera.lookAt(0.25, -0.4, 0);

      renderer.render(scene, camera);
      canvas.dataset.rendered = "true";

      if (!prefersReducedMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      themeObserver.disconnect();
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
