import { pageMetadata } from "@/lib/metadata";
import ProjectLibrary from "@/components/ProjectLibrary";

export const metadata = pageMetadata(
  "Project library",
  "Apps, research, useful tools, and experiments by Sean Wade. Explore PulsHealth, Watch Workout Pro, Friend Flex, and more.",
  "/projects/",
);

export default function ProjectsPage() {
  return <ProjectLibrary />;
}
