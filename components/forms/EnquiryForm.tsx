'use client'

import { useActionState, useRef, useState } from 'react'
import { submitEnquiry } from '@/app/actions/enquiry'
import Button from '@/components/ui/Button'
import FormSuccess from './FormSuccess'

type EnquiryFormProps = {
  vehicleName: string
  vehicleSlug: string
}

export default function EnquiryForm({ vehicleName, vehicleSlug }: EnquiryFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [dismissedSuccess, setDismissedSuccess] = useState(false)
  const [state, formAction, pending] = useActionState(submitEnquiry, null)
  const showSuccess = state?.success === true && !dismissedSuccess

  if (showSuccess) {
    return (
      <FormSuccess
        actionLabel="Send Another"
        compact
        description="We've received your enquiry and will come back to you shortly."
        onReset={() => {
          formRef.current?.reset()
          setDismissedSuccess(true)
        }}
        title="Enquiry Sent."
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
      <input name="vehicleSlug" type="hidden" value={vehicleSlug} />
      <input name="vehicleName" type="hidden" value={vehicleName} />

      <div className="formFull">
        <label className="formLabel" htmlFor="enquiry-name">
          Name *
        </label>
        <input className="formInput" id="enquiry-name" name="name" placeholder="Your full name" required />
      </div>

      <div className="formFull">
        <label className="formLabel" htmlFor="enquiry-phone">
          Phone *
        </label>
        <input
          className="formInput"
          id="enquiry-phone"
          name="phone"
          placeholder="+27 82 000 0000"
          required
        />
      </div>

      <div className="formFull">
        <label className="formLabel" htmlFor="enquiry-email">
          Email
        </label>
        <input className="formInput" id="enquiry-email" name="email" placeholder="your@email.com" />
      </div>

      <div className="formFull">
        <label className="formLabel" htmlFor="enquiry-message">
          Message
        </label>
        <textarea
          className="formTextarea"
          id="enquiry-message"
          name="message"
          placeholder={`Tell us what you'd like to know about the ${vehicleName}.`}
        />
      </div>

      {state?.success === false ? (
        <p className="formFull" style={{ color: '#e05a6e', fontSize: 14 }}>
          {state.error}
        </p>
      ) : null}

      <div className="formSubmitRow">
        <Button block disabled={pending} type="submit">
          {pending ? 'Sending...' : 'Send Enquiry'}
        </Button>
      </div>
    </form>
  )
}
