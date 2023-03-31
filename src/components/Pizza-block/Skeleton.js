import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
   <ContentLoader className='pizza-block'
      speed={2}
      width={280}
      height={470}
      viewBox="0 0 280 470"
      backgroundColor="#e0e0e0"
      foregroundColor="#c7c7c7"
   >
      <circle cx="135" cy="135" r="125" />
      <rect x="3" y="297" rx="4" ry="4" width="270" height="26" />
      <rect x="2" y="348" rx="6" ry="6" width="130" height="30" />
      <rect x="85" y="349" rx="0" ry="0" width="5" height="0" />
      <rect x="145" y="348" rx="6" ry="6" width="130" height="30" />
      <rect x="3" y="386" rx="7" ry="7" width="80" height="30" />
      <rect x="100" y="386" rx="6" ry="6" width="80" height="30" />
      <rect x="197" y="386" rx="6" ry="6" width="80" height="30" />
      <rect x="4" y="432" rx="14" ry="14" width="87" height="34" />
      <rect x="171" y="431" rx="16" ry="16" width="108" height="34" />
   </ContentLoader>
);

export default Skeleton;
