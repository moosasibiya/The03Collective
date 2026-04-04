import ConsignmentForm from '@/components/forms/ConsignmentForm'
import PageHeader from '@/components/ui/PageHeader'
import RevealWrapper from '@/components/ui/RevealWrapper'
import { FAQS, SELL_BENEFITS, SELL_STEPS } from '@/lib/site-content'
import styles from './SellScreen.module.css'

export default function SellScreen() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { label: 'Sell Your Car' },
        ]}
        description="Most cars are undersold because they are poorly presented. We exist to change that."
        label="Consignment"
        title={
          <>
            We&apos;ll Sell Your Car the Way
            <br />
            It <em>Deserves</em> to Be Sold.
          </>
        }
      />

      <div className={styles.page}>
        <div className="container">
          <div className={styles.split}>
            <div>
              <RevealWrapper>
                <span className="label">Why Choose Us</span>
                <h2 className={`sectionTitle ${styles.sectionTitle}`}>
                  Maximum Value,
                  <br />
                  Minimum <em>Effort.</em>
                </h2>

                <ul className="benefits" style={{ marginTop: 28 }}>
                  {SELL_BENEFITS.map((benefit) => (
                    <li className="benefit" key={benefit}>
                      <span className="benefitIcon">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="benefitText">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </RevealWrapper>

              <RevealWrapper className={styles.steps} delay={100}>
                {SELL_STEPS.map((step, index) => (
                  <div className={styles.stepRow} key={step.title}>
                    <div className={styles.stepNumber}>{index + 1}</div>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </div>
                ))}
              </RevealWrapper>
            </div>

            <RevealWrapper delay={160}>
              <div className="formCard">
                <div className="formTitle">Get Started</div>
                <p className="formSub">Fill in your details and we&apos;ll be in touch within 24 hours.</p>
                <ConsignmentForm />
              </div>
            </RevealWrapper>
          </div>
        </div>

        <section className={styles.faqBand}>
          <div className="container">
            <RevealWrapper className={styles.faqSection}>
              <span className="label">Common Questions</span>
              <h2 className={`sectionTitle ${styles.sectionTitle}`}>
                Everything You Need
                <br />
                to <em>Know.</em>
              </h2>

              <div className={styles.faqGrid}>
                {FAQS.map((faq) => (
                  <details className={styles.faqItem} key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </RevealWrapper>
          </div>
        </section>
      </div>
    </>
  )
}
