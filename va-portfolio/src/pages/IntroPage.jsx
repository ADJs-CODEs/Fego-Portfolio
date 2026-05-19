import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function useBreakpoint() {
  const get = () => {
    const w = window.innerWidth;
    if (w < 640) return "mobile";
    if (w < 1024) return "tablet";
    return "desktop";
  };
  const [bp, setBp] = useState(get);
  useEffect(() => {
    const fn = () => setBp(get());
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return bp;
}

function ChibiDoll({ bp }) {
  const canvasRef = useRef(null);

  const cfg = {
    mobile: { cw: 160, ch: 260, right: "-10px", bottom: "30%", opacity: 0.78 },
    tablet: { cw: 230, ch: 370, right: "0px", bottom: "0px", opacity: 1 },
    desktop: { cw: 340, ch: 520, right: "0px", bottom: "0px", opacity: 1 },
  }[bp];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(cfg.cw, cfg.ch, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, cfg.cw / cfg.ch, 0.1, 50);
    camera.position.set(0, 0, 9);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const d1 = new THREE.DirectionalLight(0xfff4ea, 1.4);
    d1.position.set(3, 6, 4);
    scene.add(d1);
    const d2 = new THREE.DirectionalLight(0x6366f1, 0.5);
    d2.position.set(-4, -2, -3);
    scene.add(d2);
    const d3 = new THREE.DirectionalLight(0xffd6e8, 0.5);
    d3.position.set(0, 0, 6);
    scene.add(d3);

    const gold = new THREE.MeshStandardMaterial({
      color: 0xe8c84a,
      metalness: 0.9,
      roughness: 0.12,
    });
    const skin = new THREE.MeshStandardMaterial({
      color: 0xf5c5a0,
      roughness: 0.65,
      metalness: 0.02,
    });
    const hair = new THREE.MeshStandardMaterial({
      color: 0x1a0f05,
      roughness: 0.8,
    });
    const dress = new THREE.MeshStandardMaterial({
      color: 0xc8a8e8,
      roughness: 0.55,
    });
    const dressD = new THREE.MeshStandardMaterial({
      color: 0xb090d8,
      roughness: 0.55,
    });
    const white = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.45,
    });
    const blush = new THREE.MeshStandardMaterial({
      color: 0xf4a0b0,
      transparent: true,
      opacity: 0.55,
      roughness: 1,
    });
    const rose = new THREE.MeshStandardMaterial({
      color: 0xe84070,
      roughness: 0.55,
    });
    const shoe = new THREE.MeshStandardMaterial({
      color: 0xc87090,
      roughness: 0.6,
    });
    const sock = new THREE.MeshStandardMaterial({
      color: 0xfff0f5,
      roughness: 0.5,
    });
    const bow = new THREE.MeshStandardMaterial({
      color: 0xff8fb0,
      roughness: 0.5,
    });
    const pupil = new THREE.MeshStandardMaterial({
      color: 0x2a1505,
      roughness: 0.4,
    });
    const shine = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
    });

    const assembly = new THREE.Group();

    /* chain */
    const chainGroup = new THREE.Group();
    const topRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.16, 0.04, 12, 32),
      gold,
    );
    topRing.position.y = 0;
    chainGroup.add(topRing);
    const LINKS = 5,
      LINK_GAP = 0.38;
    for (let i = 0; i < LINKS; i++) {
      const lk = new THREE.Mesh(
        new THREE.TorusGeometry(0.1, 0.032, 10, 24),
        gold,
      );
      lk.position.y = -(i + 1) * LINK_GAP;
      lk.rotation.x = i % 2 === 0 ? 0 : Math.PI * 0.5;
      chainGroup.add(lk);
    }
    chainGroup.position.y = 2.7;
    assembly.add(chainGroup);

    /* doll */
    const doll = new THREE.Group();
    doll.position.y = 2.7 - (LINKS + 1) * LINK_GAP - 0.1;

    const add = (geo, mat, px = 0, py = 0, pz = 0, rx, ry, rz, sx, sy, sz) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(px, py, pz);
      if (rx !== undefined) m.rotation.set(rx, ry || 0, rz || 0);
      if (sx !== undefined) m.scale.set(sx, sy ?? sx, sz ?? sx);
      doll.add(m);
      return m;
    };

    add(new THREE.TorusGeometry(0.1, 0.032, 10, 24), gold, 0, 1.05);
    add(
      new THREE.SphereGeometry(0.52, 24, 18),
      skin,
      0,
      0.72,
      0,
      0,
      0,
      0,
      1,
      1.05,
      1,
    );
    add(
      new THREE.SphereGeometry(
        0.545,
        18,
        14,
        0,
        Math.PI * 2,
        0,
        Math.PI * 0.52,
      ),
      hair,
      0,
      0.86,
    );
    [-1, 1].forEach((s) =>
      add(
        new THREE.CylinderGeometry(0.13, 0.08, 0.38, 10),
        hair,
        s * 0.45,
        0.6,
      ),
    );
    [-1, 1].forEach((s) => {
      add(new THREE.SphereGeometry(0.19, 14, 12), hair, s * 0.48, 1.06);
      add(
        new THREE.SphereGeometry(0.09, 8, 6),
        bow,
        s * 0.48 - 0.08,
        1.18,
        0.06,
        0,
        0,
        0,
        1.4,
        0.7,
        0.5,
      );
      add(
        new THREE.SphereGeometry(0.09, 8, 6),
        bow,
        s * 0.48 + 0.08,
        1.18,
        0.06,
        0,
        0,
        0,
        1.4,
        0.7,
        0.5,
      );
      add(new THREE.SphereGeometry(0.055, 8, 6), white, s * 0.48, 1.18, 0.09);
    });
    [-1, 1].forEach((s) => {
      add(new THREE.CircleGeometry(0.11, 16), white, s * 0.18, 0.69, 0.51);
      add(new THREE.CircleGeometry(0.075, 14), pupil, s * 0.18, 0.69, 0.515);
      add(
        new THREE.CircleGeometry(0.03, 10),
        shine,
        s * 0.18 + 0.04,
        0.72,
        0.52,
      );
      add(new THREE.BoxGeometry(0.22, 0.03, 0.01), hair, s * 0.18, 0.79, 0.51);
    });
    [-1, 1].forEach((s) =>
      add(new THREE.CircleGeometry(0.1, 14), blush, s * 0.32, 0.6, 0.51),
    );

    const sm = new THREE.Mesh(
      new THREE.TorusGeometry(0.09, 0.015, 6, 16, Math.PI),
      new THREE.MeshStandardMaterial({ color: 0xc07060, roughness: 0.6 }),
    );
    sm.position.set(0, 0.57, 0.515);
    sm.rotation.z = Math.PI;
    doll.add(sm);

    add(
      new THREE.SphereGeometry(0.025, 8, 6),
      new THREE.MeshStandardMaterial({ color: 0xe0a888, roughness: 0.7 }),
      0,
      0.64,
      0.53,
    );
    add(new THREE.CylinderGeometry(0.14, 0.16, 0.18, 14), skin, 0, 0.27);
    add(
      new THREE.TorusGeometry(0.22, 0.07, 10, 24),
      white,
      0,
      0.2,
      0,
      Math.PI * 0.5,
    );
    add(new THREE.CylinderGeometry(0.24, 0.3, 0.38, 18), dress, 0, 0.01);
    add(new THREE.CylinderGeometry(0.38, 0.52, 0.36, 22), dress, 0, -0.28);
    add(new THREE.CylinderGeometry(0.53, 0.57, 0.09, 22), dressD, 0, -0.45);
    add(new THREE.CylinderGeometry(0.5, 0.54, 0.07, 22), white, 0, -0.52);
    add(
      new THREE.SphereGeometry(0.07, 8, 6),
      bow,
      -0.07,
      0.17,
      0.27,
      0,
      0,
      0,
      1.5,
      0.7,
      0.5,
    );
    add(
      new THREE.SphereGeometry(0.07, 8, 6),
      bow,
      0.07,
      0.17,
      0.27,
      0,
      0,
      0,
      1.5,
      0.7,
      0.5,
    );
    add(new THREE.SphereGeometry(0.045, 8, 6), white, 0, 0.17, 0.29);
    [-1, 1].forEach((s) => {
      add(
        new THREE.SphereGeometry(0.13, 12, 10),
        dress,
        s * 0.36,
        0.15,
        0.08,
        0,
        0,
        0,
        1,
        0.85,
        0.85,
      );
      add(
        new THREE.CylinderGeometry(0.075, 0.065, 0.34, 10),
        dress,
        s * 0.32,
        0.04,
        0.16,
        -0.48,
        0,
        s * 0.65,
      );
      add(new THREE.SphereGeometry(0.085, 10, 8), skin, s * 0.13, 0.3, 0.35);
    });
    add(
      new THREE.SphereGeometry(0.08, 10, 8),
      rose,
      -0.07,
      0.42,
      0.38,
      0,
      0,
      0,
      1,
      1,
      0.6,
    );
    add(
      new THREE.SphereGeometry(0.08, 10, 8),
      rose,
      0.07,
      0.42,
      0.38,
      0,
      0,
      0,
      1,
      1,
      0.6,
    );
    add(
      new THREE.ConeGeometry(0.11, 0.14, 12),
      rose,
      0,
      0.3,
      0.37,
      Math.PI,
      0,
      0,
      1,
      1,
      0.6,
    );
    [-1, 1].forEach((s) => {
      add(
        new THREE.CylinderGeometry(0.1, 0.09, 0.32, 12),
        skin,
        s * 0.12,
        -0.74,
      );
      add(
        new THREE.CylinderGeometry(0.106, 0.1, 0.14, 12),
        sock,
        s * 0.12,
        -0.88,
      );
      add(
        new THREE.SphereGeometry(0.13, 12, 8),
        shoe,
        s * 0.12,
        -0.98,
        0.06,
        0,
        0,
        0,
        1,
        0.65,
        1.4,
      );
      add(new THREE.BoxGeometry(0.24, 0.03, 0.04), shoe, s * 0.12, -0.93, 0.1);
    });

    assembly.add(doll);
    assembly.position.y = 11;
    scene.add(assembly);

    let startTime = null;
    setTimeout(() => {
      startTime = performance.now();
    }, 600);
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    let animId;
    function animate(t) {
      animId = requestAnimationFrame(animate);
      const time = t * 0.001;
      let p = 0;
      if (startTime !== null)
        p = Math.min((performance.now() - startTime) / 2400, 1);
      assembly.position.y = (1 - easeOut(p)) * 11;
      assembly.rotation.y = time * 0.55;
      if (p > 0.85) assembly.rotation.z = Math.sin(time * 1.6) * 0.04;
      renderer.render(scene, camera);
    }
    animId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [cfg.cw, cfg.ch]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        right: cfg.right,
        bottom: cfg.bottom,
        width: `${cfg.cw}px`,
        height: `${cfg.ch}px`,
        opacity: cfg.opacity,
        pointerEvents: "none",
      }}
    />
  );
}

