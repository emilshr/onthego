import { VideoText } from '@/components/magicui/video-text'
import { VideoTextBlock as VideoTextBlockProps } from '@/payload-types'

export const VideoTextBlock: React.FC<VideoTextBlockProps> = ({ videoUrl, text }) => {
  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <VideoText className="text-lg md:text-xl lg:text-2xl" src={videoUrl}>
        {text}
      </VideoText>
    </div>
  )
}
