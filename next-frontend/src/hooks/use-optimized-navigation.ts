'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useTransition } from 'react'

export function useOptimizedNavigation() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const navigate = useCallback((href: string) => {
    startTransition(() => {
      router.push(href)
    })
  }, [router])

  const replace = useCallback((href: string) => {
    startTransition(() => {
      router.replace(href)
    })
  }, [router])

  return {
    navigate,
    replace,
    isPending
  }
} 