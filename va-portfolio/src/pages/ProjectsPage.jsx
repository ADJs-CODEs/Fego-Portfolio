import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

/* Tool badge colors */
const TOOL_COLORS = {
  Notion: {
    bg: "rgba(255,255,255,0.08)",
    color: "#e4e4e7",
    border: "rgba(255,255,255,0.15)",
  },
  Asana: {
    bg: "rgba(240,106,106,0.15)",
    color: "#F06A6A",
    border: "rgba(240,106,106,0.3)",
  },
  Slack: {
    bg: "rgba(224,30,90,0.15)",
    color: "#E01E5A",
    border: "rgba(224,30,90,0.3)",
  },
  "Google Workspace": {
    bg: "rgba(66,133,244,0.15)",
    color: "#4285F4",
    border: "rgba(66,133,244,0.3)",
  },
  Gmail: {
    bg: "rgba(234,67,53,0.15)",
    color: "#EA4335",
    border: "rgba(234,67,53,0.3)",
  },
  Calendly: {
    bg: "rgba(0,107,255,0.15)",
    color: "#006BFF",
    border: "rgba(0,107,255,0.3)",
  },
  "Google Calendar": {
    bg: "rgba(66,133,244,0.15)",
    color: "#4285F4",
    border: "rgba(66,133,244,0.3)",
  },
  Canva: {
    bg: "rgba(125,42,232,0.15)",
    color: "#7D2AE8",
    border: "rgba(125,42,232,0.3)",
  },
  Hootsuite: {
    bg: "rgba(0,175,91,0.15)",
    color: "#00AF5B",
    border: "rgba(0,175,91,0.3)",
  },
  Instagram: {
    bg: "rgba(228,64,95,0.15)",
    color: "#E4405F",
    border: "rgba(228,64,95,0.3)",
  },
  Zapier: {
    bg: "rgba(255,74,0,0.15)",
    color: "#FF4A00",
    border: "rgba(255,74,0,0.3)",
  },
  "Notion ": {
    bg: "rgba(255,255,255,0.08)",
    color: "#e4e4e7",
    border: "rgba(255,255,255,0.15)",
  },
  Loom: {
    bg: "rgba(99,91,255,0.15)",
    color: "#635BFF",
    border: "rgba(99,91,255,0.3)",
  },
  "Google Docs": {
    bg: "rgba(66,133,244,0.15)",
    color: "#4285F4",
    border: "rgba(66,133,244,0.3)",
  },
  HubSpot: {
    bg: "rgba(255,122,89,0.15)",
    color: "#FF7A59",
    border: "rgba(255,122,89,0.3)",
  },
  "Google Sheets": {
    bg: "rgba(52,168,83,0.15)",
    color: "#34A853",
    border: "rgba(52,168,83,0.3)",
  },
  Zoom: {
    bg: "rgba(45,140,255,0.15)",
    color: "#2D8CFF",
    border: "rgba(45,140,255,0.3)",
  },
  Wise: {
    bg: "rgba(0,185,141,0.15)",
    color: "#00B98D",
    border: "rgba(0,185,141,0.3)",
  },
  Trello: {
    bg: "rgba(0,82,204,0.15)",
    color: "#0052CC",
    border: "rgba(0,82,204,0.3)",
  },
};

const toolStyle = (name) =>
  TOOL_COLORS[name] || {
    bg: "rgba(255,255,255,0.05)",
    color: "#a1a1aa",
    border: "rgba(255,255,255,0.1)",
  };

