import React from 'react';

const RethaGoLogo = () => (
  <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">
    <defs>
      <linearGradient id="strokeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#FF6B6B" }} />
        <stop offset="100%" style={{ stopColor: "#4ECDC4" }} />
      </linearGradient>
      <linearGradient id="strokeGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#A8E6CF" }} />
        <stop offset="100%" style={{ stopColor: "#3498DB" }} />
      </linearGradient>
    </defs>
    
    {/* Background circle */}
    <circle cx="200" cy="200" r="200" fill="#ffffff"/>
    
    {/* Left triangle */}
    <path d="M100,120 L220,200 L100,280 Z" 
          fill="none" 
          stroke="url(#strokeGrad1)" 
          strokeWidth="4"
          strokeLinejoin="round">
      <animate attributeName="stroke-width" 
               values="4;6;4" 
               dur="3s" 
               repeatCount="indefinite"/>
    </path>
    
    {/* Right triangle */}
    <path d="M300,120 L180,200 L300,280 Z" 
          fill="none" 
          stroke="url(#strokeGrad2)" 
          strokeWidth="4"
          strokeLinejoin="round">
      <animate attributeName="stroke-width" 
               values="6;4;6" 
               dur="3s" 
               repeatCount="indefinite"/>
    </path>
    
    {/* Center connector */}
    <line x1="180" y1="200" 
          x2="220" y2="200" 
          stroke="url(#strokeGrad1)" 
          strokeWidth="4">
      <animate attributeName="stroke-width" 
               values="4;6;4" 
               dur="2s" 
               repeatCount="indefinite"/>
    </line>
  </svg>
);

export default RethaGoLogo;
