import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import translations from './translations';
import type { Lang } from './translations';

interface LanguageContextType {
  lang: Lang;
  t: typeof translations.fa;
  toggleLang: () => void;
  dir: 'rtl' | 'ltr';
  align: 'text-right' | 'text-left';
  alignEnd: 'justify-end' | 'justify-start';
  alignStart: 'justify-start' | 'justify-end';
  font: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fa');

  useEffect(() => {
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.style.fontFamily = lang === 'fa' ? "'Vazirmatn', 'Tahoma', sans-serif" : "'Inter', 'Vazirmatn', sans-serif";
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => prev === 'fa' ? 'en' : 'fa');
  };

  const t = translations[lang];
  const dir = lang === 'fa' ? 'rtl' : 'ltr';
  const align = lang === 'fa' ? 'text-right' : 'text-left';
  const alignEnd = lang === 'fa' ? 'justify-end' : 'justify-start';
  const alignStart = lang === 'fa' ? 'justify-start' : 'justify-end';
  const font = lang === 'fa' ? "font-['Vazirmatn']" : "font-['Inter']";

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, dir, align, alignEnd, alignStart, font }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLang must be used within LanguageProvider');
  return context;
}
