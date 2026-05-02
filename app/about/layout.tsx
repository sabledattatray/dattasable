import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Datta Sable | BI Expert & Data Architect",
  description: "Learn about Datta Sable's journey from data enthusiast to Business Intelligence Architect. Specialized in building elite analytics stacks for modern enterprises.",
  openGraph: {
    title: "The Architect | Datta Sable",
    description: "Building the future of data-driven intelligence.",
    images: ["/images/datta.webp"],
  }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
