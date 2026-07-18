import { useLang } from '../../i18n/LanguageContext';

export default function LanguageToggle() {
  const { lang, toggleLang } = useLang();

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1.5 text-[10px] tracking-[0.1em] text-neutral-500 hover:text-white transition-colors cursor-pointer px-2 py-1 border border-neutral-800 hover:border-neutral-600 font-mono"
    >
      <span className={lang === 'fa' ? 'text-white' : 'text-neutral-600'}>فا</span>
      <span className="w-2 h-[1px] bg-neutral-600" />
      <span className={lang === 'en' ? 'text-white' : 'text-neutral-600'}>EN</span>
    </button>
  );
}
