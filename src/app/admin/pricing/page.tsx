import { AdminShell } from '@/components/admin/AdminShell'
import { CatalogManager } from '@/components/admin/CatalogManager'
import { requireAdminPage } from '@/lib/admin'

export const dynamic = 'force-dynamic'
export default async function PricingAdminPage() {
  const user = await requireAdminPage()
  const email = user.email ?? 'Administrator'
  return (
    <AdminShell email={email} title="Pricing">
      <CatalogManager entity="pricing" />
    </AdminShell>
  )
}
