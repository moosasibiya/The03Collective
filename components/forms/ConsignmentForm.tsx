'use client'

import { useActionState, useRef, useState } from 'react'
import { submitConsignment } from '@/app/actions/consignment'
import Button from '@/components/ui/Button'
import { SITE_CONTACT } from '@/lib/site-content'
import { buildWhatsApp } from '@/utils/format'
import FormSuccess from './FormSuccess'

export default function ConsignmentForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [dismissedSuccess, setDismissedSuccess] = useState(false)
  const [state, formAction, pending] = useActionState(submitConsignment, null)
  const showSuccess = state?.success === true && !dismissedSuccess

  if (showSuccess) {
    return (
      <FormSuccess
        actionLabel="Submit Another"
        description="We'll review your submission and be in touch within 24 hours. Keep your phone close."
        onReset={() => {
          formRef.current?.reset()
          setDismissedSuccess(true)
        }}
        title="Enquiry Received."
      />
    )
  }

  return (
    <form
      action={formAction}
      className="formGrid"
      onSubmit={() => setDismissedSuccess(false)}
      ref={formRef}
    >
      <div>
        <label className="formLabel" htmlFor="consign-name">
          Your Name *
        </label>
        <input className="formInput" id="consign-name" name="name" placeholder="Full name" required />
      </div>
      <div>
        <label className="formLabel" htmlFor="consign-phone">
          WhatsApp / Phone *
        </label>
        <input
          className="formInput"
          id="consign-phone"
          name="phone"
          placeholder="+27 82 000 0000"
          required
        />
      </div>
      <div className="formFull">
        <label className="formLabel" htmlFor="consign-email">
          Email Address
        </label>
        <input className="formInput" id="consign-email" name="email" placeholder="your@email.com" />
      </div>
      <div>
        <label className="formLabel" htmlFor="consign-make">
          Vehicle Make *
        </label>
        <input className="formInput" id="consign-make" name="make" placeholder="e.g. BMW, Porsche" required />
      </div>
      <div>
        <label className="formLabel" htmlFor="consign-model">
          Model *
        </label>
        <input className="formInput" id="consign-model" name="model" placeholder="e.g. M3 Competition" required />
      </div>
      <div>
        <label className="formLabel" htmlFor="consign-year">
          Year
        </label>
        <input className="formInput" id="consign-year" name="year" placeholder="e.g. 2021" />
      </div>
      <div>
        <label className="formLabel" htmlFor="consign-mileage">
          Mileage
        </label>
        <input className="formInput" id="consign-mileage" name="mileage" placeholder="e.g. 42 000 km" />
      </div>
      <div className="formFull">
        <label className="formLabel" htmlFor="consign-price">
          Asking Price (R)
        </label>
        <input className="formInput" id="consign-price" name="price" placeholder="Optional" />
      </div>
      <div className="formFull">
        <label className="formLabel" htmlFor="consign-notes">
          Condition and Notes
        </label>
        <textarea
          className="formTextarea"
          id="consign-notes"
          name="notes"
          placeholder="Service history, modifications, any relevant details..."
        />
      </div>
      <div className="formDivider formFull">
        <span>or</span>
      </div>
      {state?.success === false ? (
        <p className="formFull" style={{ color: '#e05a6e', fontSize: 14 }}>
          {state.error}
        </p>
      ) : null}
      <div className="formSubmitRow">
        <Button block disabled={pending} size="lg" type="submit">
          {pending ? 'Submitting...' : 'Submit Enquiry'}
        </Button>
        <Button
          block
          external
          href={buildWhatsApp(SITE_CONTACT.whatsappNumber, "Hi, I'd like to consign my car.")}
          variant="wa"
        >
          Chat on WhatsApp Instead
        </Button>
      </div>
    </form>
  )
}
