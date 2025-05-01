import React from 'react';

// 定义更严格的 ld+json 数据类型
// Google 常见结构化数据类型 TypeScript 类型定义
export type WebSiteLd = {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  potentialAction?: any;
};

export type OrganizationLd = {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
  contactPoint?: any;
};

export type BreadcrumbListLd = {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
};

export type ArticleLd = {
  "@context": "https://schema.org";
  "@type": "Article";
  headline: string;
  image?: string[];
  datePublished: string;
  dateModified?: string;
  author?: any;
  publisher?: any;
  mainEntityOfPage?: any;
  description?: string;
};

export type FAQPageLd = {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
};

export type ProductLd = {
  "@context": "https://schema.org";
  "@type": "Product";
  name: string;
  image?: string[];
  description?: string;
  sku?: string;
  brand?: any;
  offers?: any;
};

export type EventLd = {
  "@context": "https://schema.org";
  "@type": "Event";
  name: string;
  startDate: string;
  endDate?: string;
  location?: any;
  image?: string[];
  description?: string;
  organizer?: any;
};

export type LdJsonObject = {
  [key: string]: string | number | boolean | null | LdJsonObject | LdJsonObject[];
};

export type PersonLd = {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
  worksFor?: any;
  sameAs?: string[];
};

export type ReviewLd = {
  "@context": "https://schema.org";
  "@type": "Review";
  author: string | PersonLd;
  datePublished: string;
  reviewBody: string;
  reviewRating?: {
    "@type": "Rating";
    ratingValue: number | string;
    bestRating?: number | string;
    worstRating?: number | string;
  };
  itemReviewed?: any;
};

export type CourseLd = {
  "@context": "https://schema.org";
  "@type": "Course";
  name: string;
  description: string;
  provider?: any;
};

export type HowToLd = {
  "@context": "https://schema.org";
  "@type": "HowTo";
  name: string;
  description?: string;
  step: any[];
  image?: string[];
  totalTime?: string;
  estimatedCost?: any;
};

export type JobPostingLd = {
  "@context": "https://schema.org";
  "@type": "JobPosting";
  title: string;
  description: string;
  datePosted: string;
  validThrough?: string;
  employmentType?: string;
  hiringOrganization?: any;
  jobLocation?: any;
  baseSalary?: any;
};

export type LocalBusinessLd = {
  "@context": "https://schema.org";
  "@type": "LocalBusiness";
  name: string;
  image?: string[];
  address?: any;
  telephone?: string;
  url?: string;
  openingHours?: string[];
  geo?: any;
};

export type MedicalEntityLd = {
  "@context": "https://schema.org";
  "@type": "MedicalEntity";
  name: string;
  description?: string;
  url?: string;
  code?: any;
};

export type RecipeLd = {
  "@context": "https://schema.org";
  "@type": "Recipe";
  name: string;
  description?: string;
  image?: string[];
  recipeIngredient?: string[];
  recipeInstructions?: any[];
  author?: any;
  datePublished?: string;
  aggregateRating?: any;
};

export type VideoObjectLd = {
  "@context": "https://schema.org";
  "@type": "VideoObject";
  name: string;
  description?: string;
  thumbnailUrl: string[];
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
  publisher?: any;
};

// 支持联合类型
export type SupportedLdJson =
  | WebSiteLd
  | OrganizationLd
  | BreadcrumbListLd
  | ArticleLd
  | FAQPageLd
  | ProductLd
  | EventLd
  | PersonLd
  | ReviewLd
  | CourseLd
  | HowToLd
  | JobPostingLd
  | LocalBusinessLd
  | MedicalEntityLd
  | RecipeLd
  | VideoObjectLd
  | LdJsonObject;

interface LdJsonProps {
  data: SupportedLdJson | SupportedLdJson[];
}

const LdJson: React.FC<LdJsonProps> = ({ data }) => {
  if (!data) return null;
  if (Array.isArray(data)) {
    return <>
      {data.map((item, idx) => (
        <script
          key={`ldjson-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>;
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
};

export default LdJson;
