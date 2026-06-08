'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';
import styles from './services.module.css';

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('software-dev');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'web',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Handle active tab highlighting based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['software-dev', 'emerging-tech', 'cloud-infra', 'qa-support'];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (sectionId: string) => {
    setActiveTab(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    <main className={styles.servicesPage}>
      {/* Hero Section */}
      <section className={`${styles.hero} container`}>
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} text-brand-gradient`}>
            Designing Futures, Crafting Success
          </h1>
          <p className={styles.heroSubtitle}>
            We design, develop, and deploy production-grade software solutions using modern frameworks, cloud systems, and user-centered design principles.
          </p>
          <Button onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}>
            Get a Free Quote
          </Button>
        </div>

        {/* Abstract Workspace Grid */}
        <div className={styles.teamGrid}>
          <div className={styles.teamCard} style={{ backgroundColor: '#eef2f6' }}>
            <div className={styles.teamOverlay} />
            <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'var(--primary)', zIndex: 2 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <span className={styles.teamName}>Agile Coding Workspace</span>
            <span className={styles.teamRole}>High-Speed Deployment</span>
          </div>

          <div className={styles.teamCard} style={{ backgroundColor: '#fdf4ff' }}>
            <div className={styles.teamOverlay} />
            <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'var(--accent)', zIndex: 2 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <span className={styles.teamName}>Architectural Blueprinting</span>
            <span className={styles.teamRole}>Enterprise Security Focus</span>
          </div>

          <div className={styles.teamCard} style={{ backgroundColor: '#ecfeff' }}>
            <div className={styles.teamOverlay} />
            <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'var(--secondary)', zIndex: 2 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
            </div>
            <span className={styles.teamName}>Client Design Sprint</span>
            <span className={styles.teamRole}>User Journey Wireframes</span>
          </div>
        </div>
      </section>

      {/* Intro section */}
      <section className={`${styles.introSection} container`}>
        <p className={styles.introText}>
          At <span className={styles.highlightText}>Cybez Lab</span>, we craft software using the latest technologies to drive innovation, optimize workflows, and meet your exact business needs.
        </p>
      </section>

      {/* Sticky Tab Navigation */}
      <div className={styles.tabsWrapper}>
        <div className={`${styles.tabsContainer} container`}>
          <span 
            onClick={() => handleTabClick('software-dev')} 
            className={`${styles.tabLink} ${activeTab === 'software-dev' ? styles.activeTab : ''}`}
          >
            Software Development
          </span>
          <span 
            onClick={() => handleTabClick('emerging-tech')} 
            className={`${styles.tabLink} ${activeTab === 'emerging-tech' ? styles.activeTab : ''}`}
          >
            Emerging Tech
          </span>
          <span 
            onClick={() => handleTabClick('cloud-infra')} 
            className={`${styles.tabLink} ${activeTab === 'cloud-infra' ? styles.activeTab : ''}`}
          >
            Cloud Infrastructure
          </span>
          <span 
            onClick={() => handleTabClick('qa-support')} 
            className={`${styles.tabLink} ${activeTab === 'qa-support' ? styles.activeTab : ''}`}
          >
            QA & Support
          </span>
        </div>
      </div>

      {/* Section 01: Software Development */}
      <section id="software-dev" className={`${styles.serviceDetailSection} container`}>
        <div className={styles.serviceLayout}>
          <div className={styles.serviceInfo}>
            <span className={styles.sectionNum}>01</span>
            <h2 className={styles.serviceTitle}>Software Development</h2>
            <p className={styles.serviceDesc}>
              We develop scalable web architectures, custom applications, and clean interfaces specifically designed to match your company's workflows and processes.
            </p>
          </div>

          <div className={styles.subservicesGrid}>
            <div className={styles.subserviceCard}>
              <h4 className={styles.subserviceTitle}>Custom Software</h4>
              <p className={styles.subserviceDesc}>Bespoke desktop and script engines engineered from the ground up.</p>
            </div>
            <div className={styles.subserviceCard}>
              <h4 className={styles.subserviceTitle}>Web App Development</h4>
              <p className={styles.subserviceDesc}>Interactive, fast portals built on Next.js, React, Node.js, and SQL/NoSQL databases.</p>
            </div>
            <div className={styles.subserviceCard}>
              <h4 className={styles.subserviceTitle}>Mobile App Development</h4>
              <p className={styles.subserviceDesc}>Fluid iOS and Android apps engineered with React Native and native components.</p>
            </div>
            <div className={styles.subserviceCard}>
              <h4 className={styles.subserviceTitle}>App Deployment</h4>
              <p className={styles.subserviceDesc}>Hosting setups, app store submissions, updates, and maintenance support.</p>
            </div>
            <div className={styles.subserviceCard} style={{ gridColumn: 'span 2' }}>
              <h4 className={styles.subserviceTitle}>UI/UX Design</h4>
              <p className={styles.subserviceDesc}>Figma wireframes, design systems, and rapid responsive prototypes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Emerging Tech */}
      <section id="emerging-tech" className={`${styles.serviceDetailSection} container`}>
        <div className={styles.serviceLayout}>
          <div className={styles.serviceInfo}>
            <span className={styles.sectionNum}>02</span>
            <h2 className={styles.serviceTitle}>Emerging Tech</h2>
            <p className={styles.serviceDesc}>
              Stay ahead of the curve by integrating bleeding-edge AI models, VR environments, and IoT sensors into your existing operations.
            </p>
          </div>

          <div className={styles.subservicesGrid}>
            <div className={styles.subserviceCard}>
              <h4 className={styles.subserviceTitle}>AR/VR and MR</h4>
              <p className={styles.subserviceDesc}>Immersive 3D environments, VR training engines, and WebXR applications.</p>
            </div>
            <div className={styles.subserviceCard}>
              <h4 className={styles.subserviceTitle}>Artificial Intelligence</h4>
              <p className={styles.subserviceDesc}>LLM model integrations, data analysis bots, and automated smart systems.</p>
            </div>
            <div className={styles.subserviceCard}>
              <h4 className={styles.subserviceTitle}>Blockchain Technology</h4>
              <p className={styles.subserviceDesc}>Smart contract security audits, Web3 apps, and distributed data systems.</p>
            </div>
            <div className={styles.subserviceCard}>
              <h4 className={styles.subserviceTitle}>Internet of Things (IoT)</h4>
              <p className={styles.subserviceDesc}>Hardware telemetry logging, sensor grid tracking, and custom MQTT interfaces.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 03: Cloud Infrastructure */}
      <section id="cloud-infra" className={`${styles.serviceDetailSection} container`}>
        <div className={styles.serviceLayout}>
          <div className={styles.serviceInfo}>
            <span className={styles.sectionNum}>03</span>
            <h2 className={styles.serviceTitle}>Cloud Infrastructure</h2>
            <p className={styles.serviceDesc}>
              We secure and optimize your server assets, automate delivery pipelines, and establish scalable cloud databases.
            </p>
          </div>

          <div className={styles.subservicesGrid}>
            <div className={styles.subserviceCard}>
              <h4 className={styles.subserviceTitle}>Cloud Implementation</h4>
              <p className={styles.subserviceDesc}>Initial setups and server cluster configurations on AWS, Azure, or GCP.</p>
            </div>
            <div className={styles.subserviceCard}>
              <h4 className={styles.subserviceTitle}>Cloud Migration</h4>
              <p className={styles.subserviceDesc}>Transitioning databases and legacy servers to secure, modern host servers.</p>
            </div>
            <div className={styles.subserviceCard}>
              <h4 className={styles.subserviceTitle}>DevOps</h4>
              <p className={styles.subserviceDesc}>Automated Git CI/CD deployment pipelines, build scripts, and Docker images.</p>
            </div>
            <div className={styles.subserviceCard}>
              <h4 className={styles.subserviceTitle}>Cloud Security</h4>
              <p className={styles.subserviceDesc}>Penetration testing, encryption setups, VPC configs, and access controls.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 04: QA & Support */}
      <section id="qa-support" className={`${styles.serviceDetailSection} container`}>
        <div className={styles.serviceLayout}>
          <div className={styles.serviceInfo}>
            <span className={styles.sectionNum}>04</span>
            <h2 className={styles.serviceTitle}>QA & Support</h2>
            <p className={styles.serviceDesc}>
              Keep your software bug-free and online around the clock with automated testing and dedicated support staff.
            </p>
          </div>

          <div className={styles.subservicesGrid}>
            <div className={styles.subserviceCard}>
              <h4 className={styles.subserviceTitle}>Automated & Manual Testing</h4>
              <p className={styles.subserviceDesc}>Unit tests, integration pipelines, and hands-on UX validation testing.</p>
            </div>
            <div className={styles.subserviceCard}>
              <h4 className={styles.subserviceTitle}>UAT Testing</h4>
              <p className={styles.subserviceDesc}>Validating features directly with target user feedback before launch.</p>
            </div>
            <div className={styles.subserviceCard}>
              <h4 className={styles.subserviceTitle}>L1 L2 L3 Support</h4>
              <p className={styles.subserviceDesc}>Helpdesk responses, bug patching, and core infrastructure scaling.</p>
            </div>
            <div className={styles.subserviceCard}>
              <h4 className={styles.subserviceTitle}>24/7 On Demand Support</h4>
              <p className={styles.subserviceDesc}>On-call engineering support to guarantee maximum server uptime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Models Section */}
      <section className={styles.engageSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Engagement Models</span>
            <h2 className={styles.sectionTitle}>How can we engage?</h2>
            <p className={styles.sectionSubtitle}>
              Choose the engagement model that best suits your company timeline, resource needs, and budget goals.
            </p>
          </div>

          <div className={styles.engageGrid}>
            <div className={styles.engageCard}>
              <h3 className={styles.engageTitle}>Staff Augmentation</h3>
              <p className={styles.engageDesc}>
                Add experienced developers directly into your existing internal team to accelerate development velocity and handle specialized tasks.
              </p>
            </div>

            <div className={`${styles.engageCard} ${styles.highlightCard}`}>
              <h3 className={styles.engageTitle}>Fixed Price Project</h3>
              <p className={styles.engageDesc}>
                Best for projects with predefined requirements and scopes. We construct the software under a agreed budget and schedule.
              </p>
              <Button onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}>
                Create Project Schedule
              </Button>
            </div>

            <div className={styles.engageCard}>
              <h3 className={styles.engageTitle}>Dedicated Teams</h3>
              <p className={styles.engageDesc}>
                A complete product team (PM, UI designers, Frontend/Backend engineers, QA) assigned solely to build and iterate on your product.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className={`${styles.contactSection} container`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Contact</span>
          <h2 className={styles.sectionTitle}>Ready to get started?</h2>
          <p className={styles.sectionSubtitle}>
            Contact our engineering team to map out requirements, set scopes, and estimate project budgets.
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
                <label htmlFor="projectType" className={styles.label}>Engagement Model</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="staff-aug">Staff Augmentation</option>
                  <option value="fixed-price">Fixed Price Project</option>
                  <option value="dedicated">Dedicated Product Team</option>
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
                  placeholder="Describe your project, timeline, and feature requirements..."
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

      {/* Blog Section */}
      <section className={styles.blogSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Resources</span>
            <h2 className={styles.sectionTitle}>Insights Unleashed: Explore, Learn, Transform</h2>
            <p className={styles.sectionSubtitle}>
              We publish articles detailing software architecture trends, developer guides, and clean coding best practices.
            </p>
          </div>

          <div className={styles.blogGrid}>
            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ width: '100%', height: '180px', backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
                  Next.js App Optimization
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Optimizing Next.js App Router for Large-Scale Dashboards</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Learn how to structure nested route layouts, leverage React Server Components, and configure caching.
                </p>
              </div>
            </Card>

            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ width: '100%', height: '180px', backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
                  GraphQL vs REST
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>When to Choose REST vs GraphQL in Web API Integrations</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  A deep technical comparison exploring payload sizing, developer experience, and request overhead.
                </p>
              </div>
            </Card>

            <Card>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ width: '100%', height: '180px', backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
                  Security in React Native
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Keychains, Cryptography, and Security in React Native Apps</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Best practices for storing credentials, encrypting local state, and pinning SSL certificates.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
