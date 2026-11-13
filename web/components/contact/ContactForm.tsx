"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/content/profile";

/**
 * Delivery: the form posts to Web3Forms (https://web3forms.com), which emails every submission to
 * the address the access key was issued for. The key is public by design and lives in
 * NEXT_PUBLIC_WEB3FORMS_KEY (.env.local locally, Environment Variables on Vercel). Without a key
 * the form falls back to composing an email in the visitor's mail app. Fields and look:
 * underlined inputs (16px Inter, 1px rule), a textarea, and the ink "Send Message" pill.
 */
const KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const job = String(data.get("job") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");

    if (!KEY) {
      const subject = encodeURIComponent(`Hello from ${name || "your website"}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}${job ? `, ${job}` : ""}${email ? ` (${email})` : ""}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: KEY,
          subject: `Portfolio message from ${name || "a visitor"}`,
          from_name: name,
          name,
          email,
          job_title: job,
          message,
          botcheck: data.get("botcheck") || "",
        }),
      });
      const json = (await res.json()) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error("send failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const label =
    status === "sending" ? "Sending…" : status === "sent" ? (KEY ? "Sent. I’ll reply soon." : "Opening your mail app…") : status === "error" ? "Try again" : "Send Message";

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-grid">
        <label className="contact-field">
          <span className="sr-only">Your name</span>
          <input name="name" type="text" placeholder="Your name" autoComplete="name" required />
        </label>
        <label className="contact-field">
          <span className="sr-only">Job title</span>
          <input name="job" type="text" placeholder="Job title" autoComplete="organization-title" />
        </label>
        <label className="contact-field">
          <span className="sr-only">Email</span>
          <input name="email" type="email" placeholder="Email" autoComplete="email" required />
        </label>
        <label className="contact-field contact-field-area">
          <span className="sr-only">Message</span>
          <textarea name="message" placeholder="Message" rows={2} required />
        </label>
        {/* honeypot: hidden from people, filled by bots, rejected by Web3Forms */}
        <input type="checkbox" name="botcheck" className="contact-honeypot" tabIndex={-1} aria-hidden="true" />
      </div>
      <button type="submit" className="contact-submit" disabled={status === "sending"} aria-live="polite">
        <span className="t-body contact-submit-label">{label}</span>
      </button>
      {status === "error" && (
        <p className="t-body contact-error" role="alert">
          That didn’t go through. Email me directly at{" "}
          <a href={`mailto:${profile.email}`} className="underline">
            {profile.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
