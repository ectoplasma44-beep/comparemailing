"use client";

import { useState } from "react";
import type { Tool } from "@/data/tools";
import AffiliateButton from "@/components/AffiliateButton";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PricingRow = {
  slug: string;
  nom: string;
  planGratuit: boolean;
  prixDepart: number | null;
  p500: number | null;   // prix pour 500 contacts
  p1k: number | null;    // prix pour 1 000 contacts
  p2k: number | null;    // prix pour 2 000 contacts
  p5k: number | null;    // prix pour 5 000 contacts
};

export type BestPick = {
  label: string;
  tool: Tool;
  prix: string;
};

type Props = {
  rows: PricingRow[];
  bestPicks: BestPick[];
};

// ─── Filter config ────────────────────────────────────────────────────────────

type FilterId = "tous" | "gratuit" | "lt10" | "10-30" | "gt30";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "tous",    label: "Tous" },
  { id: "gratuit", label: "Gratuit" },
  { id: "lt10",    label: "Moins de 10 €" },
  { id: "10-30",   label: "10 – 30 €" },
  { id: "gt30",    label: "Plus de 30 €" },
];

function matchFilter(row: PricingRow, f: FilterId): boolean {
  if (f === "tous")    return true;
  if (f === "gratuit") return row.planGratuit;
  if (f === "lt10")    return row.prixDepart !== null && row.prixDepart < 10;
  if (f === "10-30")   return row.prixDepart !== null && row.prixDepart >= 10 && row.prixDepart <= 30;
  if (f === "gt30")    return row.prixDepart === null || row.prixDepart > 30;
  return true;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function priceLabel(v: number | null): string {
  if (v === null)  return "Devis";
  if (v === 0)     return "0 €";
  return `${v} €`;
}

function Cell({ value, isBest }: { value: number | null; isBest: boolean }) {
  return (
    <td className="px-3 py-3 text-center">
      {isBest && value !== null ? (
        <span className="inline-flex flex-col items-center gap-0.5">
          <span className="font-semibold text-green-700">{priceLabel(value)}</span>
          <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-semibold text-green-700">
            Meilleur prix
          </span>
        </span>
      ) : (
        <span className={`text-sm ${value === null ? "text-gray-400" : "text-gray-700"}`}>
          {priceLabel(value)}
        </span>
      )}
    </td>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function TarifsClient({ rows, bestPicks }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterId>("tous");

  const filtered = rows.filter((r) => matchFilter(r, activeFilter));

  // Best price per column among filtered rows
  function bestOf(vals: (number | null)[]): number | null {
    const nums = vals.filter((v): v is number => v !== null);
    return nums.length > 0 ? Math.min(...nums) : null;
  }

  const best500 = bestOf(filtered.map((r) => r.p500));
  const best1k  = bestOf(filtered.map((r) => r.p1k));
  const best2k  = bestOf(filtered.map((r) => r.p2k));
  const best5k  = bestOf(filtered.map((r) => r.p5k));

  return (
    <div>

      {/* ── Filtres ──────────────────────────────────────────────────────── */}
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              activeFilter === f.id
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-900"
            }`}
          >
            {f.label}
          </button>
        ))}
        {activeFilter !== "tous" && (
          <span className="self-center text-xs text-gray-400">
            {filtered.length} outil{filtered.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* ── Tableau ──────────────────────────────────────────────────────── */}
      <div className="mb-14 overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-max text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="sticky left-0 z-10 min-w-[140px] bg-gray-50 py-3 pl-4 pr-2 text-left font-semibold text-gray-600">
                Outil
              </th>
              <th className="min-w-[90px] px-3 py-3 text-center font-semibold text-gray-600">
                Plan gratuit
              </th>
              <th className="min-w-[100px] px-3 py-3 text-center font-semibold text-gray-600">
                Prix départ
              </th>
              <th className="min-w-[110px] px-3 py-3 text-center font-semibold text-gray-600">
                500 contacts
              </th>
              <th className="min-w-[110px] px-3 py-3 text-center font-semibold text-gray-600">
                1 000 contacts
              </th>
              <th className="min-w-[110px] px-3 py-3 text-center font-semibold text-gray-600">
                2 000 contacts
              </th>
              <th className="min-w-[110px] px-3 py-3 text-center font-semibold text-gray-600">
                5 000 contacts
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <tr
                key={row.slug}
                className={`border-b border-gray-100 ${idx % 2 !== 0 ? "bg-gray-50/50" : ""}`}
              >
                <td className="sticky left-0 z-10 bg-inherit py-3 pl-4 pr-2 font-semibold text-gray-900">
                  <a href={`/alternative/${row.slug}`} className="hover:underline">
                    {row.nom}
                  </a>
                </td>
                <td className="px-3 py-3 text-center">
                  {row.planGratuit ? (
                    <span className="text-green-600">✓</span>
                  ) : (
                    <span className="text-gray-300">✗</span>
                  )}
                </td>
                <td className="px-3 py-3 text-center font-medium text-gray-800">
                  {row.prixDepart === null
                    ? <span className="text-gray-400">Devis</span>
                    : row.prixDepart === 0
                    ? <span className="text-green-600">0 €</span>
                    : `${row.prixDepart} €/mois`}
                </td>
                <Cell value={row.p500} isBest={row.p500 !== null && row.p500 === best500} />
                <Cell value={row.p1k}  isBest={row.p1k  !== null && row.p1k  === best1k} />
                <Cell value={row.p2k}  isBest={row.p2k  !== null && row.p2k  === best2k} />
                <Cell value={row.p5k}  isBest={row.p5k  !== null && row.p5k  === best5k} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Meilleur prix pour... ─────────────────────────────────────────── */}
      <section>
        <h2 className="mb-6 text-xl font-bold text-gray-900">
          Le moins cher pour chaque usage
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {bestPicks.map((pick) => (
            <div key={pick.label} className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                {pick.label}
              </p>
              <p className="mb-1 text-lg font-bold text-gray-900">{pick.tool.nom}</p>
              <p className="mb-3 text-sm font-semibold text-green-700">{pick.prix}</p>
              <p className="mb-4 text-sm text-gray-600">{pick.tool.descriptionCourte}</p>
              <AffiliateButton tool={pick.tool} variant="outline" />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
