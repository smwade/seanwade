import ExperienceCard from "@/components/ExperienceCard";
import SkillBadge from "@/components/SkillBadge";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <header className="mb-10">
        <h1 className="mb-5 text-5xl font-bold tracking-tight text-text-primary max-sm:text-4xl">
          Sean Wade
        </h1>
        <div className="flex flex-col gap-4">
          <p className="text-[1.1rem] leading-[1.8] text-text-secondary">
            Experienced machine learning engineer and scientist. I love solving
            complex problems and taking algorithms all the way from research to
            production. Currently creating the future of personalized health.
            Check out my{" "}
            <a
              href="/assets/sean_wade_resume_2025_updated.pdf"
              download="sean_wade_resume.pdf"
              aria-label="Download Sean Wade's resume in PDF format"
              className="border-b border-transparent text-accent no-underline transition-all duration-200 hover:border-accent hover:text-white"
            >
              resume
            </a>{" "}
            for more details.
          </p>
          <p className="text-[1.1rem] leading-[1.8] text-text-secondary">
            Want to connect? Feel free to reach out at{" "}
            <a
              href="mailto:hello@seanwade.com"
              aria-label="Email Sean Wade at hello@seanwade.com"
              className="border-b border-transparent text-accent no-underline transition-all duration-200 hover:border-accent hover:text-white"
            >
              hello@seanwade.com
            </a>
          </p>
        </div>
      </header>

      {/* Experience */}
      <section className="mb-10">
        <div className="mb-6 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Experience
        </div>

        <ExperienceCard
          logo="/images/Google_Favicon_2025.svg"
          logoAlt="Google logo"
          title="Senior Research Data Scientist"
          company="Google"
          period="July 2025 - Current"
        >
          <BulletList
            items={[
              "Architected and built a Python library for LLM-based quality evaluation framwork, enabling parallel execution of prompt DAGs and automated quality evaluation metrics",
              "Researched novel techniques in meta prompts and agentic workflows; built testing and validation suite to evaluate AI rater quality at scale and measure outcome variability",
              "Created metrics to improve Google Discover recommender system, validating retrieval algorithm quality and performance",
              "Provided technical guidance on experiment design and analysis, identifying meaningful lift across key user sub-cohorts",
            ]}
          />
        </ExperienceCard>

        <ExperienceCard
          logo="/images/Apple_logo_black.svg"
          logoAlt="Apple logo"
          title="Senior Machine Learning Engineer / Data Scientist"
          company="Apple"
          period="Dec 2019 - July 2025"
          invertLogo
        >
          <ul className="list-none space-y-2 text-base text-text-secondary">
            <li className="flex gap-2">
              <span className="mt-0.5 text-text-tertiary">•</span>
              <span>
                Led cross-functional teams in developing, shipping and
                maintaining core on-device ML algorithms to users:
                <ul className="mt-2 ml-4 list-none space-y-1">
                  <li className="flex gap-2 text-[0.95rem]">
                    <span className="text-text-tertiary">•</span>
                    <span>
                      Meal logging tool with food image classification and LLM
                      nutrition feedback
                    </span>
                  </li>
                  <li className="flex gap-2 text-[0.95rem]">
                    <span className="text-text-tertiary">•</span>
                    <span>
                      Personalized workout recommender system using a multi
                      objective loss function and online learning
                    </span>
                  </li>
                  <li className="flex gap-2 text-[0.95rem]">
                    <span className="text-text-tertiary">•</span>
                    <span>
                      Unsupervised walk detection algorithm from steps data
                    </span>
                  </li>
                  <li className="flex gap-2 text-[0.95rem]">
                    <span className="text-text-tertiary">•</span>
                    <span>
                      Contextual notifications engine using routine
                      identification (commute to work, typical workout time, etc)
                    </span>
                  </li>
                </ul>
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-text-tertiary">•</span>
              <span>
                Evaluated performance of ML models with focus on safety,
                robustness and privacy and efficacy communicated tradeoffs to
                partners
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-text-tertiary">•</span>
              <span>
                Architected data schema and privacy preserving data collection
                framework for launch of multiple health related programs and
                research studies (Lumihealth, Heartline, Attain)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-text-tertiary">•</span>
              <span>
                Created application for labeling health data to create datasets
                and provide human feedback for models
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-text-tertiary">•</span>
              <span>
                Built data pipelines to process high volumes of medical claims
                data and health sensor data
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-text-tertiary">•</span>
              <span>
                Designed research studies and experiments to study impact of
                digital interventions and models on hypertension, diabetes,
                asthma, MCI and atrial fibrillation
              </span>
            </li>
          </ul>
        </ExperienceCard>
      </section>

      {/* Research */}
      <section className="mb-10">
        <div className="mb-6 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Research
        </div>

        <ExperienceCard
          logo="/images/BYU_Cougars_logo.svg"
          logoAlt="BYU logo"
          title="Brigham Young University"
          company="Master of Science, Computer Science"
          subtitle="Bachelor of Science, Applied Mathematics"
          period="December 2017"
        >
          <p className="mt-2 text-base text-text-secondary">
            Researched synthetic cancer cell image generation using conditional
            adversarial neural networks and wrote a python library to distribute
            it. Created novel methods for representing medical claims history
            with vector embeddings.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <PublicationLink href="https://ieeexplore.ieee.org/document/8031179">
              Code2Vec: Embedding and Clustering Medical Diagnosis Data
            </PublicationLink>
            <PublicationLink href="https://arxiv.org/abs/1706.02480">
              Forward Thinking: Building and Training Neural Networks One Layer
              at a Time
            </PublicationLink>
            <PublicationLink href="https://github.com/smwade/MediAug">
              MediAug, Toolkit for Semi Supervised Synthetic Cancer Cell Image
              Generation
            </PublicationLink>
          </div>
        </ExperienceCard>
      </section>

      {/* Internships */}
      <section className="mb-10">
        <div className="mb-6 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Internships
        </div>

        <ExperienceCard
          logo="/images/Microsoft_icon.svg"
          logoAlt="Microsoft logo"
          title="AI Platform Engineer Intern"
          company="Microsoft"
          period="Jun 2019 - Sep 2019"
        >
          <BulletList
            items={[
              "Created tools to improve deploying, evaluating, and retraining ML models on Azure",
              "Extended Azure SDK to support MLflow",
            ]}
          />
        </ExperienceCard>

        <ExperienceCard
          logo="/images/Disney_wordmark.svg"
          logoAlt="Disney logo"
          title="Machine Learning Resident"
          company="Disney"
          period="Jan 2018 - May 2018"
          invertLogo
        >
          <BulletList
            items={[
              "Developed recommender system for rides/attractions in Disney World Park app",
              "Created realtime pipelines and dashboards to monitor performance",
            ]}
          />
        </ExperienceCard>

        <ExperienceCard
          logo="/images/loveland-logo.webp"
          logoAlt="Loveland Innovations logo"
          title="Computer Vision Engineer"
          company="Loveland Innovations"
          period="Mar 2017 - Aug 2018"
        >
          <BulletList
            items={[
              "Used drone imaging and photogrammetry to construct 3D models of buildings",
              "Built convolutional neural network to identify and classify roof damage",
            ]}
          />
        </ExperienceCard>
      </section>

      {/* Skills */}
      <section className="mb-10">
        <div className="mb-6 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Skills
        </div>
        <div className="flex flex-wrap gap-3 max-sm:gap-2">
          <SkillBadge>Python, Swift, SQL, C++</SkillBadge>
          <SkillBadge>LLM post training, fine tuning and RLHF</SkillBadge>
          <SkillBadge>LLM evaluation and AI rater systems</SkillBadge>
          <SkillBadge>Prompt engineering and agentic workflows</SkillBadge>
          <SkillBadge>Deep learning (PyTorch, JAX)</SkillBadge>
          <SkillBadge>Distributed systems (Spark, Hadoop, etc)</SkillBadge>
          <SkillBadge>Medical claims and sensor data</SkillBadge>
          <SkillBadge>CV algorithms and tools (OpenCV, PCL)</SkillBadge>
          <SkillBadge>Privacy preserving ML</SkillBadge>
          <SkillBadge>Numerical methods and mathematical modeling</SkillBadge>
        </div>
      </section>
    </>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-none space-y-2 text-base text-text-secondary">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-0.5 text-text-tertiary">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PublicationLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-base text-accent no-underline transition-all duration-200 hover:text-white"
    >
      <span className="text-sm">↗</span>
      {children}
    </a>
  );
}
