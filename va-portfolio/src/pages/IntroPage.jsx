import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function ChibiDoll({ containerRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 50);
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

    /* ── materials ── */
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
    /* outfit: soft lilac dress with white accents */
    const dress = new THREE.MeshStandardMaterial({
      color: 0xc8a8e8,
      roughness: 0.55,
    }); /* lilac */
    const dressD = new THREE.MeshStandardMaterial({
      color: 0xb090d8,
      roughness: 0.55,
    }); /* darker lilac ruffle */
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
    }); /* pink mary janes */
    const sock = new THREE.MeshStandardMaterial({
      color: 0xfff0f5,
      roughness: 0.5,
    });
    const bow = new THREE.MeshStandardMaterial({
      color: 0xff8fb0,
      roughness: 0.5,
    }); /* pink bow */
    const pupil = new THREE.MeshStandardMaterial({
      color: 0x2a1505,
      roughness: 0.4,
    });
    const shine = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
    });

    const assembly = new THREE.Group();

    /* ── CHAIN ── */
    const chainGroup = new THREE.Group();
    const topRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.16, 0.04, 12, 32),
      gold,
    );
    topRing.position.y = 0;
    chainGroup.add(topRing);

    const LINKS = 5;
    const LINK_GAP = 0.38;
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

    /* ── DOLL ── */
    const doll = new THREE.Group();
    doll.position.y = 2.7 - (LINKS + 1) * LINK_GAP - 0.1;

    /* connector ring to chain */
    const conn = new THREE.Mesh(
      new THREE.TorusGeometry(0.1, 0.032, 10, 24),
      gold,
    );
    conn.position.y = 1.05;
    doll.add(conn);

    /* head */
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.52, 24, 18), skin);
    head.position.y = 0.72;
    head.scale.set(1, 1.05, 1);
    doll.add(head);

    /* hair cap */
    const hairCap = new THREE.Mesh(
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
    );
    hairCap.position.y = 0.86;
    doll.add(hairCap);

    /* side hair */
    [-1, 1].forEach((s) => {
      const hf = new THREE.Mesh(
        new THREE.CylinderGeometry(0.13, 0.08, 0.38, 10),
        hair,
      );
      hf.position.set(s * 0.45, 0.6, 0);
      doll.add(hf);
    });

    /* twin buns */
    [-1, 1].forEach((s) => {
      const bun = new THREE.Mesh(new THREE.SphereGeometry(0.19, 14, 12), hair);
      bun.position.set(s * 0.48, 1.06, 0);
      doll.add(bun);
      /* bow on each bun */
      const bowL = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), bow);
      bowL.position.set(s * 0.48 - 0.08, 1.18, 0.06);
      bowL.scale.set(1.4, 0.7, 0.5);
      doll.add(bowL);
      const bowR = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), bow);
      bowR.position.set(s * 0.48 + 0.08, 1.18, 0.06);
      bowR.scale.set(1.4, 0.7, 0.5);
      doll.add(bowR);
      const bowC = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 6), white);
      bowC.position.set(s * 0.48, 1.18, 0.09);
      doll.add(bowC);
    });

    /* eyes */
    [-1, 1].forEach((s) => {
      const ew = new THREE.Mesh(new THREE.CircleGeometry(0.11, 16), white);
      ew.position.set(s * 0.18, 0.69, 0.51);
      doll.add(ew);
      const ep = new THREE.Mesh(new THREE.CircleGeometry(0.075, 14), pupil);
      ep.position.set(s * 0.18, 0.69, 0.515);
      doll.add(ep);
      const es = new THREE.Mesh(new THREE.CircleGeometry(0.03, 10), shine);
      es.position.set(s * 0.18 + 0.04, 0.72, 0.52);
      doll.add(es);
      /* lash */
      const lash = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.03, 0.01),
        hair,
      );
      lash.position.set(s * 0.18, 0.79, 0.51);
      doll.add(lash);
    });

    /* blush */
    [-1, 1].forEach((s) => {
      const bl = new THREE.Mesh(new THREE.CircleGeometry(0.1, 14), blush);
      bl.position.set(s * 0.32, 0.6, 0.51);
      doll.add(bl);
    });

    /* smile */
    const smileGeo = new THREE.TorusGeometry(0.09, 0.015, 6, 16, Math.PI);
    const smileMesh = new THREE.Mesh(
      smileGeo,
      new THREE.MeshStandardMaterial({ color: 0xc07060, roughness: 0.6 }),
    );
    smileMesh.position.set(0, 0.57, 0.515);
    smileMesh.rotation.z = Math.PI;
    doll.add(smileMesh);

    /* nose */
    const noseMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.025, 8, 6),
      new THREE.MeshStandardMaterial({ color: 0xe0a888, roughness: 0.7 }),
    );
    noseMesh.position.set(0, 0.64, 0.53);
    doll.add(noseMesh);

    /* neck */
    const neck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.16, 0.18, 14),
      skin,
    );
    neck.position.y = 0.27;
    doll.add(neck);

    /* collar ruffle – white lace ring */
    const collar = new THREE.Mesh(
      new THREE.TorusGeometry(0.22, 0.07, 10, 24),
      white,
    );
    collar.position.y = 0.2;
    collar.rotation.x = Math.PI * 0.5;
    doll.add(collar);

    /* body – puffed lilac dress */
    const bodyTop = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.3, 0.38, 18),
      dress,
    );
    bodyTop.position.y = 0.01;
    doll.add(bodyTop);

    /* skirt – wider flared cone */
    const skirt = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.52, 0.36, 22),
      dress,
    );
    skirt.position.y = -0.28;
    doll.add(skirt);

    /* ruffle at skirt hem */
    const ruffle1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.53, 0.57, 0.09, 22),
      dressD,
    );
    ruffle1.position.y = -0.45;
    doll.add(ruffle1);

    /* white petticoat peek */
    const petticoat = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.54, 0.07, 22),
      white,
    );
    petticoat.position.y = -0.52;
    doll.add(petticoat);

    /* bow on chest */
    const chestBowL = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), bow);
    chestBowL.position.set(-0.07, 0.17, 0.27);
    chestBowL.scale.set(1.5, 0.7, 0.5);
    doll.add(chestBowL);
    const chestBowR = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), bow);
    chestBowR.position.set(0.07, 0.17, 0.27);
    chestBowR.scale.set(1.5, 0.7, 0.5);
    doll.add(chestBowR);
    const chestBowC = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 8, 6),
      white,
    );
    chestBowC.position.set(0, 0.17, 0.29);
    doll.add(chestBowC);

    /* arms – puffed sleeves */
    [-1, 1].forEach((s) => {
      /* puff sleeve ball */
      const sleeve = new THREE.Mesh(
        new THREE.SphereGeometry(0.13, 12, 10),
        dress,
      );
      sleeve.position.set(s * 0.36, 0.15, 0.08);
      sleeve.scale.set(1, 0.85, 0.85);
      doll.add(sleeve);
      /* arm */
      const arm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.075, 0.065, 0.34, 10),
        dress,
      );
      arm.position.set(s * 0.32, 0.04, 0.16);
      arm.rotation.z = s * 0.65;
      arm.rotation.x = -0.48;
      doll.add(arm);
      /* hand */
      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.085, 10, 8), skin);
      hand.position.set(s * 0.13, 0.3, 0.35);
      doll.add(hand);
    });

    /* heart fingers */
    const hl = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), rose);
    hl.position.set(-0.07, 0.42, 0.38);
    hl.scale.set(1, 1, 0.6);
    doll.add(hl);
    const hr = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), rose);
    hr.position.set(0.07, 0.42, 0.38);
    hr.scale.set(1, 1, 0.6);
    doll.add(hr);
    const hv = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.14, 12), rose);
    hv.position.set(0, 0.3, 0.37);
    hv.rotation.z = Math.PI;
    hv.scale.z = 0.6;
    doll.add(hv);

    /* legs */
    [-1, 1].forEach((s) => {
      const leg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.09, 0.32, 12),
        skin,
      );
      leg.position.set(s * 0.12, -0.74, 0);
      doll.add(leg);
      /* lace sock */
      const sockMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.106, 0.1, 0.14, 12),
        sock,
      );
      sockMesh.position.set(s * 0.12, -0.88, 0);
      doll.add(sockMesh);
      /* pink mary jane shoe */
      const shoeMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.13, 12, 8),
        shoe,
      );
      shoeMesh.position.set(s * 0.12, -0.98, 0.06);
      shoeMesh.scale.set(1, 0.65, 1.4);
      doll.add(shoeMesh);
      /* shoe strap */
      const strap = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.03, 0.04),
        shoe,
      );
      strap.position.set(s * 0.12, -0.93, 0.1);
      doll.add(strap);
    });

    assembly.add(doll);
    assembly.position.y = 11; /* start off screen */
    scene.add(assembly);

    /* ── drop animation ── */
    let progress = 0;
    const START_DELAY = 600;
    let startTime = null;
    const DROP_DUR = 2400;

    setTimeout(() => {
      startTime = performance.now();
    }, START_DELAY);

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    let animId;
    function animate(t) {
      animId = requestAnimationFrame(animate);
      const time = t * 0.001;

      if (startTime !== null) {
        progress = Math.min((performance.now() - startTime) / DROP_DUR, 1);
      }

      const ep = easeOut(progress);
      assembly.position.y = (1 - ep) * 11;
      assembly.rotation.y = time * 0.55;
      if (progress > 0.85) {
        assembly.rotation.z = Math.sin(time * 1.6) * 0.04;
      }

      renderer.render(scene, camera);
    }
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        right: 0,
        bottom: 0,
        width: "340px",
        height: "520px",
        pointerEvents: "none",
      }}
    />
  );
}

