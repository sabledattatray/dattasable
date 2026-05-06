import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Professional Resume | Datta Sable - BI & Analytics Manager",
  description: "View the professional experience and expertise of Datta Sable, an MIS & Analytics Manager with 10+ years of experience in BFSI, collections analytics, and risk portfolio management.",
  openGraph: {
    title: "Datta Sable - Professional Resume",
    description: "MIS & Analytics Manager specializing in Power BI, SQL, and Data Automation.",
    type: "profile",
  },
  alternates: {
    canonical: '/resume',
  }
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
