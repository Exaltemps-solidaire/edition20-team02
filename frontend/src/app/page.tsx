import Link from "next/link";
import styles from "./page.module.css";

const PUBLICS = [
  {
    label: "Entreprise mécène",
    title: "Mon entreprise s'engage",
    desc: "Mécénat, partenariat, actions solidaires… Découvrez comment agir ensemble.",
    accent: "#11a2dd",
    labelColor: "#11a2dd",
    arrowBg: "#e0ecfa",
  },
  {
    label: "Particulier",
    title: "Je veux donner",
    desc: "Don ponctuel, don mensuel, participer à une course… Chaque geste compte.",
    accent: "#e64587",
    labelColor: "#e64587",
    arrowBg: "#fde8f2",
  },
  {
    label: "Testateur · Legs",
    title: "Préparer un legs ou une donation",
    desc: "Inscrire votre nom dans l'histoire de la recherche, pour les générations futures.",
    accent: "#ec64a0",
    labelColor: "#ec64a0",
    arrowBg: "#fde8f2",
  },
  {
    label: "Organisateur",
    title: "Lancer mon action solidaire",
    desc: "+200 actions organisées chaque année. Kit, conseils, visibilité : on vous accompagne.",
    accent: "#83bce7",
    labelColor: "#2a7bab",
    arrowBg: "#e0ecfa",
    href: "/organisateur",
  },
];

function Logo() {
  return (
    <svg className={styles.logo} viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="11" cy="16" rx="9" ry="6" fill="#EC64A0" transform="rotate(-25 11 16)" />
      <ellipse cx="27" cy="16" rx="9" ry="6" fill="#11A2DD" transform="rotate(25 27 16)" />
      <ellipse cx="11" cy="24" rx="7" ry="5" fill="#F29EC1" transform="rotate(20 11 24)" />
      <ellipse cx="27" cy="24" rx="7" ry="5" fill="#83BCE7" transform="rotate(-20 27 24)" />
      <ellipse cx="19" cy="19" rx="2.5" ry="4" fill="#575756" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h8M7 3l4 4-4 4" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <Logo />
        <div className={styles.logoText}>
          <span className={styles.imagine}>IMAGINE</span>
          <span className={styles.forMargo}>for Margo</span>
        </div>
      </header>

      <div className={styles.hero}>
        <p className={styles.heroTagline}>Go · Fight · Win</p>
        <h1 className={styles.heroTitle}>
          Ensemble contre les
          <br />
          <span>cancers des enfants</span>
        </h1>
        <p className={styles.heroSubtitle}>Trouvez votre parcours en un clic</p>
      </div>

      <div className={styles.sectionLabel}>
        <span>🦋</span>
        <span>Toutes les portes d&apos;entrée</span>
      </div>
      <p className={styles.sectionTitle}>Choisissez votre parcours</p>

      <div className={styles.cards}>
        {PUBLICS.map((p) => {
          const style = {
            "--accent": p.accent,
            "--label": p.labelColor,
            "--arrow-bg": p.arrowBg,
          } as React.CSSProperties;
          const content = (
            <>
              <div className={styles.cardAccent} />
              <div className={styles.cardBody}>
                <div className={styles.cardHeaderRow}>
                  <span className={styles.cardLabel}>{p.label}</span>
                  <span className={styles.cardArrow}>
                    <Arrow />
                  </span>
                </div>
                <div className={styles.cardTitle}>{p.title}</div>
                <div className={styles.cardDesc}>{p.desc}</div>
              </div>
            </>
          );
          return p.href ? (
            <Link key={p.label} href={p.href} className={styles.card} style={style}>
              {content}
            </Link>
          ) : (
            <div key={p.label} className={styles.card} style={style}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
