import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { n: "01", label: "Intro", href: "#intro" },
  { n: "02", label: "About", href: "#about" },
  { n: "03", label: "Experience", href: "#experience" },
  { n: "04", label: "Projects", href: "#projects" },
  { n: "05", label: "Contact", href: "#contact" },
];

export default function OrbNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#intro");
  const closeTimer = useRef(null);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }, []);
  const cancelClose = useCallback(() => clearTimeout(closeTimer.current), []);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => {
    const sections = ["intro", "about", "experience", "projects", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(`#${id}`);
        },
        { threshold: 0.4 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
      style={{
        position: "fixed",
        left: "28px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 9999,
      }}
    >
      <AnimatePresence>
        {!open && (
          <motion.button
            key="orb"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => {
              cancelClose();
              setOpen(true);
            }}
            onClick={() => setOpen((o) => !o)}
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              background: "rgba(99,102,241,0.18)",
              border: "1.5px solid rgba(99,102,241,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
              outline: "none",
              boxShadow: "0 0 16px rgba(99,102,241,0.2)",
              willChange: "transform",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.28, 0, 0.28] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                inset: "-7px",
                borderRadius: "50%",
                border: "1px solid rgba(99,102,241,0.3)",
                pointerEvents: "none",
                willChange: "transform, opacity",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "9px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: "rgba(165,180,252,0.95)",
              }}
            >
              NAV
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, scale: 0.88, x: -8 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.88, x: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              background: "rgba(10,10,16,0.97)",
              border: "1px solid rgba(99,102,241,0.28)",
              borderRadius: "20px",
              padding: "10px",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              minWidth: "180px",
              boxShadow:
                "0 0 40px rgba(99,102,241,0.1), 0 8px 32px rgba(0,0,0,0.7)",
              willChange: "transform, opacity",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "4px 10px 10px",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                marginBottom: "6px",
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "8px",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  color: "rgba(165,180,252,0.55)",
                }}
              >
                NAVIGATE
              </span>
              <button
                onClick={() => setOpen(false)}
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path
                    d="M1 1l6 6M7 1L1 7"
                    stroke="rgba(165,180,252,0.7)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {navItems.map((item, i) => {
              const isActive = active === item.href;
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.04 + i * 0.04,
                    duration: 0.24,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => {
                    setActive(item.href);
                    setOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "9px 12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    background: isActive
                      ? "rgba(99,102,241,0.12)"
                      : "transparent",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.background =
                        "rgba(99,102,241,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "8px",
                      letterSpacing: "0.08em",
                      color: isActive
                        ? "rgba(165,180,252,0.6)"
                        : "rgba(113,113,122,0.8)",
                      minWidth: "18px",
                      transition: "color 0.15s ease",
                    }}
                  >
                    {item.n}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: "12px",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "#e4e4e7" : "#71717a",
                      transition: "color 0.15s ease",
                    }}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      style={{
                        marginLeft: "auto",
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "#6366f1",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </motion.a>
              );
            })}

            <div
              style={{
                marginTop: "6px",
                padding: "8px 12px 2px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "7px",
                  letterSpacing: "0.12em",
                  color: "rgba(99,102,241,0.3)",
                }}
              >
                READY FOR WORK
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
