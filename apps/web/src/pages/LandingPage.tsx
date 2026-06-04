import { Link } from 'react-router-dom';
import {
  GraduationCap,
  DollarSign,
  MessageSquare,
  BarChart2,
  MapPin,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import authBg from '@/assets/auth-bg.png';

const FEATURES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: GraduationCap, title: 'Gestion academique', desc: 'Classes, matieres, emplois du temps, bulletins automatiques.' },
  { icon: DollarSign, title: 'Suivi Financier', desc: 'Frais de scolarite, recus, alertes de retard de paiement.' },
  { icon: MessageSquare, title: 'Communication', desc: 'Messagerie ciblee, notifications, accuses de lecture.' },
  { icon: BarChart2, title: 'Statistiques & rapports', desc: 'Tableaux de bord, graphiques de progression, discipline.' },
  { icon: MapPin, title: 'Geolocalisation', desc: 'Transport scolaire optimise.' },
  { icon: ShieldCheck, title: 'Securite & roles', desc: 'Authentification JWT, acces par role.' },
];

export function LandingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-canvas">
      <header
        className="sticky top-0 z-30 flex items-center justify-between border-b px-6 py-3 lg:px-12"
        style={{ backgroundColor: '#EFF7F6', borderColor: '#D5E8E5' }}
      >
        <h1 className="text-xl font-black tracking-tight text-brand-500">DIGISCHOOL</h1>
        <nav className="hidden items-center gap-7 md:flex">
          {['Livres', 'Accueil', 'A propos'].map((l) => (
            <a key={l} href="#" className="font-display text-xs font-bold text-ink transition-opacity hover:opacity-60">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-full bg-info px-4 py-1.5 text-xs font-black text-white transition-opacity hover:opacity-90"
          >
            Connexion
          </Link>
          <Link
            to="/login"
            className="hidden rounded-full border border-brand-500 px-4 py-1.5 text-xs font-black text-brand-500 transition-colors hover:bg-white sm:block"
          >
            S'inscrire
          </Link>
        </div>
      </header>

      <section className="relative flex flex-1 flex-col items-center px-4 pb-28 pt-14">
        <div className="absolute inset-0 overflow-hidden">
          <img src={authBg} alt="" className="pointer-events-none h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'rgba(248,244,253,0.72)' }} />
        </div>

        <div className="relative z-10 mb-10 text-center">
          <h2 className="mb-3 text-2xl font-black tracking-tight text-ink md:text-4xl">
            Des outils penses pour l'efficacite
          </h2>
          <p className="mx-auto max-w-lg font-display text-sm leading-relaxed text-ink-soft md:text-base">
            Une plateforme tout-en-un pour gerer votre ecole primaire avec simplicite et confiance.
          </p>
        </div>

        <div className="relative z-10 mb-10 grid w-full max-w-xl grid-cols-2 gap-4 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex flex-col items-center gap-2.5 rounded-2xl bg-white p-4 text-center shadow-card transition-transform duration-200 ease-spring hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-brand-500">
                <f.icon size={24} />
              </div>
              <div>
                <p className="mb-1 text-[13px] font-black text-ink">{f.title}</p>
                <p className="font-display text-[11px] leading-snug text-ink-soft">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl bg-brand-500 px-8 py-5 shadow-card-hover">
          <p className="text-center text-lg font-black text-white">Pret a nous rejoindre ?</p>
          <div className="flex gap-6">
            {["S'inscrire", 'Connexion'].map((label) => (
              <Link
                key={label}
                to="/login"
                className="rounded-full bg-white px-5 py-1.5 text-sm font-bold text-ink shadow-card transition-opacity hover:opacity-90"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer
        className="flex items-center justify-between border-t px-8 py-3"
        style={{ backgroundColor: '#EFF7F6', borderColor: '#D5E8E5' }}
      >
        <span className="text-lg font-black text-brand-500">DIGISCHOOL</span>
        <div className="flex gap-8">
          {['Contact', 'Aide', 'A propos'].map((l) => (
            <a key={l} href="#" className="font-display text-sm text-ink transition-opacity hover:opacity-60">
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
