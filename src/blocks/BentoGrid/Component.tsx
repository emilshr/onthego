'use client'

import { LayoutGrid } from '@/components/ui/layout-grid'
import { BentoGridBlock as BentoGridBlockProps } from '@/payload-types'
import { useMemo } from 'react'

const gridClassMap: Record<number, string> = {
  0: 'md:col-span-2',
  1: 'col-span-1',
  2: 'col-span-1',
  3: 'md:col-span-2',
}

type SkeletonProps = {
  title: string
  description: string
}

const Skeleton = ({ title, description }: SkeletonProps) => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">{title}</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">{description}</p>
    </div>
  )
}

export const BentoGridBlock = (props: BentoGridBlockProps) => {
  const { gridItems } = props

  const cards = useMemo(() => {
    {
      return (gridItems || []).map((item, index) => {
        return {
          id: index + 1,
          content: <Skeleton title={item.title || ''} description={item.description || ''} />,
          className: gridClassMap[index % 4],
          thumbnail: typeof item.image === 'object' ? item.image?.url || '' : item.image || '',
        }
      })
    }
  }, [gridItems])

  return (
    <div className="w-full h-[800px]">
      <LayoutGrid cards={cards} />
    </div>
  )
}
