"use client";

import type { Tool } from "@/data/tools";


type Props = {
  tool: Tool;
  variant?: "primary" | "outline";
  label?: string;
  className?: string;
};

export default function AffiliateButton({
  tool,
  variant = "primary",
  label,
  className = "",
}: Props) {
  const defaultLabel = tool.planGratuit
    ? `Essayer ${tool.nom} gratuitement`
    : `Découvrir ${tool.nom}`;

  const displayLabel = label ?? defaultLabel;

  const baseStyles =
    "flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variantStyles =
    variant === "primary"
      ? "bg-gray-900 text-white hover:bg-gray-700 focus-visible:ring-gray-900"
      : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 focus-visible:ring-gray-400";

  function handleClick() {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "affiliate_click", {
        tool_slug: tool.slug,
        tool_name: tool.nom,
      });
    }
  }

  return (
    <a
      href={tool.affiliateUrl ?? tool.siteUrl}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      data-tool={tool.slug}
      data-affiliate="true"
      onClick={handleClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      <span>{displayLabel}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
  );
}
