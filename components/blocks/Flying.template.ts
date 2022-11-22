import type { TinaTemplate } from 'tinacms'
import { actionsTemplate } from './Actions.template'

export const flyingTemplate: TinaTemplate = {
  name: 'flying',
  label: 'Flying',
  ui: {
    previewSrc: '/img/blocks/flying.png',
  },
  fields: [
    {
      name: 'headline',
      label: 'Headline',
      type: 'string',
      required: true,
      isTitle: true,
    },
    {
      name: 'text',
      label: 'Text',
      ui: { component: 'textarea' },
      type: 'string',
    },
    // @ts-ignore
    actionsTemplate,
  ],
}
