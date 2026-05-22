import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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

// The character — PNG with CSS animations mimicking the Three.js chibi behavior
function CharacterDoll({ bp }) {
  const cfg = {
    mobile: { width: "150px", right: "0px", bottom: "0px", opacity: 0.85 },
    tablet: { width: "220px", right: "8px", bottom: "0px", opacity: 1 },
    desktop: { width: "300px", right: "20px", bottom: "0px", opacity: 1 },
  }[bp];

  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw values — set directly from mouse events
  const rawRotY = useMotionValue(0);
  const rawRotX = useMotionValue(0);

  // ✅ Spring the raw value FIRST, then transform — this is the correct chain
  const idleCfg = { stiffness: 40, damping: 15, mass: 1.2 };
  const hoverCfg = { stiffness: 200, damping: 22, mass: 0.6 };
  const activeCfg = isHovered ? hoverCfg : idleCfg;

  const springY = useSpring(rawRotY, activeCfg);
  const springX = useSpring(rawRotX, activeCfg);

  // Map [-1,1] → degrees — wider range on hover
  const rotateY = useTransform(
    springY,
    [-1, 1],
    isHovered ? [-18, 18] : [-5, 5],
  );
  const rotateX = useTransform(
    springX,
    [-1, 1],
    isHovered ? [10, -10] : [3, -3],
  );
  const scale = useSpring(isHovered ? 1.05 : 1, {
    stiffness: 150,
    damping: 20,
  });

  // Global idle tracking (whole window)
  useEffect(() => {
    const onMove = (e) => {
      if (isHovered) return; // local handler takes over on hover
      rawRotY.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawRotX.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isHovered]);

  // Local hover tracking (relative to character bounds)
  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawRotY.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    rawRotX.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly reset to global mouse position — don't snap to zero
    rawRotY.set(window._mx ?? 0);
    rawRotX.set(window._my ?? 0);
  };

  // Cache global mouse for smooth leave transition
  useEffect(() => {
    const track = (e) => {
      window._mx = (e.clientX / window.innerWidth - 0.5) * 2;
      window._my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", track);
    return () => window.removeEventListener("mousemove", track);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ y: -420, opacity: 0 }}
      animate={{ y: 0, opacity: cfg.opacity }}
      transition={{ delay: 0.6, duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        position: "absolute",
        right: cfg.right,
        bottom: cfg.bottom,
        width: cfg.width,
        pointerEvents: "auto",
        zIndex: 10,
        perspective: "600px",
        cursor: "crosshair",
      }}
    >
      <motion.div
        style={{
          rotateY,
          rotateX,
          scale,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Idle sway */}
        <motion.div
          animate={{ rotate: [0, 0.6, 0, -0.6, 0] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        >
          {/* Bob */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          >
            {/* Shadow */}
            <motion.div
              animate={{
                scaleX: isHovered ? 1.12 : [1, 1.05, 1],
                opacity: isHovered ? 0.55 : [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: isHovered ? 0.3 : 5,
                ease: "easeInOut",
                repeat: isHovered ? 0 : Infinity,
              }}
              style={{
                position: "absolute",
                bottom: "-8px",
                left: "10%",
                width: "80%",
                height: "20px",
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse, rgba(99,102,241,0.5) 0%, transparent 70%)",
                filter: "blur(7px)",
                transformOrigin: "center",
              }}
            />

            {/* Hover glow */}
            <motion.div
              animate={{ opacity: isHovered ? 0.45 : 0 }}
              transition={{ duration: 0.35 }}
              style={{
                position: "absolute",
                inset: "-20px",
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse at 50% 80%, rgba(99,102,241,0.3) 0%, transparent 65%)",
                filter: "blur(10px)",
                pointerEvents: "none",
              }}
            />

            <img
              src="src/assets/VA-characters.png"
              alt="Virtual Assistant"
              style={{
                width: "100%",
                display: "block",
                mixBlendMode: "lighten",
                filter: isHovered
                  ? "drop-shadow(0 16px 40px rgba(99,102,241,0.4)) drop-shadow(0 0 20px rgba(6,182,212,0.2))"
                  : "drop-shadow(0 10px 24px rgba(99,102,241,0.18)) drop-shadow(0 0 10px rgba(6,182,212,0.07))",
                transition: "filter 0.4s ease",
                userSelect: "none",
                draggable: false,
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
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
        <div></div>
        <div
          className="border border-neutral-800 px-3 py-1 rounded-full bg-neutral-900/30 backdrop-blur-sm text-neutral-400"
          style={{ fontSize: isMobile ? "7px" : "9px" }}
        >
          PORTFOLIO '26
        </div>
      </div>

      {/* centre text */}
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
          <div style={{ letterSpacing: "0.15em", color: "#444" }}></div>
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

      {/* Character — drops in from top just like the Three.js chibi did */}
      <CharacterDoll bp={bp} />
    </section>
  );
}
