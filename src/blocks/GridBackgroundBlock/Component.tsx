import { GridBackgroundSection } from '@/components/ui/grid-background'
import { GridBackgroundSectionBlock as GridBackgroundSectionBlockProps } from '@/payload-types'

export const GridHighlightBlock = (props: GridBackgroundSectionBlockProps) => {
  return <GridBackgroundSection {...props} />
}
