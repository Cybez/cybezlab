'use client';

import React, { useState } from 'react';
import { Button } from '@/components/Button/Button';
import styles from './contact.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', email: '', description: '' });
    }, 1200);
  };

  return (
    <main className={styles.contactPage}>
      {/* Form Section */}
      <section className={`${styles.formSection} container`}>
        <div className={styles.formCard}>
          <div className={styles.introCol}>
            <h1 className={styles.title}>Ready to get started?</h1>
          </div>

          <div className={styles.formCol}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="George Oregano"
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+1(302) 244-7860"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="acme@email.com"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>Project Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Write description here..."
                  className={styles.textarea}
                />
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>

              {submitStatus === 'success' && (
                <div style={{ color: 'green', fontSize: '0.95rem', fontWeight: 600, marginTop: '10px', textAlign: 'center' }}>
                  Thank you! Your inquiry has been sent successfully. We will get in touch soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Info Section below form */}
      <section className={styles.infoSection}>
        <div className={`${styles.infoLayout} container`}>
          <div className={styles.infoTitleCol}>
            <span className={styles.infoTag}>Contact Info</span>
            <h2 className={styles.infoHeadline}>We are here to help you.</h2>
          </div>

          <div className={styles.infoCol}>
            <h3 className={styles.infoColTitle}>Email Address</h3>
            <a href="mailto:info@cybezlab.com" className={styles.infoValue}>info@cybezlab.com</a>
            <div className={styles.hoursBlock}>
              <span className={styles.hoursLabel}>Assistance hours:</span>
              <span className={styles.hoursValue}>Monday - Friday 9 am to 6 pm PKT</span>
            </div>
          </div>

          <div className={styles.infoCol}>
            <h3 className={styles.infoColTitle}>Contact number</h3>
            <a href="tel:+923390066509" className={styles.infoValue}>+92 339 0066509</a>
            <div className={styles.hoursBlock}>
              <span className={styles.hoursLabel}>Assistance hours:</span>
              <span className={styles.hoursValue}>Monday - Friday 9 am to 6 pm PKT</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
