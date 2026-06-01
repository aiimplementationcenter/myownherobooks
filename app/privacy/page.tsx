import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — My Own Hero Books',
  description: 'How My Own Hero Books collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="policy-page">
      <div className="policy-wrap">
        <Link href="/" className="policy-back">← Back to home</Link>

        <h1>Privacy Policy</h1>
        <p className="policy-date">Last updated: June 1, 2026</p>

        <p>My Own Hero Books ("we," "us," or "our") operates <strong>myownherobooks.com</strong>. This policy explains what information we collect, how we use it, and how we protect it. By using our site you agree to the practices described here.</p>

        <h2>1. Information We Collect</h2>
        <h3>Information you provide</h3>
        <ul>
          <li><strong>Child's details</strong> — first name, age, and any story notes you share so we can personalize your book.</li>
          <li><strong>Photos</strong> — images you upload of your child and family members. These are used solely to illustrate the book.</li>
          <li><strong>Email address</strong> — collected at checkout to send your order confirmation and book preview.</li>
          <li><strong>Payment information</strong> — handled entirely by Stripe. We never see or store your card number.</li>
        </ul>

        <h3>Information collected automatically</h3>
        <ul>
          <li>Standard web server logs (IP address, browser type, pages visited) used for security and performance.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To create and deliver your personalized storybook.</li>
          <li>To send order confirmations, previews, and support communications.</li>
          <li>To process your payment securely through Stripe.</li>
          <li>To improve our website and services.</li>
        </ul>
        <p>We do <strong>not</strong> sell, rent, or share your personal information with third parties for marketing purposes.</p>

        <h2>3. Photos — Deletion Policy</h2>
        <p>We take your family's privacy seriously. Photos you upload are used <strong>only</strong> to create your book. Once your book has been produced and approved, all uploaded photos are permanently deleted from our servers. We do not keep, license, or use your images for any other purpose.</p>

        <h2>4. Data Sharing</h2>
        <p>We share data only with the following trusted services, strictly to fulfill your order:</p>
        <ul>
          <li><strong>Stripe</strong> — payment processing. Stripe's privacy policy is at <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">stripe.com/privacy</a>.</li>
          <li><strong>Vercel</strong> — website hosting and file storage.</li>
          <li>Our internal illustration team, who receive your order details and photos to create your book.</li>
        </ul>

        <h2>5. Data Retention</h2>
        <ul>
          <li><strong>Photos</strong> — deleted after your book is produced (see Section 3).</li>
          <li><strong>Order details</strong> (name, age, style, themes) — retained for up to 2 years for customer support and reprint requests, then permanently deleted.</li>
          <li><strong>Payment records</strong> — retained as required by financial regulations (typically 7 years), stored by Stripe.</li>
        </ul>

        <h2>6. Security</h2>
        <p>All data is transmitted over HTTPS. Payment processing is handled by Stripe, which is PCI-DSS Level 1 certified. Photo files are stored in access-controlled cloud storage and are not publicly searchable.</p>

        <h2>7. Children's Privacy</h2>
        <p>Our service creates books <em>about</em> children but is purchased and operated by adults. We do not knowingly collect personal information directly from children under 13. All accounts and purchases must be made by a parent or legal guardian.</p>

        <h2>8. Your Rights</h2>
        <p>You may request to access, correct, or delete any personal information we hold about you at any time by contacting us at <a href="mailto:hello@myownherobooks.com">hello@myownherobooks.com</a>. We will respond within 30 days.</p>

        <h2>9. Cookies</h2>
        <p>We use only essential cookies required for the site to function (e.g. secure checkout sessions). We do not use advertising or tracking cookies.</p>

        <h2>10. Changes to This Policy</h2>
        <p>We may update this policy from time to time. Changes will be posted on this page with an updated date. Continued use of our site after changes constitutes acceptance.</p>

        <h2>11. Contact</h2>
        <p>Questions about this policy? Reach us at:<br />
          <strong>My Own Hero Books</strong><br />
          <a href="mailto:hello@myownherobooks.com">hello@myownherobooks.com</a><br />
          <a href="https://myownherobooks.com">myownherobooks.com</a>
        </p>
      </div>
    </div>
  )
}
