import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

/*
  ─────────────────────────────────────────────────────────────
  SETUP (one-time, free):
  1. Go to https://www.emailjs.com and create a free account.
  2. Add an Email Service (Gmail) → connect umutemefego@gmail.com
     Copy the Service ID  →  replace VITE_EMAILJS_SERVICE_ID below
  3. Create an Email Template with these variables:
       {{from_name}}  {{from_email}}  {{subject}}  {{message}}
     Copy the Template ID → replace VITE_EMAILJS_TEMPLATE_ID below
  4. Go to Account → API Keys, copy your Public Key
     → replace VITE_EMAILJS_PUBLIC_KEY below

  Recommended: store these in your .env file as:
    VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
    VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
    VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
  Then reference them via import.meta.env.VITE_EMAILJS_*
  ─────────────────────────────────────────────────────────────
*/

const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

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

const contactDetails = [
  {
    label: "EMAIL",
    value: "umutemefego@gmail.com",
    href: "mailto:umutemefego@gmail.com",
    icon: (
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
  },
  {
    label: "WHATSAPP",
    value: "+234 8162999162",
    href: "https://wa.me/2349162999162",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.3 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [focused, setFocused] = useState(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setError("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject || "Portfolio Contact",
          message: form.message,
          to_email: "umutemefego@gmail.com",
        },
        EMAILJS_PUBLIC_KEY,
      );
      setSent(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Something went wrong. Please try again or email directly.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    background:
      focused === field ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.05)",
    border: `1px solid ${focused === field ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.1)"}`,
    borderRadius: "10px",
    padding: "12px 14px",
    fontSize: "13px",
    color: "#e4e4e7",
    outline: "none",
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    transition: "border-color 0.2s ease, background 0.2s ease",
    boxSizing: "border-box",
  });

  const labelStyle = {
    fontSize: "9px",
    fontFamily: "monospace",
    letterSpacing: "0.15em",
    color: "#71717a",
    display: "block",
    marginBottom: "6px",
    textTransform: "uppercase",
  };

  return (
    <section
      className="h-screen w-full snap-start relative overflow-hidden bg-[#050505] text-white"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      <FontLoader />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 60% 70% at 0% 100%, rgba(99,102,241,0.1) 0%, transparent 60%)",
            "radial-gradient(ellipse 40% 40% at 100% 0%, rgba(99,102,241,0.05) 0%, transparent 60%)",
          ].join(", "),
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
        <span>/04. CONTACT</span>
        <span>[ READY FOR WORK ]</span>
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
        <span>OPEN TO OPPORTUNITIES</span>
        <span>© 2026</span>
      </div>

      <div className="absolute inset-0 grid grid-cols-12 pt-16 pb-12 px-10">
        {/* ══ LEFT ══ */}
        <div
          className="col-span-5 flex flex-col justify-center pr-10"
          style={{ gap: "28px" }}
        >
          <motion.div {...fadeUp(0)}>
            <p
              style={{
                fontSize: "9px",
                fontFamily: "monospace",
                letterSpacing: "0.2em",
                color: "#6366f1",
                marginBottom: "14px",
              }}
            >
              GET IN TOUCH
            </p>
            <h2
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "#fff",
                marginBottom: "18px",
              }}
            >
              Let's work
              <br />
              <span style={{ color: "#6366f1" }}>together.</span>
            </h2>
            <p
              style={{
                fontSize: "13.5px",
                lineHeight: 1.8,
                color: "#71717a",
                maxWidth: "38ch",
              }}
            >
              Whether you need someone to take operations off your plate, manage
              your calendar, or build your systems from the ground up — I'm
              ready.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.1)}
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            {contactDetails.map((c, i) => (
              <a
                key={i}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 14px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "12px",
                  textDecoration: "none",
                  transition: "border-color 0.2s ease, background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.35)";
                  e.currentTarget.style.background = "rgba(99,102,241,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "9px",
                    background: "rgba(99,102,241,0.15)",
                    color: "#6366f1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {c.icon}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "9px",
                      fontFamily: "monospace",
                      letterSpacing: "0.12em",
                      color: "#52525b",
                      marginBottom: "3px",
                    }}
                  >
                    {c.label}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#d4d4d8",
                      fontWeight: 500,
                    }}
                  >
                    {c.value}
                  </p>
                </div>
                <div style={{ marginLeft: "auto", color: "#333" }}>
                  <svg
                    viewBox="0 0 16 16"
                    width="12"
                    height="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </div>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="col-span-1 flex items-center justify-center">
          <div
            style={{
              width: "1px",
              height: "60%",
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)",
            }}
          />
        </div>

        {/* ══ RIGHT: Form ══ */}
        <div className="col-span-6 flex flex-col justify-center pl-6">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ textAlign: "center", padding: "40px 0" }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "rgba(99,102,241,0.15)",
                    border: "1px solid rgba(99,102,241,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2.5"
                    width="26"
                    height="26"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "8px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Message sent!
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#71717a",
                    lineHeight: 1.6,
                  }}
                >
                  Thanks for reaching out. Sarah will get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  style={{
                    marginTop: "24px",
                    background: "transparent",
                    border: "1px solid rgba(99,102,241,0.3)",
                    color: "#6366f1",
                    padding: "9px 18px",
                    borderRadius: "9px",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontFamily: "monospace",
                    letterSpacing: "0.1em",
                  }}
                >
                  SEND ANOTHER
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                {...fadeUp(0.15)}
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                  }}
                >
                  <div>
                    <label style={labelStyle}>Your Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Afolabi Divine"
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("name")}
                      required
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="divine@example.com"
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("email")}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Subject</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused(null)}
                    style={inputStyle("subject")}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or just say hello..."
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputStyle("message"),
                      resize: "none",
                      height: "118px",
                      lineHeight: 1.65,
                    }}
                    required
                  />
                </div>

                {/* Error message */}
                {error && (
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#f87171",
                      fontFamily: "monospace",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {error}
                  </p>
                )}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    marginTop: "2px",
                  }}
                >
                  <button
                    type="submit"
                    disabled={sending}
                    style={{
                      background: sending ? "rgba(99,102,241,0.5)" : "#6366f1",
                      color: "#fff",
                      border: "none",
                      borderRadius: "10px",
                      padding: "12px 24px",
                      fontSize: "12px",
                      fontWeight: 700,
                      fontFamily: "monospace",
                      letterSpacing: "0.1em",
                      cursor: sending ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "opacity 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!sending) e.currentTarget.style.opacity = "0.85";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                  >
                    {sending ? (
                      <>
                        <svg
                          viewBox="0 0 24 24"
                          width="14"
                          height="14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          style={{ animation: "spin 1s linear infinite" }}
                        >
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        </svg>
                        SENDING...
                      </>
                    ) : (
                      <>
                        SEND MESSAGE
                        <svg
                          viewBox="0 0 16 16"
                          width="12"
                          height="12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </>
                    )}
                  </button>
                  <p
                    style={{
                      fontSize: "10px",
                      fontFamily: "monospace",
                      color: "#3f3f46",
                      letterSpacing: "0.08em",
                    }}
                  >
                    RESPONDS WITHIN 24H
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
            input::placeholder, textarea::placeholder { color: #52525b; }
            input, textarea { color-scheme: dark; }
          `}</style>
        </div>
      </div>
    </section>
  );
}
