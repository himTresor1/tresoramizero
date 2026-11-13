import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: profile.meta.title,
    short_name: profile.fullName,
    description: profile.meta.description,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
