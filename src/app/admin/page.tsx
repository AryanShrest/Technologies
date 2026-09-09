import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { requireAdminPage } from '@/lib/admin'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const user = await requireAdminPage()
  return <AdminDashboard email={user.email ?? 'Administrator'} />
}
