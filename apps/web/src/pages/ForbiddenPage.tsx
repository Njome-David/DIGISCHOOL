import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, ShieldX } from 'lucide-react';

export function ForbiddenPage() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-canvas px-4">
      <div className="max-w-md text-center">
        <div className="relative mx-auto mb-8 h-40 w-40">
          <div className="absolute inset-0 rounded-full bg-danger/15" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ShieldX size={64} className="text-danger drop-shadow-[0_4px_24px_rgba(220,38,38,0.25)]" />
          </div>
        </div>

        <p className="mb-2 text-sm font-black uppercase tracking-widest text-danger">Erreur 403</p>
        <h1 className="mb-3 text-2xl font-bold text-ink">Acces refuse</h1>
        <p className="mb-8 text-sm leading-relaxed text-ink-soft">
          Vous n'avez pas les autorisations necessaires pour acceder a cette page. Contactez un administrateur si vous
          pensez qu'il s'agit d'une erreur.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={() => navigate(-1)} className="btn-outline">
            <ArrowLeft size={16} /> Page precedente
          </button>
          <Link to="/" className="btn-brand">
            <Home size={16} /> Accueil
          </Link>
        </div>

        <p className="mt-12 text-sm font-extrabold tracking-tight text-brand-500/40">DIGISCHOOL</p>
      </div>
    </div>
  );
}
