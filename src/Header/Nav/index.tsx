'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = () => {
  return (
    <nav className="flex gap-3 items-center">
      {/* {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })} */}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
