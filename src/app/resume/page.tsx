import { pageMetadata } from "@/lib/metadata";
import ResumeContent from "@/components/ResumeContent";
export const metadata = pageMetadata(
  "Résumé",
  "Sean Wade’s experience, research, and skills.",
  "/resume/",
);
export default function Resume() {
  return (
    <>
      <h1 className="mb-10 text-4xl font-semibold tracking-tight">Sean Wade</h1>
      <ResumeContent />
    </>
  );
}
