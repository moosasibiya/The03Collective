import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemas } from './schemas'
import { structure } from './structure'
import { StudioLogo } from './studioBrand'

export default defineConfig({
  name: 'the03collective',
  title: 'The 03 Collective',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  components: {
    logo: StudioLogo,
  },
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemas,
  },
})
