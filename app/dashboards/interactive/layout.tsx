import { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Interactive Analytics Showcase | Surgical BI' },
  description: 'Explore our interactive analytics showcase containing simulated real-time financial data, transaction logging, region-based filtering, and visual charts.',
  openGraph: {
    title: 'Interactive Analytics Showcase',
    description: 'Real-time financial transactions, analytics logging, and visual chart showcases.',
    type: 'website',
  }
};

export default function InteractiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
