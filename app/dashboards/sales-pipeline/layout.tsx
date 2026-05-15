import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sales Pipeline Velocity | Revenue Analytics Dashboard",
  description: "Advanced B2B sales pipeline analytics and forecasting dashboard. Track deal movement and optimize conversion rates.",
  openGraph: {
    title: "Sales Pipeline Velocity | Revenue Analytics Dashboard",
    description: "Interactive B2B sales pipeline infrastructure. Real-time deal tracking and quarterly forecasting.",
    images: ["/images/dashboards/sales_pipeline_preview.png"],
    url: "https://dattasable.com/dashboards/sales-pipeline",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sales Pipeline Velocity | Revenue Analytics Dashboard",
    images: ["/images/dashboards/sales_pipeline_preview.png"],
  },
};

export default function SalesPipelineLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