const projects = [
  {
    id: 1,
    number: "01",
    title: "Executive Operations Overhaul",
    tag: "Operations",
    tagColor: "#6366f1",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&q=75&fit=crop",
    summary:
      "Rebuilt workflow systems for a 12-person remote team, reducing task turnaround by 40%.",
    description:
      "Led a full audit and redesign of the team's project management infrastructure. Migrated scattered communications from email threads into structured Notion workspaces and Asana task pipelines. Defined SOPs for weekly reporting, client onboarding, and async communication. The result was a 40% reduction in task turnaround time and a measurable decrease in missed deadlines.",
    tools: ["Notion", "Asana", "Slack", "Google Workspace"],
    outcome: "40% faster turnaround · 0 missed deadlines in Q4",
    link: "https://notion.so",
    accent: "#6366f1",
    bg: "rgba(99,102,241,0.08)",
  },
  {
    id: 2,
    number: "02",
    title: "C-Suite Calendar & Inbox",
    tag: "Admin",
    tagColor: "#06b6d4",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=700&q=75&fit=crop",
    summary:
      "Managed an executive's calendar and inbox across 3 time zones with zero scheduling conflicts.",
    description:
      "Took full ownership of a senior executive's Google Calendar and Gmail — triaging 200+ emails daily, scheduling cross-timezone meetings, setting up automated filters and labels, and drafting responses. Implemented a daily briefing system giving the executive a 5-minute morning digest of priorities. Inbox response time dropped from 48 hours to under 4.",
    tools: ["Gmail", "Calendly", "Google Calendar", "Notion"],
    outcome: "Zero scheduling conflicts · 4hr avg. response time",
    link: "https://calendar.google.com",
    accent: "#06b6d4",
    bg: "rgba(6,182,212,0.08)",
  },
  {
    id: 3,
    number: "03",
    title: "Social Media Content Pipeline",
    tag: "Content",
    tagColor: "#f59e0b",
    image:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=700&q=75&fit=crop",
    summary:
      "Built a 30-day content calendar pipeline that grew a brand from 1.2K to 8.4K followers.",
    description:
      "Designed a repeatable monthly content system: ideation, drafting, scheduling, and performance review. Used Canva for visual templates, Notion for content calendars, and Hootsuite for batch scheduling. Tracked engagement metrics weekly and adjusted strategy based on insights. The account grew from 1.2K to 8.4K followers over 4 months.",
    tools: ["Canva", "Notion", "Hootsuite", "Instagram"],
    outcome: "1.2K → 8.4K followers · 4-month campaign",
    link: "https://hootsuite.com",
    accent: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
  },
  {
    id: 4,
    number: "04",
    title: "Remote Hire Onboarding System",
    tag: "Process Design",
    tagColor: "#10b981",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=75&fit=crop",
    summary:
      "Designed a 30-60-90 day onboarding flow that cut new hire ramp-up from 8 to 4 weeks.",
    description:
      "Created a comprehensive onboarding hub in Notion covering company culture docs, tool access guides, role-specific checklists, and milestone check-ins. Automated welcome emails and meeting invites via Zapier. Coordinated first-week schedules across departments and gathered feedback from new hires to iterate on the process.",
    tools: ["Notion", "Zapier", "Google Workspace", "Calendly"],
    outcome: "8 weeks → 4 weeks ramp-up time",
    link: "https://notion.so",
    accent: "#10b981",
    bg: "rgba(16,185,129,0.08)",
  },
  {
    id: 5,
    number: "05",
    title: "SOP Library Build-Out",
    tag: "Documentation",
    tagColor: "#a855f7",
    image:
      "https://images.unsplash.com/photo-1568954270769-14e6f8e47ab7?w=700&q=75&fit=crop",
    summary:
      "Documented 25+ standard operating procedures across departments, eliminating knowledge silos.",
    description:
      "Worked across four departments to identify undocumented processes, interviewed team leads, and produced a structured SOP library in Notion. Each document followed a consistent template covering purpose, steps, owners, and review cycles. Reduced onboarding time for new hires and dependency on tribal knowledge significantly.",
    tools: ["Notion", "Loom", "Google Docs", "Slack"],
    outcome: "25 SOPs documented · Knowledge gaps eliminated",
    link: "https://notion.so",
    accent: "#a855f7",
    bg: "rgba(168,85,247,0.08)",
  },
  {
    id: 6,
    number: "06",
    title: "CRM Data Clean-Up & Automation",
    tag: "Systems",
    tagColor: "#f43f5e",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=75&fit=crop",
    summary:
      "Cleaned 3,000+ contact records and set up automated follow-up sequences in HubSpot.",
    description:
      "Audited an existing CRM with over 3,000 contacts, removed duplicates, standardized field values, and re-segmented the list based on engagement history. Built automated email sequences for lead nurturing and set up deal-stage triggers to notify the sales team in real time. Pipeline visibility improved significantly within the first month.",
    tools: ["HubSpot", "Zapier", "Google Sheets", "Slack"],
    outcome: "3,000 records cleaned · 3 automated pipelines live",
    link: "https://hubspot.com",
    accent: "#f43f5e",
    bg: "rgba(244,63,94,0.08)",
  },
  {
    id: 7,
    number: "07",
    title: "Virtual Event Coordination",
    tag: "Events",
    tagColor: "#0ea5e9",
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=700&q=75&fit=crop",
    summary:
      "Coordinated a 300-attendee virtual summit across 6 time zones with zero technical issues.",
    description:
      "Handled end-to-end logistics for a multi-day virtual summit: speaker scheduling, green room coordination, Zoom setup, attendee communications, and live troubleshooting. Built a master event timeline and briefed all stakeholders 48 hours before the event. Post-event satisfaction score was 4.8/5.",
    tools: ["Zoom", "Calendly", "Notion", "Gmail", "Canva"],
    outcome: "300 attendees · 4.8/5 satisfaction score",
    link: "https://zoom.us",
    accent: "#0ea5e9",
    bg: "rgba(14,165,233,0.08)",
  },
  {
    id: 8,
    number: "08",
    title: "Vendor & Contractor Management",
    tag: "Operations",
    tagColor: "#84cc16",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&q=75&fit=crop",
    summary:
      "Managed 12 freelance contractors across projects, tracking deliverables and payments centrally.",
    description:
      "Set up a central contractor hub in Notion tracking active projects, deadlines, payment schedules, and contract status. Standardized the brief-to-delivery workflow and introduced weekly async check-ins via Loom. Reduced missed deadlines among contractors by 60% in the first quarter.",
    tools: ["Notion", "Wise", "Loom", "Google Sheets"],
    outcome: "12 contractors managed · 60% fewer missed deadlines",
    link: "https://notion.so",
    accent: "#84cc16",
    bg: "rgba(132,204,22,0.08)",
  },
];

