"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback, RefObject } from "react";

/* ─── GLOBAL HOOKS ────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    const onScroll = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (bar) bar.style.width = `${Math.min(pct, 100)}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

function useCustomCursor() {
  useEffect(() => {
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;
    const onMove = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
}

function useScrollTrigger(ref: React.RefObject<HTMLElement | null>, callback: () => void) {
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) callback(); }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, callback]);
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useScrollTrigger(ref, () => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const timer = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, duration / 40);
  });

  return (
    <div ref={ref}>
      <div className="font-serif" style={{ fontSize: "1.8rem", fontWeight: 600, lineHeight: 1 }}>{count}{suffix}</div>
      <div className="font-sans" style={{ fontSize: "0.48rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.38, marginTop: "0.4rem" }}>{label}</div>
    </div>
  );
}

function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1500);
  };

  return (
    <section id="contact-form" style={{ padding: "9rem 4rem", background: "#121210", color: "#E8E8E2" }} className="section-pad">
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: "4rem" }}>
          <span className="font-sans" style={{ fontSize: "0.52rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--paper)", opacity: 0.32 }}>06 / Collaboration</span>
          <h2 className="font-serif" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", marginTop: "1rem" }}>Initialize a <em>Partnership</em></h2>
        </div>

        {status === "sent" ? (
          <div className="reveal" style={{ padding: "4rem", border: "1px solid var(--border-muted)", textAlign: "center" }}>
            <span className="font-script" style={{ fontSize: "2.5rem", display: "block", marginBottom: "1rem" }}>Received.</span>
            <p className="font-sans" style={{ fontSize: "0.8rem", color: "var(--paper)", opacity: 0.5, letterSpacing: "0.1em" }}>WE WILL REACH OUT WITHIN 24 HOURS.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reveal responsive-grid-2">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label className="font-sans" style={{ fontSize: "0.48rem", letterSpacing: "0.2em", opacity: 0.6 }}>YOUR NAME</label>
              <input required type="text" style={{ background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: "0.75rem 0", color: "#E8E8E2", outline: "none", fontSize: "1rem" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label className="font-sans" style={{ fontSize: "0.48rem", letterSpacing: "0.2em", opacity: 0.6 }}>EMAIL ADDRESS</label>
              <input required type="email" style={{ background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: "0.75rem 0", color: "#E8E8E2", outline: "none", fontSize: "1rem" }} />
            </div>
            <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1.5rem" }}>
              <label className="font-sans" style={{ fontSize: "0.48rem", letterSpacing: "0.2em", opacity: 0.6 }}>PROJECT VISION</label>
              <textarea required rows={4} style={{ background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", padding: "0.75rem 0", color: "#E8E8E2", outline: "none", fontSize: "1rem", resize: "none" }} />
            </div>
            <div style={{ gridColumn: "span 2", marginTop: "2rem" }}>
              <button type="submit" className="btn-primary" style={{ background: "#E8E8E2", color: "#111", width: "100%", justifyContent: "center" }}>
                {status === "sending" ? "TRANSMITTING..." : "SEND ENQUIRY"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  const services = [
    { title: "Cinematic Production", desc: "Crafting feature narratives and high-fidelity commercials with architectural precision.", icons: ["Film", "Direction"] },
    { title: "Creative Strategy", desc: "Institutional leadership and scaling South Asian creative ventures for global audiences.", icons: ["Vision", "Strategy"] },
    { title: "Post-Production", desc: "Mastering narrative rhythm and the discipline of decisive editing for 500+ productions.", icons: ["Edit", "Pacing"] },
    { title: "Luxury Experience", desc: "Engineering high-end events and immersive physical narratives for global brands.", icons: ["Events", "Design"] }
  ];

  return (
    <section id="services" style={{ padding: "9rem 4rem", background: "var(--paper)", borderBottom: "1px solid var(--border-muted)" }} className="section-pad">
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        <div className="reveal" style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "5rem" }}>
          <span className="font-sans" style={{ fontSize: "0.52rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.32, whiteSpace: "nowrap" }}>03 / Capabilities</span>
          <div style={{ height: "1px", flexGrow: 1, background: "var(--border-muted)" }} />
          <span className="font-script" style={{ fontSize: "1.75rem", opacity: 0.22 }}>The Expertise</span>
        </div>

        <div className="capabilities-grid reveal" style={{ display: "grid", gap: "4rem 6rem" }}>
          {services.map((s, i) => (
            <div key={s.title} className={`reveal reveal-delay-${(i % 2) + 1}`} style={{ paddingBottom: "3rem", borderBottom: "1px solid var(--border-muted)" }}>
              <span className="font-sans" style={{ fontSize: "0.45rem", letterSpacing: "0.2em", color: "var(--ink)", opacity: 0.3, display: "block", marginBottom: "1rem" }}>0{i+1} &mdash; CAPABILITY</span>
              <h3 className="font-serif" style={{ fontSize: "2.2rem", marginBottom: "1.25rem", letterSpacing: "-0.01em" }}>{s.title}</h3>
              <p className="font-sans" style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--ink)", opacity: 0.6, maxWidth: "420px" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    { name: "Arjun R.", role: "Producer, South Asian Films", text: "Kishanan brings a rare architectural precision to storytelling. He doesn't just cut frames; he engineers emotional arcs.", initial: "A" },
    { name: "Sarah J.", role: "CEO, Lux Brand Group", text: "The SunDawn Gala was a masterclass in production. Every detail felt deliberate, cinematic, and perfectly aligned with our brand's vision.", initial: "S" },
    { name: "Thiru V.", role: "Director, Heritage Arts", text: "His commitment to narrative depth is unparalleled. Kishanan is the bridge between traditional culture and modern global cinema.", initial: "T" }
  ];

  return (
    <section id="testimonials" style={{ padding: "9rem 4rem", background: "var(--paper)", borderTop: "1px solid rgba(45,36,36,0.06)" }} className="section-pad">
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        <div className="reveal" style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "5rem" }}>
          <span className="font-sans" style={{ fontSize: "0.52rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.32, whiteSpace: "nowrap" }}>05 / Testimonials</span>
          <div style={{ height: "1px", flexGrow: 1, background: "var(--border-muted)" }} />
          <span className="font-script" style={{ fontSize: "1.75rem", opacity: 0.22 }}>Social Proof</span>
        </div>

        <div className="testimonial-grid" style={{ display: "grid", gap: "4rem" }}>
          {testimonials.map((t, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1}`}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--ghost)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)", opacity: 0.4 }}>
                   {t.initial}
                </div>
                <div>
                  <h4 className="font-serif" style={{ fontSize: "1.1rem", lineHeight: 1 }}>{t.name}</h4>
                  <p className="font-sans" style={{ fontSize: "0.45rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.3, marginTop: "0.2rem" }}>{t.role}</p>
                </div>
              </div>
              <p className="font-sans" style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--ink)", opacity: 0.7, fontStyle: "italic" }}>&ldquo;{t.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CINEMATIC INTRO ─────────────────────────────────────────────────── */
