'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';
import styles from './salary-slip.module.css';

interface BreakupItem {
  id: string;
  label: string;
  amount: number;
}

interface SlipData {
  id: string;
  employeeName: string;
  employeeId: string;
  cnic: string;
  designation: string;
  department: string;
  periodFrom: string;
  periodTo: string;
  payDate: string;
  paidDays: number;
  lopDays: number;
  earnings: BreakupItem[];
  deductions: BreakupItem[];
}

export default function SalarySlipGenerator() {
  const [mounted, setMounted] = useState(false);
  
  // A4 Scale Tracking
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Shared company details state
  const [companyName, setCompanyName] = useState('CybezLab');
  const [payslipMonth, setPayslipMonth] = useState('September 2026');
  const [addressLine1, setAddressLine1] = useState('Suite 305, 3rd Floor, Business Avenue Building, Main Shahrah-e-Faisal, PECHS Block 6');
  const [addressLine2, setAddressLine2] = useState('Karachi, Pakistan');
  const [logoImage, setLogoImage] = useState('/assets/cybezlab-logo.png');
  const [logoFileName, setLogoFileName] = useState('cybezlab-logo.png');
  const [logoError, setLogoError] = useState(false);

  // Slips list state
  const [slips, setSlips] = useState<SlipData[]>([
    {
      id: '1',
      employeeName: 'Muhammad Mooen',
      employeeId: '188',
      cnic: '38401-5301044-9',
      designation: 'Internship',
      department: 'SQA',
      periodFrom: '01/09/2026',
      periodTo: '30/09/2026',
      payDate: '30/09/2026',
      paidDays: 30,
      lopDays: 0,
      earnings: [
        { id: '1', label: 'Basic Pay', amount: 20000 },
        { id: '2', label: 'House Rent Allowance', amount: 5000 },
        { id: '3', label: 'Medical Allowance', amount: 2000 },
      ],
      deductions: [
        { id: '1', label: 'Party Fund', amount: 1200 },
        { id: '2', label: 'Income Tax', amount: 500 },
      ],
    },
    {
      id: '2',
      employeeName: 'Sarah Khan',
      employeeId: '189',
      cnic: '42101-1234567-8',
      designation: 'Software Engineer',
      department: 'Engineering',
      periodFrom: '01/09/2026',
      periodTo: '30/09/2026',
      payDate: '30/09/2026',
      paidDays: 30,
      lopDays: 0,
      earnings: [
        { id: '1', label: 'Basic Pay', amount: 50000 },
        { id: '2', label: 'House Rent Allowance', amount: 15000 },
        { id: '3', label: 'Medical Allowance', amount: 5000 },
      ],
      deductions: [
        { id: '1', label: 'Professional Tax', amount: 200 },
        { id: '2', label: 'Income Tax', amount: 1500 },
      ],
    }
  ]);
  const [activeSlipIndex, setActiveSlipIndex] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle mounting on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle live resizing to scale A4 sheet
  useEffect(() => {
    if (!mounted) return;
    
    const handleResize = () => {
      if (containerRef.current) {
        // subtract padding of container (32px padding on left & right = 64px)
        const containerWidth = containerRef.current.clientWidth - 64;
        const newScale = Math.min(1, containerWidth / 794);
        setScale(newScale);
      }
    };

    handleResize(); // initial calculation
    window.addEventListener('resize', handleResize);
    
    // Add a tiny delay to capture layout stabilization after font loads
    const timer = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [mounted]);

  // Safe active slip access
  const currentSlip = slips[activeSlipIndex] || slips[0];

  // Live calculations helper
  const getSlipSummary = (slip: SlipData) => {
    const totalEarnings = slip.earnings.reduce((sum, item) => sum + (item.amount || 0), 0);
    const totalDeductions = slip.deductions.reduce((sum, item) => sum + (item.amount || 0), 0);
    const netSalary = Math.max(0, totalEarnings - totalDeductions);
    return {
      totalEarnings,
      totalDeductions,
      netSalary,
    };
  };

  // Logo uploader
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFileName(file.name);
      setLogoError(false); // reset error state
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogoImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Switch slip controls
  const addNewSlip = () => {
    const newId = Date.now().toString();
    const newSlip: SlipData = {
      id: newId,
      employeeName: 'New Employee',
      employeeId: (slips.length + 188).toString(),
      cnic: '',
      designation: 'Software Engineer',
      department: 'Engineering',
      periodFrom: currentSlip?.periodFrom || '01/09/2026',
      periodTo: currentSlip?.periodTo || '30/09/2026',
      payDate: currentSlip?.payDate || '30/09/2026',
      paidDays: 30,
      lopDays: 0,
      earnings: [
        { id: '1', label: 'Basic Pay', amount: 25000 },
      ],
      deductions: [
        { id: '1', label: 'Income Tax', amount: 0 },
      ],
    };
    setSlips((prev) => [...prev, newSlip]);
    setActiveSlipIndex(slips.length);
  };

  const deleteSlip = (index: number) => {
    if (slips.length <= 1) return;
    setSlips((prev) => prev.filter((_, idx) => idx !== index));
    setActiveSlipIndex((prev) => Math.max(0, prev - 1));
  };

  // Modify active slip fields
  const updateActiveSlip = (field: keyof SlipData, value: any) => {
    setSlips((prev) =>
      prev.map((slip, idx) => (idx === activeSlipIndex ? { ...slip, [field]: value } : slip))
    );
  };

  // Dynamic row changes
  const handleEarningChange = (id: string, field: 'label' | 'amount', value: string | number) => {
    setSlips((prev) =>
      prev.map((slip, idx) => {
        if (idx !== activeSlipIndex) return slip;
        const updatedEarnings = slip.earnings.map((earn) => {
          if (earn.id === id) {
            return {
              ...earn,
              [field]: field === 'amount' ? Number(value) || 0 : value,
            };
          }
          return earn;
        });
        return { ...slip, earnings: updatedEarnings };
      })
    );
  };

  const addEarningRow = () => {
    setSlips((prev) =>
      prev.map((slip, idx) => {
        if (idx !== activeSlipIndex) return slip;
        const newId = Date.now().toString();
        return {
          ...slip,
          earnings: [...slip.earnings, { id: newId, label: 'Allowance', amount: 0 }],
        };
      })
    );
  };

  const removeEarningRow = (id: string) => {
    setSlips((prev) =>
      prev.map((slip, idx) => {
        if (idx !== activeSlipIndex) return slip;
        if (slip.earnings.length <= 1) return slip;
        return {
          ...slip,
          earnings: slip.earnings.filter((earn) => earn.id !== id),
        };
      })
    );
  };

  const handleDeductionChange = (id: string, field: 'label' | 'amount', value: string | number) => {
    setSlips((prev) =>
      prev.map((slip, idx) => {
        if (idx !== activeSlipIndex) return slip;
        const updatedDeductions = slip.deductions.map((ded) => {
          if (ded.id === id) {
            return {
              ...ded,
              [field]: field === 'amount' ? Number(value) || 0 : value,
            };
          }
          return ded;
        });
        return { ...slip, deductions: updatedDeductions };
      })
    );
  };

  const addDeductionRow = () => {
    setSlips((prev) =>
      prev.map((slip, idx) => {
        if (idx !== activeSlipIndex) return slip;
        const newId = Date.now().toString();
        return {
          ...slip,
          deductions: [...slip.deductions, { id: newId, label: 'Deduction', amount: 0 }],
        };
      })
    );
  };

  const removeDeductionRow = (id: string) => {
    setSlips((prev) =>
      prev.map((slip, idx) => {
        if (idx !== activeSlipIndex) return slip;
        if (slip.deductions.length <= 1) return slip;
        return {
          ...slip,
          deductions: slip.deductions.filter((ded) => ded.id !== id),
        };
      })
    );
  };

  // Number to Words Converter (fixed with proper hundreds handling)
  const numberToWords = (num: number): string => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    if (num === 0) return 'Zero Rupees Only';
    
    const convertLessThanOneThousand = (n: number): string => {
      let str = '';
      if (n >= 100) {
        str += ones[Math.floor(n / 100)] + ' Hundred ';
        n %= 100;
      }
      if (n > 0) {
        if (n < 20) {
          str += ones[n];
        } else {
          const t = tens[Math.floor(n / 10)];
          const o = ones[n % 10];
          str += t + (o ? ' ' + o : '');
        }
      }
      return str.trim();
    };
    
    let tempNum = num;
    const parts: string[] = [];
    
    if (tempNum >= 1000000) {
      parts.push(convertLessThanOneThousand(Math.floor(tempNum / 1000000)) + ' Million');
      tempNum %= 1000000;
    }
    
    if (tempNum >= 1000) {
      parts.push(convertLessThanOneThousand(Math.floor(tempNum / 1000)) + ' Thousand');
      tempNum %= 1000;
    }
    
    if (tempNum >= 100) {
      parts.push(ones[Math.floor(tempNum / 100)] + ' Hundred');
      tempNum %= 100;
    }
    
    if (tempNum > 0) {
      parts.push(convertLessThanOneThousand(tempNum));
    }
    
    return parts.join(' ') + ' Rupees Only';
  };

  // Format date helper (outputs "Month Day, Year" e.g., "September 1, 2026")
  const formatDate = (dateStr: string): string => {
    if (!dateStr) return '';
    
    const cleanStr = dateStr.trim();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Split by dash, slash, or dot
    const parts = cleanStr.split(/[-/.]/);
    
    if (parts.length === 3) {
      // Case 1: YYYY-MM-DD or YYYY/MM/DD
      if (parts[0].length === 4) {
        const year = parseInt(parts[0], 10);
        const monthIdx = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        if (monthIdx >= 0 && monthIdx < 12 && !isNaN(day) && !isNaN(year)) {
          return `${months[monthIdx]} ${day}, ${year}`;
        }
      }
      
      // Case 2: DD/MM/YYYY or DD-MM-YYYY (Standard in Pakistan/UK)
      if (parts[2].length === 4) {
        const year = parseInt(parts[2], 10);
        let day = parseInt(parts[0], 10);
        let monthIdx = parseInt(parts[1], 10) - 1;
        
        // Safety check: if month index is invalid but day is 1-12, swap them (MM/DD/YYYY)
        if ((monthIdx < 0 || monthIdx > 11) && (day >= 1 && day <= 12)) {
          const temp = day;
          day = monthIdx + 1;
          monthIdx = temp - 1;
        }
        
        if (monthIdx >= 0 && monthIdx < 12 && !isNaN(day) && !isNaN(year)) {
          return `${months[monthIdx]} ${day}, ${year}`;
        }
      }
    }
    
    // Fallback parsing for standard date strings (e.g. "May 10, 2020")
    const date = new Date(cleanStr);
    if (isNaN(date.getTime())) return dateStr;
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  // Helper to chunk slips into groups of 3 (for A4 pages layout)
  const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  // Dynamic preview reload key
  const [dummyCount, setDummyCount] = useState(0);
  const handleRefreshPreview = () => {
    setDummyCount((prev) => prev + 1);
  };

  // PDF Download Handler (multi-page PDF)
  const handleDownloadPDF = async () => {
    const pages = document.querySelectorAll('[data-payslip-page]');
    if (pages.length === 0) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const pdf = new jsPDF('p', 'pt', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < pages.length; i++) {
        const pageElement = pages[i] as HTMLElement;
        const canvas = await html2canvas(pageElement, {
          scale: 2, // High resolution rendering
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/png');
        if (i > 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      }
      
      const fileSuffix = payslipMonth.toLowerCase().replace(/[^a-z0-9]+/g, '_');
      pdf.save(`payslips_${fileSuffix}.pdf`);
    } catch (err) {
      console.error('Error generating PDF payslip:', err);
      alert('Could not download PDF. Please try again.');
    }
  };

  // If component is not mounted, return loading container (SSR protection)
  if (!mounted) {
    return (
      <div className="container" style={{ padding: '120px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
        <h2 style={{ fontWeight: 600 }}>Loading Payslip Engine...</h2>
      </div>
    );
  }

  return (
    <main className={`${styles.pageContainer} container`}>
      {/* Hero / Header */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Salary Slip Generator – Pakistan (A4 PDF)</h1>
        <p className={styles.heroSubtitle}>
          Professional, print-ready Pakistani salary slip creator. Enter details below to see a real-time scaled A4 preview.
        </p>
      </div>

      <div className={styles.mainGrid}>
        {/* Form Controls Dashboard */}
        <div className={styles.formSide}>
          <Card hoverGlow={false}>
            {/* Slips Tabs Bar */}
            <div className={styles.tabsWrapper}>
              <div className={styles.tabsList}>
                {slips.map((slip, idx) => (
                  <button
                    key={slip.id}
                    type="button"
                    onClick={() => setActiveSlipIndex(idx)}
                    className={`${styles.tabButton} ${idx === activeSlipIndex ? styles.activeTab : ''}`}
                  >
                    {idx + 1}. {slip.employeeName || 'Untitled'}
                  </button>
                ))}
              </div>
              <div className={styles.tabActions}>
                <button
                  type="button"
                  onClick={addNewSlip}
                  className={styles.addSlipBtn}
                >
                  + Add Slip
                </button>
                {slips.length > 1 && (
                  <button
                    type="button"
                    onClick={() => deleteSlip(activeSlipIndex)}
                    className={styles.deleteSlipBtn}
                  >
                    Delete Slip
                  </button>
                )}
              </div>
            </div>

            {/* Company Details */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="2" y="10" width="20" height="12" rx="2" ry="2" />
                    <path d="M12 22V10M17 22V14M7 22V14M12 10V2l5 2-5 2" />
                  </svg>
                </span>
                Company Details
              </h3>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Company Name*</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className={styles.input}
                    placeholder="e.g. CybezLab"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Payslip Month</label>
                  <input
                    type="text"
                    value={payslipMonth}
                    onChange={(e) => setPayslipMonth(e.target.value)}
                    className={styles.input}
                    placeholder="e.g. September 2026"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Address Line 1</label>
                <input
                  type="text"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className={styles.input}
                  placeholder="Street / Office address detail"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Address Line 2 / City, Country</label>
                <input
                  type="text"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  className={styles.input}
                  placeholder="e.g. Karachi, Pakistan"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Company Logo</label>
                <div className={styles.fileInputWrapper}>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={styles.fileInputButton}
                  >
                    Choose file
                  </button>
                  <span className={styles.fileName}>{logoFileName}</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
            </div>

            {/* Employee Details */}
            <div className={styles.formSection} style={{ marginTop: '24px' }}>
              <h3 className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                Employee Details ({activeSlipIndex + 1} of {slips.length})
              </h3>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Employee Name*</label>
                  <input
                    type="text"
                    value={currentSlip?.employeeName || ''}
                    onChange={(e) => updateActiveSlip('employeeName', e.target.value)}
                    required
                    className={styles.input}
                    placeholder="Enter Employee Name"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Employee ID</label>
                  <input
                    type="text"
                    value={currentSlip?.employeeId || ''}
                    onChange={(e) => updateActiveSlip('employeeId', e.target.value)}
                    className={styles.input}
                    placeholder="e.g. 188"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>CNIC</label>
                  <input
                    type="text"
                    value={currentSlip?.cnic || ''}
                    onChange={(e) => updateActiveSlip('cnic', e.target.value)}
                    className={styles.input}
                    placeholder="e.g. 38401-5301044-9"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Designation</label>
                  <input
                    type="text"
                    value={currentSlip?.designation || ''}
                    onChange={(e) => updateActiveSlip('designation', e.target.value)}
                    className={styles.input}
                    placeholder="e.g. Internship"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Department</label>
                <input
                  type="text"
                  value={currentSlip?.department || ''}
                  onChange={(e) => updateActiveSlip('department', e.target.value)}
                  className={styles.input}
                  placeholder="e.g. SQA"
                />
              </div>
            </div>

            {/* Pay Period */}
            <div className={styles.formSection} style={{ marginTop: '24px' }}>
              <h3 className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </span>
                Pay Period
              </h3>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Period From</label>
                  <input
                    type="text"
                    value={currentSlip?.periodFrom || ''}
                    onChange={(e) => updateActiveSlip('periodFrom', e.target.value)}
                    placeholder="e.g. 01/09/2026"
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Period To</label>
                  <input
                    type="text"
                    value={currentSlip?.periodTo || ''}
                    onChange={(e) => updateActiveSlip('periodTo', e.target.value)}
                    placeholder="e.g. 30/09/2026"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Pay Date</label>
                  <input
                    type="text"
                    value={currentSlip?.payDate || ''}
                    onChange={(e) => updateActiveSlip('payDate', e.target.value)}
                    placeholder="e.g. 30/09/2026"
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Paid Days</label>
                  <input
                    type="number"
                    value={currentSlip?.paidDays ?? 30}
                    onChange={(e) => updateActiveSlip('paidDays', Number(e.target.value) || 0)}
                    className={styles.input}
                    min="0"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>LOP (Loss of Pay) Days</label>
                <input
                  type="number"
                  value={currentSlip?.lopDays ?? 0}
                  onChange={(e) => updateActiveSlip('lopDays', Number(e.target.value) || 0)}
                  className={styles.input}
                  min="0"
                />
              </div>
            </div>

            {/* Income & Deductions */}
            <div className={styles.formSection} style={{ marginTop: '24px' }}>
              <h3 className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </span>
                Income & Deductions Details
              </h3>
              <div className={styles.incomeGrid}>
                {/* Earnings List */}
                <div className={styles.formGroup}>
                  <label className={styles.label} style={{ marginBottom: '8px' }}>Earnings</label>
                  <div className={styles.rowList}>
                    {(currentSlip?.earnings || []).map((earn) => (
                      <div key={earn.id} className={styles.dynamicRow}>
                        <input
                          type="text"
                          value={earn.label}
                          onChange={(e) => handleEarningChange(earn.id, 'label', e.target.value)}
                          className={styles.input}
                          placeholder="Label"
                        />
                        <input
                          type="number"
                          value={earn.amount === 0 ? '' : earn.amount}
                          onChange={(e) => handleEarningChange(earn.id, 'amount', e.target.value)}
                          className={`${styles.input} ${styles.amountInput}`}
                          placeholder="Amount"
                          min="0"
                        />
                        <button
                          type="button"
                          onClick={() => removeEarningRow(earn.id)}
                          className={styles.deleteRowBtn}
                          title="Remove row"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={addEarningRow} className={styles.addRowBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Earning
                  </button>
                </div>

                {/* Deductions List */}
                <div className={styles.formGroup}>
                  <label className={styles.label} style={{ marginBottom: '8px' }}>Deductions</label>
                  <div className={styles.rowList}>
                    {(currentSlip?.deductions || []).map((ded) => (
                      <div key={ded.id} className={styles.dynamicRow}>
                        <input
                          type="text"
                          value={ded.label}
                          onChange={(e) => handleDeductionChange(ded.id, 'label', e.target.value)}
                          className={styles.input}
                          placeholder="Label"
                        />
                        <input
                          type="number"
                          value={ded.amount === 0 ? '' : ded.amount}
                          onChange={(e) => handleDeductionChange(ded.id, 'amount', e.target.value)}
                          className={`${styles.input} ${styles.amountInput}`}
                          placeholder="Amount"
                          min="0"
                        />
                        <button
                          type="button"
                          onClick={() => removeDeductionRow(ded.id)}
                          className={styles.deleteRowBtn}
                          title="Remove row"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={addDeductionRow} className={styles.addRowBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Deduction
                  </button>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className={styles.actionRow}>
              <Button variant="secondary" onClick={handleRefreshPreview}>
                Refresh Preview
              </Button>
              <Button onClick={handleDownloadPDF}>
                Download All Slips (PDF)
              </Button>
            </div>
          </Card>
        </div>

        {/* Sticky viewport for live A4 document preview */}
        <div className={styles.previewSide}>
          <h3 className={styles.previewTitle}>
            <span className={styles.previewIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
            Live A4 PDF Preview
          </h3>

          <div ref={containerRef} className={styles.previewSheetContainer} style={{ flexDirection: 'column', gap: '24px' }}>
            {chunkArray(slips, 3).map((pageSlips, pageIdx) => {
              const pageId = `payslip-page-${pageIdx}`;
              return (
                <div 
                  key={pageIdx}
                  className={styles.previewSheetWrapper}
                  style={{
                    width: `${794 * scale}px`,
                    height: `${1123 * scale}px`,
                    marginBottom: pageIdx < Math.ceil(slips.length / 3) - 1 ? `${24 * scale}px` : 0
                  }}
                >
                  <div 
                    id={pageId}
                    data-payslip-page
                    className={styles.previewSheet} 
                    key={`${pageIdx}-${dummyCount}`}
                    style={{
                      transform: `scale(${scale})`,
                      transformOrigin: 'top left',
                    }}
                  >
                    {pageSlips.map((slip, index) => {
                      const { totalEarnings, totalDeductions, netSalary } = getSlipSummary(slip);
                      return (
                        <div key={slip.id} className={styles.singleSlip}>
                          {/* Header Compact */}
                          <div className={styles.slipHeaderCompact}>
                            {!logoError ? (
                              <img
                                src={logoImage}
                                alt="Company Logo"
                                className={styles.logoCompact}
                                onError={() => setLogoError(true)}
                              />
                            ) : (
                              <div className={styles.logoFallbackCompact}>
                                {companyName.toUpperCase()}
                              </div>
                            )}
                            <div className={styles.companyInfoCompact}>
                              <div className={styles.companyNameCompact}>{companyName}</div>
                            </div>
                            <div className={styles.slipTitleCompact}>Salary Slip - {payslipMonth}</div>
                          </div>

                          {/* Meta details Compact */}
                          <div className={styles.metaGridCompact}>
                            {/* Col 1 */}
                            <div className={styles.metaBlockCompact}>
                              <div className={styles.blockTitleCompact}>Employee Details</div>
                              <div className={styles.detailTable}>
                                <div className={styles.detailRowCompact}>
                                  <span className={styles.detailLabel}>ID / Name:</span>
                                  <span className={styles.detailValue}>{slip.employeeId || 'N/A'} - {slip.employeeName || 'N/A'}</span>
                                </div>
                                <div className={styles.detailRowCompact}>
                                  <span className={styles.detailLabel}>CNIC:</span>
                                  <span className={styles.detailValue}>{slip.cnic || 'N/A'}</span>
                                </div>
                              </div>
                            </div>

                            {/* Col 2 */}
                            <div className={styles.metaBlockCompact}>
                              <div className={styles.blockTitleCompact}>Job Details</div>
                              <div className={styles.detailTable}>
                                <div className={styles.detailRowCompact}>
                                  <span className={styles.detailLabel}>Designation:</span>
                                  <span className={styles.detailValue}>{slip.designation || 'N/A'}</span>
                                </div>
                                <div className={styles.detailRowCompact}>
                                  <span className={styles.detailLabel}>Department:</span>
                                  <span className={styles.detailValue}>{slip.department || 'N/A'}</span>
                                </div>
                              </div>
                            </div>

                            {/* Col 3 */}
                            <div className={styles.metaBlockCompact}>
                              <div className={styles.blockTitleCompact}>Period & Days</div>
                              <div className={styles.detailTable}>
                                <div className={styles.detailRowCompact}>
                                  <span className={styles.detailLabel}>From/To:</span>
                                  <span className={styles.detailValue}>{formatDate(slip.periodFrom)} - {formatDate(slip.periodTo)}</span>
                                </div>
                                <div className={styles.detailRowCompact}>
                                  <span className={styles.detailLabel}>Paid/LOP:</span>
                                  <span className={styles.detailValue}>{slip.paidDays} / {slip.lopDays} Days</span>
                                </div>
                                <div className={styles.detailRowCompact}>
                                  <span className={styles.detailLabel}>Pay Date:</span>
                                  <span className={styles.detailValue}>{formatDate(slip.payDate) || 'N/A'}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Breakdown Compact */}
                          <div className={styles.breakdownCompact}>
                            <div className={styles.earningsCol}>
                              <div className={styles.colHeaderCompact}>
                                <span>Earnings</span>
                                <span>Amount (Rs.)</span>
                              </div>
                              <div className={styles.colRowsCompact}>
                                {slip.earnings.map((earn) => (
                                  <div key={earn.id} className={styles.breakdownRowCompact}>
                                    <span className={styles.breakdownLabel}>{earn.label}</span>
                                    <span className={styles.breakdownValue}>
                                      {earn.amount.toLocaleString()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <div className={styles.colHeaderCompact}>
                                <span>Deductions</span>
                                <span>Amount (Rs.)</span>
                              </div>
                              <div className={styles.colRowsCompact}>
                                {slip.deductions.map((ded) => (
                                  <div key={ded.id} className={styles.breakdownRowCompact}>
                                    <span className={styles.breakdownLabel}>{ded.label}</span>
                                    <span className={styles.breakdownValue}>
                                      {ded.amount.toLocaleString()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Summary Compact */}
                          <div className={styles.summaryRowCompact}>
                            <div className={styles.summaryColCompact}>
                              <span>Total Earnings:</span>
                              <span>Rs. {totalEarnings.toLocaleString()}</span>
                            </div>
                            <div className={styles.summaryColCompact}>
                              <span>Total Deductions:</span>
                              <span>Rs. {totalDeductions.toLocaleString()}</span>
                            </div>
                          </div>

                          {/* Net Salary Banner Compact */}
                          <div className={styles.netSalaryBannerCompact}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '75%' }}>
                              <span className={styles.netLabelCompact}>Net Salary Paid (in words):</span>
                              <span className={styles.netWordsCompact}>{numberToWords(netSalary)}</span>
                            </div>
                            <div className={styles.netValueCompact}>
                              Rs. {netSalary.toLocaleString()}
                            </div>
                          </div>

                          {/* Signatures Compact */}
                          <div className={styles.signatureSectionCompact}>
                            <div className={styles.sigBlockCompact}>
                              <div className={styles.sigLineCompact} />
                              <span className={styles.sigLabelCompact}>Employee Signature</span>
                            </div>
                            <div className={styles.sigBlockCompact}>
                              <div className={styles.sigLineCompact} />
                              <span className={styles.sigLabelCompact}>Authorized Stamp & Sign</span>
                            </div>
                          </div>

                          {/* Cut Line */}
                          {index < pageSlips.length - 1 && <div className={styles.cutLine} />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
