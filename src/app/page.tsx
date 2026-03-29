"use client";

import { useEffect, useRef, useState } from "react";

/* ─── SCROLL REVEAL HOOK ─────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── COMPONENTS ──────────────────────────────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`site-nav ${scrolled ? "scrolled" : ""}`} aria-label="Main navigation">
      <a href="#hero" className="font-serif text-xl font-semibold tracking-tight" style={{ color: "var(--ink)" }}>
        KS
      </a>
      <div className="hidden md:flex items-center gap-10">
        {["Philosophy", "Work", "Evolution", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="font-sans font-medium uppercase tracking-[0.18em] hover:opacity-50 transition-opacity"
            style={{ fontSize: "0.625rem", color: "var(--ink)" }}
          >
            {item}
          </a>
        ))}
      </div>
      <a href="mailto:hello@kishanansasikumar.com" className="btn-ghost hidden md:inline-flex">
        Collaborate
      </a>
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col md:flex-row min-h-screen"
      style={{ borderBottom: "1px solid rgba(45,36,36,0.08)" }}
    >
      {/* Portrait Anchor — Left 60% */}
      <div className="md:w-[60%] relative overflow-hidden" style={{ minHeight: "100vh" }}>
        <div className="portrait-placeholder" style={{ minHeight: "100vh" }}>
          {/* Letterbox frame indicator */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "3px",
              background: "rgba(245,245,241,0.15)",
            }}
          />
          <span
            className="font-sans uppercase"
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              color: "rgba(45,36,36,0.25)",
              position: "absolute",
              bottom: "1.25rem",
              left: "1.5rem",
            }}
          >
            Kishanan Sasikumar — Authoritative Portrait
          </span>
        </div>

        {/* Letterbox cinema frame top/bottom */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "48px",
            background: "rgba(0,0,0,0.55)",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "48px",
            background: "rgba(0,0,0,0.55)",
            zIndex: 2,
          }}
        />

        {/* Floating Thread */}
        <div
          className="thread-text"
          style={{
            position: "absolute",
            bottom: "80px",
            right: "2.5rem",
            zIndex: 10,
            transform: "rotate(-8deg)",
          }}
        >
          Visionary
        </div>
      </div>

      {/* Editorial Content — Right 40% */}
      <div
        className="md:w-[40%] flex flex-col justify-center"
        style={{
          padding: "6rem 4rem",
          background: "var(--paper)",
          paddingTop: "9rem",
        }}
      >
        {/* Label */}
        <p
          className="font-sans uppercase reveal"
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            color: "rgba(45,36,36,0.4)",
            marginBottom: "2rem",
          }}
        >
          CEO, Newborn Cinema &nbsp;/&nbsp; Founder, SunDawn Eventz
        </p>

        {/* Primary Headline */}
        <h1
          className="font-serif reveal reveal-delay-1"
          style={{
            fontSize: "clamp(3.2rem, 5vw, 5.5rem)",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            marginBottom: "2rem",
          }}
        >
          Filmmaker &amp;
          <br />
          Creative
          <br />
          Entrepreneur
        </h1>

        {/* Script accent */}
        <div
          className="font-script reveal reveal-delay-2"
          style={{ fontSize: "2rem", opacity: 0.35, marginBottom: "2rem", color: "var(--ink)" }}
        >
          Crafting Cinematic Experiences
        </div>

        {/* Editorial subtext */}
        <p
          className="font-sans justify-editorial reveal reveal-delay-2"
          style={{
            fontSize: "1rem",
            lineHeight: 1.75,
            color: "rgba(45,36,36,0.72)",
            maxWidth: "380px",
          }}
        >
          Kishanan Sasikumar builds cinematic ventures at the intersection of artistic expression and strategic leadership. Narrative depth leads; execution follows.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 reveal reveal-delay-3" style={{ marginTop: "3rem" }}>
          <button className="btn-primary">View Latest Work</button>
          <button className="btn-ghost">Collaborate</button>
        </div>

        {/* Footer rule */}
        <div
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(45,36,36,0.08)",
            display: "flex",
            gap: "2rem",
          }}
        >
          {[{ n: "500+", l: "Productions" }, { n: "7+", l: "Years" }, { n: "2", l: "Ventures Founded" }].map((s) => (
            <div key={s.n} className="reveal reveal-delay-4">
              <div className="font-serif" style={{ fontSize: "1.75rem", fontWeight: 600, color: "var(--ink)" }}>{s.n}</div>
              <div className="font-sans uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.25em", color: "rgba(45,36,36,0.4)" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  return (
    <section
      id="philosophy"
      style={{
        padding: "8rem 4rem",
        background: "var(--paper)",
        borderBottom: "1px solid rgba(45,36,36,0.08)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section label */}
        <div
          className="flex items-center gap-6 reveal"
          style={{ marginBottom: "5rem" }}
        >
          <span className="font-sans uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(45,36,36,0.4)" }}>
            02 / Philosophy
          </span>
          <div style={{ height: "1px", flexGrow: 1, background: "rgba(45,36,36,0.08)" }} />
          <span className="font-script" style={{ fontSize: "2rem", opacity: 0.25, color: "var(--ink)" }}>The Mindset</span>
        </div>

        <h2 className="font-serif reveal" style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1.1, marginBottom: "4rem", letterSpacing: "-0.01em" }}>
          The Creative
          <br />
          <em>Philosophy</em>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
          <p className="font-sans justify-editorial reveal reveal-delay-1" style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "rgba(45,36,36,0.82)" }}>
            Design and filmmaking are inseparable narratives. Aesthetics are not merely decoration; they are strategic coordinates — engineered to provoke specific human responses. In the intersection of light and shadow, we locate the truth of the story.
          </p>
          <p className="font-sans justify-editorial reveal reveal-delay-2" style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "rgba(45,36,36,0.82)" }}>
            Storytelling provides depth, but production clarity enables execution at scale. Every frame is a calculated move. Every cut is a narrative beat. We build creative ventures that resonate because they are built on architectural foundations of intent, not instinct alone.
          </p>
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  { title: "The Threshold", cat: "Newborn Cinema", year: "2024" },
  { title: "SunDawn Presents", cat: "SunDawn Eventz", year: "2023" },
  { title: "Eezham Narratives", cat: "Eezham Cinema", year: "2024" },
  { title: "Commercial Canon", cat: "Freelance Edit — 2021-25", year: "2022" },
  { title: "Cultural Frames", cat: "Cinematography", year: "2023" },
  { title: "Archive Studies", cat: "Case Studies", year: "2025" },
];

