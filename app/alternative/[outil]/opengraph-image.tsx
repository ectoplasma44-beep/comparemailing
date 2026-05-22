import { ImageResponse } from "next/og";
import { getToolBySlug, getAllTools } from "@/data/tools";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllTools().map((tool) => ({ outil: tool.slug }));
}

export default async function Image({ params }: { params: Promise<{ outil: string }> }) {
  const { outil } = await params;
  const tool = getToolBySlug(outil);
  const nom = tool?.nom ?? outil;
  const color = tool?.couleurBrand ?? "#4F46E5";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundColor: color,
            display: "flex",
          }}
        />

        {/* Left accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: 8,
            backgroundColor: color,
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: 80,
            paddingRight: 80,
          }}
        >
          {/* Label */}
          <div
            style={{
              fontSize: 22,
              color: "#9CA3AF",
              fontWeight: 500,
              marginBottom: 20,
              textTransform: "uppercase",
              letterSpacing: "3px",
              display: "flex",
            }}
          >
            Alternatives emailing
          </div>

          {/* H1 */}
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: "#111827",
              letterSpacing: "-2px",
              marginBottom: 28,
              display: "flex",
            }}
          >
            Alternative à{" "}
            <span style={{ color, marginLeft: 20 }}>{nom}</span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 30,
              color: "#6B7280",
              fontWeight: 400,
              display: "flex",
            }}
          >
            Les meilleures alternatives comparées — prix et fonctionnalités
          </div>
        </div>

        {/* Bottom right: toolpick.fr */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            right: 56,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ fontSize: 26, fontWeight: 800, color: "#111827" }}>
            ToolPick
          </span>
          <span style={{ fontSize: 26, fontWeight: 800, color }}>.</span>
          <span style={{ fontSize: 26, fontWeight: 400, color: "#9CA3AF" }}>
            fr
          </span>
        </div>

        {/* Bottom left: pays badge */}
        {tool?.pays && (
          <div
            style={{
              position: "absolute",
              bottom: 36,
              left: 56,
              display: "flex",
              backgroundColor: "#F3F4F6",
              borderRadius: 100,
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 18,
              paddingRight: 18,
              fontSize: 20,
              color: "#6B7280",
              fontWeight: 500,
            }}
          >
            {tool.pays} · {tool.noteGlobale}/5 ★
          </div>
        )}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
