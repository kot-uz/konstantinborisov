import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const runtime = "edge";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f1f3d 100%)",
          fontFamily: "sans-serif",
          padding: "80px",
        }}
      >
        {/* Blue glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(59,130,246,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Initials badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "72px",
            height: "72px",
            borderRadius: "16px",
            background: "rgba(59,130,246,0.2)",
            border: "1px solid rgba(59,130,246,0.4)",
            marginBottom: "32px",
          }}
        >
          <span style={{ fontSize: "28px", fontWeight: "700", color: "#60a5fa" }}>
            KB
          </span>
        </div>

        <h1
          style={{
            fontSize: "64px",
            fontWeight: "800",
            color: "#f8fafc",
            margin: "0",
            letterSpacing: "-2px",
            textAlign: "center",
          }}
        >
          {site.name}
        </h1>

        <p
          style={{
            fontSize: "28px",
            fontWeight: "500",
            color: "#60a5fa",
            margin: "16px 0 0",
            textAlign: "center",
          }}
        >
          {site.title}
        </p>

        <p
          style={{
            fontSize: "18px",
            color: "#94a3b8",
            margin: "24px 0 0",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: "1.6",
          }}
        >
          {site.description}
        </p>

        <p
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "16px",
            color: "#475569",
          }}
        >
          {site.url.replace("https://", "")}
        </p>
      </div>
    ),
    size
  );
}
