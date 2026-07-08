import { defineField, defineType } from 'sanity'

const statusLabels: Record<string, string> = {
  available: 'Available',
  reserved: 'Reserved',
  sold: 'Sold',
  comingSoon: 'Coming Soon',
  hidden: 'Hidden',
}

const liveStatuses = ['available', 'comingSoon']

const imageFields = [defineField({ name: 'alt', title: 'Alt text', type: 'string' })]

export const vehicle = defineType({
  name: 'vehicle',
  title: 'Inventory',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'photos', title: 'Photos' },
    { name: 'pricing', title: 'Pricing' },
    { name: 'specifications', title: 'Specifications' },
    { name: 'conditionHistory', title: 'Condition & History' },
    { name: 'marketingCopy', title: 'Marketing Copy' },
    { name: 'seo', title: 'SEO' },
    { name: 'publishing', title: 'Publishing' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Listing Title',
      type: 'string',
      group: 'basic',
      description:
        'Internal listing title shown in Studio. Public pages still use make, model, and trim.',
      validation: (rule) =>
        rule.custom((value, context) => {
          const status = String(context.document?.status ?? '')
          if (liveStatuses.includes(status) && !value) {
            return 'Add a listing title before publishing this live listing.'
          }

          return true
        }),
    }),
    defineField({
      name: 'make',
      title: 'Make',
      type: 'string',
      group: 'basic',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'model',
      title: 'Model',
      type: 'string',
      group: 'basic',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      group: 'basic',
      validation: (rule) => rule.required().min(1980).max(2035),
    }),
    defineField({
      name: 'trim',
      title: 'Variant / Trim',
      type: 'string',
      group: 'basic',
      description: 'Kept as "trim" for backwards compatibility with the public website.',
    }),
    defineField({ name: 'colour', title: 'Colour', type: 'string', group: 'basic' }),
    defineField({
      name: 'bodyType',
      title: 'Body Type',
      type: 'string',
      group: 'basic',
      options: {
        list: ['Coupe', 'Convertible', 'Hatchback', 'Sedan', 'SUV', 'Bakkie', 'Wagon', 'Van'],
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'photos',
      options: { hotspot: true },
      fields: imageFields,
      description:
        'Preferred Studio thumbnail and listing hero image. Existing gallery images still work.',
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      group: 'photos',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: imageFields,
        },
      ],
      validation: (rule) => [
        rule.min(1).error('At least one gallery photo is required'),
        rule
          .custom((images) => {
            if (!Array.isArray(images)) {
              return true
            }

            const missingAlt = images.some((image) => {
              if (!image || typeof image !== 'object') {
                return false
              }

              const alt = 'alt' in image ? image.alt : undefined
              return typeof alt !== 'string' || alt.trim().length === 0
            })

            return missingAlt ? 'Add alt text to each photo for accessibility and SEO.' : true
          })
          .warning(),
      ],
    }),
    defineField({
      name: 'price',
      title: 'Price (R)',
      type: 'number',
      group: 'pricing',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'mileage',
      title: 'Mileage (km)',
      type: 'number',
      group: 'specifications',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'transmission',
      title: 'Transmission',
      type: 'string',
      group: 'specifications',
      options: { list: ['Automatic', 'Manual', 'PDK', 'DCT', 'CVT'] },
    }),
    defineField({
      name: 'fuel',
      title: 'Fuel Type',
      type: 'string',
      group: 'specifications',
      options: { list: ['Petrol', 'Diesel', 'Hybrid', 'Electric'] },
    }),
    defineField({
      name: 'specs',
      title: 'Performance Specs',
      type: 'object',
      group: 'specifications',
      fields: [
        defineField({ name: 'power', title: 'Power', type: 'string' }),
        defineField({ name: 'torque', title: 'Torque', type: 'string' }),
        defineField({ name: 'drive', title: 'Drivetrain', type: 'string' }),
        defineField({ name: 'acceleration', title: '0-100 km/h', type: 'string' }),
      ],
    }),
    defineField({
      name: 'conditionNotes',
      title: 'Condition Notes',
      type: 'text',
      group: 'conditionHistory',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      group: 'marketingCopy',
      rows: 3,
      validation: (rule) =>
        rule.max(180).warning('Keep the short description under 180 characters.'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      group: 'marketingCopy',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'features',
      title: 'Features & Equipment',
      type: 'array',
      group: 'marketingCopy',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'WhatsApp Pre-fill Message',
      type: 'string',
      group: 'marketingCopy',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      validation: (rule) =>
        rule.max(60).warning('SEO titles usually display best under 60 characters.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      validation: (rule) =>
        rule.max(160).warning('SEO descriptions usually display best under 160 characters.'),
    }),
    defineField({
      name: 'status',
      title: 'Listing Status',
      type: 'string',
      group: 'publishing',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Coming Soon', value: 'comingSoon' },
          { title: 'Sold', value: 'sold' },
          { title: 'Hidden', value: 'hidden' },
          { title: 'Reserved (legacy)', value: 'reserved' },
        ],
      },
      initialValue: 'available',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      group: 'publishing',
      initialValue: false,
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'publishing',
      options: {
        source: (doc) =>
          String(doc.title || `${doc.year}-${doc.make}-${doc.model}`)
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, ''),
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      make: 'make',
      model: 'model',
      trim: 'trim',
      year: 'year',
      price: 'price',
      mileage: 'mileage',
      status: 'status',
      mainImage: 'mainImage',
      galleryImage: 'images.0',
    },
    prepare({ title, make, model, trim, year, price, mileage, status, mainImage, galleryImage }) {
      const displayTitle = title || [year, make, model, trim].filter(Boolean).join(' ')
      const formattedPrice =
        typeof price === 'number' ? `R${price.toLocaleString('en-ZA')}` : 'No price'
      const formattedMileage =
        typeof mileage === 'number' ? `${mileage.toLocaleString('en-ZA')} km` : 'No mileage'
      const statusLabel = statusLabels[String(status)] ?? 'No status'

      return {
        title: displayTitle || 'Untitled vehicle',
        subtitle: `${formattedPrice} | ${formattedMileage} | ${statusLabel}`,
        media: mainImage || galleryImage,
      }
    },
  },
})
