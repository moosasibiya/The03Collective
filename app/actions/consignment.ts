'use server'

import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { resend } from '@/lib/resend'
import { ConsignmentSchema } from '@/lib/validations'

export type ActionResult = { success: true } | { success: false; error: string }

export async function submitConsignment(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries())
  const parsed = ConsignmentSchema.safeParse(raw)

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? 'Invalid form submission',
    }
  }

  const requestHeaders = await headers()
  const forwardedFor = requestHeaders.get('x-forwarded-for')
  const userAgent = requestHeaders.get('user-agent')

  const ipAddress = forwardedFor?.split(',')[0]?.trim() || null

  const { name, phone, email, make, model, year, mileage, price, notes } = parsed.data

  try {
    await prisma.consignmentLead.create({
      data: {
        name,
        phone,
        email: email || null,
        make,
        model,
        year: year || null,
        mileage: mileage || null,
        price: price || null,
        notes: notes || null,
        ipAddress,
        userAgent,
      },
    })

    await resend.emails.send({
      from: 'The 03 Collective <hello@the03collective.co.za>',
      to: process.env.BUSINESS_EMAIL!,
      subject: `New Consignment Lead — ${make} ${model}`,
      html: `
        <h2>New Consignment Lead</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || '—'}</p>
        <p><strong>Vehicle:</strong> ${make} ${model}</p>
        <p><strong>Year:</strong> ${year || '—'}</p>
        <p><strong>Mileage:</strong> ${mileage || '—'}</p>
        <p><strong>Expected Price:</strong> ${price || '—'}</p>
        <p><strong>Notes:</strong> ${notes || '—'}</p>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error('submitConsignment failed', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again or contact us directly.',
    }
  }
}