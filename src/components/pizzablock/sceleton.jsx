import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader
    speed={1}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="130" cy="130" r="130" />
    <circle cx="106" cy="121" r="19" />
    <rect x="3" y="464" rx="0" ry="0" width="29" height="24" />
    <rect x="9" y="464" rx="0" ry="0" width="86" height="22" />
    <rect x="0" y="270" rx="5" ry="5" width="280" height="27" />
    <rect x="5" y="320" rx="5" ry="5" width="268" height="76" />
    <rect x="5" y="420" rx="5" ry="5" width="80" height="27" />
    <rect x="120" y="410" rx="15" ry="15" width="150" height="46" />
  </ContentLoader>
);

export default MyLoader;
