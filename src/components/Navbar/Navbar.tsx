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
                    <span className={`${styles.techBadge} ${styles.techAndroid}`} title="Android">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.62 13.97a.88.88 0 1 1-.88-.88.88.88 0 0 1 .88.88zm-7.48 0a.88.88 0 1 1-.88-.88.88.88 0 0 1 .88.88zm8.68-4.2l1.9-3.29a.43.43 0 0 0-.15-.59.43.43 0 0 0-.59.15l-1.93 3.34A9.88 9.88 0 0 0 12 8.5a9.88 9.88 0 0 0-5.05 1.38L5.02 6.54a.43.43 0 0 0-.59-.15.43.43 0 0 0-.15.59l1.9 3.29A10 10 0 0 0 2 18h20a10 10 0 0 0-4.18-8.23z"/></svg>
                    </span>
                    <span className={`${styles.techBadge} ${styles.techAws}`} title="AWS">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.75 14.86c-1.55 0-2.45-.63-2.45-1.74v-.07c0-1.12 1-1.7 2.45-1.7h2.2v.9c-.33-.8-.94-1.1-2.12-1.1-1.6 0-2.6.7-2.6 1.9 0 1.2.9 1.9 2.5 1.9a3 3 0 0 0 2.22-.88v.85c-.64.56-1.5.85-2.2.85zm6 0c-1.1 0-2.07-.48-2.58-1.28l.8-.57a2.22 2.22 0 0 0 1.83.92c.75 0 1.25-.33 1.25-.85 0-.52-.37-.73-1.42-.97-1.44-.32-2.34-.78-2.34-2.04 0-1.16.94-1.9 2.38-1.9 1 0 1.87.37 2.37 1.01l-.77.6a2.12 2.12 0 0 0-1.64-.68c-.76 0-1.16.32-1.16.74 0 .42.34.62 1.34.86 1.5.34 2.43.76 2.43 2.1 0 1.26-.96 2.06-2.5 2.06zM3.46 8.32h1.65l1.6 6.06 1.4-5.32h1.45L11 14.38l1.6-6.06h1.6L11.77 16H10.3l-1.38-5.26L7.54 16H6.07L3.46 8.32zm8.9 9.38a16 16 0 0 1-9.97-3.08c-.28-.2-.14-.54.18-.46 3.03.73 7 .92 9.8.08.31-.1.46.22.18.42a15.86 15.86 0 0 1-10.19 2.04zM23.1 14.6c.15-.3 0-.44-.33-.3a5 5 0 0 1-1.98.54.14.14 0 0 1-.13-.18c.28-.9 1-2.43 1.4-3.13.16-.3.06-.46-.28-.35a10 10 0 0 1-2.42.75.14.14 0 0 1-.15-.12c-.08-.94.06-2.6.14-3.5 0-.32-.14-.42-.38-.2-.72.67-2 1.94-2.65 2.62a.15.15 0 0 0 0 .22c.67.6 2.05 1.76 2.8 2.37.24.2.37.1.35-.2v-.97a.14.14 0 0 1 .2-.13c.67.35 1.8 1.05 2.46 1.46.25.15.42-.04.3-.32z"/></svg>
                    </span>
                    <span className={`${styles.techBadge} ${styles.techAngular}`} title="Angular">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2.43 5.4l1.45 12.56L12 22l8.12-4.04 1.45-12.56L12 2zM12 4.6l6.36 11.23h-2.18l-1.24-3.13H9.06l-1.24 3.13H5.64L12 4.6zm1.88 6.27L12 7.04l-1.88 3.83h3.76z"/></svg>
                    </span>
                    <span className={`${styles.techBadge} ${styles.techDocker}`} title="Docker">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.983 8.878h-2.73V11.3h2.73V8.878zm-3.793 0H7.46V11.3h2.73V8.878zm-3.793 0H3.667V11.3h2.73V8.878zm3.793-3.005H7.46v2.422h2.73V5.873zm0-3.005H7.46v2.422h2.73V2.868zm3.793 3.005h-2.73v2.422h2.73V5.873zm3.793 0h-2.73v2.422h2.73V5.873zm0 3.005h-2.73V11.3h2.73V8.878zm3.793 0h-2.73V11.3h2.73V8.878zM.007 12.429v1.2c0 3.237 2.08 5.766 4.908 6.558.986.276 2.01.414 3.033.414h8.347c3.923 0 7.117-2.613 7.7-6.223.037-.24.03-.43-.02-.596-.065-.213-.257-.367-.502-.367h-4.364c-.114.733-.502 1.4-1.09 1.87-.665.532-1.503.826-2.385.826-1.127 0-2.164-.483-2.846-1.326l-.21-.26h-7.65l-.21.26a3.543 3.543 0 0 1-2.846 1.326c-.882 0-1.72-.294-2.385-.826a3.02 3.02 0 0 1-1.09-1.87H.509c-.28 0-.46.17-.5.429z"/></svg>
                    </span>
                    <span className={`${styles.techBadge} ${styles.techFigma}`} title="Figma">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 12a4 4 0 0 0 4 4h4v-4H8zm0-10a4 4 0 0 0 0 8h4V2H8zm4 8h4a4 4 0 0 0 0-8h-4v8zm-4 4a4 4 0 0 0 4 4H8v-4zm4 4a4 4 0 0 0 4 4h-4v-4z"/></svg>
                    </span>
                    <span className={`${styles.techBadge} ${styles.techFirebase}`} title="Firebase">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.89 15.572L6.009 1.86a.602.602 0 0 1 1.096-.289l2.766 5.176 4.195-7.904a.604.604 0 0 1 1.085.123l2.84 16.634a.6.6 0 0 1-.9.645l-12.7-7.3a.6.6 0 0 1-.3-.593zm.507-.223l11.583 6.66L18.49 6.814l-14.093 8.535zm2.083-13.4l-1.848 11.968 8.86-5.367-7.012-6.6z"/></svg>
                    </span>
                    <span className={`${styles.techBadge} ${styles.techFlutter}`} title="Flutter">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.314 0L2.3 12.01l4.464 4.463L21.7 1.01h-7.386zm0 10.457l-5.617 5.618 5.617 5.618H21.7l-5.617-5.618 5.617-5.618h-7.386z"/></svg>
                    </span>
                    <span className={`${styles.techBadge} ${styles.techJava}`} title="Java">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 19.5c0 .28.22.5.5.5h16c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-16c-.28 0-.5.22-.5.5zm16.5-12.5h-1c-.28 0-.5.22-.5.5v5c0 1.93-1.57 3.5-3.5 3.5h-6C5.57 16 4 14.43 4 12.5v-5c0-.28-.22-.5-.5-.5s-.5.22-.5.5v5c0 2.48 2.02 4.5 4.5 4.5h6c2.48 0 4.5-2.02 4.5-4.5v-2c1.38 0 2.5-1.12 2.5-2.5V8c0-1.1-.9-2-2-2zm-1 5V8h1c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1h-1zm-6-7.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5v2c0 .28.22.5.5.5s.5-.22.5-.5v-2zm-3 1c0-.28-.22-.5-.5-.5s-.5.22-.5.5v2c0 .28.22.5.5.5s.5-.22.5-.5v-2zm6-1c0-.28-.22-.5-.5-.5s-.5.22-.5.5v2c0 .28.22.5.5.5s.5-.22.5-.5v-2z"/></svg>
                    </span>
                    <span className={`${styles.techBadge} ${styles.techReact}`} title="React">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>
                    </span>
                    <span className={`${styles.techBadge} ${styles.techNode}`} title="Node.js">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm6.75 14.25L12 20.25l-6.75-4V7.75L12 3.75l6.75 4v8.5zM12 6.5c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5zm0 8c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>
                    </span>
                    <span className={`${styles.techBadge} ${styles.techPython}`} title="Python">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.95 2c-2.7 0-2.54 1.17-2.54 1.17l.01 1.2h2.6c.82 0 1.48.66 1.48 1.48v2.64h2.64s1.17-.16 1.17-2.5c0-2.34-1.06-4-3.8-4H11.95zm-2.5 5.86v2.62c0 .82-.66 1.48-1.48 1.48H5.32s-1.17.16-1.17 2.5c0 2.34 1.06 4 3.8 4h1.53c2.7 0 2.54-1.17 2.54-1.17l-.01-1.2h-2.6c-.82 0-1.48-.66-1.48-1.48v-2.64H15.4V7.86H9.45zm5.73 1.5c.37 0 .66.3.66.66 0 .36-.3.66-.66.66a.66.66 0 0 1-.66-.66c0-.36.3-.66.66-.66zm-6.28 6.06c.36 0 .66.3.66.66 0 .36-.3.66-.66.66a.66.66 0 0 1-.66-.66c0-.36.3-.66.66-.66z"/></svg>
                    </span>
                    <span className={`${styles.techBadge} ${styles.techSwift}`} title="Swift">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.84 15.35c-.07-.1-.36-.45-.67-.78-.7-.78-1.57-1.46-2.58-1.8-1.56-.56-3.06-.47-4.14-.14 1.98-1.7 4.14-3.05 6.42-3.89.28-.1.38-.4.21-.65-.13-.22-.38-.3-.63-.22a18.25 18.25 0 0 0-7.65 4.54 12.3 12.3 0 0 0-3.35 6.74c-.04.28.18.52.46.52.22 0 .42-.14.48-.35A11.33 11.33 0 0 1 12.7 13.9c1.68 1.1 3.82 1.48 5.95.9a12.3 12.3 0 0 0 3.52-1.72.63.63 0 0 0-.33-1.07V12c-.52.2-1.28.45-1.92.58a.48.48 0 0 1-.5-.22c-.12-.2-.03-.47.2-.58.82-.4 1.83-.8 2.65-.87.31-.02.44-.33.26-.52a6.45 6.45 0 0 0-4.06-1.63c-3 0-5.8 2.1-7.22 4.67a13.33 13.33 0 0 0-2.13 6.94c0 .3.25.54.54.54.25 0 .47-.18.52-.43A12.3 12.3 0 0 1 12.33 17.5c2.3 1.1 5.06.96 7.23-.37a13.3 13.3 0 0 0 2.58-2.06c.2-.22.1-.6-.3-.72z"/></svg>
                    </span>
                    <span className={`${styles.techBadge} ${styles.techTs}`} title="TypeScript">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 2h20v20H2V2zm12.35 11.66c0-.85-.35-1.5-.95-1.94-.6-.44-1.47-.75-2.62-.94-1-.17-1.72-.4-2.14-.7-.42-.3-.62-.77-.62-1.4 0-.67.27-1.2.82-1.6.55-.4 1.35-.6 2.37-.6 1 0 1.78.22 2.37.66.6.43.95 1.05 1.05 1.84h2.5c-.12-1.45-.75-2.58-1.9-3.37-1.15-.8-2.65-1.2-4.52-1.2-1.93 0-3.48.47-4.65 1.43-1.17.96-1.75 2.22-1.75 3.8 0 1.25.43 2.24 1.3 2.94.86.7 2.1 1.2 3.73 1.48 1.1.2 1.87.47 2.3.82.45.34.68.83.68 1.48 0 .73-.32 1.3-.98 1.7-.65.4-1.58.6-2.78.6-1.3 0-2.28-.3-2.94-.9-.67-.6-1.03-1.47-1.1-2.6H4.25c.08 1.8.77 3.2 2.06 4.2 1.3 1 3.1 1.5 5.4 1.5 2.18 0 3.9-.48 5.15-1.44 1.25-.96 1.88-2.28 1.88-3.95v-.05zm4.9-7.06H14.1v2.3h2.07v10.3h2.6V9.2h2.07V6.9z"/></svg>
                    </span>
                    <span className={`${styles.techBadge} ${styles.techVue}`} title="Vue">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24,1.48H18L12,11.85,6,1.48H0L12,22.28ZM18,1.48H14.39L12,5.62,9.61,1.48H6L12,11.85Z"/></svg>
                    </span>
                    <span className={`${styles.techBadge} ${styles.techWp}`} title="WordPress">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.158 12.786l-2.698 7.84c.835.228 1.71.353 2.61.353.642 0 1.265-.065 1.87-.19l-1.782-8.003zm-7.61-3.69c0-.498.176-.843.328-1.112.23-.404.455-.747.455-1.148 0-.462-.358-.89-.864-.89-.09 0-.175.013-.258.03A9.852 9.852 0 0 0 2.15 12c0 2.213.725 4.26 1.944 5.922l.454-1.378 1.623-4.945c.423-1.285.253-2.18-.372-2.503zm12.355 2.87c0-1.017-.367-1.718-.68-2.282-.416-.708-.804-1.306-.804-2.016 0-.817.618-1.577 1.487-1.577.07 0 .137.005.204.014A9.878 9.878 0 0 0 12.07 2c-3.13 0-5.918 1.455-7.747 3.725l.89-.04c.83 0 1.945.312 2.378 1.135l1.528 4.673 1.02-3.11c-.443-.076-.867-.282-.867-.706 0-.498.41-.89.89-.89h3.766c-.053 0-.106.012-.158.03.498 0 .89.392.89.89 0 .424-.424.63-.867.706l1.013 3.09 1.492-4.52c.382-.77.108-1.137-.417-1.137h-.146c.928-1.127 2.31-1.848 3.86-1.848a9.88 9.88 0 0 0-4.048 8.125zm-2.022.42l1.642 4.982c.983-.757 1.8-1.714 2.39-2.812l-1.884-5.385-2.148 3.215zm7.143-2.19c.148.514.225 1.096.225 1.737 0 1.83-.548 3.882-1.56 5.86a9.92 9.92 0 0 0 1.258-4.9c0-1.026-.225-1.996-.617-2.863l.694.166z"/></svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href="/work" className={styles.link}>Our Work</Link>
          <Link href="/#about" className={styles.link}>Why Us</Link>
          <Link href="/careers" className={styles.link}>Careers</Link>
          <Link href="/#contact" className={styles.link}>Contact</Link>
        </div>

        <div className={styles.cta}>
          <Link href="/contact">
            <Button variant="secondary">Get in Touch</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
