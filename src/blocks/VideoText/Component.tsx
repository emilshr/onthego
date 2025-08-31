import { VideoText } from '@/components/magicui/video-text'
import { VideoTextBlock as VideoTextBlockProps } from '@/payload-types'
import { Fugaz_One } from 'next/font/google'

const fugazOne = Fugaz_One({
  subsets: ['latin'],
  weight: ['400'],
  preload: true,
})

export const VideoTextBlock: React.FC<VideoTextBlockProps> = ({ text, uploadedUrl }) => {
  if (typeof uploadedUrl === 'object' && uploadedUrl.url) {
    return (
      <div className="relative w-full overflow-hidden">
        <VideoText
          fontWeight={900}
          fontFamily="Fugaz One"
          src={uploadedUrl.url}
          className={fugazOne.className}
          fontSize={25}
        >
          {text}
        </VideoText>
      </div>
    )
  }
  return null
}
