import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

function FontLoader() {
  React.useEffect(() => {
    if (document.getElementById("pjs-font")) return;
    const l = Object.assign(document.createElement("link"), {
      id: "pjs-font",
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap",
    });
    document.head.appendChild(l);
  }, []);
  return null;
}

const experiences = [
  {
    id: 1,
    role: "Lead Virtual Assistant",
    company: "Operations Hub",
    period: "Jan 2025 – Present",
    side: "left",
    accent: "#6366f1",
    logo: "O",
    logoBg: "#6366f1",
    shortDesc:
      "Leading operations for a fast-scaling remote team across multiple time zones.",
    bullets: [
      "Managed and optimised full executive calendar across 4 time zones with zero conflicts",
      "Rebuilt internal Notion workspace reducing task turnaround time by 40%",
      "Oversaw onboarding of 6 new remote hires using a custom 30-60-90 day system",
      "Triaged and responded to 200+ emails weekly, maintaining a sub-4hr response time",
      "Created and maintained SOPs across 3 operational departments",
    ],
    tools: ["Notion", "Asana", "Slack", "Calendly", "Google Workspace"],
  },
  {
    id: 2,
    role: "Administrative Lead",
    company: "Apex Agency",
    period: "Mar 2024 – Dec 2024",
    side: "right",
    accent: "#06b6d4",
    logo: "A",
    logoBg: "#06b6d4",
    shortDesc:
      "Directed admin operations for a boutique creative agency with 15 staff.",
    bullets: [
      "Coordinated scheduling and travel logistics for senior leadership team",
      "Streamlined client communication workflows, cutting response delays by 60%",
      "Built and managed a content publishing calendar across 3 social platforms",
      "Handled vendor negotiations, contracts, and invoice tracking end-to-end",
      "Introduced Zapier automations that saved ~8 hours of manual work per week",
    ],
    tools: ["Gmail", "Trello", "Canva", "Zapier", "Hootsuite"],
  },
  {
    id: 3,
    role: "Executive Support Specialist",
    company: "Freelance Studio",
    period: "Jun 2023 – Feb 2024",
    side: "left",
    accent: "#f59e0b",
    logo: "F",
    logoBg: "#f59e0b",
    shortDesc:
      "Provided dedicated executive support to 3 startup founders simultaneously.",
    bullets: [
      "Managed inboxes, calendars, and task lists for 3 concurrent clients",
      "Drafted proposals, reports, and client-facing decks with consistent turnaround",
      "Set up project tracking systems from scratch for two early-stage startups",
      "Researched and compiled market analysis reports used in investor pitches",
      "Maintained strict confidentiality across sensitive business operations",
    ],
    tools: ["Google Workspace", "Notion", "Loom", "Calendly", "Slack"],
  },
  {
    id: 4,
    role: "Operations Intern",
    company: "BrightPath Consulting",
    period: "Jan 2023 – May 2023",
    side: "right",
    accent: "#10b981",
    logo: "B",
    logoBg: "#10b981",
    shortDesc:
      "Supported day-to-day operations and digital admin for a consulting firm.",
    bullets: [
      "Assisted with scheduling, data entry, and document management for senior consultants",
      "Maintained and updated CRM records for 200+ client accounts",
      "Coordinated logistics for 4 client workshops and 1 offsite event",
      "Drafted internal newsletters and team communication memos",
      "Identified and flagged process inefficiencies, leading to a revised reporting workflow",
    ],
    tools: ["HubSpot", "Google Sheets", "Zoom", "Notion", "Gmail"],
  },
];

