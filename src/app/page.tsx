"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ContactSection } from "@/components/contact-section";
import { getYouTubeID } from "@/lib/youtube";

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

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div>
      <div className="font-serif" style={{ fontSize: "1.8rem", fontWeight: 600, lineHeight: 1 }}>{value}{suffix}</div>
      <div className="font-sans" style={{ fontSize: "0.48rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.38, marginTop: "0.4rem" }}>{label}</div>
    </div>
  );
}


function CapabilitiesSection() {
  const services = [
    { title: "Creative Direction", desc: "Shaping ideas into clear, cohesive visual outcomes.", icons: ["Direction", "Vision"] },
    { title: "Visual Storytelling", desc: "Crafting narratives that connect through pacing, emotion, and imagery.", icons: ["Edit", "Pacing"] },
    { title: "Brand Strategist", desc: "Building brands with clarity, consistency, and purpose.", icons: ["Strategy", "Growth"] },
    { title: "Team Leadership", desc: "Leading teams to execute efficiently while maintaining creative quality.", icons: ["Leadership", "Scale"] }
  ];

  return (
    <section id="services" style={{ padding: "9rem 4rem", background: "var(--paper)", borderBottom: "1px solid var(--border-muted)" }} className="section-pad">
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        <div className="reveal" style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "5rem" }}>
          <span className="font-sans" style={{ fontSize: "0.52rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.32, whiteSpace: "nowrap" }}>03 / Capabilities</span>
          <div style={{ height: "1px", flexGrow: 1, background: "var(--border-muted)" }} />
        </div>

        <div className="capabilities-grid reveal" style={{ display: "grid", gap: "4rem 6rem" }}>
          {services.map((s, i) => (
            <div key={s.title} className={`reveal reveal-delay-${(i % 2) + 1}`} style={{ paddingBottom: "3rem", borderBottom: "1px solid var(--border-muted)" }}>
              <span className="font-sans" style={{ fontSize: "0.45rem", letterSpacing: "0.2em", color: "var(--ink)", opacity: 0.3, display: "block", marginBottom: "1rem", whiteSpace: "nowrap" }}>0{i + 1} &mdash; CAPABILITY</span>
              <h3 className="font-serif" style={{ fontSize: "clamp(1.8rem, 5vw, 2.2rem)", marginBottom: "1.25rem", letterSpacing: "-0.01em" }}>{s.title}</h3>
              <p className="font-sans" style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--ink)", opacity: 0.6, maxWidth: "420px" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



/* ─── FLOATING SOCIAL SIDEBAR ─────────────────────────────────────────── */
function SocialSidebar() {
  const socials = [
    {
      name: "Instagram",
      href: "https://www.instagram.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "1.1rem", height: "1.1rem" }}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "1.1rem", height: "1.1rem" }}>
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },

    {
      name: "Fiverr",
      href: "https://www.fiverr.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "1.1rem", height: "1.1rem" }}>
          <path d="M21.07 0H2.93C1.31 0 0 1.31 0 2.93v18.14C0 22.69 1.31 24 2.93 24h18.14C22.69 24 24 22.69 24 21.07V2.93C24 1.31 22.69 0 21.07 0zm-6.86 18.55h-2.71v-7.4H9.79V18.55H7.08V8.71h7.13v9.84zm.86-11.44c0 .86-.7 1.56-1.56 1.56s-1.56-.7-1.56-1.56.7-1.56 1.56-1.56 1.56.7 1.56 1.56z" />
        </svg>
      ),
    },
    {
      name: "Email",
      href: "mailto:shankishan2212@gmail.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "1.1rem", height: "1.1rem" }}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ];

  return (
    <div className="social-sidebar">
      {/* Top raised line */}
      <div className="social-sidebar-line" />

      {/* Icon stack */}
      <div className="social-sidebar-icons">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target={s.href.startsWith("mailto") ? "_self" : "_blank"}
            rel="noopener noreferrer"
            aria-label={s.name}
            className="social-sidebar-btn"
          >
            {s.icon}
            <span className="social-sidebar-tooltip">{s.name}</span>
          </a>
        ))}
      </div>

      {/* Bottom raised line */}
      <div className="social-sidebar-line" />
    </div>
  );
}

/* ─── NAVBAR ──────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Philosophy", href: "#philosophy" },
    { label: "Work", href: "#work" },
    { label: "Evolution", href: "#evolution" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <>
      <nav className={`site-nav ${scrolled ? "scrolled" : ""}`} id="main-nav">
        <div className="brand-container flex-between" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <a href="#hero" className="font-serif site-nav-logo" style={{ fontSize: "1.2rem", fontWeight: 600, textDecoration: "none" }}>KS</a>
          </div>

          <div className="hidden md:flex items-center gap-10 nav-desktop-links">
            {links.map((l) => (
              <Link key={l.label} href={l.href} className="font-sans site-nav-link" style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none", transition: "opacity 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.65")}
              >{l.label}</Link>
            ))}
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
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
      <div style={{ position: "fixed", inset: 0, background: "var(--paper)", zIndex: 900, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", transition: "opacity 0.3s ease, visibility 0.3s ease", opacity: menuOpen ? 1 : 0, visibility: menuOpen ? "visible" : "hidden" }}>
        {links.map((l) => (
          <Link key={l.label} href={l.href} className="font-serif" onClick={() => setMenuOpen(false)} style={{ fontSize: "clamp(2rem, 10vw, 2.8rem)", color: "var(--ink)", textDecoration: "none", fontWeight: 500, opacity: 0.85 }}>{l.label}</Link>
        ))}
        <Link href="#contact" className="btn-primary" onClick={() => setMenuOpen(false)} style={{ marginTop: "1rem" }}>Collaborate</Link>
      </div>
    </>
  );
}

/* ─── HERO ────────────────────────────────────────────────────────────── */
function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", background: "var(--paper)", overflow: "hidden" }}>
      
      {/* Background Image Container */}
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "100%", zIndex: 1, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "70%" }}>
          <Image
            src="/portrait.png" // Assumes portrait.png exists from earlier contexts
            alt="Kishanan Sasikumar"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 70vw"
            style={{ 
              objectFit: "cover", 
              objectPosition: "60% center", 
              filter: "grayscale(1) contrast(1.15) brightness(0.9)", // Matched from design aesthetics
              opacity: loaded ? 1 : 0, 
              transition: "opacity 1.4s ease" 
            }}
            onLoad={() => setLoaded(true)}
          />
        </div>
        {/* Gradient overlay to seamlessly blend the paper background into the image */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, var(--paper) 0%, var(--paper) 35%, transparent 75%)" }} />
        {/* Soft radial overlay to ensure max readability on smaller devices */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 10% 50%, var(--paper) 0%, transparent 60%)" }} className="md:hidden" />
      </div>

      {/* Content Container */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", paddingLeft: "clamp(2.5rem, 8vw, 9rem)" }}>
        <div style={{ maxWidth: "620px", padding: "5rem 0" }}>
          <p className="font-sans reveal" style={{ fontSize: "0.58rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.75, marginBottom: "1.25rem", fontWeight: 600 }}>
            Filmmaker &amp; Creative Entrepreneur
          </p>

          <h1 className="font-serif reveal reveal-delay-1" style={{ fontSize: "clamp(3.8rem, 8vw, 7rem)", fontWeight: 600, lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: "2rem", color: "var(--ink)", paddingLeft: "0.1em" }}>
            Kishanan<br />Sasikumar
          </h1>

          <div className="reveal reveal-delay-2" style={{ marginBottom: "2.5rem" }}>
            <p className="font-sans" style={{ fontSize: "0.88rem", lineHeight: 1.85, color: "var(--ink)", opacity: 0.85, marginBottom: "1.25rem" }}>
              I started as a designer, built my foundation in visuals, and transitioned into video editing, where I refined storytelling, pacing, and emotion. Today, I operate as a creative entrepreneur and CEO of a film production company based in Eezham.
            </p>
            <p className="font-sans" style={{ fontSize: "0.88rem", lineHeight: 1.85, color: "var(--ink)", opacity: 0.85 }}>
              My work sits at the intersection of design, editing, and cinematic thinking—focused on creating clear, engaging, and purposeful content. I approach every project with a balance of aesthetics and strategy, ensuring that what we create not only looks good, but works.
            </p>
          </div>

          {/* Buttons flush together matching design */}
          <div className="reveal reveal-delay-3" style={{ display: "flex", flexWrap: "wrap", alignItems: "stretch" }}>
            <a href="#work" className="btn-primary hero-btn-stack" id="hero-view-work-btn" style={{ padding: "1.2rem 2.8rem", fontSize: "0.62rem" }}>
              View Latest Work
            </a>
            <Link href="#contact" className="btn-ghost hero-btn-stack" id="hero-collaborate-btn" style={{ padding: "1.2rem 2.8rem", fontSize: "0.62rem", borderLeftColor: "transparent" }}>
              Collaborate
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - kept for convention, slightly adjusted to fit the new layout */}
      <div style={{ position: "absolute", bottom: "3.5rem", left: "4rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", zIndex: 15 }} className="hidden md:flex">
        <div style={{ width: "1px", height: "50px", background: "var(--ink)", opacity: 0.15 }} />
        <span className="font-sans" style={{ fontSize: "0.42rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.3, writingMode: "vertical-rl" }}>Scroll</span>
      </div>
    </section>
  );
}


/* ─── PHILOSOPHY ──────────────────────────────────────────────────────── */
function PhilosophySection() {
  return (
    <section id="philosophy" style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <div className="section-pad" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 2rem" }}>
          <div className="reveal" style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "5rem" }}>
            <span className="font-sans" style={{ fontSize: "0.52rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--paper)", opacity: 0.42, whiteSpace: "nowrap" }}>02 / Philosophy</span>
            <div style={{ height: "1px", flexGrow: 1, background: "rgba(255,255,255,0.1)" }} />
          </div>

          <h2 className="font-serif reveal" style={{ fontSize: "clamp(2.8rem, 4.5vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "4.5rem", color: "var(--paper)" }}>
            The Creative<br /><em>Philosophy</em>
          </h2>

          <div className="philosophy-grid">
            <p className="font-sans justify-editorial reveal reveal-delay-1" style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "var(--paper)", opacity: 0.85 }}>
              Design and filmmaking are inseparable narratives. Aesthetics are not merely decoration—they are strategic coordinates engineered to provoke specific human responses. In the intersection of light and shadow, we locate the truth of the story through the precision of an architect.
            </p>
            <p className="font-sans justify-editorial reveal reveal-delay-2" style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "var(--paper)", opacity: 0.85 }}>
              Storytelling provides depth, but production clarity enables execution at scale. Every frame is a calculated move; every cut is a strategic beat. We build creative ventures that resonate globally because they are built on architectural foundations of intent—proving that beauty is a byproduct of clarity.
            </p>
          </div>

          <div className="reveal" style={{ marginTop: "5rem", display: "flex", alignItems: "center", gap: "2rem" }}>
            <div style={{ height: "1px", width: "50px", background: "var(--paper)", opacity: 0.2 }} />
            <span className="font-sans" style={{ fontSize: "0.52rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--paper)", opacity: 0.4 }}>
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
  {
    id: "seyon", youtubeId: "baG2LBG1M9I", title: "Seyon Short Film", cat: "Seyon Narrative", badge: "Short Film", year: "2024", img: "https://img.youtube.com/vi/baG2LBG1M9I/maxresdefault.jpg", desc: `Film Credits:
Music : kalaiyarasan Erampanayakam
Written & Directed by Dilojan
Starring : Ratheeshan,Thanu,Lashakan,Vishnu,Akaash,A.J. Melistan,Piranavan,pirem,senthuran,
Banner : film mafia
Editting : Dilojan
Director of Photography : kishan
Sound : DRK studio
Lyricist : Ratheeshan 
singer :  Annaviyar Kandasamy, Erampanayakam
uduku by :mano

Join this channel to get access to perks:
https://www.youtube.com/channel/UC8fTp3LRm3CejEdCPosLoPA/join` }, {
    id: "podcast", youtubeId: "tDV-N9grDqQ", title: "Brand Standards & Strategy | Sasi Balasingam", cat: "Creative Branding", badge: "Podcast", year: "2024", img: "https://img.youtube.com/vi/tDV-N9grDqQ/maxresdefault.jpg", desc: `Suscribe For more podcast

00:00 - Intro: Design Standards in Vavuniya (அறிமுகம்)
01:27 - What Defines a Good Brand? (Brand இன் தரம் எதில் உள்ளது?)
02:49 - The Reality of Local Businesses vs. Franchises
04:40 - Why Hire an Agency (Triple O Nine) vs. DIY?
05:31 - The Problem with Influencer Marketing (Sales Drops)
07:45 - The "Copy-Paste" Business Culture in Vavuniya
08:35 - Helping Startups & Business Expansion
10:25 - Success Story: Construction Company & Australian Market
13:49 - Case Study: "Thai Square" (Mixing Tamil & Thai Culture)
15:46 - Working with Diaspora Clients (Challenges & Trust)
17:38 - Stop Using Stolen/Internet Logos! (எச்சரிக்கை)
21:26 - Why Diaspora Investments Fail in Vavuniya? (முக்கியம்)
23:25 - The Solution: Market Research & Consulting Services
26:36 - Movie Poster Secrets: Vadimaniyan & Idiyan
32:32 - Respecting Artists & Pricing Issues (கலைஞர்களின் மதிப்பு)
36:26 - Designing for "Design Nani" (Time Travel Concept)
39:02 - How to Handle "Bad Ideas" from Clients
43:18 - Marketing Strategy for "Ailasa" Anthology Film
46:44 - New Office & Conclusion (புதிய அலுவலகம்)` },
];

