import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Surgical AI Workspace | Workflow Intelligence Dashboard",
  description: "Enterprise-grade AI workflow infrastructure dashboard. Monitor intelligent execution chains and scale AI operations.",
  openGraph: {
    title: "Surgical AI Workspace | Workflow Intelligence Dashboard",
    description: "Monitor live AI agent execution chains and optimize automation fidelity.",
    images: ["/images/dashboards/surgical_ai_preview.png"],
    url: "https://dattasable.com/dashboards/surgical-ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Surgical AI Workspace | Workflow Intelligence Dashboard",
    images: ["/images/dashboards/surgical_ai_preview.png"],
  },
  alternates: {
    canonical: "/dashboards/surgical-ai",
  },
};

export default function SurgicalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