function Intro({ onDone }: { onDone: () => void }) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    // After 2s hold, trigger hide animation
    const t1 = setTimeout(() => setHiding(true), 1800);
    // After animation completes, unmount
    const t2 = setTimeout(() => onDone(), 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div id="intro-overlay" className={hiding ? "hide" : ""}>
      <div className="intro-logo">Kishanan S.</div>
      <div className="intro-sub">Filmmaker &middot; CEO &middot; Visionary</div>
      <div className="intro-bar" />
    </div>
  );
}

/* ─── MARQUEE STRIP ───────────────────────────────────────────────────── */
function Marquee({ dark = false }: { dark?: boolean }) {
  const items = [
    "Newborn Cinema", "·", "SunDawn Eventz", "·", "Cinematographer", "·",
    "Creative CEO", "·", "Eezham Cinema", "·", "Editorial Vision", "·",
    "500+ Productions", "·", "South Asian Narratives", "·"
  ];
  const doubled = [...items, ...items];

  return (
    <div style={{ overflow: "hidden", padding: "1.25rem 0", borderTop: `1px solid var(--border-muted)`, borderBottom: `1px solid var(--border-muted)`, background: "transparent" }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="font-sans" style={{
            fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase",
            color: "var(--ink)",
            opacity: 0.35,
            padding: "0 2rem"
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

import { ThemeToggle } from "@/components/theme-toggle";

/* ─── NAVBAR ──────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Philosophy", "Work", "Evolution", "Contact"];

  return (
    <>
      <nav className={`site-nav ${scrolled ? "scrolled" : ""}`} id="main-nav">
        <div style={{ maxWidth: "1240px", margin: "0 auto", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <a href="#hero" className="font-serif site-nav-logo" style={{ fontSize: "1.2rem", fontWeight: 600, textDecoration: "none" }}>KS</a>
          </div>

          <div className="hidden md:flex items-center gap-10 nav-desktop-links">
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="font-sans site-nav-link" style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", transition: "opacity 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.65")}
              >{l}</a>
            ))}
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <ThemeToggle />
            <div style={{ width: "1px", height: "20px", background: "var(--ink)", opacity: 0.1, margin: "0 0.25rem" }} className="hidden md:block site-nav-divider" />
            <a href="mailto:kishanan@newborncinema.com" className="btn-ghost hidden md:inline-flex site-nav-btn" id="nav-collaborate-btn">Collaborate</a>
            <button className="md:hidden nav-mobile-hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", padding: "0.5rem" }} aria-label="Toggle menu">
              <div style={{ width: "22px", display: "flex", flexDirection: "column", gap: "5px" }}>
                {[0, 1, 2].map((n) => (
                  <span key={n} style={{ display: "block", height: "1px", background: "var(--ink)", transition: "all 0.3s", ...(n === 0 && menuOpen ? { transform: "rotate(45deg) translate(4px,4px)" } : n === 1 && menuOpen ? { opacity: 0 } : n === 2 && menuOpen ? { transform: "rotate(-45deg) translate(4px,-4px)" } : {}) }} />
                ))}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div style={{ position: "fixed", inset: 0, background: "var(--paper)", zIndex: 900, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2.5rem", transition: "opacity 0.3s ease, visibility 0.3s ease", opacity: menuOpen ? 1 : 0, visibility: menuOpen ? "visible" : "hidden" }}>
        {links.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className="font-serif" onClick={() => setMenuOpen(false)} style={{ fontSize: "2.8rem", color: "var(--ink)", textDecoration: "none", fontWeight: 500, opacity: 0.85 }}>{l}</a>
        ))}
        <a href="mailto:kishanan@newborncinema.com" className="btn-primary" style={{ marginTop: "1rem" }}>Collaborate</a>
      </div>
    </>
  );
}

/* ─── HERO ────────────────────────────────────────────────────────────── */
function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex" }}>
      {/* Mobile portrait strip */}
      <div className="hero-portrait-mobile">
        <Image src="/portrait.png" alt="Kishanan Sasikumar" fill style={{ objectFit: "cover", objectPosition: "center top", filter: "grayscale(0.1) contrast(1.08)" }} priority />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "32px", background: "#000", zIndex: 5 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "32px", background: "#000", zIndex: 5 }} />
      </div>

      {/* Desktop portrait — 58% */}
      <div className="hidden md:block" style={{ width: "58%", position: "relative", overflow: "hidden", minHeight: "100vh", background: "#111" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "52px", background: "#000", zIndex: 10 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "52px", background: "#000", zIndex: 10 }} />

        <Image
          src="/portrait.png"
          alt="Kishanan Sasikumar — Filmmaker & Creative Entrepreneur"
          fill priority sizes="58vw"
          style={{ objectFit: "cover", objectPosition: "center top", filter: "grayscale(0.12) contrast(1.08)", opacity: loaded ? 1 : 0, transition: "opacity 1.4s ease" }}
          onLoad={() => setLoaded(true)}
        />

        {/* Left gradient */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 55%)", zIndex: 5 }} />

        {/* Thread */}
        <div className="font-script" style={{ position: "absolute", bottom: "80px", right: "2.5rem", zIndex: 15, fontSize: "3rem", opacity: 0.5, color: "#fff", transform: "rotate(-8deg)", textShadow: "0 2px 24px rgba(0,0,0,0.6)" }}>
          Visionary
        </div>

        {/* Caption */}
        <span className="font-sans" style={{ position: "absolute", bottom: "18px", left: "2rem", zIndex: 15, fontSize: "0.48rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
          Kishanan Sasikumar — Filmmaker &amp; CEO
        </span>
      </div>

      {/* Editorial content — 42% */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--paper)", borderLeft: "1px solid var(--border-muted)" }}
        className="section-pad hero-editorial-column">
        
        <div id="hero-editorial-inner" style={{ width: "100%", maxWidth: "580px", paddingLeft: "4rem" }}>
          <p className="font-sans reveal" style={{ fontSize: "0.52rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.42, marginBottom: "2rem" }}>
            CEO, Newborn Cinema &nbsp;/&nbsp; Founder, SunDawn Eventz
          </p>

          <h1 className="font-serif reveal reveal-delay-1" style={{ fontSize: "clamp(3rem, 4.5vw, 5.5rem)", fontWeight: 600, lineHeight: 1.04, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
            Filmmaker &amp;<br />Creative<br />Entrepreneur
          </h1>

          <div className="font-script reveal reveal-delay-2" style={{ fontSize: "1.75rem", opacity: 0.35, marginBottom: "1.75rem" }}>
            Crafting Cinematic Experiences
          </div>

          <p className="font-sans justify-editorial reveal reveal-delay-2" style={{ fontSize: "0.92rem", lineHeight: 1.85, color: "var(--ink)", opacity: 0.68, maxWidth: "360px" }}>
            Kishanan Sasikumar builds cinematic ventures at the intersection of artistic expression and strategic leadership. Narrative depth leads; execution follows.
          </p>

          <div className="reveal reveal-delay-3" style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#work" className="btn-primary" id="hero-view-work-btn">View Latest Work</a>
            <a href="mailto:kishanan@newborncinema.com" className="btn-ghost" id="hero-collaborate-btn">Collaborate</a>
          </div>

          <div className="reveal reveal-delay-4 stat-grid-mobile" style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--border-muted)", display: "flex", gap: "2.5rem" }}>
            {[{ n: 500, suffix: "+", l: "Productions" }, { n: 7, suffix: "+", l: "Years Active" }, { n: 2, suffix: "", l: "Ventures Founded" }].map((s) => (
              <StatItem key={s.l} value={s.n} suffix={s.suffix} label={s.l} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: "2.5rem", right: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }} className="hidden md:flex">
        <div style={{ width: "1px", height: "50px", background: "var(--ink)", opacity: 0.18 }} />
        <span className="font-sans" style={{ fontSize: "0.42rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.28, writingMode: "vertical-rl" }}>Scroll</span>
      </div>
    </section>
  );
}

/* ─── PHILOSOPHY ──────────────────────────────────────────────────────── */
function PhilosophySection() {
  return (
    <section id="philosophy" style={{ background: "var(--paper)" }}>
      <Marquee />
      <div className="section-pad" style={{ borderBottom: "1px solid rgba(45,36,36,0.06)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 2rem" }}>
          <div className="reveal" style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "5rem" }}>
            <span className="font-sans" style={{ fontSize: "0.52rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.32, whiteSpace: "nowrap" }}>02 / Philosophy</span>
            <div style={{ height: "1px", flexGrow: 1, background: "var(--border-muted)" }} />
            <span className="font-script" style={{ fontSize: "1.75rem", opacity: 0.22 }}>The Mindset</span>
          </div>

          <h2 className="font-serif reveal" style={{ fontSize: "clamp(2.8rem, 4.5vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "4.5rem" }}>
            The Creative<br /><em>Philosophy</em>
          </h2>

          <div className="philosophy-grid">
            <p className="font-sans justify-editorial reveal reveal-delay-1" style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "var(--ink)", opacity: 0.78 }}>
              Design and filmmaking are inseparable narratives. Aesthetics are not merely decoration — they are strategic coordinates engineered to provoke specific human responses. In the intersection of light and shadow, we locate the truth of the story.
            </p>
            <p className="font-sans justify-editorial reveal reveal-delay-2" style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "var(--ink)", opacity: 0.78 }}>
              Storytelling provides depth, but production clarity enables execution at scale. Every frame is a calculated move. Every cut is a narrative beat. We build creative ventures that resonate because they are built on architectural foundations of intent — not instinct alone.
            </p>
          </div>

          <div className="reveal" style={{ marginTop: "5rem", display: "flex", alignItems: "center", gap: "2rem" }}>
            <div style={{ height: "1px", width: "50px", background: "var(--ink)", opacity: 0.12 }} />
            <span className="font-sans" style={{ fontSize: "0.52rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.28 }}>
              Crafting Cinematic Experiences &amp; Building Creative Ventures
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ────────────────────────────────────────────────────────── */
const PROJECTS = [
  { id: "newborn", title: "The Threshold", cat: "Newborn Cinema", badge: "Feature", year: "2024", img: "/proj-newborn.png", desc: "Feature narrative exploring displacement and South Asian identity." },
  { id: "sundawn", title: "SunDawn Grand Gala", cat: "SunDawn Eventz", badge: "Event", year: "2023", img: "/proj-sundawn.png", desc: "Flagship luxury event produced for 800+ guests." },
  { id: "eezham", title: "Eezham Narratives", cat: "Eezham Cinema", badge: "Docuseries", year: "2024", img: "/proj-eezham.png", desc: "Documentary series preserving Tamil cultural memory." },
  { id: "freelance", title: "The Edit Archives", cat: "Freelance", badge: "Post-Prod", year: "2022", img: "/proj-edit.png", desc: "500+ commercial cuts across brands, campaigns, and films." },
  { id: "commercial", title: "Commercial Frames", cat: "Cinematography", badge: "Commercial", year: "2023", img: "/proj-commercial.png", desc: "Luxury brand productions shot across South Asia." },
  { id: "archive", title: "Archive Studies", cat: "Case Studies", badge: "Consultancy", year: "2025", img: "/proj-archive.png", desc: "Strategic analysis of cinematic narrative in urban contexts." },
];

function ImpactSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <section id="work" style={{ background: "#0D0D0B", color: "#E8E8E2" }} className="section-pad">
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 2rem" }}>
        <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(3rem, 5vw, 5.5rem)", letterSpacing: "-0.02em", lineHeight: 1 }}>
            Selected<br />Productions
          </h2>
          <span className="font-script" style={{ fontSize: "2.2rem", opacity: 0.3 }}>Cinematic Vision</span>
        </div>

        <div className="triptych-grid">
          {PROJECTS.map((proj, i) => (
            <div key={proj.id} id={`project-${proj.id}`}
              className={`project-card reveal reveal-delay-${(i % 3) + 1}`}
              style={{ cursor: "none" }}
              onMouseEnter={() => setHovered(proj.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => toggleExpand(proj.id)}
            >
              <div className="letterbox" style={{ marginBottom: "1.25rem", border: "1px solid var(--border-muted)", position: "relative" }}>
                <Image
                  src={proj.img} alt={proj.title} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  className="letterbox-img"
                  style={{ objectFit: "cover", filter: hovered === proj.id || expanded === proj.id ? "grayscale(0)" : "grayscale(0.75)" }}
                />
                {/* Letterbox bars */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "8px", background: "#000", zIndex: 5 }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "8px", background: "#000", zIndex: 5 }} />

                {/* Expand Indicator */}
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: hovered === proj.id && !expanded ? 1 : 0, transition: "opacity 0.3s" }}>
                  <span className="font-sans" style={{ fontSize: "0.52rem", letterSpacing: "0.2em", background: "rgba(0,0,0,0.6)", padding: "0.5rem 1rem", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}>VIEW DETAILS</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", minHeight: "50px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                    <h3 className="font-sans" style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "inherit", transition: "letter-spacing 0.3s ease", ...(hovered === proj.id || expanded === proj.id ? { letterSpacing: "0.3em" } : {}) }}>
                      {proj.title}
                    </h3>
                    <span style={{ fontSize: "0.42rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.15rem 0.35rem", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "2px", color: "inherit", opacity: 0.5 }}>
                      {proj.badge}
                    </span>
                  </div>
                  <p className="font-sans" style={{ fontSize: "0.52rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "inherit", opacity: 0.36 }}>
                    {proj.cat}
                  </p>

                  {/* Expanded Content */}
                  <div style={{ height: expanded === proj.id ? "auto" : hovered === proj.id ? "40px" : "0", opacity: hovered === proj.id || expanded === proj.id ? 1 : 0, overflow: "hidden", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)", marginTop: "0.75rem" }}>
                    <p className="font-sans" style={{ fontSize: "0.72rem", color: "inherit", opacity: 0.52, lineHeight: 1.6, marginBottom: "1rem" }}>
                      {proj.desc}
                    </p>
                    {expanded === proj.id && (
                      <div className="reveal" style={{ padding: "1.5rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                          <div>
                            <span className="font-sans" style={{ fontSize: "0.42rem", color: "#E8E8E2", opacity: 0.3, display: "block", marginBottom: "0.25rem" }}>ROLE</span>
                            <span className="font-sans" style={{ fontSize: "0.58rem" }}>Lead Producer / Editor</span>
                          </div>
                          <div>
                            <span className="font-sans" style={{ fontSize: "0.42rem", color: "#E8E8E2", opacity: 0.3, display: "block", marginBottom: "0.25rem" }}>STATUS</span>
                            <span className="font-sans" style={{ fontSize: "0.58rem" }}>Released / Global</span>
                          </div>
                        </div>
                        <button className="font-sans" style={{ marginTop: "1.5rem", fontSize: "0.52rem", border: "none", background: "none", color: "inherit", borderBottom: "1px solid", padding: "0", cursor: "none" }}>EXPLORE CASE STUDY →</button>
                      </div>
                    )}
                  </div>
                </div>
                <span className="font-sans" style={{ fontSize: "0.52rem", color: "inherit", opacity: 0.2, flexShrink: 0 }}>{proj.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Marquee dark />
    </section>
  );
}

/* ─── EVOLUTION ───────────────────────────────────────────────────────── */
function EvolutionSection() {
  return (
    <section id="evolution" style={{ background: "var(--paper)" }} className="section-pad">
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 2rem" }}>
        <div className="reveal" style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "4rem" }}>
          <span className="font-sans" style={{ fontSize: "0.52rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(45,36,36,0.32)", whiteSpace: "nowrap" }}>04 / Career Arc</span>
          <div style={{ height: "1px", flexGrow: 1, background: "rgba(45,36,36,0.07)" }} />
          <span className="font-script" style={{ fontSize: "1.75rem", opacity: 0.22 }}>The Thread</span>
        </div>

        <h2 className="font-serif reveal" style={{ fontSize: "clamp(2.5rem, 4.5vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "4rem" }}>
          Designer → Editor → <em>CEO</em>
        </h2>

        <div className="bento-grid">
          {/* Phase 1 */}
          <div className="bento-card bento-phase-sm span-4 reveal" style={{ background: "var(--card)", padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative" }}>
            <span className="font-serif" style={{ position: "absolute", top: "1.25rem", right: "1.25rem", fontSize: "5.5rem", color: "var(--ink)", opacity: 0.05, lineHeight: 1 }}>01</span>
            <span className="font-sans" style={{ fontSize: "0.48rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.38, marginBottom: "0.7rem" }}>2019 — 2021</span>
            <h3 className="font-serif" style={{ fontSize: "2rem", marginBottom: "0.9rem" }}>The Designer</h3>
            <p className="font-sans" style={{ fontSize: "0.82rem", lineHeight: 1.75, color: "var(--ink)", opacity: 0.58 }}>Establishing laws of visual tension and architectural form. Every pixel intentional. Every composition a hypothesis.</p>
          </div>

          {/* CEO — Hero Bento */}
          <div className="bento-card bento-ceo span-8 row-2 reveal reveal-delay-1" style={{ background: "var(--ink)", color: "var(--paper)", padding: "4rem", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <div className="font-script" style={{ position: "absolute", top: "2.5rem", right: "-3rem", fontSize: "7rem", opacity: 0.06, color: "var(--paper)", transform: "rotate(-18deg)", pointerEvents: "none", whiteSpace: "nowrap" }}>
              Building Ventures
            </div>
            <span className="font-sans" style={{ fontSize: "0.48rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--paper)", opacity: 0.38, marginBottom: "1rem" }}>Present — CEO &amp; Producer</span>
            <h3 className="font-serif" style={{ fontSize: "clamp(2.5rem, 3.5vw, 4.2rem)", lineHeight: 1.05, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
              Newborn Cinema<br />&amp; SunDawn Eventz
            </h3>
            <p className="font-sans" style={{ maxWidth: "420px", fontSize: "1rem", lineHeight: 1.8, color: "var(--paper)", opacity: 0.65, marginBottom: "2.5rem" }}>
              Transitioning a decade of craft into institutional leadership — founding and scaling South Asian creative ventures that redefine how regional narratives reach global audiences.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#work" className="btn-primary" id="evo-view-work-btn" style={{ background: "var(--paper)", color: "var(--ink)", borderColor: "var(--paper)" }}>View Latest Work</a>
              <a href="mailto:kishanan@newborncinema.com" className="btn-ghost" id="evo-collaborate-btn" style={{ borderColor: "var(--border-muted)", color: "var(--paper)" }}>Collaborate</a>
            </div>
            <span className="font-serif" style={{ position: "absolute", bottom: "1.5rem", right: "2.5rem", fontSize: "7rem", color: "var(--paper)", opacity: 0.04, lineHeight: 1 }}>03</span>
          </div>

          {/* Phase 2 */}
          <div className="bento-card bento-phase-sm span-4 reveal reveal-delay-2" style={{ background: "var(--card)", padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative" }}>
            <span className="font-serif" style={{ position: "absolute", top: "1.25rem", right: "1.25rem", fontSize: "5.5rem", color: "var(--ink)", opacity: 0.05, lineHeight: 1 }}>02</span>
            <span className="font-sans" style={{ fontSize: "0.48rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.38, marginBottom: "0.7rem" }}>2021 — 2025</span>
            <h3 className="font-serif" style={{ fontSize: "2rem", marginBottom: "0.9rem" }}>The Editor</h3>
            <p className="font-sans" style={{ fontSize: "0.82rem", lineHeight: 1.75, color: "var(--ink)", opacity: 0.58 }}>500+ commercial and independent cuts. Mastering narrative rhythm, cinematic pacing, and the discipline of decisive removal.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ──────────────────────────────────────────────────────────── */
function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <footer id="contact" style={{ background: "var(--paper)", borderTop: "1px solid rgba(45,36,36,0.06)", paddingTop: "7rem" }} className="section-pad">
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 2rem" }}>
        <div className="reveal" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "5rem 0", marginBottom: "6rem", borderBottom: "1px solid rgba(45,36,36,0.06)" }}>
          <span className="font-script" style={{ fontSize: "2rem", opacity: 0.26, marginBottom: "1.5rem" }}>Let&apos;s create</span>
          <h2 className="font-serif" style={{ fontSize: "clamp(3.5rem, 7vw, 8rem)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "2.5rem" }}>
            Something<br /><em>Lasting</em>
          </h2>
          <a href="mailto:kishanan@newborncinema.com" className="btn-primary" id="footer-cta-btn">Begin Collaboration</a>
        </div>

        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "3rem" }}>
          <div>
            <h3 className="font-serif" style={{ fontSize: "1.4rem", marginBottom: "1.25rem" }}>Kishanan S.</h3>
            <div className="font-sans" style={{ fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.38, lineHeight: 2.4 }}>
              Filmmaker &amp; Creative CEO<br />Newborn Cinema<br />SunDawn Eventz<br />© 2026
            </div>
          </div>

          <div>
            <h5 className="font-sans" style={{ fontSize: "0.48rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(45,36,36,0.3)", marginBottom: "1.5rem" }}>Platform</h5>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {["Work", "Philosophy", "Evolution", "Archives"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="font-sans" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink)", textDecoration: "none", opacity: 0.7 }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
                >{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-sans" style={{ fontSize: "0.48rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(45,36,36,0.3)", marginBottom: "1.5rem" }}>Connection</h5>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "Fiverr", href: "https://www.fiverr.com" },
                { label: "LinkedIn", href: "https://www.linkedin.com" },
                { label: "Instagram", href: "https://www.instagram.com" },
                { label: "Vimeo", href: "https://vimeo.com" },
              ].map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="font-sans"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink)", textDecoration: "none", opacity: 0.7 }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
                >{s.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-sans" style={{ fontSize: "0.48rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.3, marginBottom: "1.5rem" }}>Insights</h5>
            <p className="font-sans" style={{ fontSize: "0.72rem", lineHeight: 1.7, color: "var(--ink)", opacity: 0.48, marginBottom: "1.25rem" }}>Dispatches on craft, leadership, and cinematic thinking.</p>
            {submitted ? (
              <p className="font-sans" style={{ fontSize: "0.72rem", color: "var(--ink)", opacity: 0.65, fontStyle: "italic" }}>Thank you — you&apos;ll hear from us soon.</p>
            ) : (
              <form onSubmit={handleSubscribe} style={{ position: "relative", borderBottom: "1px solid var(--border-muted)" }}>
                <input id="newsletter-email" type="email" placeholder="YOUR EMAIL ADDRESS" value={email} onChange={(e) => setEmail(e.target.value)} required
                  style={{ width: "100%", background: "transparent", border: "none", outline: "none", fontFamily: "Poppins, sans-serif", fontSize: "0.56rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink)", paddingBottom: "0.7rem", cursor: "none" }}
                />
                <button type="submit" style={{ position: "absolute", right: 0, bottom: "0.5rem", fontSize: "0.55rem", letterSpacing: "0.15em", fontWeight: 700, background: "transparent", border: "none", cursor: "none", color: "var(--ink)" }}>→</button>
              </form>
            )}
          </div>
        </div>

        <div style={{ marginTop: "4.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(45,36,36,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span className="font-sans" style={{ fontSize: "0.48rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.2, fontStyle: "italic" }}>Crafting Cinematic Experiences &amp; Building Creative Ventures.</span>
          <span className="font-sans" style={{ fontSize: "0.48rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.2 }}>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── ROOT ────────────────────────────────────────────────────────────── */
export default function Home() {
  const [introVisible, setIntroVisible] = useState(true);
  const doneCallback = useCallback(() => setIntroVisible(false), []);

  useReveal();
  useScrollProgress();
  useCustomCursor();

  return (
    <>
      {/* Global chrome */}
      <div id="cursor-dot" />
      <div id="cursor-ring" />
      <div id="scroll-progress" />

      {/* Cinematic intro */}
      {introVisible && <Intro onDone={doneCallback} />}

      <Navbar />
      <main>
        <HeroSection />
        <PhilosophySection />
        <CapabilitiesSection />
        <ImpactSection />
        <EvolutionSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
