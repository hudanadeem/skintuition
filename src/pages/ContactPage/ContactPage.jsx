import "./ContactPage.scss";

function ContactPage() {
  return (
    <>
      <div className="contact">
        {/* Top Section */}
        <div className="contact__top">
          <div className="contact__brand">
            <img className="contact__brand-title" src={brandLogo}></img>
            <p className="contact__brand-tagline">
              Decoding skincare ingredients for healthier, happier skin.
            </p>
            <div className="contact__brand-info">
              <p>123 Skincare Lane, Beauty City</p>
              <p>+1 (123) 456-7890</p>
              <p>info@skintuition.com</p>
            </div>
          </div>

          {/* Navigation and Quick Links */}
          <div className="contact__links">
            <div className="contact__links-column">
              <h3 className="contact__links-title">Navigation</h3>
              <ul className="contact__links-list">
                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/contact">Contact Us</a>
                </li>
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms">Terms of Service</a>
                </li>
              </ul>
            </div>
            <div className="contact__links-column">
              <h3 className="contact__links-title">Quick Links</h3>
              <ul className="contact__links-list">
                <li>
                  <a href="/quiz">Skin Quiz</a>
                </li>
                <li>
                  <a href="/glossary">Glossary</a>
                </li>
                <li>
                  <a href="/favorites">Favorites</a>
                </li>
                <li>
                  <a href="/profile">Profile</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="contact__divider"></div>

        {/* Bottom Section */}
        <div className="contact__bottom">
          {/* Social Media Icons */}
          <div className="contact__social">
            <a href="https://facebook.com" aria-label="Facebook">
              <img src={FaFacebook} className="contact__social-icon" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <img src={FaInstagram} className="contact__social-icon" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <img src={FaTwitter} className="contact__social-icon" />
            </a>
          </div>

          {/* Newsletter Signup */}
          <div className="contact__newsletter">
            <h3 className="contact__newsletter-title">Stay Updated</h3>
            <form className="contact__newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="contact__newsletter-input"
              />
              <button type="submit" className="contact__newsletter-button">
                Subscribe
              </button>
            </form>
          </div>

          {/* Copyright */}
          <div className="contact__copyright">
            © 2025 Skintuition. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
