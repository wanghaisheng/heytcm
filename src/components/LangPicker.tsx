import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

const languages = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' }
];

const LangPicker: React.FC<{ className?: string }> = ({ className }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
    let path = location.pathname;
    path = path.replace(/^\/(zh|en)(\/|$)/, '/');
    if (newLang !== 'zh') {
      path = `/${newLang}${path}`;
    } else {
      path = `/zh${path}`;
    }
    path = path.replace(/\/\//g, '/');
    navigate(path + location.search + location.hash);
  };

  return (
    <div className={className || ''}>
      <label htmlFor="lang-picker" className="mr-2 text-neutral-700 text-sm">语言/Language:</label>
      <select
        id="lang-picker"
        value={i18n.language}
        onChange={handleLangChange}
        className="border rounded px-2 py-1 text-sm"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>{lang.label}</option>
        ))}
      </select>
    </div>
  );
};

export default LangPicker;