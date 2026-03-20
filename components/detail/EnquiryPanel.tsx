'use client'

import { useState } from 'react'
import type { Vehicle } from '@/types'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import EnquiryForm from '@/components/forms/EnquiryForm'
import { SITE_CONTACT } from '@/lib/site-content'
import { buildWhatsApp, formatPrice } from '@/utils/format'
import styles from './EnquiryPanel.module.css'

type EnquiryPanelProps = {
  vehicle: Vehicle
}

export default function EnquiryPanel({ vehicle }: EnquiryPanelProps) {
  const [open, setOpen] = useState(false)
  const sold = vehicle.status === 'sold'

  return (
    <aside className={styles.panel}>
      <Badge status={vehicle.status} />
      <h2 className={styles.title}>
        {vehicle.make} {vehicle.model}
      </h2>
      <p className={styles.meta}>
        {vehicle.year}
        {vehicle.colour ? ` | ${vehicle.colour}` : ''}
      </p>

      <div className={styles.priceRow}>
        <span className={styles.currency}>R</span>
        <span className={styles.price}>{formatPrice(vehicle.price)}</span>
      </div>

      <div className={styles.tags}>
        {(vehicle.tags || []).map((tag) => (
          <span className={styles.tag} key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.actions}>
        {sold ? (
          <>
            <Button block disabled variant="ghost">
              This Vehicle Is Sold
            </Button>
            <Button
              block
              external
              href={buildWhatsApp(
                SITE_CONTACT.whatsappNumber,
                `Hi, I'm looking for something similar to the ${vehicle.year} ${vehicle.make} ${vehicle.model}.`
              )}
              variant="wa"
            >
              Find Me Something Similar
            </Button>
          </>
        ) : (
          <>
            <Button
              block
              external
              href={buildWhatsApp(
                SITE_CONTACT.whatsappNumber,
                vehicle.whatsappMessage ??
                  `Hi, I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model}.`
              )}
              variant="wa"
            >
              Enquire on WhatsApp
            </Button>
            <Button block onClick={() => setOpen((current) => !current)}>
              {open ? 'Hide Enquiry Form' : 'Send an Enquiry ->'}
            </Button>
            <Button
              block
              href={`/contact?type=buying&vehicle=${encodeURIComponent(
                `${vehicle.year} ${vehicle.make} ${vehicle.model}`
              )}`}
              variant="ghost"
            >
              Book a Viewing
            </Button>
          </>
        )}
      </div>

      {!sold && open ? (
        <div className={styles.formWrap}>
          <EnquiryForm
            vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            vehicleSlug={vehicle.slug.current}
          />
        </div>
      ) : null}

      <div className={styles.trust}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
        </svg>
        <span>Typically responded to within 2 hours</span>
      </div>
    </aside>
  )
}
