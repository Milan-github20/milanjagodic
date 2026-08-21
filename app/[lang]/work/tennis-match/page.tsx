import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/work";
import { getTennisMatchCaseStudy } from "@/lib/content/case-studies";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { getTennisMatchDesktopShot, getTennisMatchShots } from "@/lib/content/screenshots";
import { site } from "@/lib/content/site";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/work/tennis-match">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.meta.tennisMatchTitle,
    description: getTennisMatchCaseStudy(lang).hook,
    openGraph: {
      title: `${site.name} — ${dict.meta.tennisMatchTitle}`,
      description: getTennisMatchCaseStudy(lang).hook,
    },
  };
}

export default async function TennisMatchCaseStudyPage({
  params,
}: PageProps<"/[lang]/work/tennis-match">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const content = getTennisMatchCaseStudy(locale);

  return (
    <CaseStudyLayout
      locale={locale}
      dict={dict}
      content={content}
      variant="list"
      shots={getTennisMatchShots(locale)}
      desktopShot={getTennisMatchDesktopShot(locale)}
    />
  );
}
