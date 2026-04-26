'use client'
import { usePathname } from 'next/navigation'

export function LayoutHeader({ header }: { header: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/pro')) return null
  return <>{header}</>
}

export function LayoutFooter({ footer, cta }: { footer: React.ReactNode, cta?: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/pro')) return null
  return <>{footer}{cta}</>
}
