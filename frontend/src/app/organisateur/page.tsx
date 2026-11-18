import Link from "next/link";
import styles from "./page.module.css";

const ACTIONS = [
  {
    title: "Télécharger le kit organisateur",
    desc: "Visuels, affiches, modèles de communication prêts à l'emploi",
  },
  {
    title: "Déclarer mon action",
    desc: "Référencée sur le site, mise en avant sur les réseaux",
  },
  {
    title: "Trouver l'inspiration",
    desc: "Vente solidaire, tournoi, spectacle, marche… des idées pour tous",
  },
];

export default function Organisateur() {
  return (
    <div className={styles.page}>
      <Link href="/" className={styles.back}>
        ← Retour
      </Link>

      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroPill}>🎪 Organisateur</span>
          <h1 className={styles.heroTitle}>Lancez votre action solidaire</h1>
          <p className={styles.heroDesc}>
            +200 actions organisées chaque année au profit d&apos;Imagine for
            Margo. Téléchargez votre kit et rejoignez le mouvement.
          </p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>+200</div>
              <div className={styles.statLabel}>actions solidaires en 2024</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>1 800</div>
              <div className={styles.statLabel}>bénévoles mobilisés</div>
            </div>
          </div>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>🦋 Votre parcours</h2>
      <div className={styles.actions}>
        {ACTIONS.map((a) => (
          <div key={a.title} className={styles.action}>
            <span className={styles.actionTitle}>{a.title}</span>
            <span className={styles.actionDesc}>{a.desc}</span>
          </div>
        ))}
      </div>

      <div className={styles.cta}>
        <div className={styles.ctaInner}>
          <p className={styles.ctaTitle}>Prêt à vous lancer ?</p>
          <p className={styles.ctaSub}>On vous accompagne de A à Z, gratuitement</p>
          <span className={styles.ctaButton}>Contacter l&apos;équipe événements</span>
        </div>
      </div>
    </div>
  );
}
