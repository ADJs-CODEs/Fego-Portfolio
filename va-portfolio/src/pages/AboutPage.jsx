import React from "react";
import { motion } from "framer-motion";

/* ── useIsMobile hook ── */
function useIsMobile() {
  const [mobile, setMobile] = React.useState(() => window.innerWidth < 768);
  React.useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

const Icons = {
  Notion: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.747 0-.934-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933z" />
    </svg>
  ),
  Asana: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M11.994 0C5.367 0 0 5.367 0 11.994c0 6.627 5.367 11.994 11.994 11.994 6.627 0 11.994-5.367 11.994-11.994C23.988 5.367 18.621 0 11.994 0zm-4.62 13.788a2.619 2.619 0 1 1 0 5.238 2.619 2.619 0 0 1 0-5.238zm4.62-8.55a2.619 2.619 0 1 1 0 5.238 2.619 2.619 0 0 1 0-5.238zm4.62 8.55a2.619 2.619 0 1 1 0 5.238 2.619 2.619 0 0 1 0-5.238z" />
    </svg>
  ),
  Slack: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
    </svg>
  ),
  Calendly: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5C3.346 3 2 4.346 2 6v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3V6c0-1.654-1.346-3-3-3zm1 17c0 .551-.449 1-1 1H5c-.551 0-1-.449-1-1v-9h16v9zm0-11H4V6c0-.551.449-1 1-1h1v2h2V5h8v2h2V5h1c.551 0 1 .449 1 1v3z" />
    </svg>
  ),
  GSuite: () => (
    <svg viewBox="0 0 48 48" width="20" height="20">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  ),
  Canva: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.127 15.455c-.463.816-1.244 1.35-2.127 1.35-1.726 0-2.93-1.817-2.93-4.309 0-2.491 1.2-4.252 2.93-4.252.793 0 1.52.449 2.012 1.15.07.1.196.127.296.063.1-.063.12-.19.056-.29-.576-.854-1.434-1.364-2.364-1.364C11.1 7.803 9.52 9.827 9.52 12.5c0 2.673 1.583 4.755 3.48 4.755 1.015 0 1.944-.6 2.56-1.597.063-.098.035-.226-.063-.29a.208.208 0 0 0-.37.087z" />
    </svg>
  ),
  Trello: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M21 0H3C1.343 0 0 1.343 0 3v18c0 1.656 1.343 3 3 3h18c1.656 0 3-1.344 3-3V3c0-1.657-1.344-3-3-3zM10.44 18.18c0 .795-.645 1.44-1.44 1.44H4.56c-.795 0-1.44-.645-1.44-1.44V4.56c0-.795.645-1.44 1.44-1.44H9c.795 0 1.44.645 1.44 1.44v13.62zm10.44-6c0 .795-.645 1.44-1.44 1.44H15c-.795 0-1.44-.645-1.44-1.44V4.56c0-.795.645-1.44 1.44-1.44h4.44c.795 0 1.44.645 1.44 1.44v7.62z" />
    </svg>
  ),
  Zapier: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M14.934 10.494l-.007-.007A6.51 6.51 0 0 0 15.5 8a6.5 6.5 0 0 0-6.5-6.5A6.5 6.5 0 0 0 2.5 8a6.51 6.51 0 0 0 .573 2.487l-.007.007L.5 12l2.566 1.506.007-.007A6.51 6.51 0 0 0 5.5 14a6.5 6.5 0 0 0 .75-.046v2.82L9 18.5l2.75-1.726v-2.82A6.5 6.5 0 0 0 12.5 14a6.51 6.51 0 0 0 2.427-.501l.007.007L17.5 12l-2.566-1.506zM9 13.5A5.5 5.5 0 1 1 9 2.5a5.5 5.5 0 0 1 0 11z" />
    </svg>
  ),
};

const SocialSVG = {
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Email: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      width="18"
      height="18"
    >
      <rect x="2" y="4" width="20" height="16" rx="2.5" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  ),
  WhatsApp: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
  TikTok: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  ),
};

