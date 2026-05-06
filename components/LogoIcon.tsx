export default function LogoIcon({ className = "w-6 h-6", color = "var(--accent)" }: { className?: string; color?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="m3 8l4-4l4 4M7 4v16m4-8h10m-10 4h7m-7 4h4" />
    </svg>
  );
}
