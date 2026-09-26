import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { renderParentReportHtml } from '@/components/reports/ParentReportEmail';
import { validateReportRequest } from '@/lib/report-builder';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Strict validation of payload, student, email, and progress rules
    const validation = validateReportRequest(body);
    if (!validation.valid || !validation.data) {
      return NextResponse.json(
        { success: false, error: validation.error || 'Invalid report request payload.' },
        { status: 400 }
      );
    }

    const { parentEmail, reportData } = validation.data;

    // 2. Verify server-side Resend API Key
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.trim() === '') {
      return NextResponse.json(
        {
          success: false,
          error: 'Resend API key is not configured on the server. Please set RESEND_API_KEY in .env.local.',
        },
        { status: 500 }
      );
    }

    // 3. Initialize Resend client (server-side only)
    const resend = new Resend(apiKey);

    // 4. Generate clean, responsive HTML email
    const emailHtml = renderParentReportHtml(reportData);

    // 5. Send email via Resend
    // By default, Resend testing accounts use onboarding@resend.dev as the verified sender
    const fromAddress =
      process.env.RESEND_FROM_EMAIL || 'PRAGYA FLN Assistant <onboarding@resend.dev>';

    // 5. Send email via Resend
    let messageId: string | undefined;

    if (apiKey.startsWith('re_demo_') || apiKey === 're_test') {
      // Sandbox mode for local testing without live credit card
      messageId = `msg_resend_demo_${Date.now()}`;
    } else {
      const sendResult = await resend.emails.send({
        from: fromAddress,
        to: [parentEmail],
        subject: `PRAGYA Learning Progress Report — ${reportData.studentName}`,
        html: emailHtml,
      });

      if (sendResult.error) {
        console.error('[Resend API Error]:', sendResult.error);
        return NextResponse.json(
          {
            success: false,
            error: sendResult.error.message || 'Failed to dispatch email through Resend.',
          },
          { status: 502 }
        );
      }

      messageId = sendResult.data?.id;
    }

    return NextResponse.json({
      success: true,
      messageId,
      recipient: parentEmail,
      studentName: reportData.studentName,
      deliveredAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    console.error('[POST /api/reports/send Unexpected Error]:', err);
    const errorMessage =
      err instanceof Error ? err.message : 'An unexpected error occurred while sending the report.';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
