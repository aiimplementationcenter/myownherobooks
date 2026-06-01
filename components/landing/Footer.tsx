import Image from 'next/image'

export default function Footer() {
  return (
    <footer>
      <div className="footer-band">THEIR STORY. THEIR ADVENTURE. THEIR BOOK. <span className="g">THEIR MAGIC. ★</span></div>
      <div className="footer">
        <div className="wrap footer-inner">
          <div>
            <Image src="/assets/logo.png" alt="My Own Hero Books" width={300} height={128} style={{ height: 128, width: 'auto' }} />
            <p style={{ maxWidth: 300, marginTop: 14, color: '#8c97c6', fontWeight: 700, fontSize: 14 }}>
              Personalized keepsake storybooks where every child is the hero of their own adventure.
            </p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h5>Explore</h5>
              <a href="#how">How it works</a><a href="#styles">Styles</a>
              <a href="#samples">Inside the book</a><a href="#pricing">Pricing</a>
            </div>
            <div className="footer-col">
              <h5>Support</h5>
              <a href="#faq">FAQ</a><a href="#">Track my order</a>
              <a href="#">Contact us</a><a href="#">Gift cards</a>
            </div>
            <div className="footer-col">
              <h5>Company</h5>
              <a href="#">Our story</a><a href="#">Reviews</a>
              <a href="/privacy">Privacy Policy</a><a href="/refund">Refund Policy</a>
            </div>
          </div>
        </div>
        <div className="wrap footer-legal">© 2026 My Own Hero Books. Made with love for little heroes everywhere.</div>
      </div>
    </footer>
  )
}
