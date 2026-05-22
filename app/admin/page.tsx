import { redirect } from 'next/navigation';

export default function AdminPage() {
  // Redirect the root of /admin to a dashboard or one of the admin subpages
  redirect('/admin/projects');
}
