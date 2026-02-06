import Image from "next/image";

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
  return (
    <div className="mb-6 grid grid-cols-[32px_1fr] gap-4 rounded-xl border border-border-subtle bg-bg-card p-6 transition-all duration-300 max-sm:grid-cols-1 max-sm:p-5">
      <Image
        src={logo}
        alt={logoAlt}
        width={32}
        height={32}
        className={`object-contain opacity-70 ${invertLogo ? "invert" : ""}`}
      />
      <div>
        <div className="mb-3 flex items-start justify-between max-sm:flex-col max-sm:gap-1">
          <div className="flex-1">
            <div className="text-base font-semibold text-text-primary">
              {title}
            </div>
            <div className="mt-1 text-[0.9rem] text-text-secondary">
              {company}
            </div>
            {subtitle && (
              <div className="mt-1 text-[0.9rem] text-text-secondary">
                {subtitle}
              </div>
            )}
          </div>
          <div className="ml-4 whitespace-nowrap text-[0.85rem] font-medium text-text-tertiary max-sm:ml-0 max-sm:mt-1">
            {period}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
