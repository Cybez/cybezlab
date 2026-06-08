'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';
import styles from './page.module.css';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', projectType: 'web', message: '' });
    }, 1200);
  };

  return (
    <main className={styles.main}>
      {/* 1. Hero Section */}
      <section className={`${styles.hero} container`}>
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              Accepting Custom Software Projects
            </div>
            <h1 className={styles.heroTitle}>
              We're Building Apps of <span className={styles.heroTitleHighlight}>Tomorrow</span>
            </h1>
            <p className={styles.heroSubtitle}>
              We design and build bespoke, high-performance web applications and digital products that help forward-thinking companies scale.
            </p>
            <div className={styles.heroActions}>
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

          <div className={styles.heroGraphicWrapper}>
            <div className={styles.heroParallax} style={{ transform: `translateY(${scrollY * 0.12}px)` }}>
              <div className={styles.heroGraphicContainer}>
                <img src="/assets/home_hero.png" alt="Cybez Lab Developer Illustration" className={styles.heroImage} />
              </div>
            </div>
          </div>
        </div>

        {/* Partners Grid */}
        <div className={styles.partners}>
          <p className={styles.partnersLabel}>Trusted with engineering by industry leaders</p>
          <div className={styles.partnersGrid}>
            <span className={styles.partnerBadge}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Google Cloud Partner
            </span>
            <span className={styles.partnerBadge}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Amazon Web Services
            </span>
            <span className={styles.partnerBadge}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                <path d="M3 3h18v18H3z"/>
              </svg>
              Shopify Partner
            </span>
            <span className={styles.partnerBadge}>
              React Native
            </span>
            <span className={styles.partnerBadge}>
              Next.js
            </span>
          </div>
        </div>
      </section>

      {/* 2. Services Section */}
      <section id="services" className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Services</span>
          <h2 className={styles.sectionTitle}>Custom Software Built for Scale</h2>
          <p className={styles.sectionSubtitle}>
            We combine strategic product design with robust software engineering to deliver applications that grow with your company.
          </p>
        </div>

        <div className={styles.servicesGrid}>
          <Card>
            <div className={styles.serviceCard}>
              <div className={styles.iconWrapper}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Web Apps</h3>
              <p className={styles.serviceDescription}>
                Bespoke, high-performance web systems and portals engineered using React, Next.js, and modern backends.
              </p>
            </div>
          </Card>

          <Card>
            <div className={styles.serviceCard}>
              <div className={styles.iconWrapper}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Mobile Apps</h3>
              <p className={styles.serviceDescription}>
                Feature-rich native iOS & Android applications engineered for speed, offline performance, and fluid UX.
              </p>
            </div>
          </Card>

          <Card>
            <div className={styles.serviceCard}>
              <div className={styles.iconWrapper}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
                  <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"></path>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>UX Design</h3>
              <p className={styles.serviceDescription}>
                Thorough, research-driven user interface designs and interactive prototypes built to maximize user conversion.
              </p>
            </div>
          </Card>

          <Card>
            <div className={styles.serviceCard}>
              <div className={styles.iconWrapper}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Ecommerce</h3>
              <p className={styles.serviceDescription}>
                Bespoke headless storefronts, shop integrations, and custom cart architectures designed to convert.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. Industries Section (Dark Contrast Background) */}
      <section className={styles.industriesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag} style={{ color: 'var(--secondary)' }}>Industries</span>
            <h2 className={`${styles.sectionTitle} ${styles.industriesTitle}`}>Deep Sector Expertise</h2>
            <p className={styles.sectionSubtitle} style={{ color: '#94a3b8' }}>
              We build custom software tailored to the unique regulatory, compliance, and user demands of specialized industries.
            </p>
          </div>

          <div className={styles.industriesGrid}>
            <div className={styles.industryCard}>
              <div className={styles.industryIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <span className={styles.industryName}>Real Estate</span>
            </div>

            <div className={styles.industryCard}>
              <div className={styles.industryIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
                  <line x1="12" y1="4" x2="12" y2="20"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                </svg>
              </div>
              <span className={styles.industryName}>FinTech</span>
            </div>

            <div className={styles.industryCard}>
              <div className={styles.industryIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <span className={styles.industryName}>Logistics</span>
            </div>

            <div className={styles.industryCard}>
              <div className={styles.industryIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
              </div>
              <span className={styles.industryName}>SaaS & E-commerce</span>
            </div>

            <div className={styles.industryCard}>
              <div className={styles.industryIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <span className={styles.industryName}>Telecommunication</span>
            </div>

            <div className={styles.industryCard}>
              <div className={styles.industryIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="6" width="20" height="12" rx="2"/>
                  <path d="M6 12h4m-2-2v4m10-2h.01m-2.01 0h.01"/>
                </svg>
              </div>
              <span className={styles.industryName}>Gaming</span>
            </div>

            <div className={styles.industryCard}>
              <div className={styles.industryIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <span className={styles.industryName}>Energy</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Work Section */}
      <section id="portfolio" className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Our Work</span>
          <h2 className={styles.sectionTitle}>Engineered Products</h2>
          <p className={styles.sectionSubtitle}>
            Browse case studies of custom applications we designed, developed, and deployed to production.
          </p>
        </div>

        <div className={styles.portfolioGrid}>
          {/* Card 1 */}
          <Card>
            <div className={styles.projectCard}>
              <div className={styles.mockupContainer}>
                <div className={styles.mockupBrowser}>
                  <div className={styles.browserHeader}>
                    <div className={styles.browserDots} />
                  </div>
                  <div className={styles.browserBody}>
                    <div className={styles.mockBox} style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                      AI Assistant Active
                    </div>
                    <div className={styles.mockLineLong} />
                    <div className={styles.mockLineShort} />
                  </div>
                </div>
              </div>
              <h3 className={styles.mockTitle}>AI Powered Assistant</h3>
              <div className={styles.projectTags}>
                <span className={styles.projectTag}>React Native</span>
                <span className={styles.projectTag}>AI</span>
                <span className={styles.projectTag}>LLM</span>
              </div>
              <p className={styles.projectDescription}>
                An intuitive mobile assistant integrated with custom fine-tuned LLM agents for secure, on-device enterprise data analysis.
              </p>
            </div>
          </Card>

          {/* Card 2 */}
          <Card>
            <div className={styles.projectCard}>
              <div className={styles.mockupContainer}>
                <div className={styles.mockupBrowser}>
                  <div className={styles.browserHeader}>
                    <div className={styles.browserDots} />
                  </div>
                  <div className={styles.browserBody}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ width: '40px', height: '40px', background: 'var(--border-color)', borderRadius: '4px' }} />
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center' }}>
                        <div className={styles.mockLineLong} style={{ width: '90%' }} />
                        <div className={styles.mockLineShort} />
                      </div>
                    </div>
                    <div className={styles.mockBox} style={{ height: '30px' }} />
                  </div>
                </div>
              </div>
              <h3 className={styles.mockTitle}>SaaS Dashboard</h3>
              <div className={styles.projectTags}>
                <span className={styles.projectTag}>Next.js</span>
                <span className={styles.projectTag}>Tailwind</span>
                <span className={styles.projectTag}>Charts</span>
              </div>
              <p className={styles.projectDescription}>
                A beautiful analytics panel designed to capture and display high-throughput sales telemetry data in real-time.
              </p>
            </div>
          </Card>

          {/* Card 3 */}
          <Card>
            <div className={styles.projectCard}>
              <div className={styles.mockupContainer}>
                <div className={styles.mockupBrowser}>
                  <div className={styles.browserHeader}>
                    <div className={styles.browserDots} />
                  </div>
                  <div className={styles.browserBody}>
                    <div style={{ border: '1px dashed var(--primary)', flex: 1, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600 }}>
                      WebGL Canvas Active
                    </div>
                  </div>
                </div>
              </div>
              <h3 className={styles.mockTitle}>Digital Twin</h3>
              <div className={styles.projectTags}>
                <span className={styles.projectTag}>IoT</span>
                <span className={styles.projectTag}>WebGL</span>
                <span className={styles.projectTag}>Real-time</span>
              </div>
              <p className={styles.projectDescription}>
                An immersive 3D industrial dashboard monitoring IoT sensors across multiple logistics facilities.
              </p>
            </div>
          </Card>

          {/* Card 4 */}
          <Card>
            <div className={styles.projectCard}>
              <div className={styles.mockupContainer}>
                <div className={styles.mockupBrowser}>
                  <div className={styles.browserHeader}>
                    <div className={styles.browserDots} />
                  </div>
                  <div className={styles.browserBody}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <div style={{ border: '1px solid var(--border-color)', height: '40px', borderRadius: '4px' }} />
                      <div style={{ border: '1px solid var(--border-color)', height: '40px', borderRadius: '4px' }} />
                    </div>
                    <div className={styles.mockLineLong} />
                  </div>
                </div>
              </div>
              <h3 className={styles.mockTitle}>E-commerce App</h3>
              <div className={styles.projectTags}>
                <span className={styles.projectTag}>Shopify</span>
                <span className={styles.projectTag}>Next.js</span>
              </div>
              <p className={styles.projectDescription}>
                A high-conversion headless e-commerce store with full CRM database integrations and dynamic checkout flows.
              </p>
            </div>
          </Card>

          {/* Card 5 */}
          <Card>
            <div className={styles.projectCard}>
              <div className={styles.mockupContainer}>
                <div className={styles.mockupBrowser}>
                  <div className={styles.browserHeader}>
                    <div className={styles.browserDots} />
                  </div>
                  <div className={styles.browserBody}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--primary)' }} />
                      <div className={styles.mockLineShort} style={{ width: '50%', margin: '0 auto' }} />
                    </div>
                  </div>
                </div>
              </div>
              <h3 className={styles.mockTitle}>VR Golf Game</h3>
              <div className={styles.projectTags}>
                <span className={styles.projectTag}>Unity</span>
                <span className={styles.projectTag}>WebXR</span>
                <span className={styles.projectTag}>3D</span>
              </div>
              <p className={styles.projectDescription}>
                An interactive physics-based VR training simulation run directly in modern web browsers via WebXR standard.
              </p>
            </div>
          </Card>

          {/* Card 6 */}
          <Card>
            <div className={styles.projectCard}>
              <div className={styles.mockupContainer}>
                <div className={styles.mockupBrowser}>
                  <div className={styles.browserHeader}>
                    <div className={styles.browserDots} />
                  </div>
                  <div className={styles.browserBody}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <div style={{ width: '33%', height: '36px', background: 'rgba(0, 102, 255, 0.05)', border: '1px solid var(--primary)', borderRadius: '4px' }} />
                      <div style={{ width: '33%', height: '36px', background: 'var(--bg-section)', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                      <div style={{ width: '33%', height: '36px', background: 'var(--bg-section)', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                    </div>
                  </div>
                </div>
              </div>
              <h3 className={styles.mockTitle}>Task Manager App</h3>
              <div className={styles.projectTags}>
                <span className={styles.projectTag}>React</span>
                <span className={styles.projectTag}>Redux</span>
                <span className={styles.projectTag}>Kanban</span>
              </div>
              <p className={styles.projectDescription}>
                A collaborative workflow planner tool featuring drag-and-drop boards, automatic caching, and real-time syncing.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* 5. Why Choose Us Section */}
      <section id="about" className={`${styles.section} ${styles.whySection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Why Cybez Lab</span>
            <h2 className={styles.sectionTitle}>Engineered for Business Impact</h2>
            <p className={styles.sectionSubtitle}>
              We are not just a design shop. We are a technical execution partner committed to clean, long-lived codebases.
            </p>
          </div>

          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <div className={styles.iconWrapper} style={{ backgroundColor: 'rgba(0, 210, 255, 0.08)', color: 'var(--secondary)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>We Are Agile</h3>
              <p className={styles.serviceDescription}>
                We prioritize fast delivery cycles, regular demos, and continuous deployment workflows. You will inspect working code from week one.
              </p>
            </div>

            <div className={styles.whyCard}>
              <div className={styles.iconWrapper} style={{ backgroundColor: 'rgba(99, 102, 241, 0.08)', color: 'var(--accent)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Client-Centric</h3>
              <p className={styles.serviceDescription}>
                No communication black holes. We set up active Slack channels, weekly calls, and transparent project tracking dashboards.
              </p>
            </div>

            <div className={styles.whyCard}>
              <div className={styles.iconWrapper} style={{ backgroundColor: 'rgba(0, 102, 255, 0.08)', color: 'var(--primary)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                  <polyline points="2 17 12 22 22 17"/>
                  <polyline points="2 12 12 17 22 12"/>
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Tailored Solutions</h3>
              <p className={styles.serviceDescription}>
                Every file is custom written. We avoid over-engineered templates to build clean, performant applications tailored to your target needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Testimonials</span>
          <h2 className={styles.sectionTitle}>Our Clients Keep Talking</h2>
          <p className={styles.sectionSubtitle}>
            We help startups launch products and guide established brands through modernization workflows.
          </p>
        </div>

        <div className={styles.testimonialsGrid}>
          <Card>
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className={styles.quote}>
                "Cybez Lab delivered our custom web platform three weeks ahead of schedule. Their attention to security, clean React code, and testing was impressive."
              </p>
              <div className={styles.author}>
                <div className={styles.authorAvatar}>MS</div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>Marcus Sterling</span>
                  <span className={styles.authorRole}>CTO, NexaCorp</span>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className={styles.quote}>
                "The React Native application they built has excellent offline caching. Our store metrics increased by 40% after launch. High-quality execution!"
              </p>
              <div className={styles.author}>
                <div className={styles.authorAvatar}>SL</div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>Sarah Lind</span>
                  <span className={styles.authorRole}>Head of Product, CartFlow</span>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className={styles.quote}>
                "They didn't just build a website; they modernized our cloud stack. Our GCP hosting costs decreased by 50% while scaling capacity doubled."
              </p>
              <div className={styles.author}>
                <div className={styles.authorAvatar}>DB</div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>David Beckman</span>
                  <span className={styles.authorRole}>Founder, VibeMedia</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 7. Blog / Articles Section */}
      <section className={`${styles.section} ${styles.whySection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Resources</span>
            <h2 className={styles.sectionTitle}>Insights & Tech Updates</h2>
            <p className={styles.sectionSubtitle}>
              We publish articles detailing software architecture trends, developer guides, and clean coding best practices.
            </p>
          </div>

          <div className={styles.blogGrid}>
            <Card>
              <div className={styles.blogCard}>
                <div className={styles.blogImage}>Next.js App Optimization</div>
                <div className={styles.blogMeta}>
                  <span className={styles.blogCategory}>Engineering</span>
                  <span className={styles.blogDate}>June 2026</span>
                </div>
                <h3 className={styles.blogTitle}>Optimizing Next.js App Router for Large-Scale Dashboards</h3>
                <p className={styles.serviceDescription}>
                  Learn how to structure nested route layouts, leverage React Server Components, and configure caching.
                </p>
              </div>
            </Card>

            <Card>
              <div className={styles.blogCard}>
                <div className={styles.blogImage}>GraphQL vs REST</div>
                <div className={styles.blogMeta}>
                  <span className={styles.blogCategory}>Architecture</span>
                  <span className={styles.blogDate}>May 2026</span>
                </div>
                <h3 className={styles.blogTitle}>When to Choose REST vs GraphQL in Web API Integrations</h3>
                <p className={styles.serviceDescription}>
                  A deep technical comparison exploring payload sizing, developer experience, and request overhead.
                </p>
              </div>
            </Card>

            <Card>
              <div className={styles.blogCard}>
                <div className={styles.blogImage}>Security in React Native</div>
                <div className={styles.blogMeta}>
                  <span className={styles.blogCategory}>Mobile</span>
                  <span className={styles.blogDate}>April 2026</span>
                </div>
                <h3 className={styles.blogTitle}>Keychains, Cryptography, and Security in React Native Apps</h3>
                <p className={styles.serviceDescription}>
                  Best practices for storing credentials, encrypting local state, and pinning SSL certificates.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 8. Contact Form Section */}
      <section id="contact" className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Contact</span>
          <h2 className={styles.sectionTitle}>Start Your Custom Project</h2>
          <p className={styles.sectionSubtitle}>
            Get in touch with our engineering team to discuss your project requirements, scope, and timeline.
          </p>
        </div>

        <div className={styles.contactContainer}>
          {/* Contact Details Card */}
          <div className={styles.contactInfoCard}>
            <h3 className={styles.contactInfoTitle}>Contact Details</h3>
            <div className={styles.contactInfoList}>
              <div className={styles.contactInfoItem}>
                <div className={styles.contactInfoIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className={styles.contactInfoText}>
                  <span className={styles.contactInfoLabel}>Call Us</span>
                  <a href="tel:+923390066509" className={styles.contactInfoValue}>+92 339 0066509</a>
                </div>
              </div>

              <div className={styles.contactInfoItem}>
                <div className={styles.contactInfoIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className={styles.contactInfoText}>
                  <span className={styles.contactInfoLabel}>Email Us</span>
                  <a href="mailto:info@cybezlab.com" className={styles.contactInfoValue}>info@cybezlab.com</a>
                </div>
              </div>

              <div className={styles.contactInfoItem}>
                <div className={styles.contactInfoIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className={styles.contactInfoText}>
                  <span className={styles.contactInfoLabel}>Karachi HQ</span>
                  <span className={styles.contactInfoValue} style={{ fontSize: '0.9rem' }}>
                    Suite 305, 3rd Floor, Business Avenue Building, Main Shahrah-e-Faisal, PECHS Block 6, Karachi, Pakistan
                  </span>
                </div>
              </div>
            </div>
          </div>

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

              <div className={styles.formGroup}>
                <label htmlFor="projectType" className={styles.label}>Project Scope</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="web">Web Application</option>
                  <option value="mobile">Mobile Application</option>
                  <option value="cloud">Cloud Architecture</option>
                  <option value="design">UI/UX Design Systems</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Project Requirements</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Describe what you want to build, key features, and your target timeline..."
                  className={styles.textarea}
                />
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending Request...' : 'Send Message'}
              </Button>

              {submitStatus === 'success' && (
                <div style={{ color: 'hsl(140, 70%, 40%)', fontSize: '0.95rem', fontWeight: 600, marginTop: '10px', textAlign: 'center' }}>
                  Thank you! Your message has been sent successfully. We will get in touch soon.
                </div>
              )}
            </form>
          </Card>
        </div>
      </section>

      {/* Mini-CTA Section before Footer */}
      <section className={styles.ctaSection}>
        <div className={`${styles.ctaContent} container`}>
          <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Ready to Build Your App?</h2>
          <p className={styles.sectionSubtitle} style={{ margin: 0 }}>
            Collaborate with an engineering team that understands product design and database architecture.
          </p>
          <Button onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}>
            Get Free Consultation
          </Button>
        </div>
      </section>
    </main>
  );
}
