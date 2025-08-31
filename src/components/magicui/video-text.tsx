'use client'

import { cn } from '@/utilities/ui'
import React, { ElementType, ReactNode, useEffect, useState } from 'react'

export interface VideoTextProps {
  /**
   * The video source URL
   */
  src: string
  /**
   * Additional className for the container
   */
  className?: string
  /**
   * Whether to autoplay the video
   */
  autoPlay?: boolean
  /**
   * Whether to mute the video
   */
  muted?: boolean
  /**
   * Whether to loop the video
   */
  loop?: boolean
  /**
   * Whether to preload the video
   */
  preload?: 'auto' | 'metadata' | 'none'
  /**
   * The content to display (will have the video "inside" it)
   */
  children: ReactNode
  /**
   * Font size for the text mask (in viewport width units)
   * @default 10
   */
  fontSize?: string | number
  /**
   * Font weight for the text mask
   * @default "bold"
   */
  fontWeight?: string | number
  /**
   * Text anchor for the text mask
   * @default "middle"
   */
  textAnchor?: string
  /**
   * Dominant baseline for the text mask
   * @default "middle"
   */
  dominantBaseline?: string
  /**
   * Font family for the text mask
   * @default "sans-serif"
   */
  fontFamily?: string
  /**
   * The element type to render for the text
   * @default "div"
   */
  as?: ElementType
  /**
   * Aspect ratio for the video container (width/height)
   * @default 16/9
   */
  aspectRatio?: number
  /**
   * Minimum height for the container (in viewport height units)
   * @default 50
   */
  minHeight?: number
}

export function VideoText({
  src,
  children,
  className = '',
  autoPlay = true,
  muted = true,
  loop = true,
  preload = 'auto',
  fontSize = 20,
  fontWeight = 'bold',
  textAnchor = 'middle',
  dominantBaseline = 'middle',
  fontFamily = 'sans-serif',
  as: Component = 'div',
  aspectRatio = 16 / 9,
  minHeight = 40,
}: VideoTextProps) {
  const [svgMask, setSvgMask] = useState('')
  const content = React.Children.toArray(children).join('')

  useEffect(() => {
    const updateSvgMask = () => {
      // Calculate responsive font size based on container size and content length
      const getResponsiveFontSize = () => {
        if (typeof fontSize === 'string') return fontSize

        const lines = content.split('\n')
        const maxLineLength = Math.max(...lines.map((line) => line.length))
        const totalLines = lines.length

        // Base font size calculation considering container constraints
        let baseSize = typeof fontSize === 'number' ? fontSize : 20

        // Adjust for number of lines and line length
        if (totalLines > 1) {
          baseSize = Math.min(baseSize, baseSize / (totalLines * 0.8))
        }

        if (maxLineLength > 20) {
          baseSize = Math.min(baseSize, baseSize / (maxLineLength / 20))
        }

        // Responsive breakpoints - increased sizes for mobile and tablet
        const width = window.innerWidth
        if (width < 640) {
          // sm - mobile
          baseSize = baseSize * 1.4
        } else if (width < 768) {
          // md - small tablet
          baseSize = baseSize * 1.1
        } else if (width < 1024) {
          // lg - tablet
          baseSize = baseSize * 1.05
        } else if (width < 1280) {
          // xl - desktop
          baseSize = baseSize * 1.0
        } else {
          // 2xl+ - large desktop
          baseSize = baseSize * 1.1
        }

        return `${baseSize}vw`
      }

      const responsiveFontSize = getResponsiveFontSize()

      // Split content by newlines and create separate text elements for each line
      const lines = content.split('\n')
      const textElements = lines
        .map((line, index) => {
          return `<tspan x='50%' dy='${index === 0 ? 0 : 1}em'>${line}</tspan>`
        })
        .join('')

      // Position text much higher in the container to minimize unused space
      const textY = lines.length > 1 ? '25%' : '30%'

      // Handle Next.js Google Fonts CSS variables and escape font family for SVG
      let processedFontFamily = fontFamily

      // If it's a CSS variable (Next.js Google Fonts), extract the actual font name
      if (fontFamily.includes('var(--font-')) {
        // Extract font name from CSS variable like 'var(--font-fugaz-one)'
        const match = fontFamily.match(/var\(--font-([^)]+)\)/)
        if (match) {
          const fontSlug = match[1]
          // Convert kebab-case to proper font name
          processedFontFamily = fontSlug
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        }
      }

      const safeFontFamily = processedFontFamily.replace(/['"]/g, '').split(',')[0].trim()

      // Use web-safe fonts as fallback if custom font fails
      const webSafeFonts = {
        inter: 'Arial, sans-serif',
        roboto: 'Arial, sans-serif',
        montserrat: 'Arial, sans-serif',
        georgia: 'Georgia, serif',
        times: 'Times, serif',
        courier: 'Courier, monospace',
        'fugaz one': 'Impact, Arial Black, sans-serif',
        'comforter brush': 'Brush Script MT, cursive',
      }

      const finalFontFamily =
        webSafeFonts[safeFontFamily.toLowerCase() as keyof typeof webSafeFonts] ||
        safeFontFamily ||
        'Arial'

      const newSvgMask = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><text x='50%' y='${textY}' font-size='${responsiveFontSize}' font-weight='${fontWeight}' text-anchor='${textAnchor}' dominant-baseline='${dominantBaseline}' font-family='${finalFontFamily}'>${textElements}</text></svg>`
      setSvgMask(newSvgMask)
    }

    updateSvgMask()
    window.addEventListener('resize', updateSvgMask)
    return () => window.removeEventListener('resize', updateSvgMask)
  }, [content, fontSize, fontWeight, textAnchor, dominantBaseline, fontFamily])

  const dataUrlMask = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`

  return (
    <Component
      className={cn(`relative w-full`, className)}
      style={{
        aspectRatio: aspectRatio,
        minHeight: `${minHeight}vh`,
      }}
    >
      {/* Create a container that masks the video to only show within text */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          maskImage: dataUrlMask,
          WebkitMaskImage: dataUrlMask,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
        }}
      >
        <video
          className="w-full h-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
          playsInline
        >
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Add a backup text element for SEO/accessibility */}
      <span className="sr-only">{content}</span>
    </Component>
  )
}
