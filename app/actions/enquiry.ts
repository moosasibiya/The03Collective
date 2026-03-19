'use server'

import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { resend } from '@/lib/resend'
import { EnquirySchema } from '@/lib/validations'

export type ActionResult = { success: true } | { success: false; error: string }

export async function submitEnquiry(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries())
  const parsed = EnquirySchema.safeParse(raw)

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

  const { vehicleSlug, vehicleName, name, phone, email, message } = parsed.data

  try {
    await prisma.vehicleEnquiry.create({
      data: {
        vehicleSlug,
        vehicleName,
        name,
        phone,
        email: email || null,
        message: message || null,
        ipAddress,
        userAgent,
      },
    })

    await resend.emails.send({
      from: 'The 03 Collective <hello@the03collective.co.za>',
      to: process.env.BUSINESS_EMAIL!,
      subject: `New Enquiry — ${vehicleName}`,
      html: `
        <h2>New Vehicle Enquiry</h2>
        <p><strong>Vehicle:</strong> ${vehicleName}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || '—'}</p>
        <p><strong>Message:</strong> ${message || '—'}</p>
        <p><a href="https://www.the03collective.co.za/inventory/${vehicleSlug}">View listing</a></p>
      `,
    })

    if (email) {
      await resend.emails.send({
        from: 'The 03 Collective <hello@the03collective.co.za>',
        to: email,
        subject: `Enquiry Received — ${vehicleName}`,
        html: `
          <p>Hi ${name},</p>
          <p>Thank you for your interest in the <strong>${vehicleName}</strong>.</p>
          <p>We’ve received your enquiry and will be in touch shortly.</p>
          <p>— The 03 Collective</p>
        `,
      })
    }

    return { success: true }
  } catch (error) {
    console.error('submitEnquiry failed', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again or contact us directly.',
    }
  }
}