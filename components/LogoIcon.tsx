export default function LogoIcon({ className = "w-6 h-6", color = "var(--accent)" }: { className?: string; color?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color}
      strokeWidth="1.0"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M2 12h2l2-7 3 14 2-7h2v-3h2v6h2v-9h2v12h2v-5" />
      <circle cx="21" cy="12" r="1" fill={color} />
    </svg>
  );
}