/* ── Modal ── rendered outside section so overflow:hidden never clips it */
function Modal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(3,3,3,0.92)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 18 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="modal-inner"
        style={{
          width: "min(660px, 90vw)",
          maxHeight: "84vh",
          overflowY: "auto",
          background: "#0c0c0c",
          border: `1px solid ${project.accent}30`,
          borderRadius: "20px",
          position: "relative",
          boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 48px 96px rgba(0,0,0,0.85), 0 0 80px ${project.accent}16`,
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        }}
      >
        {/* Hero image */}
        <div
          style={{
            position: "relative",
            height: "220px",
            overflow: "hidden",
            borderRadius: "20px 20px 0 0",
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.5) saturate(0.85)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to bottom, rgba(12,12,12,0.1) 0%, rgba(12,12,12,0.98) 100%)`,
            }}
          />
          {/* accent top bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: project.accent,
              opacity: 0.75,
            }}
          />

          {/* tag + close */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "22px",
              right: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "9px",
                fontFamily: "monospace",
                letterSpacing: "0.14em",
                color: project.accent,
                background: `${project.accent}28`,
                padding: "3px 9px",
                borderRadius: "4px",
                backdropFilter: "blur(8px)",
              }}
            >
              {project.tag}
            </span>
            <button
              onClick={onClose}
              style={{
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#a1a1aa",
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                lineHeight: 1,
                backdropFilter: "blur(8px)",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.14)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(0,0,0,0.55)")
              }
            >
              ×
            </button>
          </div>

          {/* Title overlaid at bottom of hero */}
          <div
            style={{
              position: "absolute",
              bottom: "18px",
              left: "22px",
              right: "22px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                }}
              >
                {project.title}
              </h2>
              <span
                style={{
                  fontSize: "11px",
                  fontFamily: "monospace",
                  color: "#333",
                  flexShrink: 0,
                  marginLeft: "12px",
                }}
              >
                {project.number}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "22px 28px 28px" }}>
          <p
            style={{
              fontSize: "13.5px",
              lineHeight: 1.8,
              color: "#a1a1aa",
              marginBottom: "22px",
            }}
          >
            {project.description}
          </p>

          {/* Tools — colored badges */}
          <div style={{ marginBottom: "18px" }}>
            <p
              style={{
                fontSize: "9px",
                fontFamily: "monospace",
                letterSpacing: "0.12em",
                color: "#3f3f46",
                marginBottom: "9px",
              }}
            >
              TOOLS USED
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.tools.map((t, i) => {
                const s = toolStyle(t);
                return (
                  <span
                    key={i}
                    style={{
                      fontSize: "11px",
                      color: s.color,
                      fontWeight: 600,
                      background: s.bg,
                      border: `1px solid ${s.border}`,
                      borderRadius: "6px",
                      padding: "4px 11px",
                      fontFamily: "monospace",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Outcome */}
          <div
            style={{
              background: `${project.accent}10`,
              border: `1px solid ${project.accent}25`,
              borderRadius: "10px",
              padding: "12px 16px",
              marginBottom: "22px",
            }}
          >
            <p
              style={{
                fontSize: "9px",
                fontFamily: "monospace",
                letterSpacing: "0.12em",
                color: project.accent,
                marginBottom: "4px",
              }}
            >
              OUTCOME
            </p>
            <p style={{ fontSize: "13px", color: "#e4e4e7", fontWeight: 600 }}>
              {project.outcome}
            </p>
          </div>

          {/* CTA — real project link */}
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: project.accent,
              color: "#fff",
              fontSize: "12px",
              fontWeight: 700,
              fontFamily: "monospace",
              letterSpacing: "0.1em",
              textDecoration: "none",
              padding: "11px 22px",
              borderRadius: "10px",
              transition: "opacity 0.15s ease, transform 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.82";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            VIEW PROJECT
            {/* External link arrow */}
            <svg
              viewBox="0 0 16 16"
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M4 12L12 4M12 4H6M12 4v6" />
            </svg>
          </a>

          <style>{`
            .modal-inner::-webkit-scrollbar { width: 4px; }
            .modal-inner::-webkit-scrollbar-track { background: transparent; }
            .modal-inner::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
          `}</style>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Card — image expands on hover, text collapses smoothly ── */
function ProjectCard({ p, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        background: p.bg,
        border: `1px solid ${hovered ? p.accent + "45" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "14px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        position: "relative",
        transition:
          "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.22s ease",
        transform: hovered
          ? "translateY(-3px) scale(1.015)"
          : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 16px 40px rgba(0,0,0,0.55), 0 0 0 1px ${p.accent}30`
          : "none",
      }}
    >
      {/* Image — expands on hover via animated height */}
      <motion.div
        animate={{ height: hovered ? 130 : 80 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: "hidden", position: "relative", flexShrink: 0 }}
      >
        <motion.img
          src={p.image}
          alt={p.title}
          animate={{
            scale: hovered ? 1.08 : 1,
            filter: hovered
              ? "brightness(0.75) saturate(1)"
              : "brightness(0.6) saturate(0.85)",
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: "100%",
            height: "130px",
            objectFit: "cover",
            display: "block",
          }}
        />
        {/* Gradient to card bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, transparent 40%, ${p.bg.replace("0.08)", "0.72)")} 100%)`,
          }}
        />
        {/* Accent top line */}
        <motion.div
          animate={{ opacity: hovered ? 0.9 : 0.5, scaleX: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: p.accent,
            transformOrigin: "left",
          }}
        />
        {/* Tag + number */}
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            left: "11px",
            right: "11px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "7.5px",
              fontFamily: "monospace",
              letterSpacing: "0.1em",
              color: p.accent,
              background: `${p.accent}22`,
              padding: "2px 7px",
              borderRadius: "3px",
            }}
          >
            {p.tag}
          </span>
          <span
            style={{
              fontSize: "9px",
              fontFamily: "monospace",
              color: "#2e2e2e",
            }}
          >
            {p.number}
          </span>
        </div>
      </motion.div>

      {/* Text body — shrinks as image grows */}
      <motion.div
        animate={{ opacity: hovered ? 0.7 : 1 }}
        transition={{ duration: 0.25 }}
        style={{
          padding: "9px 13px 11px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-between",
          minHeight: 0,
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <h3
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#e4e4e7",
              letterSpacing: "-0.01em",
              lineHeight: 1.35,
              marginBottom: "4px",
            }}
          >
            {p.title}
          </h3>
          {/* Summary fades/collapses on hover to give room to image */}
          <motion.p
            animate={{
              opacity: hovered ? 0 : 1,
              height: hovered ? 0 : "auto",
              marginBottom: hovered ? 0 : "4px",
            }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "10px",
              color: "#52525b",
              lineHeight: 1.5,
              overflow: "hidden",
            }}
          >
            {p.summary}
          </motion.p>
        </div>

        {/* CTA — glows on hover */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            color: hovered ? p.accent : "#3a3a3a",
            fontSize: "8.5px",
            fontFamily: "monospace",
            letterSpacing: "0.1em",
            transition: "color 0.2s ease",
            marginTop: "6px",
          }}
        >
          <span>VIEW PROJECTS</span>
          <svg
            viewBox="0 0 16 16"
            width="8"
            height="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [active, setActive] = useState(null);
  const project = projects.find((p) => p.id === active);

  return (
    <>
      <section
        className="h-screen w-full snap-start relative overflow-hidden bg-[#050505] text-white"
        style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
      >
        <FontLoader />

        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.07) 0%, transparent 70%)",
          }}
        />

        {/* TOP BAR */}
        <div
          className="absolute top-0 left-0 right-0 z-30 flex justify-between px-10 pt-6"
          style={{
            fontFamily: "monospace",
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: "#333",
          }}
        >
          <span>PROJECTS</span>
          <span></span>
        </div>

        {/* BOTTOM BAR */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 flex justify-between px-10 pb-5"
          style={{
            fontFamily: "monospace",
            fontSize: "9px",
            letterSpacing: "0.15em",
            color: "#222",
          }}
        >
          <span>CASE STUDIES</span>
          <span>SELECTED WORK</span>
        </div>

        <div
          className="absolute inset-0 flex flex-col px-10 pt-16 pb-12"
          style={{ gap: "12px" }}
        >
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#fff",
                lineHeight: 1,
              }}
            >
              PREVIOUS PROJECTS
            </h2>
            <p style={{ fontSize: "12px", color: "#3f3f46", marginTop: "4px" }}>
              Hover to preview · Click to explore the full breakdown.
            </p>
          </motion.div>

          {/* 4×2 grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "repeat(2, 1fr)",
              gap: "10px",
              flex: 1,
              minHeight: 0,
            }}
          >
            {projects.map((p, i) => (
              <ProjectCard
                key={p.id}
                p={p}
                index={i}
                onClick={() => setActive(p.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal outside section — never clipped */}
      <AnimatePresence>
        {active && project && (
          <Modal
            key={active}
            project={project}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
