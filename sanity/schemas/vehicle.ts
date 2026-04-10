import { defineField, defineType } from 'sanity'

export const vehicle = defineType({
  name: 'vehicle',
  title: 'Vehicle',
  type: 'document',
  fields: [
    defineField({
      name: 'make',
      title: 'Make',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'model',
      title: 'Model',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.required().min(1980).max(2035),
    }),
    defineField({
      name: 'mileage',
      title: 'Mileage (km)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'price',
      title: 'Price (R)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({ name: 'colour', title: 'Colour', type: 'string' }),
    defineField({ name: 'trim', title: 'Trim / Package', type: 'string' }),
    defineField({
      name: 'transmission',
      title: 'Transmission',
      type: 'string',
      options: { list: ['Automatic', 'Manual', 'PDK', 'DCT', 'CVT'] },
    }),
    defineField({
      name: 'fuel',
      title: 'Fuel Type',
      type: 'string',
      options: { list: ['Petrol', 'Diesel', 'Hybrid', 'Electric'] },
    }),
    defineField({
      name: 'status',
      title: 'Listing Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Reserved', value: 'reserved' },
          { title: 'Sold', value: 'sold' },
        ],
      },
      initialValue: 'available',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'images',
      title: 'Vehicle Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
        },
      ],
      validation: (rule) => [
        rule.min(1).error('At least one photo is required'),
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
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'features',
      title: 'Features & Equipment',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'specs',
      title: 'Performance Specs',
      type: 'object',
      fields: [
        defineField({ name: 'power', title: 'Power', type: 'string' }),
        defineField({ name: 'torque', title: 'Torque', type: 'string' }),
        defineField({ name: 'drive', title: 'Drivetrain', type: 'string' }),
        defineField({ name: 'acceleration', title: '0-100 km/h', type: 'string' }),
      ],
    }),
    defineField({ name: 'conditionNotes', title: 'Condition Notes', type: 'text' }),
    defineField({
      name: 'whatsappMessage',
      title: 'WhatsApp Pre-fill Message',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: (doc) =>
          `${doc.year}-${doc.make}-${doc.model}`
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
      make: 'make',
      model: 'model',
      media: 'images.0',
    },
    prepare({ make, model, media }) {
      return {
        title: `${make ?? ''} ${model ?? ''}`.trim(),
        media,
      }
    },
  },
})
