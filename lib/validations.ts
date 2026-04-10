import { z } from 'zod'

const trimValue = (value: unknown) => (typeof value === 'string' ? value.trim() : value)

const requiredText = (min: number, message: string) =>
  z.preprocess(trimValue, z.string().min(min, message))

const optionalText = (max: number) => z.preprocess(trimValue, z.string().max(max).optional())

const optionalEmail = z.preprocess(
  trimValue,
  z.union([z.literal(''), z.string().email('Please enter a valid email')])
)

const saPhone = z.preprocess(
  trimValue,
  z
    .string()
    .regex(/^(\+27|27|0)[6-8][0-9]{8}$/, 'Please enter a valid South African mobile number')
)

export const EnquirySchema = z.object({
  vehicleSlug: requiredText(1, 'Vehicle slug is required'),
  vehicleName: requiredText(1, 'Vehicle name is required'),
  name: requiredText(2, 'Please enter your name'),
  phone: saPhone,
  email: optionalEmail,
  message: z.preprocess(trimValue, z.string().max(1000, 'Message must be under 1000 characters')),
})

export const ConsignmentSchema = z.object({
  name: requiredText(2, 'Please enter your name'),
  phone: saPhone,
  email: optionalEmail,
  make: requiredText(1, 'Please enter the make'),
  model: requiredText(1, 'Please enter the model'),
  year: optionalText(32),
  mileage: optionalText(64),
  price: optionalText(32),
  notes: z.preprocess(trimValue, z.string().max(2000, 'Notes must be under 2000 characters')),
})

export const ContactSchema = z.object({
  name: requiredText(2, 'Please enter your name'),
  phone: saPhone,
  email: optionalEmail,
  type: optionalText(80),
  message: z.preprocess(
    trimValue,
    z
      .string()
      .min(10, 'Please enter a message')
      .max(2000, 'Message must be under 2000 characters')
  ),
})

export type EnquiryInput = z.infer<typeof EnquirySchema>
export type ConsignmentInput = z.infer<typeof ConsignmentSchema>
export type ContactInput = z.infer<typeof ContactSchema>
