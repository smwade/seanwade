export default function Footer() {
  return (
    <footer className="mx-auto max-w-[800px] border-t border-border-subtle px-8 pt-8 pb-8 text-center max-sm:px-5">
      <p className="text-xs text-text-tertiary">
        &copy; {new Date().getFullYear()} Sean Wade
      </p>
    </footer>
  );
}
