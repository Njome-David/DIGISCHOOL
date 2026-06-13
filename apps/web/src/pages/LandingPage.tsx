import { Link } from "react-router-dom";
import { motion } from "motion/react";
//import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowRight, CheckCircle2, BookOpen, Users, BarChart3, ShieldCheck, MapPin, Wallet } from "lucide-react";

const HERO_IMG = "https://images.unsplash.com/photo-1639548538099-6f7f9aec3b92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwcmltYXJ5JTIwc2Nob29sJTIwY2xhc3Nyb29tJTIwZGl2ZXJzZXxlbnwxfHx8fDE3ODEzNDQ0NTd8MA&ixlib=rb-4.1.0&q=80&w=1080";
const FEAT_IMG_1 = "https://images.unsplash.com/photo-1543269664-76bc3997d9ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdXNpbmclMjB0YWJsZXQlMjBjbGFzc3Jvb218ZW58MXx8fHwxNzgxMzQ0NDU3fDA&ixlib=rb-4.1.0&q=80&w=1080";
const FEAT_IMG_2 = "https://images.unsplash.com/photo-1713942590392-598b193afb1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJlbnQlMjBjaGVja2luZyUyMHBob25lJTIwaGFwcHl8ZW58MXx8fHwxNzgxMzQ0NDU3fDA&ixlib=rb-4.1.0&q=80&w=1080";
const FEAT_IMG_3 = "https://images.unsplash.com/photo-1569292567777-e5d61a759322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRpdmVyc2UlMjBzdHVkZW50cyUyMGxlYXJuaW5nfGVufDF8fHx8MTc4MTM0NDQ1N3ww&ixlib=rb-4.1.0&q=80&w=1080";

const METRICS = [
  { label: "Élèves", value: "15k+" },
  { label: "Enseignants", value: "2k+" },
  { label: "Écoles partenaires", value: "50+" },
  { label: "Satisfaction", value: "99%" },
];

