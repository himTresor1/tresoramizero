import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

/** The share card (Open Graph / Twitter): name, role and city on the site's ink colour. */
export const alt = `${profile.fullName} — ${profile.meta.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#121111",
          color: "#ffffff",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#a7a0a0" }}>
          <span>{profile.meta.siteUrl.replace(/^https?:\/\//, "")}</span>
          <span style={{ color: "#ff442b" }}>{"//"} Portfolio</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 132, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>{profile.fullName}</div>
          <div style={{ display: "flex", gap: 20, fontSize: 40, color: "#a7a0a0" }}>
            <span style={{ color: "#ffffff" }}>{profile.meta.jobTitle}</span>
            <span>·</span>
            <span>{profile.location}</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
