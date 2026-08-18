import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { getPreferitoCaseStudy } from "@/lib/case-studies";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/work/preferito">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.meta.preferitoTitle,
    description: getPreferitoCaseStudy(lang).hook,
    openGraph: {
      title: `${site.name} — ${dict.meta.preferitoTitle}`,
      description: getPreferitoCaseStudy(lang).hook,
    },
  };
}

export default async function PreferitoCaseStudyPage({
  params,
}: PageProps<"/[lang]/work/preferito">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const content = getPreferitoCaseStudy(locale);

  return (
    <CaseStudyLayout
      locale={locale}
      dict={dict}
      content={content}
      variant="calendar"
    />
  );
}
