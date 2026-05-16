import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — CompareMailing",
  description: "Politique de confidentialité et gestion des données personnelles de CompareMailing.",
  alternates: { canonical: "/politique-confidentialite" },
};

export default function PolitiqueConfidentialitePage() {
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

        <h1 className="mb-2 text-3xl font-bold text-gray-900">Politique de confidentialité</h1>
        <p className="mb-10 text-sm text-gray-400">Dernière mise à jour : mai 2026</p>

        <div className="space-y-8 text-sm leading-relaxed text-gray-600">

          <section>
            <h2 className="mb-3 text-base font-semibold text-gray-900">Données collectées</h2>
            <p>
              CompareMailing ne collecte <strong className="text-gray-800">aucune donnée personnelle directement</strong>. Le site ne propose pas de formulaire d&apos;inscription, pas de newsletter, pas de compte utilisateur et pas de formulaire de contact.
            </p>
            <p className="mt-3">
              Aucune donnée nominative (nom, e-mail, adresse) n&apos;est demandée ni stockée par ce site.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-gray-900">Cookies et traceurs</h2>
            <p className="mb-3">
              Le site peut utiliser les traceurs suivants :
            </p>
            <ul className="space-y-3">
              <li className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <p className="font-medium text-gray-800">Google Analytics (optionnel)</p>
                <p className="mt-1 text-gray-500">
                  Si activé, Google Analytics mesure l&apos;audience du site de façon anonymisée (pages vues, durée de session, provenance). Aucune donnée personnelle identifiable n&apos;est transmise. Vous pouvez désactiver le suivi via l&apos;extension officielle Google : <a href="https://tools.google.com/dlpage/gaoptout" className="text-gray-800 underline underline-offset-2 hover:text-gray-600" rel="noopener noreferrer" target="_blank">tools.google.com/dlpage/gaoptout</a>.
                </p>
              </li>
              <li className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <p className="font-medium text-gray-800">Cookies de session Next.js</p>
                <p className="mt-1 text-gray-500">
                  Le framework Next.js peut déposer des cookies techniques nécessaires au bon fonctionnement du site. Ces cookies ne contiennent pas de données personnelles et expirent à la fermeture du navigateur.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-gray-900">Liens affiliés et tracking partenaires</h2>
            <p>
              Certains liens du site sont des liens affiliés vers des outils tiers (Systeme.io, GetResponse, MailerLite, etc.). Lorsque vous cliquez sur ces liens, vous êtes redirigé vers le site du partenaire qui peut déposer ses propres cookies de tracking pour attribuer une éventuelle commission.
            </p>
            <p className="mt-3">
              Ce tracking est effectué exclusivement par les partenaires affiliés, dans le cadre de leur propre politique de confidentialité. CompareMailing n&apos;a pas accès aux données ainsi collectées.
            </p>
            <p className="mt-3">
              Les liens affiliés sont identifiés par l&apos;attribut <code className="rounded bg-gray-100 px-1 font-mono">rel=&quot;sponsored&quot;</code>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-gray-900">Hébergement</h2>
            <p>
              Le site est hébergé par <strong className="text-gray-800">Vercel Inc.</strong> (340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis). Les données de navigation peuvent être traitées sur des serveurs situés aux États-Unis.
            </p>
            <p className="mt-3">
              Vercel est soumis au RGPD pour ses activités en Europe et fournit des garanties contractuelles adéquates (clauses contractuelles types). Pour plus d&apos;informations : <a href="https://vercel.com/legal/privacy-policy" className="text-gray-800 underline underline-offset-2 hover:text-gray-600" rel="noopener noreferrer" target="_blank">vercel.com/legal/privacy-policy</a>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-gray-900">Vos droits RGPD</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez des droits suivants :
            </p>
            <ul className="mt-3 space-y-1 pl-4">
              {[
                "Droit d'accès à vos données",
                "Droit de rectification des données inexactes",
                "Droit à l'effacement (« droit à l'oubli »)",
                "Droit à la limitation du traitement",
                "Droit à la portabilité",
                "Droit d'opposition",
              ].map((droit) => (
                <li key={droit} className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-gray-300">—</span>
                  <span>{droit}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Pour exercer ces droits ou pour toute question relative à la protection de vos données, contactez-nous à :{" "}
              <a href="mailto:ectoplasma44@gmail.com" className="text-gray-800 underline underline-offset-2 hover:text-gray-600">ectoplasma44@gmail.com</a>
            </p>
            <p className="mt-3">
              Vous pouvez également introduire une réclamation auprès de la <a href="https://www.cnil.fr" className="text-gray-800 underline underline-offset-2 hover:text-gray-600" rel="noopener noreferrer" target="_blank">CNIL</a> si vous estimez que vos droits ne sont pas respectés.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-gray-900">Modifications</h2>
            <p>
              Cette politique peut être mise à jour à tout moment. La date de dernière révision est indiquée en haut de page. Nous vous encourageons à la consulter régulièrement.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
