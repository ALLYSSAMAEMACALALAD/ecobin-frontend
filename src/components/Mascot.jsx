// The Eco-Bin mascot (recycling bin with a leaf), from the original design.
export default function Mascot({ className = 'mascot' }) {
  return (
    <svg className={className} viewBox="0 0 96 96" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ecoBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5ef2c2" />
          <stop offset="0.55" stopColor="#6ae4ff" />
          <stop offset="1" stopColor="#b69cff" />
        </linearGradient>
        <linearGradient id="ecoLid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d6fff0" />
          <stop offset="1" stopColor="#8ff5d4" />
        </linearGradient>
      </defs>
      <ellipse cx="48" cy="90" rx="26" ry="3.5" fill="#000" opacity=".35" />
      <path d="M26 30 L70 30 L66 80 Q65.5 84 61 84 L35 84 Q30.5 84 30 80 Z" fill="url(#ecoBody)" />
      <path d="M32 40 L64 40 L62 74 Q61.8 77 59 77 L37 77 Q34.2 77 34 74 Z" fill="#ffffff" opacity=".12" />
      <rect x="20" y="22" width="56" height="10" rx="5" fill="url(#ecoLid)" />
      <path d="M48 22 C48 12 56 6 66 8 C64 18 58 22 48 22 Z" fill="#7dffb0" />
      <path d="M48 22 C50 16 54 13 59 12" stroke="#2fbf8a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <circle cx="41" cy="54" r="4.2" fill="#0b1020" />
      <circle cx="57" cy="54" r="4.2" fill="#0b1020" />
      <circle cx="42.4" cy="52.6" r="1.4" fill="#ffffff" />
      <circle cx="58.4" cy="52.6" r="1.4" fill="#ffffff" />
      <path d="M43 63 Q49 69 55 63" stroke="#0b1020" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <circle cx="35" cy="62" r="3.4" fill="#ff8fd0" opacity=".75" />
      <circle cx="63" cy="62" r="3.4" fill="#ff8fd0" opacity=".75" />
    </svg>
  )
}
