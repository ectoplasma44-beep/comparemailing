import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — CompareMailing",
  description: "Mentions légales du site CompareMailing, comparateur d'outils emailing.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16">

        <a
          href="/"
          className="mb-10 inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Retour à l&apos;accueil
        </a>

        <h1 className="mb-10 text-3xl font-bold text-gray-900">Mentions légales</h1>

        <div className="space-y-8 text-sm leading-relaxed text-gray-600">

          <section>
            <h2 className="mb-3 text-base font-semibold text-gray-900">Éditeur du site</h2>
            <p>
              Ce site est édité par un micro-entrepreneur :<br />
              <strong className="text-gray-800">LUBINO Abimael</strong><br />
              4 rue Jacques Duclos, 44570 Trignac<br />
              E-mail : <a href="mailto:ectoplasma44@gmail.com" className="text-gray-800 underline underline-offset-2 hover:text-gray-600">ectoplasma44@gmail.com</a>
            </p>
            <p className="mt-3">
              Statut : micro-entrepreneur — régime de la franchise en base de TVA (article 293 B du CGI).<br />
              À ce titre, la TVA n&apos;est pas applicable sur les prestations et aucun numéro de TVA intracommunautaire n&apos;est applicable.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-gray-900">Hébergeur</h2>
            <p>
              Vercel Inc.<br />
              340 Pine Street, Suite 701<br />
              San Francisco, CA 94104<br />
              États-Unis<br />
              <a href="https://vercel.com" className="text-gray-800 underline underline-offset-2 hover:text-gray-600" rel="noopener noreferrer" target="_blank">vercel.com</a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-gray-900">Activité</h2>
            <p>
              CompareMailing est un comparateur d&apos;outils SaaS spécialisé dans l&apos;emailing. Le site propose des comparatifs, des recommandations par profil et des simulateurs de coût pour aider les professionnels à choisir leur outil emailing.
            </p>
            <p className="mt-3">
              Le site est monétisé par affiliation : certains liens sont des liens affiliés. Une commission peut être perçue si un utilisateur souscrit à un service via ces liens, sans surcoût pour lui. Les liens affiliés sont identifiés par l&apos;attribut <code className="rounded bg-gray-100 px-1 font-mono">rel=&quot;sponsored&quot;</code>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-gray-900">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus du site (textes, données, graphiques) est la propriété de l&apos;éditeur, sauf mention contraire. Toute reproduction ou représentation, totale ou partielle, est interdite sans autorisation préalable.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-gray-900">Responsabilité</h2>
            <p>
              L&apos;éditeur s&apos;efforce de maintenir les informations à jour mais ne garantit pas l&apos;exactitude, l&apos;exhaustivité ou l&apos;actualité des données tarifaires et fonctionnelles présentées. Les prix et offres des outils comparés peuvent évoluer sans préavis.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-gray-900">Contact</h2>
            <p>
              Pour toute question relative au site :{" "}
              <a href="mailto:ectoplasma44@gmail.com" className="text-gray-800 underline underline-offset-2 hover:text-gray-600">ectoplasma44@gmail.com</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