const QUICK_FEATURES = [
  { icon: BookOpen, title: "Gestion Académique" },
  { icon: Wallet, title: "Suivi Financier" },
  { icon: Users, title: "Communication" },
  { icon: BarChart3, title: "Statistiques" },
  { icon: MapPin, title: "Géolocalisation" },
  { icon: ShieldCheck, title: "Sécurité" },
];

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-brand-500">DIGISCHOOL</span>
        </div>

        <nav className="hidden md:flex items-center gap-16">
          {["Produit", "Fonctionnalités", "À propos"].map((l) => (
            <a key={l} href="#" className="text-sm font-medium text-foreground/80 hover:text-brand-500 transition-colors">
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden sm:block text-sm font-medium text-foreground hover:text-brand-500 transition-colors">
            Se connecter
          </Link>
          <Link 
            to="/login" 
            className="px-5 py-2 rounded-full text-sm font-semibold bg-brand-500 text-white hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2"
          >
            Démarrer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* ── Hero Section ── */}
        <section className="relative pt-24 pb-16 px-6 lg:px-12 overflow-hidden flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-500 text-xs font-bold tracking-wider uppercase mb-6">
              Nouveau standard éducatif
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
              L'excellence éducative, <br className="hidden md:block" />
              <span className="text-brand-500">simplifiée au quotidien.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Une plateforme tout-en-un conçue pour connecter les enseignants, impliquer les parents et libérer l'administration des tâches chronophages.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link 
                to="/login" 
                className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold bg-brand-500 text-white hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2"
              >
                Commencer maintenant
              </Link>
              <a 
                href="#features" 
                className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold border-2 border-border/60 hover:border-brand-500/30 hover:bg-brand-500/5 text-foreground transition-all flex items-center justify-center"
              >
                Découvrir la plateforme
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full max-w-6xl mx-auto mt-20 relative rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl border border-border/50 aspect-video md:aspect-[21/9] bg-muted"
          >
            <img 
              src={HERO_IMG} 
              alt="Classe d'école primaire moderne avec des élèves attentifs" 
              className="w-full h-full object-cover"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-soft/20 to-transparent pointer-events-none" />
          </motion.div>
        </section>

        {/* ── Social Proof ── */}
        <section className="py-12 border-y border-border/40 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <p className="text-sm font-semibold text-ink-soft uppercase tracking-widest text-center md:text-left">
              Ils nous font confiance
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {METRICS.map((metric, i) => (
                <div key={i} className="flex flex-col items-center md:items-start">
                  <span className="text-3xl font-black text-foreground">{metric.value}</span>
                  <span className="text-sm text-ink-soft font-medium">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quick Features Grid ── */}
        <section id="features" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Un écosystème complet</h2>
            <p className="text-ink-soft max-w-2xl mx-auto">Tout ce dont votre établissement a besoin pour fonctionner de manière optimale, regroupé au même endroit.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {QUICK_FEATURES.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-brand-500" />
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Detailed Features (Scroll Animations) ── */}
        <section className="py-24 px-6 lg:px-12 bg-canvas">
          <div className="max-w-6xl mx-auto flex flex-col gap-32">
            
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex-1 space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-500/10 text-brand-500 text-sm font-semibold">
                  <BookOpen className="w-4 h-4 text-brand-500" /> Pédagogie
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                  La gestion académique, réinventée.
                </h2>
                <p className="text-lg text-ink-soft leading-relaxed">
                  Fini les montagnes de papier. Gérez vos classes, planifiez vos emplois du temps et générez des bulletins clairs et professionnels en quelques clics. Donnez à vos enseignants les outils pour se concentrer sur l'essentiel : la réussite des élèves.
                </p>
                <ul className="space-y-3 pt-2">
                  {["Bulletins automatisés", "Appel numérique en classe", "Cahier de texte partagé"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                      <CheckCircle2 className="w-5 h-5 text-brand-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="flex-1 w-full"
              >
                <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-xl border border-border/50">
                  <img src={FEAT_IMG_1} alt="Enseignant utilisant une tablette" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex-1 space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-500/10 text-brand-500 text-sm font-semibold">
                  <Users className="w-4 h-4 text-brand-500" /> Familles
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                  Rapprochez l'école et la maison.
                </h2>
                <p className="text-lg text-ink-soft leading-relaxed">
                  Offrez aux parents une visibilité totale sur le parcours de leurs enfants. Notifications en temps réel, messagerie directe avec l'équipe pédagogique et suivi des absences : la communication n'a jamais été aussi fluide.
                </p>
                <ul className="space-y-3 pt-2">
                  {["Messagerie sécurisée", "Notifications d'absence", "Partage de documents"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                      <CheckCircle2 className="w-5 h-5 text-brand-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="flex-1 w-full"
              >
                <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-xl border border-border/50">
                  <img src={FEAT_IMG_2} alt="Parent consultant l'application" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex-1 space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-500/10 text-brand-500 text-sm font-semibold">
                  <BarChart3 className="w-4 h-4 text-brand-500" /> Direction
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                  Pilotez votre établissement avec précision.
                </h2>
                <p className="text-lg text-ink-soft leading-relaxed">
                  Gardez le contrôle sur tous les aspects de votre école. Du suivi des paiements aux statistiques de réussite, prenez des décisions éclairées grâce à des tableaux de bord clairs et intuitifs.
                </p>
                <ul className="space-y-3 pt-2">
                  {["Suivi des frais de scolarité", "Tableaux de bord analytiques", "Gestion des rôles (JWT)"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                      <CheckCircle2 className="w-5 h-5 text-brand-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="flex-1 w-full"
              >
                <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-xl border border-border/50">
                  <img src={FEAT_IMG_3} alt="Élèves heureux en classe" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="py-24 px-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-5xl mx-auto rounded-[2rem] bg-brand-500 overflow-hidden relative"
          >
            {/* Background patterns */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-80 h-80 bg-black/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 px-8 py-16 md:py-24 text-center flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 max-w-2xl">
                Prêt à moderniser la gestion de votre école ?
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-xl">
                Rejoignez les dizaines d'établissements qui utilisent DIGISCHOOL pour offrir la meilleure expérience éducative.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link 
                  to="/login" 
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold bg-white text-brand-500 hover:bg-opacity-90 transition-all shadow-lg hover:-translate-y-0.5"
                >
                  Créer mon compte
                </Link>
                <a 
                  href="#" 
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold border-2 border-white/20 text-white hover:bg-white/10 transition-colors"
                >
                  Contacter les ventes
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-canvas border-t border-border/40 py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-500" />
            <span className="text-lg font-bold text-brand-500">DIGISCHOOL</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
            {["Fonctionnalités", "Tarifs", "Aide", "Confidentialité", "Conditions"].map((l) => (
              <a key={l} href="#" className="text-sm text-ink-soft hover:text-brand-500 transition-colors">
                {l}
              </a>
            ))}
          </nav>
          <div className="text-sm text-ink-soft text-center md:text-right">
            &copy; {new Date().getFullYear()} DIGISCHOOL. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
