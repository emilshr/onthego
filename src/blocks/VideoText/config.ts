import { Block } from 'payload'

export const VideoText: Block = {
  slug: 'videoText',
  interfaceName: 'VideoTextBlock',
  fields: [
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL',
      required: true,
    },
    {
      name: 'text',
      type: 'text',
      label: 'Text',
      required: true,
    },
  ],
}
