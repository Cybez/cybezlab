'use client';

import React, { useState } from 'react';
import { Card } from '@/components/Card/Card';
import { Button } from '@/components/Button/Button';
import styles from './careers.module.css';

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'ios',
    portfolio: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyClick = (roleKey: string) => {
    setFormData((prev) => ({ ...prev, role: roleKey }));
    const formSection = document.getElementById('apply-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', role: 'ios', portfolio: '', message: '' });
    }, 1200);
  };

  return (
    <main className={styles.careersPage}>
      {/* Hero Section */}
      <section className={`${styles.hero} container`}>
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} text-brand-gradient`}>Careers</h1>
          <p className={styles.heroSubtitle}>
            Grow with global top talent. <span style={{ color: 'var(--primary)', fontWeight: 800 }}>Grow</span> with us.
          </p>
        </div>
      </section>

      {/* Jobs Section */}
      <section className={`${styles.hiringSection} container`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Opportunities</span>
          <h2 className={styles.sectionTitle}>We're Hiring</h2>
          <p className={styles.sectionSubtitle}>
            We are always looking for driven individuals to join our team, contribute, and make decisions that matter.
          </p>
        </div>

        <div className={styles.jobsGrid}>
          <div className={styles.jobCard}>
            <div className={styles.jobHeader}>
              <h3 className={styles.jobTitle}>Senior iOS Developer</h3>
              <span className={styles.jobMeta}>Karachi office • Full-time</span>
            </div>
            <p className={styles.jobDesc}>
              Responsible for engineering native iOS mobile apps using Swift, SwiftUI, and custom architecture patterns. You will lead UI integrations and connect with local databases and APIs.
            </p>
            <Button onClick={() => handleApplyClick('ios')}>Apply Now</Button>
          </div>

          <div className={styles.jobCard}>
            <div className={styles.jobHeader}>
              <h3 className={styles.jobTitle}>Business Development Executive</h3>
              <span className={styles.jobMeta}>Karachi office • Full-time</span>
            </div>
            <p className={styles.jobDesc}>
              Identify new corporate partnerships, coordinate pitches, and collaborate with engineering teams to capture custom software requirements. Excellent communication skills are required.
            </p>
            <Button onClick={() => handleApplyClick('bde')}>Apply Now</Button>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className={styles.cultureSection}>
        <div className={`${styles.cultureLayout} container`}>
          <h2 className={`${styles.sectionTitle} ${styles.cultureTitle}`}>
            Experience a culture of empowerment and inclusion.
          </h2>
          <p className={styles.sectionSubtitle} style={{ maxWidth: '640px', marginTop: '-30px' }}>
            We believe in building a team that is passionate about software engineering, values clear peer feedback, and enjoys solving complex architecture tasks.
          </p>

          <div className={styles.officeGraphic}>
            <div className={styles.officeGraphicOverlay} />
            <div className={styles.officeGraphicInner}>
              <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.4rem' }}>Be part of something great.</div>
            </div>
          </div>

          {/* Process Row */}
          <div className={styles.processGrid}>
            <div className={styles.processCard}>
              <div className={styles.processIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <h4 className={styles.processTitle}>1. Application</h4>
              <p className={styles.processDesc}>Submit your resume and code portfolio. We review all profiles within 3 business days.</p>
            </div>

            <div className={styles.processCard}>
              <div className={styles.processIcon} style={{ backgroundColor: 'rgba(0, 210, 255, 0.05)', color: 'var(--secondary)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h4 className={styles.processTitle}>2. Interview</h4>
              <p className={styles.processDesc}>Discuss technical architecture with lead developers and walk through past project milestones.</p>
            </div>

            <div className={styles.processCard}>
              <div className={styles.processIcon} style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)', color: 'var(--accent)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h4 className={styles.processTitle}>3. Decision & Offer</h4>
              <p className={styles.processDesc}>We make a competitive offer, lay out your growth roadmap, and plan your onboarding sprint.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className={`${styles.perksSection} container`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Perks</span>
          <h2 className={styles.sectionTitle}>Our Perks</h2>
          <p className={styles.sectionSubtitle}>
            We offer resources to help you work efficiently, travel comfortably, and relax with the team.
          </p>
        </div>

        <div className={styles.perksGrid}>
          <div className={styles.perkCard}>
            <div className={styles.perkIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="1" y="3" width="15" height="13"/>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>
            <h4 className={styles.perkTitle}>Fuel Allowance</h4>
            <p className={styles.perkDesc}>Company-funded travel allowance supporting your daily commute to the Karachi office.</p>
          </div>

          <div className={styles.perkCard}>
            <div className={styles.perkIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
                <line x1="12" y1="4" x2="12" y2="20"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
              </svg>
            </div>
            <h4 className={styles.perkTitle}>Leave Encashment</h4>
            <p className={styles.perkDesc}>We value work-life balance, but offer to encash your unused annual leaves at year-end.</p>
          </div>

          <div className={styles.perkCard}>
            <div className={styles.perkIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <h4 className={styles.perkTitle}>Office Devices</h4>
            <p className={styles.perkDesc}>Equipped with multi-monitors, modern development laptops, and accessories.</p>
          </div>

          <div className={styles.perkCard}>
            <div className={styles.perkIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h4 className={styles.perkTitle}>Quarterly Dinner</h4>
            <p className={styles.perkDesc}>Company dinners, team outings, sports games, and indoor gaming events.</p>
          </div>
        </div>
      </section>

      {/* Team Collage Grid */}
      <section className={styles.collageSection}>
        <div className={`${styles.collageGrid} container`}>
          <div className={`${styles.collageItem} ${styles.collageItem1}`}>
            <div className={styles.collageItemOverlay} />
            <span className={styles.collageItemText}>Engineering Sprints</span>
          </div>
          <div className={`${styles.collageItem} ${styles.collageItem2}`}>
            <div className={styles.collageItemOverlay} />
            <span className={styles.collageItemText}>Karachi Office Hangout</span>
          </div>
          <div className={`${styles.collageItem} ${styles.collageItem3}`}>
            <div className={styles.collageItemOverlay} />
            <span className={styles.collageItemText}>Annual Dinner</span>
          </div>
          <div className={`${styles.collageItem} ${styles.collageItem4}`}>
            <div className={styles.collageItemOverlay} />
            <span className={styles.collageItemText}>Indoor Gaming Tournament</span>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form" className={`${styles.applySection} container`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Join Us</span>
          <h2 className={styles.sectionTitle}>Be part of something great.</h2>
          <p className={styles.sectionSubtitle}>
            Submit your application details below, and our HR team will review your profile.
          </p>
        </div>

        <div className={styles.applyContainer}>
          <Card hoverGlow={false}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                    className={styles.input}
                  />
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
                    placeholder="you@company.com"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="role" className={styles.label}>Role Applying For</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="ios">Senior iOS Developer</option>
                    <option value="bde">Business Development Executive</option>
                    <option value="other">Other Engineering Role</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="portfolio" className={styles.label}>GitHub or Portfolio Link</label>
                  <input
                    type="url"
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    required
                    placeholder="https://github.com/yourprofile"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Introduce Yourself</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us about your background, key technical achievements, and why you want to join Cybez Lab..."
                  className={styles.textarea}
                />
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              </Button>

              {submitStatus === 'success' && (
                <div style={{ color: 'hsl(140, 70%, 40%)', fontSize: '0.95rem', fontWeight: 600, marginTop: '10px', textAlign: 'center' }}>
                  Thank you! Your application has been successfully submitted. Our team will contact you soon.
                </div>
              )}
            </form>
          </Card>
        </div>
      </section>
    </main>
  );
}
