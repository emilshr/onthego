'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { VideoTextBlock } from '@/blocks/VideoText/Component'

export const HighImpactHero: React.FC<Page['hero']> = ({ heroText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="flex text-white" data-theme="dark">
      {heroText && heroText.map((arg) => <VideoTextBlock {...arg} key={arg.id} />)}
    </div>
  )
}