export default function IntroPage() {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  return (
    <section
      className="h-screen w-full snap-start flex flex-col justify-between relative z-10 overflow-hidden"
      style={{
        padding: isMobile ? "24px 20px" : isTablet ? "28px 36px" : "32px 40px",
      }}
    >
      {/* top bar */}
      <div
        className="flex justify-between items-center w-full font-mono tracking-widest text-neutral-500 relative z-20"
        style={{ fontSize: isMobile ? "8px" : "10px" }}
      >
        <div>/01. INTRO</div>
        <div
          className="border border-neutral-800 px-3 py-1 rounded-full bg-neutral-900/30 backdrop-blur-sm text-neutral-400"
          style={{ fontSize: isMobile ? "7px" : "9px" }}
        >
          PORTFOLIO '26
        </div>
      </div>

      {/* centre text — nudged left on mobile/tablet so doll doesn't cover it */}
      <div
        className="relative z-20 text-center mx-auto"
        style={{ paddingRight: isMobile ? "80px" : isTablet ? "150px" : "0px" }}
      >
        <h1
          className="font-black tracking-tighter uppercase select-none cursor-default"
          style={{
            fontSize: isMobile
              ? "clamp(2.8rem,16vw,3.8rem)"
              : isTablet
                ? "clamp(4rem,12vw,6rem)"
                : "clamp(5rem,10vw,8rem)",
            lineHeight: 1,
            color: "#fff",
            textShadow: "0 0 50px rgba(99,102,241,0.2)",
            letterSpacing: "-0.04em",
          }}
        >
          Portfolio.
        </h1>
        <p
          className="text-neutral-400 font-mono uppercase leading-relaxed"
          style={{
            marginTop: isMobile ? "10px" : "18px",
            fontSize: isMobile ? "7px" : isTablet ? "8px" : "10px",
            letterSpacing: isMobile ? "0.15em" : "0.32em",
          }}
        >
          Virtual Assistant &amp; Operations Specialist
        </p>
      </div>

      {/* bottom bar */}
      <div
        className="flex justify-between items-end font-mono text-neutral-500 w-full relative z-20"
        style={{ fontSize: isMobile ? "7px" : "9px" }}
      >
        <div className="space-y-1">
          <div style={{ letterSpacing: "0.15em", color: "#333" }}>
            [ CREATIVE DIRECTION ]
          </div>
          <div style={{ letterSpacing: "0.15em", color: "#444" }}>
            EFFICIENCY &amp; SCALE
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          {!isMobile && (
            <span
              className="text-neutral-600 uppercase animate-pulse"
              style={{ letterSpacing: "0.15em", fontSize: "8px" }}
            >
              Scroll to navigate
            </span>
          )}
          <div className="w-[1px] h-6 bg-neutral-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-indigo-500 animate-bounce" />
          </div>
        </div>
      </div>

      {/* chibi doll */}
      <ChibiDoll bp={bp} />
    </section>
  );
}
