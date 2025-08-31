import { Block } from 'payload'

export const VideoText: Block = {
  slug: 'videoText',
  interfaceName: 'VideoTextBlock',
  fields: [
    {
      name: 'uploadedUrl',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Text',
      required: true,
    },
  ],
}
