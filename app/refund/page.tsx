import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund & Returns Policy — My Own Hero Books',
  description: 'My Own Hero Books 30-day happiness guarantee and returns policy.',
}

export default function RefundPage() {
  return (
    <div className="policy-page">
      <div className="policy-wrap">
        <Link href="/" className="policy-back">← Back to home</Link>

        <h1>Refund &amp; Returns Policy</h1>
        <p className="policy-date">Last updated: June 1, 2026</p>

        <p>We want every family to absolutely love their book. If something isn't right, we'll make it right — that's our promise.</p>

        <h2>Our 30-Day Happiness Guarantee</h2>
        <p>If you are not completely satisfied with your personalized storybook for any reason, contact us within <strong>30 days of delivery</strong> and we will either:</p>
        <ul>
          <li>Reprint and reship your book at no charge, or</li>
          <li>Issue a full refund upon return of the book.</li>
        </ul>

        <h2>How to Request a Refund or Reprint</h2>
        <ol>
          <li>Email us at <a href="mailto:hello@myownherobooks.com">hello@myownherobooks.com</a> within 30 days of receiving your order.</li>
          <li>Include your order number (found in your confirmation email) and a brief description of the issue.</li>
          <li>We will respond within 2 business days with next steps.</li>
        </ol>

        <h2>Returning Your Book</h2>
        <p>Because every book is uniquely personalized, we do require the physical book to be returned before issuing a refund. Here's how it works:</p>
        <ul>
          <li>We will email you a prepaid return shipping label — you won't pay for return shipping.</li>
          <li>Simply pack the book securely and drop it off at any carrier location.</li>
          <li>Once we receive and inspect the returned book, your refund will be processed within <strong>5–7 business days</strong> to your original payment method.</li>
        </ul>
        <p><strong>Note:</strong> Reprints do not require a return — we'll simply create a corrected book and ship it to you.</p>

        <h2>Reasons We Commonly Offer Reprints</h2>
        <ul>
          <li>The likeness doesn't look right and you'd like a revision.</li>
          <li>A typo or name spelling error appeared in the text.</li>
          <li>The book arrived damaged or with a printing defect.</li>
          <li>The wrong illustration style was applied.</li>
        </ul>
        <p>If your book arrived damaged in transit, please send a photo of the damage in your email and we'll prioritize a reprint right away — no return required in that case.</p>

        <h2>Digital Previews</h2>
        <p>Before anything is printed, we send you a full digital preview to approve. We strongly encourage you to review it carefully and request any changes at that stage — it's the best way to make sure you love the final result. Changes requested after printing may require a reprint fee at our discretion.</p>

        <h2>Non-Refundable Situations</h2>
        <ul>
          <li>Requests made more than 30 days after the delivery date.</li>
          <li>Books that were approved via digital preview and printed exactly as approved (except in cases of printing defects).</li>
        </ul>

        <h2>Questions?</h2>
        <p>We're a small, family-focused team and we genuinely care about every order. Don't hesitate to reach out:<br />
          <a href="mailto:hello@myownherobooks.com">hello@myownherobooks.com</a>
        </p>
      </div>
    </div>
  )
}
