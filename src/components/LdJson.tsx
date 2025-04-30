import React from 'react';

interface LdJsonProps {
  data: object | object[];
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