function ImpactSection() {
  return (
    <section
      id="work"
      style={{ background: "var(--ink)", color: "var(--paper)", padding: "8rem 4rem" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div className="flex flex-col md:flex-row justify-between items-end reveal" style={{ marginBottom: "4rem" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(3rem, 5vw, 5rem)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
            Selected
            <br />
            Productions
          </h2>
          <span className="font-script" style={{ fontSize: "2.5rem", opacity: 0.3, color: "var(--paper)" }}>
            Cinematic Vision
          </span>
        </div>

        <div className="triptych-grid">
          {PROJECTS.map((proj, i) => (
            <div key={proj.title} className={`project-card reveal reveal-delay-${(i % 3) + 1}`} style={{ cursor: "pointer" }}>
              {/* Cinematic letterbox frame placeholder */}
              <div className="letterbox" style={{ marginBottom: "1.25rem", border: "1px solid rgba(245,245,241,0.08)" }}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `rgba(245,245,241,${0.02 + i * 0.015})`,
                  }}
                >
                  {/* Crosshair frame guide */}
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "20px", height: "1px", background: "rgba(245,245,241,0.15)", position: "absolute" }} />
                    <div style={{ height: "20px", width: "1px", background: "rgba(245,245,241,0.15)", position: "absolute" }} />
                  </div>
                  <span className="font-sans uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.3em", color: "rgba(245,245,241,0.15)" }}>
                    Frame 0{i + 1}
                  </span>
                </div>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3
                    className="proj-title font-sans font-semibold uppercase"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "var(--paper)", marginBottom: "0.4rem" }}
                  >
                    {proj.title}
                  </h3>
                  <p className="font-sans" style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(245,245,241,0.4)", textTransform: "uppercase" }}>
                    {proj.cat}
                  </p>
                </div>
                <span className="font-sans" style={{ fontSize: "0.6rem", color: "rgba(245,245,241,0.25)" }}>{proj.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PHASES = [
  {
    phase: "01",
    years: "2019 — 2021",
    title: "The Designer",
    body: "Establishing the fundamental laws of visual tension and architectural form. Every pixel intentional. Every composition a hypothesis.",
    w: "md:col-span-4",
    bg: "#EBEBD8",
    dark: false,
  },
  {
    phase: "02",
    years: "2021 — 2025",
    title: "The Editor",
    body: "500+ commercial and independent cuts. Mastering narrative rhythm, cinematic pacing, and the discipline of decisive removal.",
    w: "md:col-span-4",
    bg: "#E0E0D6",
    dark: false,
  },
];

function EvolutionSection() {
  return (
    <section
      id="evolution"
      style={{ padding: "8rem 4rem", background: "var(--paper)", borderTop: "1px solid rgba(45,36,36,0.08)" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div className="flex items-center gap-6 reveal" style={{ marginBottom: "5rem" }}>
          <span className="font-sans uppercase" style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(45,36,36,0.4)" }}>
            04 / Career Arc
          </span>
          <div style={{ height: "1px", flexGrow: 1, background: "rgba(45,36,36,0.08)" }} />
          <span className="font-script" style={{ fontSize: "2rem", opacity: 0.25, color: "var(--ink)" }}>The Thread</span>
        </div>
        <h2 className="font-serif reveal" style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", marginBottom: "4rem", letterSpacing: "-0.01em" }}>
          Designer → Editor → <em>CEO</em>
        </h2>

        {/* Bento Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridAutoRows: "minmax(280px, auto)",
            gap: "1.25rem",
          }}
        >
          {/* Phase 1: Designer */}
          <div
            className="bento-card reveal"
            style={{
              gridColumn: "span 4",
              background: "#E8E8DE",
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <span className="font-serif" style={{ position: "absolute", top: "1.5rem", right: "1.5rem", fontSize: "5rem", color: "rgba(45,36,36,0.06)", lineHeight: 1 }}>01</span>
            <span className="font-sans uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.3em", color: "rgba(45,36,36,0.4)", marginBottom: "0.75rem" }}>2019 — 2021</span>
            <h3 className="font-serif" style={{ fontSize: "2.2rem", marginBottom: "1rem", color: "var(--ink)" }}>The Designer</h3>
            <p className="font-sans" style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "rgba(45,36,36,0.65)" }}>
              Establishing the fundamental laws of visual tension and architectural form. Every pixel intentional. Every composition a hypothesis.
            </p>
          </div>

          {/* Phase 3: CEO (Hero/Large Bento) */}
          <div
            className="bento-card reveal reveal-delay-1"
            style={{
              gridColumn: "span 8",
              gridRow: "span 2",
              background: "var(--ink)",
              color: "var(--paper)",
              padding: "4rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Thread overlay */}
            <div
              className="font-script"
              style={{
                position: "absolute",
                top: "3rem",
                right: "-2rem",
                fontSize: "8rem",
                opacity: 0.06,
                color: "var(--paper)",
                transform: "rotate(-15deg)",
                whiteSpace: "nowrap",
                userSelect: "none",
              }}
            >
              Building Ventures
            </div>

            <span className="font-sans uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.3em", color: "rgba(245,245,241,0.4)", marginBottom: "1rem" }}>
              Present — CEO &amp; Producer
            </span>
            <h3 className="font-serif" style={{ fontSize: "clamp(2.5rem, 4vw, 4.5rem)", lineHeight: 1.05, marginBottom: "1.5rem", color: "var(--paper)", letterSpacing: "-0.02em" }}>
              Newborn Cinema
              <br />
              &amp; SunDawn Eventz
            </h3>
            <p className="font-sans" style={{ maxWidth: "420px", fontSize: "1rem", lineHeight: 1.75, color: "rgba(245,245,241,0.72)", marginBottom: "2.5rem" }}>
              Transitioning a decade of craft into institutional leadership. Founding and scaling South Asian creative ventures that redefine how regional narratives reach global audiences.
            </p>
            <div className="flex gap-4">
              <button className="btn-primary" style={{ background: "var(--paper)", color: "var(--ink)" }}>
                View Latest Work
              </button>
              <button className="btn-ghost" style={{ borderColor: "rgba(245,245,241,0.3)", color: "var(--paper)" }}>
                Collaborate
              </button>
            </div>

            {/* Phase marker */}
            <span className="font-serif" style={{ position: "absolute", bottom: "2rem", right: "2.5rem", fontSize: "7rem", color: "rgba(245,245,241,0.04)", lineHeight: 1 }}>03</span>
          </div>

          {/* Phase 2: Editor */}
          <div
            className="bento-card reveal reveal-delay-2"
            style={{
              gridColumn: "span 4",
              background: "#DEDECE",
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <span className="font-serif" style={{ position: "absolute", top: "1.5rem", right: "1.5rem", fontSize: "5rem", color: "rgba(45,36,36,0.06)", lineHeight: 1 }}>02</span>
            <span className="font-sans uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.3em", color: "rgba(45,36,36,0.4)", marginBottom: "0.75rem" }}>2021 — 2025</span>
            <h3 className="font-serif" style={{ fontSize: "2.2rem", marginBottom: "1rem", color: "var(--ink)" }}>The Editor</h3>
            <p className="font-sans" style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "rgba(45,36,36,0.65)" }}>
              500+ commercial and independent cuts. Mastering narrative rhythm, cinematic pacing, and the discipline of decisive removal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="contact"
      style={{ background: "var(--paper)", borderTop: "1px solid rgba(45,36,36,0.08)", padding: "6rem 4rem 3rem" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* CTA */}
        <div
          className="reveal"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "5rem 0",
            borderBottom: "1px solid rgba(45,36,36,0.06)",
            marginBottom: "5rem",
          }}
        >
          <span className="font-script" style={{ fontSize: "2.5rem", opacity: 0.25, marginBottom: "1.5rem", color: "var(--ink)" }}>Let's create</span>
          <h2 className="font-serif" style={{ fontSize: "clamp(3rem, 6vw, 6rem)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "2.5rem" }}>
            Something
            <br />
            <em>Lasting</em>
          </h2>
          <button className="btn-primary">Begin Collaboration</button>
        </div>

        {/* Footer Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "3rem" }}>
          {/* Brand */}
          <div>
            <h3 className="font-serif" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Kishanan S.</h3>
            <p className="font-sans" style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(45,36,36,0.4)", lineHeight: 2.2 }}>
              Filmmaker &amp; Creative CEO
              <br />Newborn Cinema
              <br />SunDawn Eventz
              <br />© 2026
            </p>
          </div>

          {/* Platform */}
          <div>
            <h5 className="font-sans uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.3em", color: "rgba(45,36,36,0.35)", marginBottom: "1.5rem" }}>Platform</h5>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              {["Impact", "Philosophy", "Evolution", "Archives"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="font-sans" style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink)", textDecoration: "none", opacity: 0.8 }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connection */}
          <div>
            <h5 className="font-sans uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.3em", color: "rgba(45,36,36,0.35)", marginBottom: "1.5rem" }}>Connection</h5>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              {["Fiverr", "LinkedIn", "Instagram", "Vimeo"].map((s) => (
                <li key={s}>
                  <a href="#" className="font-sans" style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink)", textDecoration: "none", opacity: 0.8 }}>
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="font-sans uppercase" style={{ fontSize: "0.55rem", letterSpacing: "0.3em", color: "rgba(45,36,36,0.35)", marginBottom: "1.5rem" }}>Insights</h5>
            <p className="font-sans" style={{ fontSize: "0.75rem", lineHeight: 1.7, color: "rgba(45,36,36,0.55)", marginBottom: "1.25rem" }}>
              Dispatches on craft, leadership, and cinematic thinking.
            </p>
            <div style={{ position: "relative", borderBottom: "1px solid var(--ink)" }}>
              <input
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  paddingBottom: "0.6rem",
                }}
              />
              <button className="font-sans uppercase" style={{ position: "absolute", right: 0, bottom: "0.5rem", fontSize: "0.55rem", letterSpacing: "0.2em", fontWeight: 700, background: "transparent", border: "none", cursor: "pointer", color: "var(--ink)" }}>
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(45,36,36,0.04)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span className="font-sans" style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(45,36,36,0.25)", fontStyle: "italic" }}>
            Crafting Cinematic Experiences &amp; Building Creative Ventures.
          </span>
          <span className="font-sans" style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(45,36,36,0.25)" }}>
            All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ROOT ───────────────────────────────────────────────────────── */
export default function Home() {
  useReveal();
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PhilosophySection />
        <ImpactSection />
        <EvolutionSection />
        <Footer />
      </main>
    </>
  );
}
