export default function SkillBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border-subtle bg-bg-card px-4 py-2 text-[0.85rem] text-text-secondary transition-all duration-200 hover:border-border-subtle-hover hover:bg-bg-card-hover hover:text-text-primary">
      {children}
    </span>
  );
}
