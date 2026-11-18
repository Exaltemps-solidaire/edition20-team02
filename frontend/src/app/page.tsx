import Link from "next/link";
import styles from "./page.module.css";

const PUBLICS = [
  {
    label: "Entreprise mécène",
    title: "Mon entreprise s'engage",
    desc: "Mécénat, partenariat, actions solidaires… Découvrez comment agir ensemble.",
    accent: "#11a2dd",
  },
  {
    label: "Particulier",
    title: "Je veux donner",
    desc: "Don ponctuel, don mensuel, participer à une course… Chaque geste compte.",
    accent: "#e64587",
  },
  {
    label: "Testateur · Legs",
    title: "Préparer un legs ou une donation",
    desc: "Inscrire votre nom dans l'histoire de la recherche, pour les générations futures.",
    accent: "#ec64a0",
  },
  {
    label: "Organisateur",
    title: "Lancer mon action solidaire",
    desc: "+200 actions organisées chaque année. Kit, conseils, visibilité : on vous accompagne.",
    accent: "#83bce7",
    href: "/organisateur",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Ensemble contre les cancers pédiatriques</h1>
      <p className={styles.subtitle}>Choisissez votre parcours</p>
      <div className={styles.cards}>
        {PUBLICS.map((p) => {
          const content = (
            <>
              <span className={styles.cardLabel}>{p.label}</span>
              <span className={styles.cardTitle}>{p.title}</span>
              <span className={styles.cardDesc}>{p.desc}</span>
            </>
          );
          const style = { "--accent": p.accent } as React.CSSProperties;
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
