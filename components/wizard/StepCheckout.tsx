'use client'
import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import type { StripeElementsOptions } from '@stripe/stripe-js'
import Icon from '@/components/ui/Icon'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const appearance: StripeElementsOptions['appearance'] = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#16265A',
    colorBackground: '#FEFCF7',
    colorText: '#16265A',
    colorDanger: '#E0414E',
    fontFamily: '"Nunito", system-ui, sans-serif',
    borderRadius: '10px',
    focusBoxShadow: '0 0 0 3px rgba(247,180,28,0.45)',
    focusOutline: '2px solid #F7B41C',
  },
  rules: {
    '.Input': {
      border: '1.5px solid #D4C9B8',
      boxShadow: 'none',
    },
    '.Input:focus': {
      border: '1.5px solid #F7B41C',
    },
    '.Label': {
      fontWeight: '700',
      fontSize: '13px',
      color: '#16265A',
    },
  },
}

interface FormProps {
  email: string
  setEmail: (v: string) => void
  orderNumber: string
  onSuccess: () => void
}

function CheckoutForm({ email, setEmail, orderNumber, onSuccess }: FormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setSubmitting(true)
    setError(null)

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        receipt_email: email,
        return_url: `${window.location.origin}/order-success?order=${orderNumber}`,
      },
      redirect: 'if_required',
    })

    if (stripeError) {
      setError(stripeError.message ?? 'Payment failed. Please try again.')
      setSubmitting(false)
    } else if (paymentIntent?.status === 'succeeded') {
      onSuccess()
    } else {
      // Redirect handled by Stripe (3D Secure, etc.)
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="checkout-field">
        <label className="checkout-label" htmlFor="checkout-email">Email address</label>
        <input
          id="checkout-email"
          type="email"
          className="checkout-input"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <p className="checkout-hint">We'll send your order confirmation here</p>
      </div>

      <div className="checkout-divider" />

      <PaymentElement
        options={{ layout: 'tabs' }}
      />

      {error && (
        <div className="checkout-error">
          <Icon name="close" size={15} />
          {error}
        </div>
      )}

      <div className="checkout-summary">
        <span>Personalized storybook</span>
        <span className="checkout-price">$99.00</span>
      </div>

      <button
        type="submit"
        className="btn btn-red btn-lg btn-block checkout-submit"
        disabled={!stripe || submitting || !email}
      >
        {submitting ? (
          <><Icon name="refresh" size={18} className="spin" /> Processing…</>
        ) : (
          <><Icon name="wand" size={18} /> Pay $99 &amp; create my book</>
        )}
      </button>

      <p className="checkout-secure">
        <Icon name="shield" size={14} /> Secured by Stripe · 256-bit encryption
      </p>
    </form>
  )
}

interface StepCheckoutProps {
  clientSecret: string
  orderNumber: string
  email: string
  setEmail: (v: string) => void
  onSuccess: () => void
}

export default function StepCheckout({ clientSecret, orderNumber, email, setEmail, onSuccess }: StepCheckoutProps) {
  const options: StripeElementsOptions = { clientSecret, appearance }

  return (
    <div className="wz-panel checkout-panel">
      <h2 className="wz-title">Complete your order</h2>
      <p className="wz-sub">You're one step away from bringing your child's story to life!</p>

      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm
          email={email}
          setEmail={setEmail}
          orderNumber={orderNumber}
          onSuccess={onSuccess}
        />
      </Elements>
    </div>
  )
}
