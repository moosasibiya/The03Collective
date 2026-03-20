'use server'

import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rateLimit'
import { resend } from '@/lib/resend'
import { ContactSchema } from '@/lib/validations'
import { headers } from 'next/headers'

export type ActionResult =
  | { success: true }
  | { success: false; error: string }

export async function submitContact(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData)
  const parsed = ContactSchema.safeParse(raw)

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid form submission' }
  }

  const { name, phone, email, type, message } = parsed.data
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const userAgent = headersList.get('user-agent')

  const { allowed } = rateLimit(ip)
  if (!allowed) {
    return {
      success: false,
      error: 'Too many submissions. Please wait a moment and try again.',
    }
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name,
        phone,
        email: email || null,
        type: type || null,
        message,
        ipAddress: ip,
        userAgent,
      },
    })

    await resend.emails.send({
      from: 'The 03 Collective <hello@the03collective.co.za>',
      to: process.env.BUSINESS_EMAIL!,
      replyTo: email || undefined,
      subject: `New Contact Message - ${name}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 24px;color:#1C1A17">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#A09890;margin-bottom:8px">The 03 Collective</p>
          <h1 style="font-size:28px;font-weight:300;margin:0 0 32px">New Message</h1>
          <table style="width:100%;border-collapse:collapse">
            <tr style="border-bottom:1px solid #EDE8DF"><td style="padding:12px 0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#A09890;width:120px">Name</td><td style="padding:12px 0;font-size:15px">${name}</td></tr>
            <tr style="border-bottom:1px solid #EDE8DF"><td style="padding:12px 0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#A09890">Phone</td><td style="padding:12px 0;font-size:15px">${phone}</td></tr>
            <tr style="border-bottom:1px solid #EDE8DF"><td style="padding:12px 0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#A09890">Email</td><td style="padding:12px 0;font-size:15px">${email || '-'}</td></tr>
            <tr style="border-bottom:1px solid #EDE8DF"><td style="padding:12px 0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#A09890">Topic</td><td style="padding:12px 0;font-size:15px">${type || '-'}</td></tr>
            <tr><td style="padding:12px 0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#A09890">Message</td><td style="padding:12px 0;font-size:15px">${message}</td></tr>
          </table>
        </div>
      `,
    })

    return { success: true }
  } catch (err) {
    console.error('[submitContact]', err)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}
