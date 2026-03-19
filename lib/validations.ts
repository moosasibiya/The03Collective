import { z } from 'zod'

const phoneRegex = /^(\+27|0)[6-8][0-9]{8}$/

export const EnquirySchema = z.object({
  vehicleSlug: z.string().min(1),
  vehicleName: z.string().min(1),
  name: z.string().min(2, 'Please enter your name'),
  phone: z.string().regex(phoneRegex, 'Please enter a valid South African number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  message: z.string().max(1000).optional(),
})

export const ConsignmentSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  phone: z.string().regex(phoneRegex, 'Please enter a valid South African number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  make: z.string().min(1, 'Please enter the make'),
  model: z.string().min(1, 'Please enter the model'),
  year: z.string().optional(),
  mileage: z.string().optional(),
  price: z.string().optional(),
  notes: z.string().max(2000).optional(),
})

export const ContactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  phone: z.string().regex(phoneRegex, 'Please enter a valid South African number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  type: z.string().optional(),
  message: z.string().min(10, 'Please enter a message').max(2000),
})

export type EnquiryInput = z.infer<typeof EnquirySchema>
export type ConsignmentInput = z.infer<typeof ConsignmentSchema>
export type ContactInput = z.infer<typeof ContactSchema>