'use client'

import { useActionState, useRef, useState } from 'react'
import { submitContact } from '@/app/actions/contact'
import Button from '@/components/ui/Button'
import FormSuccess from './FormSuccess'
import SpamTrap from './SpamTrap'

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
      <SpamTrap idPrefix="contact" />
      <div>
        <label className="formLabel" htmlFor="contact-name">
          Name *
        </label>
        <input
          autoComplete="name"
          className="formInput"
          id="contact-name"
          maxLength={80}
          name="name"
          placeholder="Your full name"
          required
        />
      </div>
      <div>
        <label className="formLabel" htmlFor="contact-phone">
          Phone *
        </label>
        <input
          autoComplete="tel"
          className="formInput"
          id="contact-phone"
          inputMode="tel"
          maxLength={20}
          name="phone"
          placeholder="+27 82 000 0000"
          required
          type="tel"
        />
      </div>
      <div className="formFull">
        <label className="formLabel" htmlFor="contact-email">
          Email
        </label>
        <input
          autoComplete="email"
          className="formInput"
          id="contact-email"
          name="email"
          placeholder="your@email.com"
          type="email"
        />
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
          maxLength={2000}
          name="message"
          placeholder="What would you like to know?"
          required
          rows={6}
        />
      </div>
      {state?.success === false ? (
        <p className="formFull" role="alert" style={{ color: '#e05a6e', fontSize: 14 }}>
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
