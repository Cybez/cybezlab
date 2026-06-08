'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../Button/Button';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.container} container`}>
        <Link href="/" className={styles.logo}>
          <img 
            src="/assets/cybezlab-logo.png" 
            alt="Cybez Lab Logo" 
            className={styles.logoImg}
          />
        </Link>

        <div className={styles.links}>
          {/* Services Link with Hover Mega Menu Wrapper */}
          <div 
            className={styles.megaMenuWrapper}
            onMouseEnter={() => setIsMegaOpen(true)}
            onMouseLeave={() => setIsMegaOpen(false)}
          >
            <Link href="/services" className={`${styles.link} ${isMegaOpen ? styles.linkActive : ''}`}>
              Services
              <svg 
                className={`${styles.chevron} ${isMegaOpen ? styles.chevronRotate : ''}`} 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Link>

            {/* Mega Menu Dropdown */}
            <div className={`${styles.megaMenu} ${isMegaOpen ? styles.megaVisible : ''}`}>
              <div className={styles.megaContainer}>
                <div className={styles.megaColumns}>
                  {/* Column 1: Software Development */}
                  <div className={styles.megaColumn}>
                    <h4 className={styles.columnTitle}>Software Development</h4>
                    <ul className={styles.columnList}>
                      <li><Link href="/services#software-dev" className={styles.columnLink}>Custom Software Development</Link></li>
                      <li><Link href="/services#software-dev" className={styles.columnLink}>Web Application Development</Link></li>
                      <li><Link href="/services#software-dev" className={styles.columnLink}>Mobile App Development</Link></li>
                      <li><Link href="/services#software-dev" className={styles.columnLink}>App Deployment & Support</Link></li>
                      <li><Link href="/services#software-dev" className={styles.columnLink}>UI/UX Design</Link></li>
                    </ul>
                  </div>

                  {/* Column 2: Emerging Technologies */}
                  <div className={styles.megaColumn}>
                    <h4 className={styles.columnTitle}>Emerging Technologies</h4>
                    <ul className={styles.columnList}>
                      <li><Link href="/services#emerging-tech" className={styles.columnLink}>AR/VR and MR</Link></li>
                      <li><Link href="/services#emerging-tech" className={styles.columnLink}>Artificial Intelligence</Link></li>
                      <li><Link href="/services#emerging-tech" className={styles.columnLink}>Blockchain Technology</Link></li>
                      <li><Link href="/services#emerging-tech" className={styles.columnLink}>Internet of Things (IoT)</Link></li>
                    </ul>
                  </div>

                  {/* Column 3: Cloud Infrastructure */}
                  <div className={styles.megaColumn}>
                    <h4 className={styles.columnTitle}>Cloud Infrastructure</h4>
                    <ul className={styles.columnList}>
                      <li><Link href="/services#cloud-infra" className={styles.columnLink}>Cloud Implementation</Link></li>
                      <li><Link href="/services#cloud-infra" className={styles.columnLink}>Cloud Migration</Link></li>
                      <li><Link href="/services#cloud-infra" className={styles.columnLink}>DevOps</Link></li>
                      <li><Link href="/services#cloud-infra" className={styles.columnLink}>AWS, Azure, GCP</Link></li>
                      <li><Link href="/services#cloud-infra" className={styles.columnLink}>Cloud Security</Link></li>
                    </ul>
                  </div>

                  {/* Column 4: QA and Support */}
                  <div className={styles.megaColumn}>
                    <h4 className={styles.columnTitle}>QA and Support</h4>
                    <ul className={styles.columnList}>
                      <li><Link href="/services#qa-support" className={styles.columnLink}>Automated and Manual Testing</Link></li>
                      <li><Link href="/services#qa-support" className={styles.columnLink}>User Acceptance Testing (UAT)</Link></li>
                      <li><Link href="/services#qa-support" className={styles.columnLink}>L1 L2 L3 Support</Link></li>
                      <li><Link href="/services#qa-support" className={styles.columnLink}>24/7 On Demand Support</Link></li>
                    </ul>
                  </div>

                  {/* Column 5: Testimonial Card */}
                  <div className={styles.megaTestimonial}>
                    <div className={styles.testimonialCard}>
                      <div className={styles.testimonialHeader}>
                        <div className={styles.avatar}>BP</div>
                        <div className={styles.authorInfo}>
                          <span className={styles.authorName}>Brijesh Pati</span>
                          <span className={styles.clientTag}>CLIENT</span>
                        </div>
                      </div>
                      <p className={styles.testimonialText}>
                        "One of the best devs I have come across. Ever reliable, great quality of code. Thorough & professional"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Tech Grid */}
                <div className={styles.megaTech}>
                  <h4 className={styles.techTitle}>Technologies We Leverage</h4>
                  <div className={styles.techGrid}>
                    <span className={`${styles.techBadge} ${styles.techAndroid}`}>Android</span>
                    <span className={`${styles.techBadge} ${styles.techAws}`}>AWS</span>
                    <span className={`${styles.techBadge} ${styles.techAngular}`}>Angular</span>
                    <span className={`${styles.techBadge} ${styles.techDocker}`}>Docker</span>
                    <span className={`${styles.techBadge} ${styles.techFigma}`}>Figma</span>
                    <span className={`${styles.techBadge} ${styles.techFirebase}`}>Firebase</span>
                    <span className={`${styles.techBadge} ${styles.techFlutter}`}>Flutter</span>
                    <span className={`${styles.techBadge} ${styles.techJava}`}>Java</span>
                    <span className={`${styles.techBadge} ${styles.techReact}`}>React</span>
                    <span className={`${styles.techBadge} ${styles.techNode}`}>Node.js</span>
                    <span className={`${styles.techBadge} ${styles.techPython}`}>Python</span>
                    <span className={`${styles.techBadge} ${styles.techSwift}`}>Swift</span>
                    <span className={`${styles.techBadge} ${styles.techTs}`}>TypeScript</span>
                    <span className={`${styles.techBadge} ${styles.techVue}`}>Vue</span>
                    <span className={`${styles.techBadge} ${styles.techWp}`}>WordPress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href="/#portfolio" className={styles.link}>Our Work</Link>
          <Link href="/#about" className={styles.link}>Why Us</Link>
          <Link href="/#contact" className={styles.link}>Contact</Link>
        </div>

        <div className={styles.cta}>
          <Button variant="secondary" onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}>
            Get in Touch
          </Button>
        </div>
      </div>
    </nav>
  );
};