const HoverDetail = memo(function HoverDetail({ exp, flipUp }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: flipUp ? -8 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: flipUp ? -4 : 4 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute",
        ...(flipUp
          ? { bottom: "100%", marginBottom: "8px" }
          : { top: "100%", marginTop: "8px" }),
        left: 0,
        right: 0,
        zIndex: 999,
        background: "#111",
        border: `1px solid ${exp.accent}40`,
        borderRadius: "14px",
        padding: "18px 20px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.85)",
      }}
    >
      <p
        style={{
          fontSize: "9px",
          fontFamily: "monospace",
          color: exp.accent,
          letterSpacing: "0.12em",
          marginBottom: "10px",
        }}
      >
        RESPONSIBILITIES
      </p>
      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: "7px",
        }}
      >
        {exp.bullets.map((b, i) => (
          <li
            key={i}
            style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}
          >
            <span
              style={{
                color: exp.accent,
                fontSize: "14px",
                lineHeight: 1.2,
                flexShrink: 0,
              }}
            >
              •
            </span>
            <span
              style={{ fontSize: "11.5px", color: "#a1a1aa", lineHeight: 1.6 }}
            >
              {b}
            </span>
          </li>
        ))}
      </ul>
      <div
        style={{
          marginTop: "12px",
          display: "flex",
          flexWrap: "wrap",
          gap: "5px",
        }}
      >
        {exp.tools.map((t, i) => (
          <span
            key={i}
            style={{
              fontSize: "9px",
              fontFamily: "monospace",
              letterSpacing: "0.06em",
              color: exp.accent,
              background: `${exp.accent}15`,
              border: `1px solid ${exp.accent}30`,
              padding: "2px 8px",
              borderRadius: "4px",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
});

const ExperienceEntry = memo(function ExperienceEntry({
  exp,
  scrollProgress,
  index,
  totalEntries,
  isLast,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-100px 0px -100px 0px",
  });
  const [hovered, setHovered] = useState(false);
  const isLeft = exp.side === "left";
  const isNodeLit = scrollProgress >= index / totalEntries;

  const Card = (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={
        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -60 : 60 }
      }
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        maxWidth: "340px",
        width: "100%",
        background: hovered ? `${exp.accent}14` : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? exp.accent + "45" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "14px",
        padding: "22px 24px",
        cursor: "default",
        transition: "border-color 0.25s ease, background 0.25s ease",
        position: "relative",
        willChange: "transform",
      }}
    >
      <div
        style={{
          position: "absolute",
          [isLeft ? "left" : "right"]: 0,
          top: "16px",
          bottom: "16px",
          width: "3px",
          borderRadius: isLeft ? "0 2px 2px 0" : "2px 0 0 2px",
          background: exp.accent,
          opacity: hovered ? 1 : 0.3,
          transition: "opacity 0.25s ease",
        }}
      />
      <div style={{ [isLeft ? "paddingLeft" : "paddingRight"]: "8px" }}>
        <p
          style={{
            fontSize: "10px",
            fontFamily: "monospace",
            color: exp.accent,
            letterSpacing: "0.1em",
            marginBottom: "6px",
          }}
        >
          {exp.period}
        </p>
        <h3
          style={{
            fontSize: "17px",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: "4px",
          }}
        >
          {exp.role}
        </h3>
        <p
          style={{
            fontSize: "12px",
            color: "#71717a",
            fontWeight: 500,
            marginBottom: "10px",
          }}
        >
          {exp.company}
        </p>
        <p style={{ fontSize: "12px", color: "#52525b", lineHeight: 1.65 }}>
          {exp.shortDesc}
        </p>
        <p
          style={{
            fontSize: "9px",
            fontFamily: "monospace",
            color: hovered ? "transparent" : "#2a2a2a",
            letterSpacing: "0.1em",
            marginTop: "12px",
            transition: "color 0.2s ease",
          }}
        >
          {isLeft ? "HOVER FOR MORE ›" : "‹ HOVER FOR MORE"}
        </p>
      </div>
      <AnimatePresence>
        {hovered && <HoverDetail exp={exp} flipUp={isLast} />}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 56px 1fr",
        alignItems: "center",
        position: "relative",
        minHeight: "140px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "28px",
        }}
      >
        {isLeft && Card}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 0.35, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            width: "42px",
            height: "42px",
            flexShrink: 0,
          }}
        >
          {isNodeLit && (
            <motion.div
              animate={{ opacity: [0.22, 0, 0.22], scale: [1, 1.45, 1] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                inset: "-6px",
                borderRadius: "50%",
                border: `1px solid ${exp.accent}`,
                pointerEvents: "none",
              }}
            />
          )}
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: isNodeLit ? exp.logoBg : "#1a1a1a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "15px",
              fontWeight: 800,
              color: isNodeLit ? "#fff" : "#444",
              boxShadow: isNodeLit
                ? `0 0 0 3px #050505, 0 0 0 4px ${exp.accent}40`
                : `0 0 0 3px #050505, 0 0 0 4px rgba(255,255,255,0.06)`,
              transition:
                "background 0.4s ease, color 0.4s ease, box-shadow 0.4s ease",
            }}
          >
            {exp.logo}
          </div>
        </motion.div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          paddingLeft: "28px",
        }}
      >
        {!isLeft && Card}
      </div>
    </div>
  );
});

