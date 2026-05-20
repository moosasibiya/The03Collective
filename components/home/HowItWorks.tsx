import RevealWrapper from '@/components/ui/RevealWrapper'
import { PROCESS_STEPS } from '@/lib/site-content'
import styles from './HowItWorks.module.css'

export default function HowItWorks() {
  return (
    <section className={`pageSection lightSection ${styles.section}`}>
      <div className="container">
        <RevealWrapper className="sectionHead" style={{ textAlign: 'center', marginBottom: 0 }}>
          <span className="label">The Process</span>
          <h2 className={`sectionTitle ${styles.title}`}>
            Simple from Start
            <br />
            to <em>Sold.</em>
          </h2>
        </RevealWrapper>

        <div className={`stepsGrid ${styles.steps}`}>
          <div className="stepsConnector" />
          {PROCESS_STEPS.map((step, index) => (
            <RevealWrapper className="stepCard" delay={index * 90} key={step.title}>
              <div className="stepNumber">{index + 1}</div>
              <h3 className="stepTitle">{step.title}</h3>
              <p className="stepDescription">{step.body}</p>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
