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

export default function SalarySlipGenerator() {
  const [companyName, setCompanyName] = useState('CybezLab');
  const [payslipMonth, setPayslipMonth] = useState('September 2026');
  const [addressLine1, setAddressLine1] = useState('Suite 305, 3rd Floor, Business Avenue Building, Main Shahrah-e-Faisal, PECHS Block 6');
  const [addressLine2, setAddressLine2] = useState('Karachi, Pakistan');
  const [logoImage, setLogoImage] = useState('/assets/cybezlab-logo.png');
  const [logoFileName, setLogoFileName] = useState('cybezlab-logo.png');

  const [employeeName, setEmployeeName] = useState('Muhammad Mooen');
  const [employeeId, setEmployeeId] = useState('188');
  const [cnic, setCnic] = useState('38401-5301044-9');
  const [designation, setDesignation] = useState('Internship');
  const [department, setDepartment] = useState('SQA');

  const [periodFrom, setPeriodFrom] = useState('2026-09-01');
  const [periodTo, setPeriodTo] = useState('2026-09-30');
  const [payDate, setPayDate] = useState('2026-09-30');
  const [paidDays, setPaidDays] = useState(30);
  const [lopDays, setLopDays] = useState(0);

  const [earnings, setEarnings] = useState<BreakupItem[]>([
    { id: '1', label: 'Basic Pay', amount: 20000 },
    { id: '2', label: 'House Rent Allowance', amount: 5000 },
    { id: '3', label: 'Medical Allowance', amount: 2000 },
  ]);

  const [deductions, setDeductions] = useState<BreakupItem[]>([
    { id: '1', label: 'Party Fund', amount: 1200 },
    { id: '2', label: 'Income Tax', amount: 500 },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Live calculated fields
  const totalEarnings = earnings.reduce((sum, item) => sum + (item.amount || 0), 0);
  const totalDeductions = deductions.reduce((sum, item) => sum + (item.amount || 0), 0);
  const netSalary = Math.max(0, totalEarnings - totalDeductions);

  // Logo upload change handler
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogoImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Dynamic earnings rows handlers
  const handleEarningChange = (id: string, field: 'label' | 'amount', value: string | number) => {
    setEarnings((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [field]: field === 'amount' ? Number(value) || 0 : value,
          };
        }
        return item;
      })
    );
  };

  const addEarningRow = () => {
    const newId = (earnings.length + 1).toString();
    setEarnings((prev) => [...prev, { id: newId, label: 'Allowance', amount: 0 }]);
  };

  const removeEarningRow = (id: string) => {
    if (earnings.length > 1) {
      setEarnings((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Dynamic deductions rows handlers
  const handleDeductionChange = (id: string, field: 'label' | 'amount', value: string | number) => {
    setDeductions((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [field]: field === 'amount' ? Number(value) || 0 : value,
          };
        }
        return item;
      })
    );
  };

  const addDeductionRow = () => {
    const newId = (deductions.length + 1).toString();
    setDeductions((prev) => [...prev, { id: newId, label: 'Deduction', amount: 0 }]);
  };

  const removeDeductionRow = (id: string) => {
    if (deductions.length > 1) {
      setDeductions((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Number to Words converter (Pakistani Rupees formatting)
  const numberToWords = (num: number): string => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    if (num === 0) return 'Zero Rupees Only';
    
    const convertLessThanOneThousand = (n: number): string => {
      if (n < 20) return ones[n];
      const t = tens[Math.floor(n / 10)];
      const o = ones[n % 10];
      return t + (o ? ' ' + o : '');
    };
    
    let tempNum = num;
    const parts: string[] = [];
    
    // Millions / Lacs (using standard million for generic system, but readable)
    if (tempNum >= 1000000) {
      parts.push(convertLessThanOneThousand(Math.floor(tempNum / 1000000)) + ' Million');
      tempNum %= 1000000;
    }
    
    // Thousands
    if (tempNum >= 1000) {
      parts.push(convertLessThanOneThousand(Math.floor(tempNum / 1000)) + ' Thousand');
      tempNum %= 1000;
    }
    
    // Hundreds
    if (tempNum >= 100) {
      parts.push(ones[Math.floor(tempNum / 100)] + ' Hundred');
      tempNum %= 100;
    }
    
    // Tens & Ones
    if (tempNum > 0) {
      parts.push(convertLessThanOneThousand(tempNum));
    }
    
    return parts.join(' ') + ' Rupees Only';
  };

  // Format date helper (YYYY-MM-DD to DD/MM/YYYY)
  const formatDate = (dateStr: string): string => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Force preview redraw (dummy state update triggers UI refresh)
  const [dummyCount, setDummyCount] = useState(0);
  const handleRefreshPreview = () => {
    setDummyCount((prev) => prev + 1);
  };

  // PDF Export logic using jspdf + html2canvas
  const handleDownloadPDF = async () => {
    const element = document.getElementById('payslip-sheet');
    if (!element) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(element, {
        scale: 2, // High DPI capture for crisp PDF output
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      const fileSuffix = payslipMonth.toLowerCase().replace(/[^a-z0-9]+/g, '_');
      const nameSuffix = employeeName.toLowerCase().replace(/[^a-z0-9]+/g, '_');
      pdf.save(`payslip_${nameSuffix}_${fileSuffix}.pdf`);
    } catch (err) {
      console.error('Error generating PDF payslip:', err);
      alert('Could not download PDF. Please try again.');
    }
  };

  return (
    <main className={`${styles.pageContainer} container`}>
      {/* Page Header */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Salary Slip Generator – Pakistan (A4 PDF)</h1>
        <p className={styles.heroSubtitle}>
          Professional salary slip with custom logo, CNIC, and dynamic earnings & deductions list.
        </p>
      </div>

      <div className={styles.mainGrid}>
        {/* Form Controls */}
        <div className={styles.formSide}>
          <Card hoverGlow={false}>
            {/* Company Details */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionHeader}>Company Details</h3>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Company Name*</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className={styles.input}
                    placeholder="Enter company name"
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

              <div className={styles.formGroup} style={{ marginBottom: '16px' }}>
                <label className={styles.label}>Address Line 1</label>
                <input
                  type="text"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className={styles.input}
                  placeholder="Address Line 1"
                />
              </div>

              <div className={styles.formGroup} style={{ marginBottom: '16px' }}>
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
              <h3 className={styles.sectionHeader}>Employee Details</h3>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Employee Name*</label>
                  <input
                    type="text"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    required
                    className={styles.input}
                    placeholder="Employee Name"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Employee ID</label>
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className={styles.input}
                    placeholder="Employee ID"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>CNIC</label>
                  <input
                    type="text"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    className={styles.input}
                    placeholder="e.g. 38401-5301044-9"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Designation</label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className={styles.input}
                    placeholder="Designation"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className={styles.input}
                  placeholder="Department"
                />
              </div>
            </div>

            {/* Pay Period */}
            <div className={styles.formSection} style={{ marginTop: '24px' }}>
              <h3 className={styles.sectionHeader}>Pay Period</h3>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Period From</label>
                  <input
                    type="date"
                    value={periodFrom}
                    onChange={(e) => setPeriodFrom(e.target.value)}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Period To</label>
                  <input
                    type="date"
                    value={periodTo}
                    onChange={(e) => setPeriodTo(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Pay Date</label>
                  <input
                    type="date"
                    value={payDate}
                    onChange={(e) => setPayDate(e.target.value)}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Paid Days</label>
                  <input
                    type="number"
                    value={paidDays}
                    onChange={(e) => setPaidDays(Number(e.target.value) || 0)}
                    className={styles.input}
                    min="0"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>LOP (Loss of Pay) Days</label>
                <input
                  type="number"
                  value={lopDays}
                  onChange={(e) => setLopDays(Number(e.target.value) || 0)}
                  className={styles.input}
                  min="0"
                />
              </div>
            </div>

            {/* Income details (dynamic columns) */}
            <div className={styles.formSection} style={{ marginTop: '24px' }}>
              <h3 className={styles.sectionHeader}>Income Details</h3>
              <div className={styles.incomeGrid}>
                {/* Earnings List */}
                <div className={styles.formGroup}>
                  <label className={styles.label} style={{ marginBottom: '8px' }}>Earnings</label>
                  <div className={styles.rowList}>
                    {earnings.map((earn) => (
                      <div key={earn.id} className={styles.dynamicRow}>
                        <input
                          type="text"
                          value={earn.label}
                          onChange={(e) => handleEarningChange(earn.id, 'label', e.target.value)}
                          className={styles.input}
                          placeholder="Earning label"
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
                          title="Delete row"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={addEarningRow} className={styles.addRowBtn}>
                    + Add Earnings Row
                  </button>
                </div>

                {/* Deductions List */}
                <div className={styles.formGroup}>
                  <label className={styles.label} style={{ marginBottom: '8px' }}>Deductions</label>
                  <div className={styles.rowList}>
                    {deductions.map((ded) => (
                      <div key={ded.id} className={styles.dynamicRow}>
                        <input
                          type="text"
                          value={ded.label}
                          onChange={(e) => handleDeductionChange(ded.id, 'label', e.target.value)}
                          className={styles.input}
                          placeholder="Deduction label"
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
                          title="Delete row"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={addDeductionRow} className={styles.addRowBtn}>
                    + Add Deduction Row
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className={styles.actionRow}>
              <Button variant="secondary" onClick={handleRefreshPreview}>
                Refresh Preview
              </Button>
              <Button onClick={handleDownloadPDF}>
                Download Payslip (PDF)
              </Button>
            </div>
          </Card>
        </div>

        {/* Live A4 Preview Side */}
        <div className={styles.previewSide}>
          <h3 className={styles.previewTitle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Live A4 PDF Preview
          </h3>
          <div className={styles.previewSheetContainer}>
            {/* The Print Sheet captured by html2canvas */}
            <div id="payslip-sheet" className={styles.previewSheet} key={dummyCount}>
              {/* Slip Top Header */}
              <div>
                <div className={styles.slipHeader}>
                  <img
                    src={logoImage}
                    alt="Company Logo"
                    className={styles.logoPlaceholder}
                    onError={(e) => {
                      // fallback to standard logo if current logo image link fails
                      (e.target as HTMLImageElement).src = '/assets/cybezlab-logo.png';
                    }}
                  />
                  <div className={styles.companyInfo}>
                    <div className={styles.companyNameHeader}>{companyName}</div>
                    <div className={styles.companyAddressHeader}>
                      {addressLine1}
                      {addressLine2 && `\n${addressLine2}`}
                    </div>
                  </div>
                </div>

                {/* Slip Title */}
                <div className={styles.slipTitleContainer}>
                  <div className={styles.slipTitle}>Salary Slip - {payslipMonth}</div>
                </div>

                {/* Metadata block (Employee and Pay details) */}
                <div className={styles.metaGrid}>
                  {/* Employee Block */}
                  <div className={styles.metaBlock}>
                    <div className={styles.blockTitle}>Employee Details</div>
                    <div className={styles.detailTable}>
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Employee ID:</span>
                        <span className={styles.detailValue}>{employeeId || 'N/A'}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Employee Name:</span>
                        <span className={styles.detailValue}>{employeeName || 'N/A'}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>CNIC:</span>
                        <span className={styles.detailValue}>{cnic || 'N/A'}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Designation:</span>
                        <span className={styles.detailValue}>{designation || 'N/A'}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Department:</span>
                        <span className={styles.detailValue}>{department || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pay Period Block */}
                  <div className={styles.metaBlock}>
                    <div className={styles.blockTitle}>Pay & Period Details</div>
                    <div className={styles.detailTable}>
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Period From:</span>
                        <span className={styles.detailValue}>{formatDate(periodFrom) || 'N/A'}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Period To:</span>
                        <span className={styles.detailValue}>{formatDate(periodTo) || 'N/A'}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Pay Date:</span>
                        <span className={styles.detailValue}>{formatDate(payDate) || 'N/A'}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Paid Days:</span>
                        <span className={styles.detailValue}>{paidDays}</span>
                      </div>
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>LOP Days:</span>
                        <span className={styles.detailValue}>{lopDays}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Earnings & Deductions Tables */}
                <div className={styles.breakdownContainer}>
                  {/* Earnings column */}
                  <div className={styles.earningsCol}>
                    <div className={styles.colHeader}>
                      <span>Earnings Description</span>
                      <span>Amount (Rs.)</span>
                    </div>
                    <div className={styles.colRows}>
                      {earnings.map((earn) => (
                        <div key={earn.id} className={styles.breakdownRow}>
                          <span className={styles.breakdownLabel}>{earn.label}</span>
                          <span className={styles.breakdownValue}>
                            {earn.amount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deductions column */}
                  <div>
                    <div className={styles.colHeader}>
                      <span>Deductions Description</span>
                      <span>Amount (Rs.)</span>
                    </div>
                    <div className={styles.colRows}>
                      {deductions.map((ded) => (
                        <div key={ded.id} className={styles.breakdownRow}>
                          <span className={styles.breakdownLabel}>{ded.label}</span>
                          <span className={styles.breakdownValue}>
                            {ded.amount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Summary Row */}
                <div className={styles.summaryRow}>
                  <div className={styles.summaryCol}>
                    <span>Total Earnings:</span>
                    <span>Rs. {totalEarnings.toLocaleString()}</span>
                  </div>
                  <div className={styles.summaryCol}>
                    <span>Total Deductions:</span>
                    <span>Rs. {totalDeductions.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div>
                {/* Net Salary Banner */}
                <div className={styles.netSalaryBanner}>
                  <div className={styles.netLabelBlock}>
                    <span className={styles.netLabel}>Net Salary Paid:</span>
                    <span className={styles.netWords}>{numberToWords(netSalary)}</span>
                  </div>
                  <div className={styles.netValue}>
                    Rs. {netSalary.toLocaleString()}
                  </div>
                </div>

                {/* Signatures */}
                <div className={styles.signatureSection}>
                  <div className={styles.sigBlock}>
                    <div className={styles.sigLine} />
                    <span className={styles.sigLabel}>Employee Signature</span>
                  </div>
                  <div className={styles.sigBlock}>
                    <div className={styles.sigLine} />
                    <span className={styles.sigLabel}>Director Signature / Stamp</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
