/**
 * PRAGYA — Parent Progress Report Email Template
 * 
 * Generates clean, responsive HTML email compatible with Gmail, Outlook, Apple Mail, etc.
 * Uses inline styling and tables for bulletproof cross-client email rendering.
 */

import React from 'react';

import { ParentReportData } from '@/lib/report-builder';

interface ParentReportEmailProps {
  report: ParentReportData;
}

export function ParentReportEmail({ report }: ParentReportEmailProps) {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '24px', backgroundColor: '#f8fafc', color: '#1e293b' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '28px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        <div style={{ textAlign: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '20px', marginBottom: '24px' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6366f1' }}>
            NIPUN Bharat FLN Initiative
          </span>
          <h1 style={{ fontSize: '22px', fontWeight: '900', color: '#0f172a', margin: '8px 0 4px' }}>
            PRAGYA Learning Progress Report
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Foundational Mathematics • 2-Digit Subtraction with Regrouping
          </p>
        </div>

        {/* Student Profile Card */}
        <div style={{ backgroundColor: '#f1f5f9', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '6px 8px', fontSize: '12px', color: '#64748b' }}>Student Name:</td>
                <td style={{ padding: '6px 8px', fontSize: '14px', fontWeight: 'bold', color: '#0f172a' }}>{report.studentName}</td>
                <td style={{ padding: '6px 8px', fontSize: '12px', color: '#64748b' }}>Roll Number:</td>
                <td style={{ padding: '6px 8px', fontSize: '14px', fontWeight: 'bold', color: '#0f172a' }}>#{report.rollNumber}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 8px', fontSize: '12px', color: '#64748b' }}>Class & Section:</td>
                <td style={{ padding: '6px 8px', fontSize: '14px', fontWeight: 'bold', color: '#0f172a' }}>{report.className}</td>
                <td style={{ padding: '6px 8px', fontSize: '12px', color: '#64748b' }}>Date:</td>
                <td style={{ padding: '6px 8px', fontSize: '13px', color: '#334155' }}>{report.date}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Learning Focus Area */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>
            Target Learning Focus
          </h2>
          <div style={{ backgroundColor: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: '10px', padding: '14px' }}>
            <strong style={{ fontSize: '14px', color: '#4338ca', display: 'block', marginBottom: '4px' }}>
              {report.learningArea}
            </strong>
            <p style={{ fontSize: '13px', color: '#334155', margin: 0, lineHeight: '1.5' }}>
              {report.learningAreaDescription}
            </p>
          </div>
        </div>

        {/* Progress Comparison Table */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', color: '#0f172a', marginBottom: '12px' }}>
            Performance Growth & Follow-up Measurement
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '10px', fontSize: '12px', textAlign: 'left', color: '#64748b' }}>Assessment Stage</th>
                <th style={{ padding: '10px', fontSize: '12px', textAlign: 'center', color: '#64748b' }}>Raw Score</th>
                <th style={{ padding: '10px', fontSize: '12px', textAlign: 'center', color: '#64748b' }}>Accuracy</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 10px', fontSize: '13px', fontWeight: '600', color: '#334155' }}>
                  1. Baseline Assessment
                </td>
                <td style={{ padding: '12px 10px', fontSize: '14px', fontWeight: 'bold', textAlign: 'center', color: '#0f172a', fontFamily: 'monospace' }}>
                  {report.beforeScore}
                </td>
                <td style={{ padding: '12px 10px', fontSize: '13px', textAlign: 'center', color: '#64748b', fontWeight: '600' }}>
                  {report.beforePercentage}%
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px 10px', fontSize: '13px', fontWeight: '600', color: '#059669' }}>
                  2. Post-Intervention Reassessment
                </td>
                <td style={{ padding: '12px 10px', fontSize: '14px', fontWeight: 'bold', textAlign: 'center', color: '#059669', fontFamily: 'monospace' }}>
                  {report.afterScore}
                </td>
                <td style={{ padding: '12px 10px', fontSize: '13px', textAlign: 'center', color: '#059669', fontWeight: 'bold' }}>
                  {report.hasReassessment ? `${report.afterPercentage}%` : 'Pending'}
                </td>
              </tr>
            </tbody>
          </table>

          {report.hasReassessment && report.improvementPoints > 0 && (
            <div style={{ marginTop: '12px', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '10px', padding: '12px 16px', textAlign: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#047857' }}>
                🎉 Net Improvement: +{report.improvementPoints} Percentage Points
              </span>
              {report.isMastered && (
                <span style={{ display: 'block', fontSize: '12px', color: '#065f46', marginTop: '2px' }}>
                  Student successfully demonstrated complete mastery of two-digit subtraction with regrouping!
                </span>
              )}
            </div>
          )}
        </div>

        {/* Classroom Intervention Activity */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>
            Classroom Intervention Completed
          </h2>
          <div style={{ backgroundColor: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '10px', padding: '14px' }}>
            <strong style={{ fontSize: '13px', color: '#6b21a8', display: 'block', marginBottom: '3px' }}>
              {report.activityName}
            </strong>
            <p style={{ fontSize: '12px', color: '#4b5563', margin: 0, lineHeight: '1.4' }}>
              {report.activityObjective}
            </p>
          </div>
        </div>

        {/* Recommended Practice for Parents */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>
            Recommended Home Practice
          </h2>
          <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '14px' }}>
            <p style={{ fontSize: '13px', color: '#92400e', margin: 0, lineHeight: '1.5' }}>
              {report.recommendedPractice}
            </p>
          </div>
        </div>

        {/* Teacher Context Footer */}
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', textAlign: 'center', fontSize: '11px', color: '#94a3b8' }}>
          <p style={{ margin: '0 0 4px', fontWeight: 'bold', color: '#64748b' }}>
            {report.teacherName} • {report.className}
          </p>
          <p style={{ margin: 0 }}>
            {report.schoolContext}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Generates bulletproof HTML string for Resend email sending.
 */
export function renderParentReportHtml(report: ParentReportData): string {
  const masteryBadge = report.isMastered
    ? '<div style="margin-top:6px;font-size:12px;color:#065f46;font-weight:600;">✓ Mastered: Student answered all follow-up questions accurately.</div>'
    : '';

  const improvementBadge = report.hasReassessment && report.improvementPoints > 0
    ? `
      <div style="margin-top:12px;background-color:#ecfdf5;border:1px solid #a7f3d0;border-radius:10px;padding:12px 16px;text-align:center;">
        <span style="font-size:15px;font-weight:900;color:#047857;">
          🎉 Net Improvement: +${report.improvementPoints} Percentage Points
        </span>
        ${masteryBadge}
      </div>
    `
    : `
      <div style="margin-top:12px;background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:10px 14px;text-align:center;font-size:12px;color:#64748b;">
        Baseline assessment recorded. Follow-up practice in progress.
      </div>
    `;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PRAGYA Learning Progress Report — ${escapeHtml(report.studentName)}</title>
</head>
<body style="margin:0;padding:24px;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">
  <div style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.05);">
    
    <!-- Top Indigo Header Bar -->
    <div style="background:linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);padding:28px 24px;text-align:center;color:#ffffff;">
      <span style="display:inline-block;font-size:11px;font-weight:800;letter-spacing:1px;text-transform:uppercase;background-color:rgba(255,255,255,0.2);padding:4px 10px;border-radius:20px;margin-bottom:8px;">
        FLN NIPUN BHARAT INITIATIVE
      </span>
      <h1 style="margin:6px 0 4px;font-size:24px;font-weight:900;letter-spacing:-0.5px;">
        PRAGYA Learning Progress Report
      </h1>
      <p style="margin:0;font-size:13px;opacity:0.9;">
        Foundational Mathematics • Grade 3 Subtraction Diagnostic
      </p>
    </div>

    <!-- Main Content Container -->
    <div style="padding:28px 24px;">

      <!-- Student Profile Card -->
      <table style="width:100%;border-collapse:collapse;background-color:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;margin-bottom:24px;">
        <tr>
          <td style="padding:12px 16px;width:50%;border-bottom:1px solid #e2e8f0;">
            <div style="font-size:11px;text-transform:uppercase;color:#64748b;font-weight:700;">Student Name</div>
            <div style="font-size:16px;font-weight:800;color:#0f172a;margin-top:2px;">${escapeHtml(report.studentName)}</div>
          </td>
          <td style="padding:12px 16px;width:50%;border-bottom:1px solid #e2e8f0;">
            <div style="font-size:11px;text-transform:uppercase;color:#64748b;font-weight:700;">Roll Number</div>
            <div style="font-size:16px;font-weight:800;color:#0f172a;margin-top:2px;">#${report.rollNumber}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 16px;">
            <div style="font-size:11px;text-transform:uppercase;color:#64748b;font-weight:700;">Class & Section</div>
            <div style="font-size:14px;font-weight:700;color:#334155;margin-top:2px;">${escapeHtml(report.className)}</div>
          </td>
          <td style="padding:12px 16px;">
            <div style="font-size:11px;text-transform:uppercase;color:#64748b;font-weight:700;">Report Date</div>
            <div style="font-size:13px;font-weight:600;color:#334155;margin-top:2px;">${escapeHtml(report.date)}</div>
          </td>
        </tr>
      </table>

      <!-- Learning Focus Area -->
      <div style="margin-bottom:24px;">
        <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:#475569;margin:0 0 8px;font-weight:800;">
          Target Learning Focus
        </h2>
        <div style="background-color:#eef2ff;border-left:4px solid #4f46e5;border-radius:4px 8px 8px 4px;padding:14px 16px;">
          <div style="font-size:15px;font-weight:800;color:#3730a3;margin-bottom:4px;">
            ${escapeHtml(report.learningArea)}
          </div>
          <div style="font-size:13px;color:#334155;line-height:1.5;">
            ${escapeHtml(report.learningAreaDescription)}
          </div>
        </div>
      </div>

      <!-- Verified Progress Comparison -->
      <div style="margin-bottom:24px;">
        <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:#475569;margin:0 0 8px;font-weight:800;">
          Verified Performance Comparison
        </h2>
        <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
          <tr style="background-color:#f8fafc;border-bottom:1px solid #e2e8f0;">
            <th style="padding:10px 14px;text-align:left;font-size:11px;color:#64748b;text-transform:uppercase;">Stage</th>
            <th style="padding:10px 14px;text-align:center;font-size:11px;color:#64748b;text-transform:uppercase;">Score</th>
            <th style="padding:10px 14px;text-align:center;font-size:11px;color:#64748b;text-transform:uppercase;">Accuracy</th>
          </tr>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:12px 14px;font-size:13px;color:#334155;font-weight:600;">1. Baseline Assessment</td>
            <td style="padding:12px 14px;font-size:15px;color:#0f172a;font-weight:800;text-align:center;font-family:monospace;">${escapeHtml(report.beforeScore)}</td>
            <td style="padding:12px 14px;font-size:13px;color:#64748b;text-align:center;font-weight:600;">${report.beforePercentage}%</td>
          </tr>
          <tr>
            <td style="padding:12px 14px;font-size:13px;color:#059669;font-weight:700;">2. Reassessment Post-Intervention</td>
            <td style="padding:12px 14px;font-size:15px;color:#059669;font-weight:800;text-align:center;font-family:monospace;">${escapeHtml(report.afterScore)}</td>
            <td style="padding:12px 14px;font-size:13px;color:#059669;text-align:center;font-weight:800;">${report.hasReassessment ? `${report.afterPercentage}%` : 'Pending'}</td>
          </tr>
        </table>
        ${improvementBadge}
      </div>

      <!-- Classroom Remedial Activity -->
      <div style="margin-bottom:24px;">
        <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:#475569;margin:0 0 8px;font-weight:800;">
          Classroom Remedial Activity Completed
        </h2>
        <div style="background-color:#faf5ff;border:1px solid #e9d5ff;border-radius:10px;padding:14px 16px;">
          <div style="font-size:14px;font-weight:800;color:#6b21a8;margin-bottom:4px;">
            ${escapeHtml(report.activityName)}
          </div>
          <div style="font-size:12px;color:#4b5563;line-height:1.4;">
            ${escapeHtml(report.activityObjective)}
          </div>
        </div>
      </div>

      <!-- Recommended Practice at Home -->
      <div style="margin-bottom:24px;">
        <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:#475569;margin:0 0 8px;font-weight:800;">
          Recommended Practice at Home
        </h2>
        <div style="background-color:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 16px;">
          <div style="font-size:13px;color:#92400e;line-height:1.5;">
            ${escapeHtml(report.recommendedPractice)}
          </div>
        </div>
      </div>

      <!-- Footer Info -->
      <div style="border-top:1px solid #e2e8f0;padding-top:16px;text-align:center;">
        <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#334155;">
          ${escapeHtml(report.teacherName)}
        </p>
        <p style="margin:0;font-size:11px;color:#94a3b8;">
          ${escapeHtml(report.schoolContext)} • Generated via PRAGYA FLN Diagnostic Assistant
        </p>
      </div>

    </div>
  </div>
</body>
</html>
  `.trim();
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
