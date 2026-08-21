import type { Locale } from "@/lib/i18n";
import { en } from "./en";
import { sr } from "./sr";

const dictionaries = { en, sr } as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
