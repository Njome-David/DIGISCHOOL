import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

const APP_VERSION = '1.0.0';

export function AboutPage() {
  return (
    <div className="min-h-[100dvh] bg-canvas px-4 py-12">
      <div className="mx-auto max-w-2xl space-y-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700">
          <ArrowLeft size={15} /> Retour a l'accueil
        </Link>

        <div className="surface p-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 text-white">
            <GraduationCap size={30} />
          </div>
          <h1 className="text-xl font-black text-ink">EcoleApp 2026</h1>
          <p className="mt-1 text-sm font-semibold text-ink-soft">
            Plateforme de gestion scolaire bilingue - Version {APP_VERSION}
          </p>
        </div>

        <div className="surface p-6">
          <h2 className="mb-3 text-sm font-black text-ink">A propos</h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            EcoleApp 2026 est une solution complete de gestion d'etablissement primaire bilingue. Elle couvre la gestion
            academique, les inscriptions, la pedagogie, les evaluations, la scolarite, la communication, la discipline et
            la documentation, avec un controle d'acces adapte a chaque profil utilisateur.
          </p>
        </div>

        <div className="surface p-6">
          <h2 className="mb-3 text-sm font-black text-ink">Contact</h2>
          <div className="space-y-2.5">
            <ContactRow icon={MapPin} value="BP 1234, Yaounde, Cameroun" />
            <ContactRow icon={Phone} value="+237 600 00 00 00" />
            <ContactRow icon={Mail} value="contact@ecoleapp.cm" />
          </div>
        </div>

        <div className="surface p-6">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-black text-ink">
            <ShieldCheck size={16} className="text-brand-500" /> Mentions legales
          </h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            Les donnees personnelles collectees sont traitees de maniere confidentielle et utilisees exclusivement dans
            le cadre de la gestion scolaire. Toute reproduction, meme partielle, de cette plateforme est interdite sans
            autorisation prealable.
          </p>
          <p className="mt-4 text-xs font-semibold text-ink-faint">
            (c) {new Date().getFullYear()} EcoleApp - Tous droits reserves.
          </p>
        </div>
      </div>
    </div>
  );
}

function ContactRow({ icon: Icon, value }: { icon: React.ElementType; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-700">
        <Icon size={15} />
      </span>
      <span className="text-sm font-bold text-ink">{value}</span>
    </div>
  );
}
