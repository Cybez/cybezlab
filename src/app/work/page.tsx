'use client';

import React, { useState } from 'react';
import { Card } from '@/components/Card/Card';
import { Button } from '@/components/Button/Button';
import styles from './work.module.css';

interface Project {
  id: number;
  title: string;
  category: 'productive' | 'products' | 'gaming' | 'agriculture';
  description: string;
  tags: string[];
  mockupType: 'browser-hiring' | 'browser-cheating' | 'browser-twin' | 'browser-nfc' | 'browser-golf' | 'browser-support' | 'browser-agri';
}

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'productive' | 'products' | 'gaming' | 'agriculture'>('all');

  const projects: Project[] = [
    {
      id: 1,
      title: 'Hiring Hash',
      category: 'productive',
      description: 'Next generation hiring solution optimizing workflows, resume screening, and onboarding pipelines.',
      tags: ['Angular', 'Node.js', 'AWS'],
      mockupType: 'browser-hiring'
    },
    {
      id: 2,
      title: 'Zero Cheating',
      category: 'productive',
      description: 'Secure, Fair and Focused on 100% Learning for All with browser lockdown and webcam proctoring.',
      tags: ['Python', 'React', 'Firebase'],
      mockupType: 'browser-cheating'
    },
    {
      id: 3,
      title: 'Digital Twin App',
      category: 'products',
      description: 'Real-time facility tracking, asset monitoring, and active IoT sensor dashboard visualization.',
      tags: ['Three.js', 'React', 'Node.js'],
      mockupType: 'browser-twin'
    },
    {
      id: 4,
      title: 'Smart NFC',
      category: 'products',
      description: 'Smart business cards, networking tags, and CRM database integrations for next-gen networking.',
      tags: ['React Native', 'Swift', 'Java'],
      mockupType: 'browser-nfc'
    },
    {
      id: 5,
      title: 'Golfy-VR',
      category: 'gaming',
      description: 'Physics-based virtual reality training simulation run directly in modern mobile web browsers.',
      tags: ['Unity', 'WebXR', '3D'],
      mockupType: 'browser-golf'
    },
    {
      id: 6,
      title: 'Customer Support App',
      category: 'productive',
      description: 'Collaborative ticketing workspace, support queue planner, and database analytics console.',
      tags: ['React', 'Redux', 'Node.js'],
      mockupType: 'browser-support'
    },
    {
      id: 7,
      title: 'Agriculture App',
      category: 'agriculture',
      description: 'Precision farming platform tracking crop cycles, soil moisture metrics, and real-time weather alerts.',
      tags: ['React Native', 'Flutter', 'IoT'],
      mockupType: 'browser-agri'
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  // Helper to render customized browser mockup shapes based on project type
  const renderMockup = (type: string) => {
    switch (type) {
      case 'browser-hiring':
        return (
          <div className={styles.browserBody}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div className={styles.mockLineShort} style={{ width: '30%' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
              <div style={{ border: '1px solid var(--border-color)', height: '50px', borderRadius: '4px', background: 'var(--bg-section)' }} />
              <div style={{ border: '1px solid var(--border-color)', height: '50px', borderRadius: '4px', background: 'var(--bg-section)' }} />
              <div style={{ border: '1px solid var(--border-color)', height: '50px', borderRadius: '4px', background: 'var(--bg-section)' }} />
            </div>
          </div>
        );
      case 'browser-cheating':
        return (
          <div className={styles.browserBody}>
            <div className={styles.mockBox} style={{ color: 'red', borderColor: '#fca5a5', background: '#fef2f2', fontSize: '0.8rem', fontWeight: 700 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              </svg>
              Lockdown Mode Active
            </div>
            <div className={styles.mockLineLong} />
            <div className={styles.mockLineMed} />
          </div>
        );
      case 'browser-twin':
        return (
          <div className={styles.browserBody} style={{ padding: '8px' }}>
            <div style={{ border: '1px dashed var(--primary)', flex: 1, borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600, gap: '4px' }}>
              <span>3D Facility Grid Rendering</span>
              <div className={styles.mockLineShort} style={{ background: 'var(--primary)', opacity: 0.3, width: '40%' }} />
            </div>
          </div>
        );
      case 'browser-nfc':
        return (
          <div className={styles.browserBody} style={{ padding: '16px 40px' }}>
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '12px', flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', boxShadow: '0 4px 6px -2px rgba(0,0,0,0.05)' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--secondary)' }} />
              <div className={styles.mockLineLong} style={{ width: '80%' }} />
              <div className={styles.mockLineShort} />
            </div>
          </div>
        );
      case 'browser-golf':
        return (
          <div className={styles.browserBody} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--primary)', animation: 'pulseDot 2s infinite' }} />
              <div style={{ width: '40px', height: '4px', background: 'var(--border-color)', borderRadius: '2px' }} />
              <div style={{ width: '8px', height: '8px', background: 'var(--secondary)', borderRadius: '50%' }} />
            </div>
          </div>
        );
      case 'browser-support':
        return (
          <div className={styles.browserBody}>
            <div className={styles.mockBox} style={{ color: 'var(--accent)', borderColor: 'rgba(99, 102, 241, 0.2)', background: 'rgba(99, 102, 241, 0.03)', fontSize: '0.8rem', fontWeight: 700 }}>
              Inbox: 12 Open Tickets
            </div>
            <div className={styles.mockLineLong} />
            <div className={styles.mockLineMed} />
          </div>
        );
      case 'browser-agri':
        return (
          <div className={styles.browserBody}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '6px' }}>
              <div style={{ color: 'var(--secondary)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--fg-color)' }}>Sensor Node 04: Active</span>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <div style={{ flex: 1, height: '30px', background: 'rgba(0, 210, 255, 0.05)', border: '1px solid var(--secondary)', borderRadius: '4px' }} />
              <div style={{ flex: 1, height: '30px', background: 'var(--bg-section)', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className={styles.workPage}>
      {/* Hero Section */}
      <section className={`${styles.hero} container`}>
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} text-brand-gradient`}>Our Featured Work</h1>
          <p className={styles.heroSubtitle}>
            We build responsive software, custom web systems, mobile applications, and design languages that power industries around the world.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className={styles.tabsWrapper}>
        <div className={`${styles.tabsContainer} container`}>
          <span 
            onClick={() => setActiveFilter('all')} 
            className={`${styles.tabLink} ${activeFilter === 'all' ? styles.activeTab : ''}`}
          >
            All
          </span>
          <span 
            onClick={() => setActiveFilter('productive')} 
            className={`${styles.tabLink} ${activeFilter === 'productive' ? styles.activeTab : ''}`}
          >
            Productive
          </span>
          <span 
            onClick={() => setActiveFilter('products')} 
            className={`${styles.tabLink} ${activeFilter === 'products' ? styles.activeTab : ''}`}
          >
            Products
          </span>
          <span 
            onClick={() => setActiveFilter('gaming')} 
            className={`${styles.tabLink} ${activeFilter === 'gaming' ? styles.activeTab : ''}`}
          >
            Gaming
          </span>
          <span 
            onClick={() => setActiveFilter('agriculture')} 
            className={`${styles.tabLink} ${activeFilter === 'agriculture' ? styles.activeTab : ''}`}
          >
            Agriculture
          </span>
        </div>
      </div>

      {/* Portfolio Grid */}
      <section className="container">
        <div className={styles.portfolioGrid}>
          {filteredProjects.map((project) => (
            <Card key={project.id}>
              <div className={styles.projectCard}>
                <div className={styles.mockupContainer}>
                  <div className={styles.mockupBrowser}>
                    <div className={styles.browserHeader}>
                      <div className={styles.browserDots} />
                    </div>
                    {renderMockup(project.mockupType)}
                  </div>
                </div>
                <h3 className={styles.mockTitle}>{project.title}</h3>
                <div className={styles.projectTags}>
                  {project.tags.map((tag, index) => (
                    <span key={index} className={styles.projectTag}>{tag}</span>
                  ))}
                </div>
                <p className={styles.projectDescription}>{project.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className={styles.ctaBanner}>
        <div className={`${styles.ctaContent} container`}>
          <h2 className={styles.ctaTitle}>Let's code the future together!</h2>
          <p className={styles.ctaSubtitle}>
            Have an application or custom system idea? Reach out to our technical team for scoping and architecture options.
          </p>
          <Button onClick={() => {
            window.location.href = '/#contact';
          }}>
            Get in Touch
          </Button>
        </div>
      </section>
    </main>
  );
}
