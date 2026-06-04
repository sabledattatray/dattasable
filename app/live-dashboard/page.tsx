import { redirect } from 'next/navigation';

// This page is an orphaned duplicate of /analytics-live.
// Redirect permanently to avoid duplicate content.
export default function LiveDashboardPage() {
  redirect('/analytics-live');
}
