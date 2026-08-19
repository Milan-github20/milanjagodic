import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CvDocument } from "@/components/CvDocument";
import { PrintableCv } from "@/components/PrintableCv";
import { PrintCvButton } from "@/components/PrintCvButton";
import { getCv } from "@/lib/cv";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/cv">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: dict.meta.cvTitle };
}

export default async function CvPage({ params }: PageProps<"/[lang]/cv">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const cv = getCv(locale);

  return (
    <>
    <div className="hero-glow cinematic-grid relative">
      <div className="mx-auto flex w-full max-w-[210mm] flex-col gap-6 px-4 py-10 sm:px-6 sm:py-14 print:max-w-none print:px-0 print:py-0">
        <div className="print-hide flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-lg">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
              {dict.cv.draftTitle}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">{dict.cv.draftBody}</p>
            <p className="mt-2 font-mono text-xs text-muted/70">lib/cv.ts</p>
          </div>
          <PrintCvButton label={dict.cv.print} />
        </div>

        <CvDocument
          cv={cv}
          labels={{
            experience: dict.cv.experience,
            work: dict.cv.work,
            education: dict.cv.education,
            skills: dict.cv.skills,
            languages: dict.cv.languages,
            addRole: dict.cv.addRole,
            addBullets: dict.cv.addBullets,
            addProgram: dict.cv.addProgram,
          }}
        />
      </div>
    </div>
    <PrintableCv cv={cv} />
    </>
  );
}
