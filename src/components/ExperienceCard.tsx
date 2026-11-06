import Image from "next/image";
import styles from "./ExperienceCard.module.css";
interface ExperienceCardProps {
  logo: string;
  logoAlt: string;
  title: string;
  company: string;
  subtitle?: string;
  period: string;
  invertLogo?: boolean;
  children: React.ReactNode;
}
export default function ExperienceCard({
  logo,
  logoAlt,
  title,
  company,
  subtitle,
  period,
  invertLogo,
  children,
}: ExperienceCardProps) {
  const education = title === "Brigham Young University";
  return (
    <article className={styles.entry}>
      <div className={styles.heading}>
        <div className={styles.company}>
          <Image
            src={logo}
            alt={logoAlt}
            width={28}
            height={28}
            className={invertLogo ? styles.invert : undefined}
          />
          <h3>{education ? title : company}</h3>
        </div>
        <span className={styles.date}>{period}</span>
      </div>
      <p className={styles.role}>{education ? company : title}</p>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.details}>{children}</div>
    </article>
  );
}
