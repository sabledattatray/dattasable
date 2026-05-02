import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Datta Sable | Let's Build Something Smarter",
  description: "Ready to transform your data strategy? Get in touch with Datta Sable for custom BI builds, automation consulting, or enterprise data architecture inquiries.",
  openGraph: {
    title: "Establish Connection | Datta Sable",
    description: "Connect for elite BI consulting and data architecture.",
    images: ["/images/datta.webp"],
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
