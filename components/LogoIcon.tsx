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
      <path d="M2 18a2 2 0 0 0 1.7 3h9.7l-2.7-4.5h-2L12 11l6 10h2.3a2 2 0 0 0 1.7-3L13.8 4a2 2 0 0 0-3.6 0Z" />
    </svg>
  );
}
