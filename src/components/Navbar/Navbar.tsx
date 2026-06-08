'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../Button/Button';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
          <span className={styles.logoText}>Cybez<span className="text-gradient-purple">Lab</span></span>
        </Link>

        <div className={styles.links}>
          <a href="#services" className={styles.link}>Services</a>
          <a href="#about" className={styles.link}>About</a>
          <a href="#portfolio" className={styles.link}>Portfolio</a>
          <a href="#contact" className={styles.link}>Contact</a>
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
