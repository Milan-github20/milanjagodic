import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { Container } from "./Container";

function PlaceholderLink({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <span className="cursor-default text-muted/50" title={title}>
      {label}
    </span>
  );
}

export function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <footer className="mt-auto border-t border-line bg-surface print:hidden">
      <Container className="flex flex-col gap-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <a
          href={`mailto:${site.email}`}
          className="text-muted transition hover:text-accent"
        >
          {site.email}
        </a>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {site.social.github ? (
            <a
              href={site.social.github}
              className="text-muted transition hover:text-accent"
            >
              GitHub
            </a>
          ) : null}
          {site.social.linkedin ? (
            <a
              href={site.social.linkedin}
              className="text-muted transition hover:text-accent"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          ) : (
            <PlaceholderLink
              label={dict.footer.linkedinSoon}
              title={dict.footer.urlSoon}
            />
          )}
          <a
            href={localePath(locale, "cv")}
            className="text-muted transition hover:text-accent"
          >
            CV
          </a>
        </div>
      </Container>
    </footer>
  );
}
