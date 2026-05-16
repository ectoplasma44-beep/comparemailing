"use client";

import { useState, useMemo } from "react";
import type { Tool, PricingTier } from "@/data/tools";
import AffiliateButton from "@/components/AffiliateButton";

type ResultRow = {
  tool: Tool;
  tier: PricingTier | null;
  surDevis: boolean;
  prix: number | null;
};

function findBestTier(
  tool: Tool,
  contacts: number,
  emailsMois: number
): { tier: PricingTier | null; surDevis: boolean; prix: number | null } {
  const eligible = tool.pricing.filter((tier) => {
    const contactsOk = tier.contacts === null || contacts <= tier.contacts;
    const emailsOk = tier.emailsMois === null || emailsMois <= tier.emailsMois;
    return contactsOk && emailsOk;
  });

  if (eligible.length === 0) return { tier: null, surDevis: true, prix: null };

  const withPrice = eligible.filter((t) => t.prixMois !== null);
  if (withPrice.length === 0) return { tier: eligible[0], surDevis: true, prix: null };

  const cheapest = withPrice.reduce((a, b) => (a.prixMois! <= b.prixMois! ? a : b));
  return { tier: cheapest, surDevis: false, prix: cheapest.prixMois };
}

export default function SimulateurClient({ tools }: { tools: Tool[] }) {
  const [contacts, setContacts] = useState(1000);
  const [frequence, setFrequence] = useState(2);

  const emailsMois = contacts * frequence;

  const results = useMemo<ResultRow[]>(() => {
    return tools
      .map((tool) => ({ tool, ...findBestTier(tool, contacts, emailsMois) }))
      .sort((a, b) => {
        if (a.prix === null && b.prix === null) return 0;
        if (a.prix === null) return 1;
        if (b.prix === null) return -1;
        return a.prix - b.prix;
      });
  }, [tools, contacts, emailsMois]);

  // Cheapest paid tool among those with noteGlobale > 4
  const bestValueSlug = useMemo(() => {
    const candidates = results.filter(
      (r) => r.prix !== null && r.prix > 0 && r.tool.noteGlobale > 4
    );
    return candidates.length > 0 ? candidates[0].tool.slug : null;
  }, [results]);

  return (
    <div>
      {/* ── Inputs ─────────────────────────────────────────────────────────── */}
      <div className="mb-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
        <div className="space-y-8">

          <div>
            <div className="mb-3 flex items-baseline justify-between">
              <label htmlFor="slider-contacts" className="text-sm font-semibold text-gray-700">
                Nombre de contacts
              </label>
              <span className="text-2xl font-bold tabular-nums text-gray-900">
                {contacts.toLocaleString("fr-FR")}
              </span>
            </div>
            <input
              id="slider-contacts"
              type="range"
              min={0}
              max={50000}
              step={500}
              value={contacts}
              onChange={(e) => setContacts(Number(e.target.value))}
              className="w-full accent-gray-900"
            />
            <div className="mt-1.5 flex justify-between text-xs text-gray-400">
              <span>0</span>
              <span>10 000</span>
              <span>25 000</span>
              <span>50 000</span>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-baseline justify-between">
              <label htmlFor="slider-frequence" className="text-sm font-semibold text-gray-700">
                Fréquence d&apos;envoi
              </label>
              <span className="text-2xl font-bold tabular-nums text-gray-900">
                {frequence}
                <span className="ml-1 text-sm font-normal text-gray-500">
                  email{frequence > 1 ? "s" : ""}/mois
                </span>
              </span>
            </div>
            <input
              id="slider-frequence"
              type="range"
              min={1}
              max={12}
              step={1}
              value={frequence}
              onChange={(e) => setFrequence(Number(e.target.value))}
              className="w-full accent-gray-900"
            />
            <div className="mt-1.5 flex justify-between text-xs text-gray-400">
              <span>1×</span>
              <span>4×</span>
              <span>8×</span>
              <span>12×</span>
            </div>
          </div>

        </div>

        <div className="mt-6 rounded-xl border border-gray-200 bg-white px-5 py-4 text-center text-sm text-gray-500">
          Vous avez{" "}
          <strong className="text-gray-900">{contacts.toLocaleString("fr-FR")} contacts</strong>{" "}
          et envoyez{" "}
          <strong className="text-gray-900">
            {emailsMois.toLocaleString("fr-FR")} emails/mois
          </strong>
        </div>
      </div>

      {/* ── Results ────────────────────────────────────────────────────────── */}
      <div className="space-y-3">
        {results.map((row, index) => {
          const isFirst = index === 0 && !row.surDevis;
          const isBestValue = row.tool.slug === bestValueSlug;

          return (
            <div
              key={row.tool.slug}
              className={`rounded-xl border p-5 transition-shadow ${
                isFirst
                  ? "border-gray-900 bg-white shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">

                {/* Rang + identité */}
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span className="w-5 shrink-0 text-right text-sm font-bold text-gray-300">
                    {index + 1}
                  </span>
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: row.tool.couleurBrand }}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900">{row.tool.nom}</p>
                    {row.tier && (
                      <p className="truncate text-xs text-gray-400">
                        Plan {row.tier.nom}
                        {row.tier.note ? ` — ${row.tier.note}` : ""}
                      </p>
                    )}
                    {!row.tier && row.surDevis && (
                      <p className="text-xs text-gray-400">Volume non couvert par les plans affichés</p>
                    )}
                  </div>
                </div>

                {/* Badges */}
                <div className="flex shrink-0 flex-wrap gap-2">
                  {row.prix === 0 && (
                    <span className="rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                      Gratuit
                    </span>
                  )}
                  {isBestValue && (
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                      Meilleur rapport qualité-prix
                    </span>
                  )}
                  {isFirst && row.prix !== null && row.prix > 0 && (
                    <span className="rounded-full border border-gray-800 bg-gray-900 px-2.5 py-0.5 text-xs font-medium text-white">
                      #1 le moins cher
                    </span>
                  )}
                </div>

                {/* Prix */}
                <div className="shrink-0 sm:min-w-[6rem] sm:text-right">
                  {row.surDevis ? (
                    <span className="text-sm text-gray-400">Sur devis</span>
                  ) : row.prix === 0 ? (
                    <span className="text-2xl font-bold text-green-600">0 €</span>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">
                      {row.prix} €
                      <span className="text-sm font-normal text-gray-400">/mois</span>
                    </span>
                  )}
                </div>

                {/* CTA */}
                <div className="shrink-0 sm:w-44">
                  <AffiliateButton
                    tool={row.tool}
                    variant="outline"
                    label={row.tool.planGratuit || row.prix === 0 ? `Essayer gratuitement` : `Découvrir ${row.tool.nom}`}
                  />
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