function ImpactSection() {
  const [items, setItems] = useState(PROJECTS);
  const [hovered, setHovered] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [newUrl, setNewUrl] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    const vid = getYouTubeID(newUrl);
    if (!vid) {
      alert("Invalid YouTube URL");
      return;
    }

    setIsAdding(true);
    try {
      const res = await fetch(`/api/youtube?videoId=${vid}`);
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      const newProj = {
        id: `yt-${vid}`,
        youtubeId: vid,
        title: data.title,
        cat: "YouTube Production",
        badge: "Video",
        year: new Date().getFullYear().toString(),
        img: data.thumbnails.maxres || data.thumbnails.high || `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`,
        desc: data.description
      };

      setItems([newProj, ...items]);
      setNewUrl("");
    } catch (err) {
      console.error(err);
      alert("Failed to fetch video details. Check API key or URL.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <section id="work" style={{ background: "rgb(45, 36, 36)", color: "var(--paper)" }} className="section-pad">
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 2rem" }}>
        <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4.5rem", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <h2 className="font-serif" style={{ fontSize: "clamp(3rem, 5vw, 5.5rem)", letterSpacing: "-0.02em", lineHeight: 1 }}>
              Selected<br />Productions
            </h2>
          </div>


        </div>

        <div className="triptych-grid">
          {items.map((proj, i) => (
            <div key={proj.id} id={`project-${proj.id}`}
              className={`project-card reveal reveal-delay-${(i % 3) + 1}`}
              onMouseEnter={() => setHovered(proj.id)}
              onMouseLeave={() => setHovered(null)}
              onTouchStart={() => setHovered(proj.id)}
              onTouchEnd={() => setHovered(null)}
              onClick={() => toggleExpand(proj.id)}
            >
              <a 
                href={proj.youtubeId ? `https://www.youtube.com/watch?v=${proj.youtubeId}` : "#"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="letterbox" 
                style={{ display: "block", marginBottom: "1.25rem", border: "1px solid var(--border-muted)", position: "relative", overflow: "hidden" }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={proj.img} alt={proj.title} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  className="letterbox-img"
                  style={{ objectFit: "cover", filter: hovered === proj.id || expanded === proj.id ? "grayscale(0) contrast(1.05)" : "grayscale(0.85)", transition: "filter 0.6s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)" }}
                  onError={(e) => {
                    if (proj.youtubeId && e.currentTarget.src.includes('maxresdefault')) {
                      e.currentTarget.src = `https://img.youtube.com/vi/${proj.youtubeId}/hqdefault.jpg`;
                    }
                  }}
                />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "8px", background: "#000", zIndex: 5 }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "8px", background: "#000", zIndex: 5 }} />

                {/* YouTube Play Button Overlay */}
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: hovered === proj.id ? "transparent" : "rgba(0,0,0,0.15)", transition: "background-color 0.3s ease", zIndex: 10 }}>
                  <div style={{ width: "68px", height: "48px", backgroundColor: hovered === proj.id ? "#FF0000" : "rgba(33, 33, 33, 0.85)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", transition: "background-color 0.3s ease, transform 0.3s ease", transform: hovered === proj.id ? "scale(1.05)" : "scale(1)" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "4px" }}>
                      <path d="M7 4V20L20 12L7 4Z" fill="white" />
                    </svg>
                  </div>
                </div>
              </a>

              <div className="project-card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", minHeight: "50px" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                    <h3 className="font-sans project-card-title" style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "inherit", transition: "letter-spacing 0.3s ease", ...(hovered === proj.id || expanded === proj.id ? { letterSpacing: "0.3em" } : {}), wordBreak: "break-word" }}>
                      {proj.title}
                    </h3>
                    <span className="project-card-badge" style={{ fontSize: "0.42rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.15rem 0.35rem", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "2px", color: "inherit", opacity: 0.5 }}>
                      {proj.badge}
                    </span>
                  </div>
                  <p className="font-sans" style={{ fontSize: "0.52rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "inherit", opacity: 0.36 }}>
                    {proj.cat}
                  </p>

                  <div style={{ height: expanded === proj.id ? "auto" : hovered === proj.id ? "40px" : "0", opacity: hovered === proj.id || expanded === proj.id ? 1 : 0, overflow: "hidden", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)", marginTop: "0.75rem" }}>
                    <p className="font-sans" style={{ fontSize: "0.72rem", color: "inherit", opacity: 0.52, lineHeight: 1.6, marginBottom: "1rem", whiteSpace: "pre-wrap" }}>
                      {proj.desc}
                    </p>
                    {expanded === proj.id && (
                      <div className="reveal" style={{ padding: "1.5rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}>
                        <div className="expanded-details-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                          <div>
                            <span className="font-sans" style={{ fontSize: "0.42rem", color: "#E8E8E2", opacity: 0.3, display: "block", marginBottom: "0.25rem" }}>ROLE</span>
                            <span className="font-sans" style={{ fontSize: "0.58rem" }}>Director / Cinematographer</span>
                          </div>
                          <div>
                            <span className="font-sans" style={{ fontSize: "0.42rem", color: "#E8E8E2", opacity: 0.3, display: "block", marginBottom: "0.25rem" }}>SOURCE</span>
                            <a href={proj.youtubeId ? `https://youtube.com/watch?v=${proj.youtubeId}` : "#"} target="_blank" className="font-sans" style={{ fontSize: "0.58rem", color: "inherit" }}>
                              {proj.youtubeId ? "YouTube Link" : "Private Archive"}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <span className="font-sans project-card-year" style={{ fontSize: "0.52rem", color: "inherit", opacity: 0.2, flexShrink: 0, marginLeft: "1rem" }}>{proj.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
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
        </div>

        <h2 className="font-serif reveal" style={{ fontSize: "clamp(2rem, 4.5vw, 5rem)", lineHeight: 1.15, letterSpacing: "-0.01em", marginBottom: "4rem" }}>
          Designer / Editor<br /><em>CEO</em>
        </h2>

        <div className="bento-grid">
          {/* Phase 1 */}
          <div className="bento-card bento-phase-sm span-4 reveal" style={{ background: "var(--card)", padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative" }}>
            <span className="font-serif" style={{ position: "absolute", top: "1.25rem", right: "1.25rem", fontSize: "5.5rem", color: "var(--ink)", opacity: 0.05, lineHeight: 1 }}>01</span>
            <span className="font-sans" style={{ fontSize: "0.48rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.38, marginBottom: "0.7rem" }}>2019 — 2021</span>
            <h3 className="font-serif" style={{ fontSize: "2rem", marginBottom: "0.9rem" }}>The Designer</h3>
            <p className="font-sans" style={{ fontSize: "0.82rem", lineHeight: 1.75, color: "var(--ink)", opacity: 0.62 }}>Establishing the structural laws of visual tension and architectural form. In this phase, every pixel was a hypothesis and every composition a blueprint for engagement.</p>
          </div>

          {/* CEO — Hero Bento */}
          <div className="bento-card bento-ceo span-8 row-2 reveal reveal-delay-1" style={{ background: "var(--ink)", color: "var(--paper)", padding: "4rem", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <div className="font-script bento-decor-text" style={{ position: "absolute", top: "2.5rem", right: "-3rem", fontSize: "7rem", opacity: 0.06, color: "var(--paper)", transform: "rotate(-18deg)", pointerEvents: "none", whiteSpace: "nowrap" }}>
              Building Ventures
            </div>
            <span className="font-sans" style={{ fontSize: "0.62rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--paper)", opacity: 0.5, marginBottom: "1.25rem", fontWeight: 500 }}>Present — CEO &amp; Producer</span>
            <h3 className="font-serif" style={{ fontSize: "clamp(2.5rem, 3.5vw, 4.2rem)", lineHeight: 1.05, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
              Newborn Cinema
            </h3>
            <p className="font-sans" style={{ maxWidth: "460px", fontSize: "1rem", lineHeight: 1.8, color: "var(--paper)", opacity: 0.75, marginBottom: "2.5rem" }}>
              Transitioning a decade of technical craft into institutional leadership—building a production standard in Eezham that redefines how South Asian regional narratives reach and resonate with a global audience.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#work" className="btn-primary" id="evo-view-work-btn" style={{ background: "var(--paper)", color: "var(--ink)", borderColor: "var(--paper)" }}>View Latest Work</a>
              <Link href="#contact" className="btn-ghost" id="evo-collaborate-btn" style={{ borderColor: "var(--border-muted)", color: "var(--paper)" }}>Collaborate</Link>
            </div>
            <span className="font-serif" style={{ position: "absolute", bottom: "1.5rem", right: "2.5rem", fontSize: "7rem", color: "var(--paper)", opacity: 0.04, lineHeight: 1 }}>03</span>
          </div>

          {/* Phase 2 */}
          <div className="bento-card bento-phase-sm span-4 reveal reveal-delay-2" style={{ background: "var(--card)", padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative" }}>
            <span className="font-serif" style={{ position: "absolute", top: "1.25rem", right: "1.25rem", fontSize: "5.5rem", color: "var(--ink)", opacity: 0.05, lineHeight: 1 }}>02</span>
            <span className="font-sans" style={{ fontSize: "0.48rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.38, marginBottom: "0.7rem" }}>2021 — 2025</span>
            <h3 className="font-serif" style={{ fontSize: "2rem", marginBottom: "0.9rem" }}>The Editor</h3>
            <p className="font-sans" style={{ fontSize: "0.82rem", lineHeight: 1.75, color: "var(--ink)", opacity: 0.62 }}>Mastering the narrative rhythm and the discipline of decisive removal. Here, storytelling became a study in cinematic pacing and emotional resonance.</p>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ─── FOOTER ──────────────────────────────────────────────────────────── */
function Footer() {


  return (
    <footer id="footer" style={{ background: "var(--paper)", borderTop: "1px solid rgba(45,36,36,0.06)", paddingTop: "7rem" }} className="section-pad">
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 2rem" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "3rem" }}>
          <div>
            <h3 className="font-serif" style={{ fontSize: "1.4rem", marginBottom: "1.25rem" }}>Kishanan S.</h3>
            <div className="font-sans" style={{ fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.38, lineHeight: 2.4 }}>
              Filmmaker &amp; Creative CEO<br />Newborn Cinema<br />© 2026
            </div>
          </div>

          <div>
            <h5 className="font-sans" style={{ fontSize: "0.48rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(45,36,36,0.3)", marginBottom: "1.5rem" }}>Platform</h5>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {["Work", "Philosophy", "Evolution"].map((l) => (
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
                { label: "LinkedIn", href: "https://www.linkedin.com/in/kishanan-sasikumar-b7a0a03a3?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
                { label: "Instagram", href: "https://www.instagram.com/kishanan.sasikumar?igsh=MW1udjF1cWV2ODFqYQ%3D%3D&utm_source=qr" },
              ].map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="font-sans"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink)", textDecoration: "none", opacity: 0.7 }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
                >{s.label}</a></li>
              ))}
            </ul>
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
  useReveal();
  useScrollProgress();

  return (
    <>
      <div id="scroll-progress" />

      <SocialSidebar />
      <Navbar />
      <main>
        <HeroSection />
        <PhilosophySection />
        <CapabilitiesSection />
        <ImpactSection />
        <EvolutionSection />

        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
