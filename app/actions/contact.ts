'use server'

import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { resend } from '@/lib/resend'
import { ContactSchema } from '@/lib/validations'

export type ActionResult = { success: true } | { success: false; error: string }

export async function submitContact(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries())
  const parsed = ContactSchema.safeParse(raw)

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

  const { name, phone, email, type, message } = parsed.data

  try {
    await prisma.contactMessage.create({
      data: {
        name,
        phone,
        email: email || null,
        type: type || null,
        message,
        ipAddress,
        userAgent,
      },
    })

    await resend.emails.send({
      from: 'The 03 Collective <hello@the03collective.co.za>',
      to: process.env.BUSINESS_EMAIL!,
      subject: `New Contact Message${type ? ` — ${type}` : ''}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || '—'}</p>
        <p><strong>Type:</strong> ${type || 'General'}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error('submitContact failed', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again or contact us directly.',
    }
  }
}