import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SetHtmlLang } from "@/components/SetHtmlLang";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { jsonLdPerson, site } from "@/lib/site";

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: "#f3ebe1",
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: {
      default: `${site.name} — ${dict.meta.homeTitle}`,
      template: `${site.name} — %s`,
    },
    description: site.positioning,
    alternates: {
      languages: {
        en: "/en",
        sr: "/sr",
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang as Locale);

  return (
    <>
      <SetHtmlLang locale={lang as Locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-3 focus:py-2 focus:text-canvas"
      >
        {dict.nav.skip}
      </a>
      <ScrollToTop />
      <Header locale={lang as Locale} dict={dict} />
      <main id="content" className="flex-1">
        {children}
      </main>
      <Footer dict={dict} locale={lang as Locale} />
      <CommandPalette locale={lang as Locale} dict={dict} />
    </>
  );
}
