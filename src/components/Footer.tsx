import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Smartphone, MessageCircle, FileText, Heart, HelpCircle, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LangPicker from './LangPicker';

const Footer = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  // 语言选项
  const languages = [
    { code: 'zh', label: '中文' },
    { code: 'en', label: 'English' }
  ];

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);

    // 动态调整 url 前缀
    let path = location.pathname;
    // 去除已有的 /zh 或 /en 前缀
    path = path.replace(/^\/(zh|en)(\/|$)/, '/');
    if (newLang !== 'zh') {
      path = `/${newLang}${path}`;
    } else {
      // 中文统一前缀 /zh
      path = `/zh${path}`;
    }
    // 防止多余的斜杠
    path = path.replace(/\/\//g, '/');
    navigate(path + location.search + location.hash);
  };

  // 动态获取多语言 footerLinks
  const footerLinks = Array.from({ length: 4 }).map((_, sectionIdx) => ({
    title: t(`Footer.footerLinks.${sectionIdx}.title`),
    links: Array.from({ length: 4 }).map((_, linkIdx) => ({
      label: t(`Footer.footerLinks.${sectionIdx}.links.${linkIdx}.label`),
      to: t(`Footer.footerLinks.${sectionIdx}.links.${linkIdx}.to`)
    }))
  }));
  // 新增底部政策链接配置
  const policyLinks = Array.from({ length: 3 }).map((_, idx) => ({
    label: t(`Footer.policyLinks.${idx}.label`),
    to: t(`Footer.policyLinks.${idx}.to`)
  }));

  return (
    <footer className="bg-neutral-100 border-t border-neutral-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and mission */}
          <div className="md:col-span-2">
            <Logo size={40} />
            <p className="mt-4 text-neutral-600 max-w-md">
              科技焕新中医，共创健康未来。我们致力于用数据和人工智能让中医智慧更加系统化、科学化、普惠化。
            </p>
            <div className="mt-6 flex space-x-4">
              <a 
                href="#" 
                className="bg-neutral-200 hover:bg-neutral-300 p-2 rounded-full transition-colors" 
                aria-label="WeChat"
              >
                <MessageCircle size={20} className="text-neutral-700" />
              </a>
              <a 
                href="#" 
                className="bg-neutral-200 hover:bg-neutral-300 p-2 rounded-full transition-colors" 
                aria-label="GitHub"
              >
                <Github size={20} className="text-neutral-700" />
              </a>
              <a 
                href="#" 
                className="bg-neutral-200 hover:bg-neutral-300 p-2 rounded-full transition-colors" 
                aria-label="App"
              >
                <Smartphone size={20} className="text-neutral-700" />
              </a>
            </div>
            {/* Lang Picker */}
          </div>

          {/* Links */}
          {footerLinks.map((section, sectionIdx) => (
            <div key={section.title || sectionIdx}>
              <h3 className="font-display font-semibold text-neutral-800 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={link.label || linkIdx}>
                    <NavLink 
                      to={link.to} 
                      className="text-neutral-600 hover:text-primary-600 text-sm transition-colors"
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-neutral-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center relative">
          <p className="text-neutral-500 text-sm">
            {currentYear} HeyTCM. 保留所有权利。
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {policyLinks.map((link, idx) => (
              <NavLink key={link.label || idx} to={link.to} className="text-neutral-500 hover:text-primary-600 text-sm transition-colors">
                {link.label}
              </NavLink>
            ))}
          </div>
          <LangPicker className="absolute right-0 top-0 md:static md:ml-6" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;