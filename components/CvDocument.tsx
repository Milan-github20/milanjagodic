import type { CvContent } from "@/lib/cv";

function Gap({ children }: { children: string }) {
  return (
    <span className="ml-2 inline-block rounded border border-dashed border-accent/50 px-1.5 py-0.5 align-middle text-[11px] font-sans font-medium tracking-normal text-accent print:hidden">
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
      {children}
    </h2>
  );
}

function contactHref(item: string): string | undefined {
  if (item.includes("@")) return `mailto:${item}`;
  if (item.startsWith("http")) return item;
  return undefined;
}

function contactLabel(item: string): string {
  if (item.includes("linkedin.com")) return "LinkedIn";
  if (item.includes("github.com")) return "GitHub";
  if (item.startsWith("http")) return item.replace(/^https?:\/\//, "");
  return item;
}

function ContactBits({ cv }: { cv: CvContent }) {
  const items = [
    cv.location,
    cv.email,
    cv.phone,
    cv.github,
    cv.linkedin,
    cv.website,
  ].filter(Boolean);

  return (
    <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted">
      {items.map((item, i) => {
        const href = contactHref(item);
        const label = contactLabel(item);
        return (
          <span key={item} className="flex items-center gap-3">
            {i > 0 ? <span className="text-line">·</span> : null}
            {href ? (
              <a href={href} className="hover:text-accent" rel="noreferrer">
                {label}
              </a>
            ) : (
              label
            )}
          </span>
        );
      })}
    </p>
  );
}

export function CvDocument({
  cv,
  labels,
}: {
  cv: CvContent;
  labels: {
    experience: string;
    work: string;
    education: string;
    skills: string;
    languages: string;
    addRole: string;
    addBullets: string;
    addProgram: string;
  };
}) {
  return (
    <article className="cv-sheet relative overflow-hidden rounded-2xl border border-line bg-surface px-8 py-10 sm:px-12 sm:py-12 print:rounded-none print:border-0 print:px-0 print:py-0">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent print:hidden" />

      <header className="border-b border-line pb-8">
        <p className="text-sm font-medium text-accent">{cv.title}</p>
        <h1 className="mt-3 font-display text-5xl leading-[0.9] tracking-tight text-ink sm:text-6xl">
          {cv.name.split(" ")[0]}{" "}
          <span className="italic text-accent">
            {cv.name.split(" ").slice(1).join(" ")}
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-[15px] leading-7 text-muted">
          {cv.summary}
        </p>
        <ContactBits cv={cv} />
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
        <div className="flex flex-col gap-10">
          <section>
            <SectionLabel>{labels.experience}</SectionLabel>
            <div className="flex flex-col gap-7">
              {cv.experience.map((job) => (
                <div key={`${job.company}-${job.start}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-2xl text-ink">
                      {job.company}
                      {job.role ? (
                        <span className="ml-2 font-sans text-sm text-muted">
                          · {job.role}
                        </span>
                      ) : (
                        <Gap>{labels.addRole}</Gap>
                      )}
                    </h3>
                    <p className="shrink-0 text-sm text-muted">
                      {job.start} – {job.end}
                    </p>
                  </div>
                  {job.location ? (
                    <p className="mt-1 text-sm text-muted/80">{job.location}</p>
                  ) : null}
                  {job.bullets.length > 0 ? (
                    <ul className="mt-3 flex flex-col gap-1.5 text-[15px] leading-6 text-muted">
                      {job.bullets.map((bullet) => (
                        <li key={bullet} className="pl-4">
                          <span className="-ml-4 mr-2 text-accent">–</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 print:hidden">
                      <Gap>{labels.addBullets}</Gap>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel>{labels.work}</SectionLabel>
            <div className="flex flex-col gap-7">
              {cv.projects.map((project) => (
                <div key={project.name}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-2xl text-ink">
                      {project.name}
                    </h3>
                    <p className="shrink-0 text-sm text-muted">{project.year}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {project.role}
                    <span className="mx-2 text-line">·</span>
                    <a
                      href={project.url}
                      className="text-accent underline-offset-2 hover:underline"
                    >
                      {project.url.replace(/^https?:\/\//, "")}
                    </a>
                  </p>
                  <p className="mt-2 text-[15px] leading-6 text-ink/90">
                    {project.summary}
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5 text-[15px] leading-6 text-muted">
                    {project.bullets.map((bullet) => (
                      <li key={bullet} className="pl-4">
                        <span className="-ml-4 mr-2 text-accent">–</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-10 lg:border-l lg:border-line lg:pl-10">
          <section>
            <SectionLabel>{labels.education}</SectionLabel>
            {cv.education.map((school) => (
              <div key={school.school}>
                <h3 className="font-display text-xl text-ink">{school.school}</h3>
                {school.program ? (
                  <p className="mt-1 text-sm text-muted">{school.program}</p>
                ) : (
                  <p className="mt-1 print:hidden">
                    <Gap>{labels.addProgram}</Gap>
                  </p>
                )}
                <p className="mt-1 text-sm text-muted">
                  {school.start} – {school.end}
                </p>
              </div>
            ))}
          </section>

          <section>
            <SectionLabel>{labels.skills}</SectionLabel>
            <ul className="flex flex-col gap-1.5 text-sm leading-6 text-muted">
              {cv.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>

          <section>
            <SectionLabel>{labels.languages}</SectionLabel>
            <ul className="flex flex-col gap-1.5 text-sm leading-6 text-muted">
              {cv.languages.map((lang) => (
                <li key={lang.name}>
                  {lang.name}
                  <span className="text-muted/70"> — {lang.level}</span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </article>
  );
}