const skills = [
  { label: "Notion", Icon: Icons.Notion, bg: "#2a2a2a", color: "#ffffff" },
  { label: "Asana", Icon: Icons.Asana, bg: "#F06A6A22", color: "#F06A6A" },
  { label: "Slack", Icon: Icons.Slack, bg: "#E01E5A22", color: "#E01E5A" },
  {
    label: "Calendly",
    Icon: Icons.Calendly,
    bg: "#006BFF22",
    color: "#006BFF",
  },
  { label: "G Suite", Icon: Icons.GSuite, bg: "#ffffff10", color: null },
  { label: "Canva", Icon: Icons.Canva, bg: "#7D2AE822", color: "#7D2AE8" },
  { label: "Trello", Icon: Icons.Trello, bg: "#0052CC22", color: "#0052CC" },
  { label: "Zapier", Icon: Icons.Zapier, bg: "#FF4A0022", color: "#FF4A00" },
];

const socials = [
  { title: "LinkedIn", Icon: SocialSVG.LinkedIn, ledColor: "#0A66C2" },
  { title: "Email", Icon: SocialSVG.Email, ledColor: "#6366f1" },
  { title: "WhatsApp", Icon: SocialSVG.WhatsApp, ledColor: "#25D366" },
  { title: "Instagram", Icon: SocialSVG.Instagram, ledColor: "#E4405F" },
  { title: "TikTok", Icon: SocialSVG.TikTok, ledColor: "#69C9D0" },
];

const experience = [
  {
    period: "2025 – Present",
    role: "Lead Assistant",
    company: "Operations Hub",
  },
  { period: "2024 – 2025", role: "Admin Lead", company: "Apex Agency" },
  {
    period: "2023 – 2024",
    role: "Executive Support",
    company: "Freelance Studio",
  },
];

function goToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

