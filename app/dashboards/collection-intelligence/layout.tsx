import { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'EMI Collection Intelligence | Surgical BI' },
  description: 'Advanced fintech analytics dashboard for real-time EMI collection monitoring, overdue aging analysis, and portfolio risk management.',
  keywords: ['EMI Analytics', 'Fintech Dashboard', 'Collection Intelligence', 'Loan Portfolio Management', 'BI Dashboard', 'Next.js Analytics'],
  openGraph: {
    title: 'EMI Collection Intelligence | Surgical BI Dashboard',
    description: 'High-performance fintech analytics for real-time portfolio oversight.',
    type: 'website',
  }
};

export default function EMILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
