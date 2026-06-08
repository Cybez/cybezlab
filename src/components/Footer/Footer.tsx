'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.top}>
          {/* Info & Logo */}
          <div className={styles.info}>
            <Link href="/" className={styles.logo}>
              <div className={styles.logoWrapper}>
                <img 
                  src="/assets/cybezlab-logo.png" 
                  alt="Cybez Lab Logo" 
                  className={styles.logoImg}
                />
              </div>
            </Link>
            <p className={styles.description}>
              We design and build bespoke, high-performance web applications and digital experiences that help businesses scale.
            </p>
            
            {/* Newsletter form */}
            <form onSubmit={handleSubscribe} className={styles.newsletter}>
              <h4 className={styles.newsletterTitle}>Subscribe to our newsletter</h4>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.newsletterInput}
                />
                <button type="submit" className={styles.newsletterButton}>
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <p className={styles.successMessage}>Thank you for subscribing!</p>
              )}
            </form>
          </div>

          {/* Links Column 1 */}
          <div className={styles.linksGroup}>
            <h4 className={styles.title}>Services</h4>
            <ul className={styles.list}>
              <li><a href="#services" className={styles.link}>Web Development</a></li>
              <li><a href="#services" className={styles.link}>Mobile Applications</a></li>
              <li><a href="#services" className={styles.link}>Cloud Solutions</a></li>
              <li><a href="#services" className={styles.link}>UI/UX Product Design</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className={styles.linksGroup}>
            <h4 className={styles.title}>Company</h4>
            <ul className={styles.list}>
              <li><a href="#about" className={styles.link}>About Us</a></li>
              <li><a href="#portfolio" className={styles.link}>Our Work</a></li>
              <li><a href="#contact" className={styles.link}>Contact</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className={styles.linksGroup}>
            <h4 className={styles.title}>Connect</h4>
            <ul className={styles.list}>
              <li><a href="https://github.com/Cybez" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.link}>Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} Cybez Lab. All rights reserved.
          </p>
          <div className={styles.legal}>
            <a href="#" className={styles.legalLink}>Privacy Policy</a>
            <span className={styles.dot}>•</span>
            <a href="#" className={styles.legalLink}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
