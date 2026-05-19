import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

const navItems = [
  { n: "01", label: "INTRO", href: "#intro" },
  { n: "02", label: "ABOUT", href: "#about" },
  { n: "03", label: "EXPERIENCE", href: "#experience" },
  { n: "04", label: "PROJECTS", href: "#projects" },
  { n: "05", label: "CONTACT", href: "#contact" },
];

export default function OrbNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#intro");
  const wrapRef = useRef(null);
  const isMobile = useIsMobile();

  /* close on outside click */
  useEffect(() => {
    function handler(e) {
      if (open && wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  /* track active section via IntersectionObserver */
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
      ref={wrapRef}
      style={
        isMobile
          ? {
              position: "fixed",
              bottom: "28px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9999,
            }
          : {
              position: "fixed",
              left: "28px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 9999,
            }
      }
    >
      {/* ── ORB ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="orb"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setOpen(true)}
            onClick={() => setOpen(true)}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
              outline: "none",
            }}
          >
            {/* pulse glow ring */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.15, 0.5] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                inset: "-8px",
                borderRadius: "50%",
                border: "1px solid rgba(99,102,241,0.4)",
                pointerEvents: "none",
              }}
            />
            {/* second softer ring */}
            <motion.div
              animate={{ scale: [1, 1.85, 1], opacity: [0.3, 0, 0.3] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              style={{
                position: "absolute",
                inset: "-8px",
                borderRadius: "50%",
                border: "1px solid rgba(99,102,241,0.25)",
                pointerEvents: "none",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "8px",
                letterSpacing: "0.15em",
                color: "rgba(99,102,241,0.8)",
              }}
            >
              NAV
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── EXPANDED MENU ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{
              opacity: 0,
              scale: 0.85,
              x: isMobile ? 0 : -10,
              y: isMobile ? 10 : 0,
            }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.85,
              x: isMobile ? 0 : -10,
              y: isMobile ? 10 : 0,
            }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              ...(isMobile
                ? { bottom: "54px", left: "50%", transform: "translateX(-50%)" }
                : { top: "50%", left: 0, transform: "translateY(-50%)" }),
              background: "rgba(6,6,10,0.92)",
              border: "1px solid rgba(99,102,241,0.18)",
              borderRadius: "20px",
              padding: "10px",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              minWidth: "172px",
              boxShadow:
                "0 0 50px rgba(99,102,241,0.1), 0 0 0 1px rgba(99,102,241,0.06)",
            }}
          >
            {/* header row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "4px 10px 10px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                marginBottom: "6px",
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "7px",
                  letterSpacing: "0.18em",
                  color: "rgba(99,102,241,0.8)",
                }}
              >
                NAVIGATE
              </span>
              {/* close button – tiny orb */}
              <button
                onClick={() => setOpen(false)}
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "rgba(99,102,241,0.08)",
                  border: "1px solid rgba(99,102,241,0.2)",
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
                    stroke="rgba(99,102,241,0.6)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* nav links */}
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.06 + i * 0.055,
                  duration: 0.3,
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
                  background:
                    active === item.href
                      ? "rgba(99,102,241,0.08)"
                      : "transparent",
                  transition: "background 0.18s ease",
                }}
                onMouseEnter={(e) => {
                  if (active !== item.href)
                    e.currentTarget.style.background = "rgba(99,102,241,0.06)";
                }}
                onMouseLeave={(e) => {
                  if (active !== item.href)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "7px",
                    letterSpacing: "0.1em",
                    color:
                      active === item.href
                        ? "rgba(99,102,241,0.7)"
                        : "rgba(255,255,255,0.25)",
                    minWidth: "18px",
                    transition: "color 0.18s ease",
                  }}
                >
                  {item.n}
                </span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    color:
                      active === item.href
                        ? "#a5b4fc"
                        : "rgba(255,255,255,0.75)",
                    transition: "color 0.18s ease",
                  }}
                >
                  {item.label}
                </span>
                {active === item.href && (
                  <motion.div
                    layoutId="activeIndicator"
                    style={{
                      marginLeft: "auto",
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "#6366f1",
                    }}
                  />
                )}
              </motion.a>
            ))}

            {/* footer */}
            <div
              style={{
                marginTop: "6px",
                padding: "8px 12px 2px",
                borderTop: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "7px",
                  letterSpacing: "0.14em",
                  color: "rgba(255,255,255,0.2)",
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
