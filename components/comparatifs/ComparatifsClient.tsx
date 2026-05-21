"use client";

import { useState } from "react";
import { getVsPageSlug } from "@/data/tools";

type Pair = [string, string];

type Props = {
  combinations: Pair[];
  nameMap: Record<string, string>;
};

const POPULAR = new Set(["brevo-vs-mailchimp", "mailchimp-vs-mailerlite"]);

const FILTER_TOOLS = [
  { slug: "tous", label: "Tous" },
  { slug: "brevo", label: "Brevo" },
  { slug: "mailchimp", label: "Mailchimp" },
  { slug: "mailerlite", label: "MailerLite" },
  { slug: "getresponse", label: "GetResponse" },
  { slug: "systemeio", label: "Systeme.io" },
];

export default function ComparatifsClient({ combinations, nameMap }: Props) {
  const [active, setActive] = useState("tous");

  const filtered =
    active === "tous"
      ? combinations
      : combinations.filter(([a, b]) => a === active || b === active);

  return (
    <div>
      {/* ── FILTRES ──────────────────────────────────────────────────────── */}
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTER_TOOLS.map((f) => (
          <button
            key={f.slug}
            onClick={() => setActive(f.slug)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              active === f.slug
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-900"
            }`}
          >
            {f.label}
          </button>
        ))}
        {active !== "tous" && (
          <span className="self-center text-xs text-gray-400">
            {filtered.length} comparatif{filtered.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* ── GRID ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(([a, b]) => {
          const slug = getVsPageSlug(a, b);
          const isPopular = POPULAR.has(slug);
          const nomA = nameMap[a] ?? a;
          const nomB = nameMap[b] ?? b;

          return (
            <a
              key={slug}
              href={`/${slug}`}
              className={`group relative flex items-center justify-between rounded-xl border px-5 py-4 transition-all hover:shadow-sm ${
                isPopular
                  ? "border-indigo-200 bg-indigo-50 hover:border-indigo-300"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              {isPopular && (
                <span className="absolute right-3 top-3 rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                  Populaire
                </span>
              )}
              <div>
                <p className="pr-16 font-semibold text-gray-900">
                  {nomA}{" "}
                  <span className="font-normal text-gray-400">vs</span>{" "}
                  {nomB}
                </p>
                <p className="mt-0.5 text-xs text-gray-400">
                  Comparatif complet
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-gray-300 transition-colors group-hover:text-gray-600"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-gray-400">
          Aucun comparatif trouvé pour cet outil.
        </p>
      )}
    </div>
  );
}
