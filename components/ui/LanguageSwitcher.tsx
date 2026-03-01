"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { setLocale } from "@/actions/locale";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { Globe } from "lucide-react";

const LOCALE_NAMES: Record<Locale, string> = {
  es: "Español",
  en: "English",
  fr: "Français",
};

const LOCALE_SHORT: Record<Locale, string> = {
  es: "ES",
  en: "EN",
  fr: "FR",
};

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (newLocale: Locale) => {
    setIsOpen(false);
    startTransition(async () => {
      await setLocale(newLocale);
      window.location.reload();
    });
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer bg-white/5 hover:bg-white/10 text-white/70 hover:text-white ${isPending ? "opacity-50 pointer-events-none" : ""}`}
      >
        <Globe className="size-3.5" />
        <span>{LOCALE_SHORT[locale as Locale]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 min-w-[140px] rounded-xl bg-[#2e1425] border border-white/10 shadow-2xl shadow-black/40 overflow-hidden z-50">
          {SUPPORTED_LOCALES.map((loc) => (
            <button
              key={loc}
              onClick={() => handleChange(loc)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                locale === loc
                  ? "text-primary bg-primary/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{LOCALE_NAMES[loc]}</span>
              {locale === loc && (
                <span className="text-primary text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
