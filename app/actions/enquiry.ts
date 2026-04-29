'use server'

import { headers } from 'next/headers'
import * as Sentry from '@sentry/nextjs'
import { isSpamSubmission } from '@/lib/form-security'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rateLimit'
import { getResend } from '@/lib/resend'
import { EnquirySchema } from '@/lib/validations'
import { escapeHtml } from '@/utils/escapeHtml'

export type ActionResult = { success: true } | { success: false; error: string }

export async function submitEnquiry(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData)

  if (isSpamSubmission(raw)) {
    return { success: true }
  }

  const parsed = EnquirySchema.safeParse(raw)

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid form submission' }
  }

  const { vehicleSlug, vehicleName, name, phone, email, message } = parsed.data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.the03collective.co.za'
  const businessWhatsApp = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || '27820000000'
  const businessPhoneDisplay = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+27 82 000 0000'
  const safeVehicleName = escapeHtml(vehicleName)
  const safeName = escapeHtml(name)
  const safePhone = escapeHtml(phone)
  const safeEmail = escapeHtml(email || '-')
  const safeMessage = escapeHtml(message || '-')
  const safeBusinessPhoneDisplay = escapeHtml(businessPhoneDisplay)
  const listingUrl = `${siteUrl}/inventory/${encodeURIComponent(vehicleSlug)}`
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const userAgent = headersList.get('user-agent')

  try {
    const { allowed } = await rateLimit(ip)
    if (!allowed) {
      return {
        success: false,
        error: 'Too many submissions. Please wait a moment and try again.',
      }
    }

    await prisma.vehicleEnquiry.create({
      data: {
        vehicleSlug,
        vehicleName,
        name,
        phone,
        email: email || null,
        message: message || null,
        ipAddress: ip,
        userAgent,
      },
    })

    const resend = getResend()

    await resend.emails.send({
      from: 'The 03 Collective <hello@the03collective.co.za>',
      to: process.env.BUSINESS_EMAIL!,
      replyTo: email || undefined,
      subject: `New Enquiry - ${vehicleName}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 24px;color:#1C1A17">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#A09890;margin-bottom:8px">The 03 Collective</p>
          <h1 style="font-size:28px;font-weight:300;margin:0 0 32px">New Vehicle Enquiry</h1>
          <table style="width:100%;border-collapse:collapse">
            <tr style="border-bottom:1px solid #EDE8DF">
              <td style="padding:12px 0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#A09890;width:120px">Vehicle</td>
              <td style="padding:12px 0;font-size:15px;color:#1C1A17">${safeVehicleName}</td>
            </tr>
            <tr style="border-bottom:1px solid #EDE8DF">
              <td style="padding:12px 0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#A09890">Name</td>
              <td style="padding:12px 0;font-size:15px;color:#1C1A17">${safeName}</td>
            </tr>
            <tr style="border-bottom:1px solid #EDE8DF">
              <td style="padding:12px 0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#A09890">Phone</td>
              <td style="padding:12px 0;font-size:15px;color:#1C1A17">${safePhone}</td>
            </tr>
            <tr style="border-bottom:1px solid #EDE8DF">
              <td style="padding:12px 0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#A09890">Email</td>
              <td style="padding:12px 0;font-size:15px;color:#1C1A17">${safeEmail}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#A09890">Message</td>
              <td style="padding:12px 0;font-size:15px;color:#1C1A17">${safeMessage}</td>
            </tr>
          </table>
          <div style="margin-top:32px;padding-top:24px;border-top:1px solid #EDE8DF">
            <a href="${listingUrl}"
               style="display:inline-block;padding:12px 24px;background:#C9A96E;color:#0A0A0B;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none">
              View Listing ->
            </a>
          </div>
        </div>
      `,
    })

    if (email) {
      await resend.emails.send({
        from: 'The 03 Collective <hello@the03collective.co.za>',
        to: email,
        subject: `Enquiry Received - ${vehicleName}`,
        html: `
          <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 24px;color:#1C1A17">
            <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#A09890;margin-bottom:8px">The 03 Collective</p>
            <h1 style="font-size:28px;font-weight:300;margin:0 0 16px">We've received your enquiry.</h1>
            <p style="font-size:15px;color:#6B6560;line-height:1.7;margin-bottom:24px">
              Hi ${safeName}, thank you for your interest in the <strong style="color:#1C1A17">${safeVehicleName}</strong>.
              We'll be in touch shortly.
            </p>
            <p style="font-size:15px;color:#6B6560;line-height:1.7">
              In the meantime, feel free to WhatsApp us directly at
              <a href="https://wa.me/${businessWhatsApp}" style="color:#C9A96E">${safeBusinessPhoneDisplay}</a>.
            </p>
            <div style="margin-top:40px;padding-top:24px;border-top:1px solid #EDE8DF;font-size:12px;color:#A09890">
              &copy; The 03 Collective - Johannesburg, South Africa
            </div>
          </div>
        `,
      })
    }

    return { success: true }
  } catch (err) {
    Sentry.captureException(err)
    console.error('[submitEnquiry]', err)
    return {
      success: false,
      error: 'Something went wrong. Please WhatsApp us directly.',
    }
  }
}
