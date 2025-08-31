import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Comforter_Brush } from 'next/font/google'
import { cn } from '@/utilities/ui'

const comforterBrush = Comforter_Brush({
  subsets: ['latin'],
  weight: ['400'],
  preload: true,
})

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-row justify-between">
        <Link href="/" className="text-center md:text-start">
          {/* <Logo loading="eager" priority="high" className="invert dark:invert-0" /> */}
          <h1 className={cn(comforterBrush.className, 'text-3xl font-bold text-white')}>onthego</h1>
        </Link>

        <div className="flex items-center md:items-start justify-center md:justify-start flex-row gap-4">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink key={i} {...link} appearance="link" />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