function GlintSocialButton({ title, Icon, ledColor, delay, onClick }) {
  const [hovered, setHovered] = React.useState(false);
  const [angle, setAngle] = React.useState(0);
  const rafRef = React.useRef(null);
  const startRef = React.useRef(null);

  React.useEffect(() => {
    const CYCLE = 4200,
      PAUSE = 1800,
      TOTAL = CYCLE + PAUSE;
    function tick(ts) {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current + delay * 1000) % TOTAL;
      if (elapsed < CYCLE) setAngle((elapsed / CYCLE) * 360);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [delay]);

  const conicGrad = `conic-gradient(from ${angle}deg at 50% 50%,rgba(255,255,255,0)0deg,rgba(255,255,255,0.7)8deg,rgba(255,255,255,0.95)14deg,rgba(255,255,255,0.7)20deg,rgba(255,255,255,0)38deg,rgba(255,255,255,0)360deg)`;

  return (
    <button
      title={title}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "48px",
        height: "48px",
        borderRadius: "12px",
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
        flexShrink: 0,
        outline: "none",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "transform 0.22s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "12px",
          background: conicGrad,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "1px",
          borderRadius: "11px",
          border: `1px solid ${hovered ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)"}`,
          background: hovered ? "rgba(255,255,255,0.04)" : "rgba(8,8,12,0.97)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: hovered ? "rgba(255,255,255,0.75)" : "#4a4a55",
          transition:
            "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
        }}
      >
        <Icon />
      </div>
    </button>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: false, amount: 0.2 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const H = ({ children, mobile }) => (
  <h3
    style={{
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      fontSize: mobile ? "18px" : "22px",
      fontWeight: 800,
      color: "#ffffff",
      letterSpacing: "-0.01em",
      lineHeight: 1,
      marginBottom: "10px",
    }}
  >
    {children}
  </h3>
);

export default function AboutPage() {
  const mobile = useIsMobile();

  return (
    <section
      className="snap-start relative overflow-hidden bg-[#050505] text-white"
      style={{
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        /* On mobile: auto height so content isn't clipped */
        minHeight: "100dvh",
        height: mobile ? "auto" : "100vh",
        width: "100%",
      }}
    >
      <style>{`
        .sk { transition: transform 0.18s ease, box-shadow 0.18s ease; cursor: default; }
        .sk:hover { transform: translateY(-3px) scale(1.08); box-shadow: 0 0 0 1.5px rgba(99,102,241,0.45), 0 8px 24px rgba(0,0,0,0.45); }
      `}</style>

      {/* Base gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(99,102,241,0.13) 0%, transparent 65%)",
            "radial-gradient(ellipse 50% 40% at 80% 80%, rgba(99,102,241,0.07) 0%, transparent 60%)",
          ].join(", "),
        }}
      />

      {/* Corner labels */}
      <div
        className="absolute top-0 left-0 right-0 z-30 flex justify-between px-5 md:px-10 pt-5 md:pt-6"
        style={{
          fontFamily: "monospace",
          fontSize: "9px",
          letterSpacing: "0.2em",
          color: "#333",
        }}
      >
        <span></span>
        <span>[ SYSTEMS SPECIALIST ]</span>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 z-30 flex justify-between px-5 md:px-10 pb-4 md:pb-5"
        style={{
          fontFamily: "monospace",
          fontSize: "9px",
          letterSpacing: "0.15em",
          color: "#222",
        }}
      >
        <span>TERMS &amp; SUPPORT</span>
        <span>PRIVACY POLICY</span>
      </div>

      {mobile ? (
        /* ══ MOBILE LAYOUT — stacked ══ */
        <div style={{ paddingTop: "48px", paddingBottom: "48px" }}>
          {/* Photo — full width, fixed height, name at bottom */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "320px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                /* softer purple — not full-saturation indigo so skin tones show */
                background:
                  "radial-gradient(ellipse 120% 100% at 40% 60%, rgba(60,30,180,0.55) 0%, rgba(20,10,80,0.4) 50%, transparent 80%)",
              }}
            />
            <motion.img
              src="/NFego.jpg"
              alt="Umuteme Fego"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                /* luminosity blend removed on mobile — too dark */
                mixBlendMode: "normal",
                opacity: 0.9,
              }}
            />
            {/* Bottom gradient into page bg */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, transparent 55%, #050505 100%)",
              }}
            />
            {/* Name — sits at bottom of photo, left-aligned, offset from left edge so OrbNav (left:28px) doesn't cover it */}
            <div style={{ position: "absolute", bottom: "16px", left: "72px" }}>
              <p
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  color: "#94a3b8",
                  marginBottom: "4px",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                }}
              >
                Hello, I am
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.4rem, 7vw, 2rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "#fff",
                  textShadow: "0 2px 30px rgba(0,0,0,0.9)",
                  lineHeight: 1.05,
                }}
              >
                Umuteme Fego
              </h2>
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <motion.div {...fadeUp(0)}>
              <H mobile>About Me</H>
              <p
                style={{ fontSize: "13px", lineHeight: 1.75, color: "#a1a1aa" }}
              >
                Curious and systems-driven, I've always been drawn to how
                structure shapes the way teams operate. That curiosity led me to
                digital operations — where organisation meets strategic
                problem-solving.
              </p>
            </motion.div>

            <motion.div
              {...fadeUp(0.07)}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
                <H mobile>Education</H>
                <p
                  style={{
                    fontSize: "10px",
                    color: "#52525b",
                    fontFamily: "monospace",
                    marginBottom: "4px",
                  }}
                >
                  2021 – Present
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#e4e4e7",
                    fontWeight: 700,
                  }}
                >
                  University of Lagos
                </p>
                <p style={{ fontSize: "12px", color: "#52525b" }}>Nigeria</p>
              </div>
              <div>
                <H mobile>Experience</H>
                {experience.map((job, i) => (
                  <div key={i} style={{ marginBottom: "8px" }}>
                    <p
                      style={{
                        fontSize: "9px",
                        color: "#3f3f46",
                        fontFamily: "monospace",
                        marginBottom: "1px",
                      }}
                    >
                      {job.period}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#d4d4d8",
                        fontWeight: 600,
                        lineHeight: 1.3,
                      }}
                    >
                      {job.role}{" "}
                      <span style={{ color: "#52525b", fontWeight: 400 }}>
                        — {job.company}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.12)}>
              <H mobile>Skills</H>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {skills.map(({ label, Icon, bg, color }, i) => (
                  <div
                    key={i}
                    className="sk"
                    title={label}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "11px",
                      background: bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: color || "#e4e4e7",
                    }}
                  >
                    <Icon />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.16)}>
              <H mobile>Connect</H>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {socials.map(({ title, Icon, ledColor }, i) => (
                  <GlintSocialButton
                    key={i}
                    title={title}
                    Icon={Icon}
                    ledColor={ledColor}
                    delay={i * 0.55}
                    onClick={goToContact}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        /* ══ DESKTOP LAYOUT — side by side ══ */
        <div className="absolute inset-0 grid grid-cols-12">
          {/* Left — photo */}
          <div className="col-span-5 relative h-full overflow-hidden">
            <div
              className="absolute inset-0 z-0"
              style={{
                background:
                  "radial-gradient(ellipse 120% 100% at 40% 60%, rgba(40,20,180,0.9) 0%, rgba(20,10,100,0.8) 50%, rgba(5,5,20,0.85) 100%)",
              }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="absolute inset-0 z-10"
            >
              <img
                src="/NFego.jpg"
                alt="Umuteme Fego"
                className="w-full h-full object-cover object-top"
                style={{ mixBlendMode: "luminosity", opacity: 0.88 }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: [
                    "linear-gradient(to right,  transparent 65%, #050505 100%)",
                    "linear-gradient(to bottom, #050505 0%, transparent 10%)",
                    "linear-gradient(to top,    #050505 0%, transparent 18%)",
                  ].join(", "),
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute bottom-[10%] left-9 z-20 select-none"
            >
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 400,
                  letterSpacing: "0.18em",
                  color: "#94a3b8",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                }}
              >
                Hello, I am
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  color: "#ffffff",
                  textShadow: "0 2px 40px rgba(0,0,0,0.9)",
                }}
              >
                Umuteme Fego
              </h2>
            </motion.div>
          </div>

          {/* Right — content */}
          <div
            className="col-span-7 flex flex-col justify-center px-12 pt-14 pb-8 relative z-20"
            style={{ gap: "18px" }}
          >
            <motion.div {...fadeUp(0)}>
              <H>About Me</H>
              <p
                style={{
                  fontSize: "13.5px",
                  lineHeight: 1.78,
                  color: "#a1a1aa",
                  fontWeight: 400,
                  maxWidth: "52ch",
                }}
              >
                Curious and systems-driven, I've always been drawn to how
                structure shapes the way teams operate. That curiosity led me to
                digital operations — where organisation meets strategic
                problem-solving. I love configuring workspaces, managing
                high-volume communications, and building clean processes that
                scale.
              </p>
            </motion.div>

            <motion.div
              {...fadeUp(0.08)}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.4fr",
                gap: "24px",
              }}
            >
              <div>
                <H>Education</H>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#52525b",
                    fontFamily: "monospace",
                    marginBottom: "5px",
                  }}
                >
                  2021 – Present
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#e4e4e7",
                    fontWeight: 700,
                    lineHeight: 1.3,
                  }}
                >
                  University of Lagos
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#52525b",
                    marginTop: "2px",
                  }}
                >
                  Nigeria
                </p>
              </div>
              <div>
                <H>Work Experience</H>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {experience.map((job, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          color: "#6366f1",
                          fontSize: "16px",
                          lineHeight: 1.2,
                          flexShrink: 0,
                        }}
                      >
                        •
                      </span>
                      <div>
                        <p
                          style={{
                            fontSize: "10px",
                            color: "#3f3f46",
                            fontFamily: "monospace",
                            marginBottom: "1px",
                          }}
                        >
                          {job.period}
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            color: "#d4d4d8",
                            fontWeight: 600,
                            lineHeight: 1.3,
                          }}
                        >
                          {job.role}{" "}
                          <span style={{ color: "#52525b", fontWeight: 400 }}>
                            — {job.company}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.14)}>
              <H>Skills</H>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "9px" }}>
                {skills.map(({ label, Icon, bg, color }, i) => (
                  <div
                    key={i}
                    className="sk"
                    title={label}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "13px",
                      background: bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: color || "#e4e4e7",
                    }}
                  >
                    <Icon />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.2)}>
              <H>Connect</H>
              <div style={{ display: "flex", gap: "12px" }}>
                {socials.map(({ title, Icon, ledColor }, i) => (
                  <GlintSocialButton
                    key={i}
                    title={title}
                    Icon={Icon}
                    ledColor={ledColor}
                    delay={i * 0.55}
                    onClick={goToContact}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}
