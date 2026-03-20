import ContactForm from '@/components/forms/ContactForm'
import Button from '@/components/ui/Button'
import PageHeader from '@/components/ui/PageHeader'
import RevealWrapper from '@/components/ui/RevealWrapper'
import { SITE_CONTACT } from '@/lib/site-content'
import { buildWhatsApp } from '@/utils/format'
import styles from './ContactScreen.module.css'

type ContactScreenProps = {
  initialMessage?: string
  initialType?: string
}

export default function ContactScreen({ initialMessage, initialType }: ContactScreenProps) {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { label: 'Contact' },
        ]}
        description="No call centres. No bots. A real person will respond - usually within a couple of hours."
        label="Get in Touch"
        title={
          <>
            We&apos;re Always
            <br />
            <em>Reachable.</em>
          </>
        }
      />

      <div className={styles.page}>
        <div className="container">
          <div className={styles.grid}>
            <RevealWrapper>
              <div className={styles.block}>
                <h2>Direct Contact</h2>
                <div className={styles.detail}>{SITE_CONTACT.phoneDisplay}</div>
                <div className={styles.detail}>{SITE_CONTACT.email}</div>
                <div className={styles.detail}>{SITE_CONTACT.instagram}</div>
                <Button
                  block
                  className={styles.whatsAppButton}
                  external
                  href={buildWhatsApp(SITE_CONTACT.whatsappNumber, "Hi The 03 Collective, I'd like to get in touch.")}
                  variant="wa"
                >
                  Start a WhatsApp Chat
                </Button>
              </div>

              <div className={styles.block}>
                <h2>Location</h2>
                <div className={styles.detail}>
                  {SITE_CONTACT.location[0]}
                  <br />
                  {SITE_CONTACT.location[1]}
                  <br />
                  <span className={styles.hint}>Viewings by appointment</span>
                </div>
              </div>

              <div className={styles.block}>
                <h2>Office Hours</h2>
                <div className={styles.hours}>
                  {SITE_CONTACT.hours.map((row) => (
                    <div className={styles.hoursRow} key={row.day}>
                      <span>{row.day}</span>
                      <span>{row.time}</span>
                    </div>
                  ))}
                </div>
                <p className={styles.note}>WhatsApp is monitored beyond these hours.</p>
              </div>
            </RevealWrapper>

            <RevealWrapper delay={120}>
              <div className="formCard">
                <div className="formTitle">Send a Message</div>
                <p className="formSub">For general enquiries, buying interest, or consignment questions.</p>
                <ContactForm initialMessage={initialMessage} initialType={initialType} />
              </div>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </>
  )
}
