import { ImageResponse } from "next/og";
import { getToolBySlug, VS_COMBINATIONS, getVsPageSlug } from "@/data/tools";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return VS_COMBINATIONS.map(([slugA, slugB]) => ({
    vs: getVsPageSlug(slugA, slugB),
  }));
}

export default async function Image({ params }: { params: Promise<{ vs: string }> }) {
  const { vs } = await params;
  const parts = vs.split("-vs-");
  const toolA = parts[0] ? getToolBySlug(parts[0]) : null;
  const toolB = parts[1] ? getToolBySlug(parts[1]) : null;

  const nomA = toolA?.nom ?? parts[0] ?? "Outil A";
  const nomB = toolB?.nom ?? parts[1] ?? "Outil B";
  const colorA = toolA?.couleurBrand ?? "#4F46E5";
  const colorB = toolB?.couleurBrand ?? "#0B96E5";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Brand color bars — left edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: 12,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flex: 1, backgroundColor: colorA, display: "flex" }} />
          <div style={{ flex: 1, backgroundColor: colorB, display: "flex" }} />
        </div>

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            display: "flex",
          }}
        >
          <div style={{ flex: 1, backgroundColor: colorA, display: "flex" }} />
          <div style={{ flex: 1, backgroundColor: colorB, display: "flex" }} />
        </div>

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
              color: "#94A3B8",
              fontWeight: 500,
              marginBottom: 20,
              textTransform: "uppercase",
              letterSpacing: "3px",
              display: "flex",
            }}
          >
            Comparatif
          </div>

          {/* VS title */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
              marginBottom: 32,
            }}
          >
            <span
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: colorA,
                letterSpacing: "-1px",
              }}
            >
              {nomA}
            </span>
            <span
              style={{
                fontSize: 48,
                fontWeight: 400,
                color: "#475569",
              }}
            >
              vs
            </span>
            <span
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: colorB,
                letterSpacing: "-1px",
              }}
            >
              {nomB}
            </span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 30,
              color: "#94A3B8",
              fontWeight: 400,
              display: "flex",
            }}
          >
            Comparatif complet — prix, fonctionnalités, verdict
          </div>
        </div>

        {/* Bottom: toolpick.fr */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            right: 56,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 26, color: "#4F46E5", fontWeight: 800 }}>
            ToolPick
          </span>
          <span style={{ fontSize: 26, color: "#334155", fontWeight: 400 }}>
            .fr
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
