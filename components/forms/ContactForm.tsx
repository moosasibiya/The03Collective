'use client'

import { useActionState, useRef, useState } from 'react'
import { submitContact } from '@/app/actions/contact'
import Button from '@/components/ui/Button'
import FormSuccess from './FormSuccess'

type ContactFormProps = {
  initialType?: string
  initialMessage?: string
}

export default function ContactForm({ initialType = '', initialMessage = '' }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [dismissedSuccess, setDismissedSuccess] = useState(false)
  const [state, formAction, pending] = useActionState(submitContact, null)
  const showSuccess = state?.success === true && !dismissedSuccess

  if (showSuccess) {
    return (
      <FormSuccess
        actionLabel="Send Another"
        description="We've received your enquiry and will respond within a few hours."
        onReset={() => {
          formRef.current?.reset()
          setDismissedSuccess(true)
        }}
        title="Message Sent."
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
        <label className="formLabel" htmlFor="contact-name">
          Name *
        </label>
        <input className="formInput" id="contact-name" name="name" placeholder="Your full name" required />
      </div>
      <div>
        <label className="formLabel" htmlFor="contact-phone">
          Phone *
        </label>
        <input
          className="formInput"
          id="contact-phone"
          name="phone"
          placeholder="+27 82 000 0000"
          required
        />
      </div>
      <div className="formFull">
        <label className="formLabel" htmlFor="contact-email">
          Email
        </label>
        <input className="formInput" id="contact-email" name="email" placeholder="your@email.com" />
      </div>
      <div className="formFull">
        <label className="formLabel" htmlFor="contact-type">
          I&apos;m interested in
        </label>
        <select className="formSelect" defaultValue={initialType} id="contact-type" name="type">
          <option value="">Select a topic</option>
          <option value="buying">Buying a vehicle</option>
          <option value="selling">Selling / consigning my car</option>
          <option value="both">Both buying and selling</option>
          <option value="general">General enquiry</option>
        </select>
      </div>
      <div className="formFull">
        <label className="formLabel" htmlFor="contact-message">
          Message *
        </label>
        <textarea
          className="formTextarea"
          defaultValue={initialMessage}
          id="contact-message"
          name="message"
          placeholder="What would you like to know?"
          required
        />
      </div>
      {state?.success === false ? (
        <p className="formFull" style={{ color: '#e05a6e', fontSize: 14 }}>
          {state.error}
        </p>
      ) : null}
      <div className="formSubmitRow">
        <Button block disabled={pending} size="lg" type="submit">
          {pending ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  )
}
