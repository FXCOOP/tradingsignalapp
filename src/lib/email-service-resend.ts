/**
 * Email Service using Resend API
 * Sends automated email campaigns
 */

import { Resend } from 'resend';
import { emailTemplates } from './email-templates-exness';

const resend = new Resend(process.env.RESEND_API_KEY);

interface User {
  id: string;
  email: string;
  full_name: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send email to user
 * @param user User object with id, email, full_name
 * @param emailType Type of email: 'welcome', 'day1', or 'week1'
 * @returns Promise with success status and message ID or error
 */
export async function sendEmail(
  user: User,
  emailType: 'welcome' | 'day1' | 'week1'
): Promise<EmailResult> {
  try {
    // Validate user email
    if (!user.email || !user.email.includes('@')) {
      throw new Error('Invalid email address');
    }

    // Get email template
    const template = emailTemplates[emailType](user);

    // Send email via Resend
    const result = await resend.emails.send({
      from: 'TradeFlow <noreply@tradeflow.cloud>', // Must match verified domain in Resend
      to: user.email,
      subject: template.subject,
      html: template.html,
      tags: [
        { name: 'campaign', value: emailType },
        { name: 'user_id', value: user.id },
      ],
    });

    console.log(`✅ [${emailType}] Email sent to ${user.email}`, {
      messageId: result.id,
      emailType,
      userId: user.id,
    });

    return {
      success: true,
      messageId: result.id,
    };
  } catch (error: any) {
    console.error(`❌ [${emailType}] Email failed to ${user.email}`, {
      error: error.message,
      emailType,
      userId: user.id,
    });

    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Test email service (for development only)
 */
export async function testEmailService() {
  const testUser: User = {
    id: 'test-user-123',
    email: 'test@example.com', // Replace with your email for testing
    full_name: 'Test User',
  };

  console.log('🧪 Testing email service...');

  const result = await sendEmail(testUser, 'welcome');

  if (result.success) {
    console.log('✅ Test email sent successfully!', result.messageId);
  } else {
    console.log('❌ Test email failed:', result.error);
  }

  return result;
}
