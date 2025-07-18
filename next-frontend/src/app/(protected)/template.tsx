'use client'

import React from 'react'
import { PageTransition } from '@/components/page-transition'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <PageTransition>
      <div className="w-full">
        {children}
      </div>
    </PageTransition>
  )
} 