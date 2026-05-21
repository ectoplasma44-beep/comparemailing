import { ImageResponse } from "next/og";

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
          backgroundColor: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Accent strip top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "linear-gradient(90deg, #4F46E5 0%, #0B96E5 50%, #09C167 100%)",
            display: "flex",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: "#111827",
              letterSpacing: "-2px",
            }}
          >
            ToolPick
          </span>
          <span style={{ fontSize: 80, color: "#4F46E5", fontWeight: 800 }}>.</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            color: "#6B7280",
            fontWeight: 400,
            marginBottom: 48,
          }}
        >
          Comparateur d&apos;outils emailing
        </div>

        {/* Stats pills */}
        <div style={{ display: "flex", gap: 16 }}>
          {[
            "22 comparatifs",
            "10 outils analysés",
            "15 profils couverts",
          ].map((stat) => (
            <div
              key={stat}
              style={{
                display: "flex",
                backgroundColor: "#F3F4F6",
                borderRadius: 100,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 20,
                paddingRight: 20,
                fontSize: 22,
                color: "#374151",
                fontWeight: 600,
              }}
            >
              {stat}
            </div>
          ))}
        </div>

        {/* URL bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            right: 48,
            fontSize: 22,
            color: "#9CA3AF",
            display: "flex",
          }}
        >
          toolpick.fr
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
