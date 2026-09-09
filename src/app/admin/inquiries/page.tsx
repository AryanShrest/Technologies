import { InquiryInbox } from '@/components/admin/InquiryInbox'
import { requireAdminPage } from '@/lib/admin'

export const dynamic = 'force-dynamic'

export default async function InquiriesPage() {
  const user = await requireAdminPage()
  return <InquiryInbox email={user.email ?? 'Administrator'} />
}
