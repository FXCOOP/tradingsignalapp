import { redirect } from 'next/navigation'

export default function RootPage() {
  // Redirect to English by default
  redirect('/en')
}

export const dynamic = 'force-dynamic'
