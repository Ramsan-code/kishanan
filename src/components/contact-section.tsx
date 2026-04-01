"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
  user_name: z.string().min(2, "Name must be at least 2 characters"),
  user_email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    setStatus("idle");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        reset();
      } else {
        console.error("API Error:", result.error);
        setStatus("error");
      }
    } catch (error) {
      console.error("Form Submission Error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ background: "var(--paper)", borderTop: "1px solid var(--border-muted)" }} className="section-pad">
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 2rem" }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem" }} className="responsive-grid-2 reveal">
          
          {/* Left Content */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span className="font-sans" style={{ fontSize: "0.52rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.42, display: "block", marginBottom: "2rem" }}>
              07 / CONNECT
            </span>
            <h2 className="font-serif" style={{ fontSize: "clamp(3rem, 4.5vw, 5.5rem)", fontWeight: 600, lineHeight: 1.04, letterSpacing: "-0.02em", marginBottom: "3rem" }}>
              Have a Project<br />in <em>Mind?</em>
            </h2>
            <p className="font-sans" style={{ fontSize: "1rem", lineHeight: 1.85, color: "var(--ink)", opacity: 0.6, maxWidth: "420px", marginBottom: "4rem" }}>
              Reach out to discuss cinematic collaborations, luxury event productions, or strategic creative ventures. Let&apos;s build something lasting.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              <div>
                <span className="font-sans" style={{ fontSize: "0.45rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.3, display: "block", marginBottom: "0.5rem" }}>Direct Email</span>
                <a href="mailto:kishanan@newborncinema.com" className="font-serif" style={{ fontSize: "1.4rem", color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--border-muted)" }}>kishanan@newborncinema.com</a>
              </div>
            </div>
          </div>

          {/* Right Content: Form */}
          <div style={{ background: "var(--card)", padding: "3.5rem", position: "relative" }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label className="font-sans" style={{ fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.5 }}>Full Name</label>
                <input 
                  {...register("user_name")}
                  type="text" 
                  autoComplete="name"
                  style={{ background: "none", border: "none", borderBottom: "1px solid var(--border-muted)", padding: "0.75rem 0", color: "var(--ink)", fontFamily: "inherit", fontSize: "1rem", outline: "none" }} 
                />
                {errors.user_name && <span style={{ fontSize: "0.6rem", color: "#f87171" }}>{errors.user_name.message}</span>}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label className="font-sans" style={{ fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.5 }}>Email Address</label>
                <input 
                  {...register("user_email")}
                  type="email" 
                  autoComplete="email"
                  style={{ background: "none", border: "none", borderBottom: "1px solid var(--border-muted)", padding: "0.75rem 0", color: "var(--ink)", fontFamily: "inherit", fontSize: "1rem", outline: "none" }} 
                />
                {errors.user_email && <span style={{ fontSize: "0.6rem", color: "#f87171" }}>{errors.user_email.message}</span>}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label className="font-sans" style={{ fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.5 }}>Message</label>
                <textarea 
                  {...register("message")}
                  rows={4} 
                  style={{ background: "none", border: "none", borderBottom: "1px solid var(--border-muted)", padding: "0.75rem 0", color: "var(--ink)", fontFamily: "inherit", fontSize: "1rem", outline: "none", resize: "none" }}
                ></textarea>
                {errors.message && <span style={{ fontSize: "0.6rem", color: "#f87171" }}>{errors.message.message}</span>}
              </div>

              <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: "1rem", width: "100%", justifyContent: "center" }}>
                {loading ? "Delivering..." : "Send Message"}
              </button>

              {status === "success" && (
                <p className="font-sans" style={{ fontSize: "0.7rem", color: "#4ade80", textAlign: "center" }}>Thank you. Your message has been sent.</p>
              )}
              {status === "error" && (
                <p className="font-sans" style={{ fontSize: "0.7rem", color: "#f87171", textAlign: "center" }}>Something went wrong. Please try again.</p>
              )}
            </form>

            <span className="font-script" style={{ position: "absolute", bottom: "-0.5rem", right: "1rem", fontSize: "4.5rem", opacity: 0.08, transform: "rotate(-8deg)", pointerEvents: "none" }}>
              Inquiry
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