export default function ExperiencePage() {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [atBottom, setAtBottom] = useState(false);
  const rafRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = scrollRef.current;
      if (!el) return;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const max = scrollHeight - clientHeight;
      if (max <= 0) return;
      const progress = scrollTop / max;
      setScrollProgress(progress);
      setAtBottom(progress > 0.97);
    });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    /*
      The wheel event is attached to the SECTION (full viewport),
      not just the scroll container. This means scrolling anywhere
      on the page triggers it — fixing the "must hover bottom" issue.

      Logic:
      - If inner div can scroll in that direction → scroll it, block snap
      - If inner div is at its boundary → do nothing → snap takes over
    */
    const onWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const maxScroll = scrollHeight - clientHeight;
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop >= maxScroll - 1;
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      if ((scrollingDown && !atBottom) || (scrollingUp && !atTop)) {
        // Inner div has room — take the event, scroll the inner div
        e.preventDefault();
        el.scrollBy({ top: e.deltaY, behavior: "auto" });
      }
      // At boundary — don't preventDefault, snap container handles it naturally
    };

    const section = sectionRef.current;
    section.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      section.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full snap-start bg-[#050505] text-white"
      style={{
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <FontLoader />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <div
        className="absolute top-0 left-0 right-0 z-30 flex justify-between px-10 pt-6"
        style={{
          fontFamily: "monospace",
          fontSize: "9px",
          letterSpacing: "0.2em",
          color: "#333",
        }}
      >
        <span>/03. EXPERIENCE</span>
        <span>[ WORK HISTORY ]</span>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 z-30 flex justify-between px-10 pb-5"
        style={{
          fontFamily: "monospace",
          fontSize: "9px",
          letterSpacing: "0.15em",
          color: "#222",
        }}
      >
        <span>PROFESSIONAL TIMELINE</span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>

      {/* HEADING */}
      <div
        style={{
          flexShrink: 0,
          position: "relative",
          zIndex: 20,
          paddingTop: "54px",
          paddingBottom: "22px",
          paddingLeft: "48px",
          paddingRight: "48px",
          background: "#050505",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#fff",
            lineHeight: 1,
          }}
        >
          Work Experience
        </h2>
        <p
          style={{
            fontSize: "11px",
            color: "#3f3f46",
            marginTop: "6px",
            fontFamily: "monospace",
            letterSpacing: "0.08em",
          }}
        >
          HOVER AN ENTRY TO SEE FULL DETAILS
        </p>
      </div>

      {/* SCROLL CONTAINER — pointer-events none so wheel events hit the section instead */}
      <div
        ref={scrollRef}
        className="no-scrollbar"
        style={{
          flex: 1,
          overflowY: "scroll",
          overflowX: "hidden",
          paddingLeft: "48px",
          paddingRight: "48px",
          paddingBottom: "48px",
          position: "relative",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "90px",
            paddingTop: "20px",
            paddingBottom: "40px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "1px",
              background: "rgba(255,255,255,0.05)",
              transform: "translateX(-50%)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              width: "1px",
              height: `${scrollProgress * 100}%`,
              background:
                "linear-gradient(to bottom, #6366f1 0%, #818cf8 60%, #a5b4fc 100%)",
              transform: "translateX(-50%)",
              zIndex: 2,
              pointerEvents: "none",
              opacity: 0.55,
              boxShadow: "0 0 4px 1px rgba(99,102,241,0.3)",
              transition: "height 0.06s linear",
              borderRadius: "0 0 2px 2px",
            }}
          />

          {scrollProgress > 0 && scrollProgress < 0.98 && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: `calc(${scrollProgress * 100}% - 3px)`,
                width: "5px",
                height: "5px",
                background: "#a5b4fc",
                borderRadius: "50%",
                transform: "translateX(-50%)",
                zIndex: 3,
                pointerEvents: "none",
                opacity: 0.75,
                boxShadow: "0 0 5px 1px rgba(99,102,241,0.35)",
                transition: "top 0.06s linear",
              }}
            />
          )}

          {experiences.map((exp, i) => (
            <ExperienceEntry
              key={exp.id}
              exp={exp}
              scrollProgress={scrollProgress}
              index={i}
              totalEntries={experiences.length}
              isLast={i >= experiences.length - 2}
            />
          ))}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              position: "relative",
              zIndex: 10,
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: scrollProgress > 0.95 ? "#6366f1" : "#1a1a1a",
                border: `1px solid ${scrollProgress > 0.95 ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.1)"}`,
                boxShadow:
                  scrollProgress > 0.95
                    ? "0 0 6px 2px rgba(99,102,241,0.3)"
                    : "none",
                transition: "all 0.4s ease",
              }}
            />
            <p
              style={{
                fontSize: "9px",
                fontFamily: "monospace",
                color: scrollProgress > 0.95 ? "#6366f1" : "#2a2a2a",
                letterSpacing: "0.12em",
                transition: "color 0.4s ease",
              }}
            >
              END OF TIMELINE
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {atBottom && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              bottom: "28px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 40,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              pointerEvents: "none",
            }}
          ></motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
