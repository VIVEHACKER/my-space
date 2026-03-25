import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// 야자수 — 열대 해변 느낌, 글로시 3D
export const PalmTreeIcon: React.FC<IconProps> = ({ className, size = 64 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
    <defs>
      <radialGradient id="pt-glow" cx="50%" cy="60%" r="50%">
        <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#87CEEB" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="pt-trunk" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#C49A6C" />
        <stop offset="30%" stopColor="#A0784C" />
        <stop offset="70%" stopColor="#7A5C32" />
        <stop offset="100%" stopColor="#5C4020" />
      </linearGradient>
      <linearGradient id="pt-trunk-hi" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
      <linearGradient id="pt-leaf1" x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#7FE08A" />
        <stop offset="40%" stopColor="#3CB371" />
        <stop offset="100%" stopColor="#1B6B30" />
      </linearGradient>
      <linearGradient id="pt-leaf2" x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#90EE90" />
        <stop offset="40%" stopColor="#4AC76A" />
        <stop offset="100%" stopColor="#228B22" />
      </linearGradient>
      <filter id="pt-shadow">
        <feDropShadow dx="1" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
      </filter>
      <filter id="pt-leaf-glow">
        <feGaussianBlur stdDeviation="0.5" />
      </filter>
    </defs>
    {/* Ambient glow */}
    <ellipse cx="50" cy="70" rx="40" ry="20" fill="url(#pt-glow)" />
    <g filter="url(#pt-shadow)">
      {/* Trunk segments */}
      <path d="M48 90 C48 78, 46 70, 46 62 C46 56, 48 50, 50 44" stroke="url(#pt-trunk)" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M48 90 C48 78, 46 70, 46 62 C46 56, 48 50, 50 44" stroke="url(#pt-trunk-hi)" strokeWidth="7" strokeLinecap="round" fill="none" />
      {/* Trunk rings */}
      <path d="M44 82 Q48 80 52 82" stroke="#5C4020" strokeWidth="0.6" fill="none" opacity="0.5" />
      <path d="M44 74 Q47 72 51 74" stroke="#5C4020" strokeWidth="0.6" fill="none" opacity="0.5" />
      <path d="M44 66 Q47 64 50 66" stroke="#5C4020" strokeWidth="0.6" fill="none" opacity="0.5" />
      <path d="M45 58 Q48 56 50 58" stroke="#5C4020" strokeWidth="0.6" fill="none" opacity="0.5" />
      {/* Leaves — large arching fronds */}
      {/* Left drooping */}
      <path d="M50 44 C40 34, 22 30, 8 38 Q20 28, 50 44Z" fill="url(#pt-leaf1)" />
      <path d="M50 44 C40 34, 22 30, 8 38" stroke="#1B6B30" strokeWidth="0.8" fill="none" />
      <path d="M50 44 C38 30, 18 22, 6 24 Q22 18, 50 44Z" fill="url(#pt-leaf2)" />
      {/* Right drooping */}
      <path d="M50 44 C60 34, 78 30, 92 38 Q80 28, 50 44Z" fill="url(#pt-leaf1)" />
      <path d="M50 44 C60 34, 78 30, 92 38" stroke="#1B6B30" strokeWidth="0.8" fill="none" />
      <path d="M50 44 C62 30, 82 22, 94 24 Q78 18, 50 44Z" fill="url(#pt-leaf2)" />
      {/* Top */}
      <path d="M50 44 C48 28, 44 16, 38 6 Q48 14, 50 44Z" fill="url(#pt-leaf1)" />
      <path d="M50 44 C52 28, 56 16, 62 6 Q52 14, 50 44Z" fill="url(#pt-leaf2)" />
      <path d="M50 44 C46 30, 34 18, 24 14 Q38 16, 50 44Z" fill="url(#pt-leaf1)" opacity="0.85" />
      <path d="M50 44 C54 30, 66 18, 76 14 Q62 16, 50 44Z" fill="url(#pt-leaf2)" opacity="0.85" />
      {/* Leaf highlights */}
      <path d="M50 44 C42 34, 26 30, 12 35" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" fill="none" />
      <path d="M50 44 C58 34, 74 30, 88 35" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" fill="none" />
      <path d="M50 44 C48 32, 45 20, 40 10" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
      {/* Coconuts — glossy spheres */}
      <circle cx="47" cy="45" r="3.5" fill="#8B6914" />
      <circle cx="47" cy="45" r="3.5" fill="url(#pt-coco-hi)" />
      <circle cx="53" cy="46" r="3" fill="#7A5C12" />
      <circle cx="53" cy="46" r="3" fill="url(#pt-coco-hi)" />
      <circle cx="49" cy="48" r="2.5" fill="#6B4C0A" />
      <circle cx="49" cy="48" r="2.5" fill="url(#pt-coco-hi)" />
    </g>
    <defs>
      <radialGradient id="pt-coco-hi" cx="35%" cy="30%" r="50%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
    </defs>
  </svg>
);

// 노트북 — Windows XP 스타일 글로시 3D
export const LaptopIcon: React.FC<IconProps> = ({ className, size = 64 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="lp-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E8EEF4" />
        <stop offset="50%" stopColor="#C0CCD8" />
        <stop offset="100%" stopColor="#8A9AAC" />
      </linearGradient>
      <linearGradient id="lp-screen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6EC6F8" />
        <stop offset="30%" stopColor="#3498DB" />
        <stop offset="70%" stopColor="#2980B9" />
        <stop offset="100%" stopColor="#1A5276" />
      </linearGradient>
      <linearGradient id="lp-bezel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#D0D8E0" />
        <stop offset="100%" stopColor="#808890" />
      </linearGradient>
      <linearGradient id="lp-base" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E0E6EC" />
        <stop offset="40%" stopColor="#C8D0D8" />
        <stop offset="100%" stopColor="#A0A8B4" />
      </linearGradient>
      <linearGradient id="lp-key" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B0B8C4" />
        <stop offset="100%" stopColor="#8890A0" />
      </linearGradient>
      <filter id="lp-shadow">
        <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.3" />
      </filter>
      <linearGradient id="lp-shine" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    <g filter="url(#lp-shadow)">
      {/* Screen lid */}
      <rect x="14" y="8" width="72" height="50" rx="4" fill="url(#lp-bezel)" />
      <rect x="14" y="8" width="72" height="50" rx="4" fill="url(#lp-shine)" opacity="0.3" />
      {/* Screen */}
      <rect x="19" y="12" width="62" height="42" rx="2" fill="url(#lp-screen)" />
      {/* Screen reflection */}
      <rect x="19" y="12" width="62" height="16" rx="2" fill="rgba(255,255,255,0.12)" />
      {/* Screen glare line */}
      <line x1="20" y1="14" x2="55" y2="14" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
      {/* Windows-style elements on screen */}
      <rect x="24" y="18" width="20" height="14" rx="1" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <rect x="48" y="20" width="28" height="6" rx="1" fill="rgba(255,255,255,0.1)" />
      <rect x="48" y="28" width="28" height="6" rx="1" fill="rgba(255,255,255,0.08)" />
      <rect x="24" y="36" width="52" height="4" rx="1" fill="rgba(255,255,255,0.1)" />
      {/* Taskbar */}
      <rect x="19" y="48" width="62" height="6" fill="rgba(0,80,160,0.4)" />
      {/* Base/keyboard */}
      <path d="M8 60 L14 58 H86 L92 60 L92 74 Q92 78, 88 78 H12 Q8 78, 8 74 Z" fill="url(#lp-base)" />
      <path d="M8 60 L92 60 L92 64 H8 Z" fill="rgba(255,255,255,0.2)" />
      {/* Keyboard keys */}
      <rect x="16" y="62" width="68" height="3" rx="0.5" fill="url(#lp-key)" opacity="0.6" />
      <rect x="16" y="66" width="68" height="3" rx="0.5" fill="url(#lp-key)" opacity="0.5" />
      <rect x="16" y="70" width="68" height="3" rx="0.5" fill="url(#lp-key)" opacity="0.4" />
      {/* Trackpad */}
      <rect x="38" y="74" width="24" height="3" rx="1" fill="rgba(180,190,200,0.5)" />
      {/* Edge highlight */}
      <line x1="14" y1="8" x2="86" y2="8" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
    </g>
  </svg>
);

// 비행선 — 메탈릭 글로시
export const AirshipIcon: React.FC<IconProps> = ({ className, size = 64 }) => (
  <svg viewBox="0 0 120 80" width={size * 1.5} height={size} className={className}>
    <defs>
      <linearGradient id="as-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F0F4F8" />
        <stop offset="20%" stopColor="#E0E8F0" />
        <stop offset="50%" stopColor="#B8C8D8" />
        <stop offset="80%" stopColor="#90A4B8" />
        <stop offset="100%" stopColor="#708498" />
      </linearGradient>
      <linearGradient id="as-stripe" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#D44040" />
        <stop offset="50%" stopColor="#C03030" />
        <stop offset="100%" stopColor="#A02020" />
      </linearGradient>
      <linearGradient id="as-gondola" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F8F0E0" />
        <stop offset="50%" stopColor="#D8C8A0" />
        <stop offset="100%" stopColor="#B0A070" />
      </linearGradient>
      <radialGradient id="as-shine" cx="40%" cy="25%" r="50%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
      <filter id="as-shadow">
        <feDropShadow dx="1" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.2" />
      </filter>
      <linearGradient id="as-fin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C8D4E0" />
        <stop offset="100%" stopColor="#7090A8" />
      </linearGradient>
    </defs>
    <g filter="url(#as-shadow)">
      {/* Main body */}
      <ellipse cx="55" cy="30" rx="42" ry="20" fill="url(#as-body)" />
      {/* Body shine */}
      <ellipse cx="50" cy="22" rx="30" ry="10" fill="url(#as-shine)" />
      {/* Red stripe */}
      <path d="M15 30 Q55 24, 95 30" stroke="url(#as-stripe)" strokeWidth="4" fill="none" opacity="0.8" />
      {/* Panel lines */}
      <path d="M20 20 Q55 16, 90 20" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" fill="none" />
      <path d="M16 26 Q55 22, 94 26" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none" />
      <path d="M16 34 Q55 38, 94 34" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" fill="none" />
      {/* Tail fins */}
      <path d="M92 22 L108 12 L106 24 Z" fill="url(#as-fin)" />
      <path d="M92 22 L108 12 L106 24 Z" fill="url(#as-shine)" opacity="0.3" />
      <path d="M92 38 L108 48 L106 36 Z" fill="url(#as-fin)" />
      <path d="M94 30 L110 30 L106 28 Z" fill="url(#as-fin)" opacity="0.7" />
      {/* Cables */}
      <line x1="44" y1="50" x2="40" y2="44" stroke="#606870" strokeWidth="0.8" />
      <line x1="55" y1="50" x2="55" y2="46" stroke="#606870" strokeWidth="0.8" />
      <line x1="66" y1="50" x2="70" y2="44" stroke="#606870" strokeWidth="0.8" />
      {/* Gondola */}
      <rect x="40" y="50" width="30" height="10" rx="3" fill="url(#as-gondola)" />
      <rect x="40" y="50" width="30" height="4" rx="3" fill="rgba(255,255,255,0.25)" />
      {/* Gondola windows */}
      <rect x="44" y="53" width="4" height="4" rx="1" fill="rgba(100,180,255,0.5)" />
      <rect x="50" y="53" width="4" height="4" rx="1" fill="rgba(100,180,255,0.5)" />
      <rect x="56" y="53" width="4" height="4" rx="1" fill="rgba(100,180,255,0.5)" />
      <rect x="62" y="53" width="4" height="4" rx="1" fill="rgba(100,180,255,0.5)" />
      {/* Propeller */}
      <ellipse cx="38" cy="56" rx="3" ry="1.5" fill="rgba(200,200,200,0.6)" />
    </g>
  </svg>
);

// 캠프파이어 — 리얼리스틱 화염
export const CampfireIcon: React.FC<IconProps> = ({ className, size = 64 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="cf-log1" x1="0" y1="0" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#6B4226" />
        <stop offset="50%" stopColor="#8B5E3C" />
        <stop offset="100%" stopColor="#4A2C14" />
      </linearGradient>
      <linearGradient id="cf-log2" x1="0" y1="0" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#5C3820" />
        <stop offset="50%" stopColor="#7A5034" />
        <stop offset="100%" stopColor="#3E2410" />
      </linearGradient>
      <radialGradient id="cf-fire-outer" cx="50%" cy="80%" r="60%">
        <stop offset="0%" stopColor="#FFED4E" />
        <stop offset="30%" stopColor="#FFB800" />
        <stop offset="60%" stopColor="#FF6B00" />
        <stop offset="100%" stopColor="#CC2200" />
      </radialGradient>
      <radialGradient id="cf-fire-inner" cx="50%" cy="70%" r="40%">
        <stop offset="0%" stopColor="#FFFDE8" />
        <stop offset="40%" stopColor="#FFE44D" />
        <stop offset="100%" stopColor="#FFAA00" />
      </radialGradient>
      <radialGradient id="cf-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FF8C00" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
      </radialGradient>
      <filter id="cf-blur">
        <feGaussianBlur stdDeviation="1.5" />
      </filter>
      <filter id="cf-shadow">
        <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.2" />
      </filter>
    </defs>
    {/* Ambient glow */}
    <ellipse cx="50" cy="55" rx="38" ry="30" fill="url(#cf-glow)" />
    <g filter="url(#cf-shadow)">
      {/* Logs */}
      <path d="M18 82 L52 68" stroke="url(#cf-log1)" strokeWidth="7" strokeLinecap="round" />
      <path d="M18 82 L52 68" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" />
      <path d="M82 82 L48 68" stroke="url(#cf-log2)" strokeWidth="7" strokeLinecap="round" />
      <path d="M82 82 L48 68" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeLinecap="round" />
      {/* Third log across */}
      <path d="M30 76 L70 76" stroke="url(#cf-log1)" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
      {/* Fire — outer flame */}
      <path d="M50 66 C38 56, 30 44, 34 30 C36 38, 40 36, 38 28 C42 36, 46 38, 44 22 C48 32, 50 34, 50 18 C52 30, 54 34, 56 22 C54 38, 58 36, 62 28 C60 36, 64 38, 66 30 C70 44, 62 56, 50 66Z" fill="url(#cf-fire-outer)" />
      {/* Fire — inner bright */}
      <path d="M50 66 C42 58, 38 48, 40 38 C42 44, 46 42, 44 34 C48 42, 50 40, 50 28 C52 40, 54 42, 56 34 C54 42, 58 44, 60 38 C62 48, 58 58, 50 66Z" fill="url(#cf-fire-inner)" />
      {/* Fire — white hot core */}
      <path d="M50 66 C46 60, 44 52, 46 46 C48 50, 50 48, 50 42 C52 48, 54 50, 54 46 C56 52, 54 60, 50 66Z" fill="rgba(255,255,240,0.7)" />
    </g>
    {/* Sparks */}
    <circle cx="36" cy="22" r="1.5" fill="#FFD700" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="62" cy="18" r="1.2" fill="#FFA500" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="44" cy="14" r="1" fill="#FFE44D" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.8s" repeatCount="indefinite" />
    </circle>
    <circle cx="56" cy="12" r="0.8" fill="#FFCC00" opacity="0.5">
      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.3s" repeatCount="indefinite" />
    </circle>
  </svg>
);

// 꽃 — 글로시 장미 스타일
export const FlowerIcon: React.FC<IconProps> = ({ className, size = 64 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
    <defs>
      <radialGradient id="fl-petal" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFB6D9" />
        <stop offset="40%" stopColor="#FF69B4" />
        <stop offset="100%" stopColor="#C2185B" />
      </radialGradient>
      <radialGradient id="fl-petal2" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFC4E0" />
        <stop offset="40%" stopColor="#FF80C0" />
        <stop offset="100%" stopColor="#D81B60" />
      </radialGradient>
      <radialGradient id="fl-center" cx="40%" cy="35%" r="50%">
        <stop offset="0%" stopColor="#FFF9C4" />
        <stop offset="50%" stopColor="#FFD54F" />
        <stop offset="100%" stopColor="#FF8F00" />
      </radialGradient>
      <linearGradient id="fl-stem" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4CAF50" />
        <stop offset="100%" stopColor="#2E7D32" />
      </linearGradient>
      <linearGradient id="fl-leaf" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#66BB6A" />
        <stop offset="100%" stopColor="#2E7D32" />
      </linearGradient>
      <filter id="fl-shadow">
        <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.2" />
      </filter>
      <radialGradient id="fl-glow" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="#FF69B4" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#FF69B4" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Glow */}
    <ellipse cx="50" cy="38" rx="30" ry="28" fill="url(#fl-glow)" />
    <g filter="url(#fl-shadow)">
      {/* Stem */}
      <path d="M50 94 C50 80, 48 68, 50 56" stroke="url(#fl-stem)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M50 94 C50 80, 48 68, 50 56" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Leaves */}
      <path d="M49 76 C40 70, 30 72, 24 78 C32 74, 40 74, 49 76Z" fill="url(#fl-leaf)" />
      <path d="M49 76 C40 70, 30 72, 24 78" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" fill="none" />
      <path d="M50 66 C58 60, 68 62, 72 68 C64 64, 56 64, 50 66Z" fill="url(#fl-leaf)" />
      <path d="M50 66 C58 60, 68 62, 72 68" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" fill="none" />
      {/* Petals — back layer */}
      <ellipse cx="38" cy="28" rx="10" ry="16" fill="url(#fl-petal)" transform="rotate(-30 38 28)" />
      <ellipse cx="62" cy="28" rx="10" ry="16" fill="url(#fl-petal)" transform="rotate(30 62 28)" />
      <ellipse cx="50" cy="20" rx="10" ry="16" fill="url(#fl-petal2)" />
      {/* Petals — front layer */}
      <ellipse cx="34" cy="40" rx="9" ry="14" fill="url(#fl-petal2)" transform="rotate(-50 34 40)" />
      <ellipse cx="66" cy="40" rx="9" ry="14" fill="url(#fl-petal2)" transform="rotate(50 66 40)" />
      {/* Petal highlights */}
      <ellipse cx="44" cy="22" rx="4" ry="8" fill="rgba(255,255,255,0.2)" transform="rotate(-20 44 22)" />
      <ellipse cx="56" cy="22" rx="4" ry="8" fill="rgba(255,255,255,0.15)" transform="rotate(20 56 22)" />
      {/* Center */}
      <circle cx="50" cy="36" r="9" fill="url(#fl-center)" />
      <circle cx="50" cy="36" r="9" fill="rgba(255,255,255,0.1)" />
      {/* Center details */}
      <circle cx="47" cy="33" r="1.5" fill="rgba(255,180,0,0.6)" />
      <circle cx="53" cy="34" r="1.2" fill="rgba(255,180,0,0.5)" />
      <circle cx="50" cy="38" r="1" fill="rgba(255,180,0,0.4)" />
      {/* Glossy highlight */}
      <circle cx="47" cy="32" r="3" fill="rgba(255,255,255,0.3)" />
    </g>
  </svg>
);

export const aeroIconMap = {
  'palm-tree': PalmTreeIcon,
  'laptop': LaptopIcon,
  'airship': AirshipIcon,
  'campfire': CampfireIcon,
  'flower': FlowerIcon,
} as const;

export type AeroIconName = keyof typeof aeroIconMap;