export default function IntroPage() {
  return (
    <section className="h-screen w-full snap-start flex flex-col justify-between p-8 md:p-16 relative z-10 overflow-hidden">
      {/* top bar */}
      <div className="flex justify-between items-center w-full font-mono text-xs tracking-widest text-neutral-500 relative z-20">
        <div></div>
        <div className="border border-neutral-800 px-3 py-1 rounded-full text-[10px] bg-neutral-900/30 backdrop-blur-sm text-neutral-400">
          PORTFOLIO '26
        </div>
      </div>

      {/* centre text */}
      <div className="relative z-20 text-center mx-auto">
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase select-none transition-all duration-700 hover:tracking-normal cursor-default drop-shadow-[0_0_50px_rgba(99,102,241,0.2)]">
          Portfolio.
        </h1>
        <p className="text-neutral-400 mt-6 tracking-[0.2em] md:tracking-[0.4em] font-mono text-[10px] md:text-xs uppercase max-w-xl mx-auto leading-relaxed">
          Virtual Assistant &amp; Operations Specialist
        </p>
      </div>

      {/* bottom bar */}
      <div className="flex justify-between items-end text-[10px] md:text-xs font-mono text-neutral-500 w-full relative z-20">
        <div className="space-y-1">
          <div></div>
          <div className="text-neutral-400"></div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-neutral-400 tracking-widest text-[9px] uppercase animate-pulse"></span>
          <div className="w-[1px] h-8 bg-neutral-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-indigo-500 animate-[bounce_2s_infinite]" />
          </div>
        </div>
      </div>

      {/* chibi doll – absolutely positioned bottom-right */}
      <ChibiDoll />
    </section>
  );
}
