export default function LogoIcon({ className = "w-8 h-8", color = "var(--accent)" }: { className?: string; color?: string }) {
  return (
    <svg 
      viewBox="-2 -2 28 28" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <path 
        d="M3 4h1v14l5.58-9.67l6.01 3.47l3.62-6.26l.86.5l-4.11 7.13L9.95 9.7L4 20h16v1H3z" 
        fill={color} 
      />
    </svg>
  );
}
