'use client';

import React, { useState } from 'react';
import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';
import styles from './page.module.css';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'web',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', projectType: 'web', message: '' });
    }, 1200);
  };

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={`${styles.hero} container animate-fade-in`}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Now accepting custom projects
          </div>
          <h1 className={`${styles.title} text-gradient`}>
            We Engineer Bespoke Digital Products.
          </h1>
          <p className={styles.subtitle}>
            From concept to production-grade software, we build custom applications that empower forward-thinking companies to scale and succeed.
          </p>
          <div className={styles.actions}>
            <Button onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              Start a Project
            </Button>
            <Button variant="secondary" onClick={() => {
              const servicesSection = document.getElementById('services');
              if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              Explore Services
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`${styles.section} container animate-slide-up`}>
        <div className={styles.sectionHeader}>
          <h2 className={`${styles.sectionTitle} text-gradient-purple`}>Our Expertise</h2>
          <p className={styles.sectionSubtitle}>
            We combine strategic thinking with cutting-edge technologies to build products that are fast, secure, and beautiful.
          </p>
        </div>

        <div className={styles.grid}>
          <Card>
            <div className={styles.serviceCard}>
              <div className={styles.iconWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Custom Web Apps</h3>
              <p className={styles.serviceDescription}>
                High-performance, scalable web platforms engineered with Next.js, React, and robust backend architectures.
              </p>
            </div>
          </Card>

          <Card>
            <div className={styles.serviceCard}>
              <div className={styles.iconWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Mobile Applications</h3>
              <p className={styles.serviceDescription}>
                Native and cross-platform iOS & Android apps that provide seamless, offline-first user experiences.
              </p>
            </div>
          </Card>

          <Card>
            <div className={styles.serviceCard}>
              <div className={styles.iconWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Cloud Architecture</h3>
              <p className={styles.serviceDescription}>
                Secure, auto-scaling deployment workflows built on AWS, GCP, and Kubernetes for ultimate reliability.
              </p>
            </div>
          </Card>

          <Card>
            <div className={styles.serviceCard}>
              <div className={styles.iconWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
                  <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"></path>
                  <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"></path>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>UI/UX Design</h3>
              <p className={styles.serviceDescription}>
                Stunning, clean design systems and interactive interfaces created with wireframe precision and research.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section id="about" className={styles.stats}>
        <div className={`${styles.statsGrid} container`}>
          <div className={styles.statItem}>
            <span className={`${styles.statValue} text-gradient`}>100%</span>
            <span className={styles.statLabel}>Custom Code</span>
          </div>
          <div className={styles.statItem}>
            <span className={`${styles.statValue} text-gradient`}>99.9%</span>
            <span className={styles.statLabel}>Uptime SLA</span>
          </div>
          <div className={styles.statItem}>
            <span className={`${styles.statValue} text-gradient`}>24/7</span>
            <span className={styles.statLabel}>Support & Ops</span>
          </div>
          <div className={styles.statItem}>
            <span className={`${styles.statValue} text-gradient`}>10+</span>
            <span className={styles.statLabel}>Years Combined Exp</span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <h2 className={`${styles.sectionTitle} text-gradient-purple`}>Let's Build Something Extraordinary</h2>
          <p className={styles.sectionSubtitle}>
            Have an idea or project in mind? Fill out the form below and we will get back to you within 24 hours.
          </p>
        </div>

        <div className={styles.contactContainer}>
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
                    placeholder="John Doe"
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
                    placeholder="john@company.com"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="projectType" className={styles.label}>Project Type</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="web">Web Application</option>
                  <option value="mobile">Mobile Application</option>
                  <option value="cloud">Cloud Infrastructure</option>
                  <option value="design">UI/UX Product Design</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Project Details</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Describe your project, timeline, and budget goals..."
                  className={styles.textarea}
                />
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending Request...' : 'Send Message'}
              </Button>

              {submitStatus === 'success' && (
                <div style={{ color: 'hsl(140, 70%, 60%)', fontSize: '0.95rem', fontWeight: 500, marginTop: '10px', textAlign: 'center' }}>
                  Thank you! Your message has been sent successfully. We will get in touch soon.
                </div>
              )}
            </form>
          </Card>
        </div>
      </section>
    </main>
  );
}
