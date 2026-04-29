import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "BI & Data Engineering Services | Datta Sable",
  description: "Enterprise-grade Dashboard Development (Tableau, Power BI), Data Automation (Python, SQL), and Predictive Analytics consulting for data-driven organizations.",
  openGraph: {
    title: "BI Solutions & Technical Consulting",
    description: "High-fidelity analytics, technical automation, and scalable dashboard structures.",
    images: ["/images/datta.png"],
  }
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
