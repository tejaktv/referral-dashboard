import React from 'react';

const BarChartNoAxis = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Bars only, no axes */}
    <rect x="3" y="10" width="4" height="11" fill="currentColor" />
    <rect x="10" y="6" width="4" height="15" fill="currentColor" />
    <rect x="17" y="13" width="4" height="8" fill="currentColor" />
  </svg>
);

export default BarChartNoAxis;
