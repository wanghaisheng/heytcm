import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface OgType {
  title?: string;
  description?: string;
  image?: string;
  site_name?: string;
  [key: string]: string | undefined;
}

export interface AlternateType {
  href: string;
  hreflang: string;
}

export interface SeoHeaderProps {
  title?: string;
  description?: string;
  keywords?: string;
  og?: OgType;
  canonical?: string;
  alternate?: AlternateType[];
  robots?: string;
  author?: string;
  [key: string]: any;
}

const SeoHeaders: React.FC<{ header: SeoHeaderProps }> = ({ header }) => (
  <Helmet>
    {header.title && <title>{header.title}</title>}
    {header.description && <meta name="description" content={header.description} />}
    {header.keywords && <meta name="keywords" content={header.keywords} />}
    {header.robots && <meta name="robots" content={header.robots} />}
    {header.author && <meta name="author" content={header.author} />}
    {header.og && Object.entries(header.og).map(([k, v]) =>
      v ? <meta property={`og:${k}`} content={v} key={`og:${k}`} /> : null
    )}
    {header.canonical && <link rel="canonical" href={header.canonical} />}
    {header.alternate && header.alternate.map((alt, i) =>
      <link rel="alternate" hrefLang={alt.hreflang} href={alt.href} key={i} />
    )}
  </Helmet>
);

export default SeoHeaders;
