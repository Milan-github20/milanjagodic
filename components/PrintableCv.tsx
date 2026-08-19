import type { CvContent } from "@/lib/cv";
import Image from "next/image";

export function PrintableCv({ cv }: { cv: CvContent }) {
  return (
    <div id="printable-cv" className="printable-cv">
      <div className="printable-cv-inner">

        {/* ── LEFT SIDEBAR ── */}
        <aside className="pcv-sidebar">
          <div className="pcv-photo-wrap">
            <Image
              src="/milan.png"
              alt={cv.name}
              width={200}
              height={220}
              className="pcv-photo"
            />
          </div>

          <div className="pcv-name-block">
            <h1 className="pcv-name">{cv.name}</h1>
            <p className="pcv-title">{cv.title}</p>
          </div>

          <div className="pcv-sidebar-body">
            {/* Contact */}
            <div className="pcv-sidebar-section">
              <h2 className="pcv-sidebar-heading">Kontakt</h2>
              {cv.email && (
                <div className="pcv-contact-row">
                  <span className="pcv-contact-icon">✉</span>
                  <a href={`mailto:${cv.email}`} className="pcv-contact-val">{cv.email}</a>
                </div>
              )}
              {cv.location && (
                <div className="pcv-contact-row">
                  <span className="pcv-contact-icon">◎</span>
                  <span className="pcv-contact-val">{cv.location}</span>
                </div>
              )}
              {cv.linkedin && (
                <div className="pcv-contact-row">
                  <span className="pcv-contact-icon">in</span>
                  <a href={cv.linkedin} className="pcv-contact-val">
                    {cv.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "").replace(/\/$/, "")}
                  </a>
                </div>
              )}
              {cv.github && (
                <div className="pcv-contact-row">
                  <span className="pcv-contact-icon">gh</span>
                  <a href={cv.github} className="pcv-contact-val">
                    {cv.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
                  </a>
                </div>
              )}
            </div>

            {/* Skills */}
            <div className="pcv-sidebar-section">
              <h2 className="pcv-sidebar-heading">Skills</h2>
              <ul className="pcv-tag-list">
                {cv.skills.map((s) => (
                  <li key={s} className="pcv-tag">{s}</li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div className="pcv-sidebar-section">
              <h2 className="pcv-sidebar-heading">Jezici</h2>
              {cv.languages.map((l) => (
                <div key={l.name} className="pcv-lang-row">
                  <span className="pcv-lang-name">{l.name}</span>
                  <div className="pcv-lang-bar">
                    <div className={`pcv-lang-fill ${l.level.toLowerCase().includes("native") || l.level.toLowerCase().includes("maternji") ? "pcv-lang-native" : "pcv-lang-prof"}`} />
                  </div>
                  <span className="pcv-lang-level">{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ── RIGHT CONTENT ── */}
        <main className="pcv-main">
          {/* About */}
          <section className="pcv-section">
            <h2 className="pcv-section-title">O meni</h2>
            <p className="pcv-about">{cv.summary}</p>
          </section>

          {/* Experience */}
          <section className="pcv-section">
            <h2 className="pcv-section-title">Iskustvo</h2>
            {cv.experience.map((job) => (
              <div key={`${job.company}-${job.start}`} className="pcv-entry">
                <div className="pcv-entry-dot" />
                <div className="pcv-entry-content">
                  <div className="pcv-entry-header">
                    <span className="pcv-entry-name">{job.company}</span>
                    <span className="pcv-entry-date">{job.start} – {job.end}</span>
                  </div>
                  <p className="pcv-entry-role">{job.role}{job.location ? ` · ${job.location}` : ""}</p>
                  <ul className="pcv-bullets">
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>

          {/* Projects */}
          <section className="pcv-section">
            <h2 className="pcv-section-title">Projekti</h2>
            {cv.projects.map((p) => (
              <div key={p.name} className="pcv-entry">
                <div className="pcv-entry-dot" />
                <div className="pcv-entry-content">
                  <div className="pcv-entry-header">
                    <span className="pcv-entry-name">{p.name}</span>
                    <span className="pcv-entry-date">{p.year}</span>
                  </div>
                  <p className="pcv-entry-role">
                    {p.role} ·{" "}
                    <a href={p.url} className="pcv-link">{p.url.replace(/^https?:\/\//, "")}</a>
                  </p>
                  <p className="pcv-entry-summary">{p.summary}</p>
                  <ul className="pcv-bullets">
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>

          {/* Education */}
          <section className="pcv-section">
            <h2 className="pcv-section-title">Obrazovanje</h2>
            {cv.education.map((s) => (
              <div key={s.school} className="pcv-entry">
                <div className="pcv-entry-dot" />
                <div className="pcv-entry-content">
                  <div className="pcv-entry-header">
                    <span className="pcv-entry-name">{s.school}</span>
                    <span className="pcv-entry-date">{s.start} – {s.end}</span>
                  </div>
                  {s.program && <p className="pcv-entry-role">{s.program}</p>}
                </div>
              </div>
            ))}
          </section>
        </main>

      </div>
    </div>
  );
}
